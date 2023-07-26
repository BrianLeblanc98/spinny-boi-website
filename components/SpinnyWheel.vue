<script setup lang='ts'>
const props = defineProps<{
  profileId: uuid
}>()

const userStore = useUserStore()
const {
  spinProfiles,
} = storeToRefs(userStore)

const spinOptions = computed(() => {
  if (!spinProfiles.value[props.profileId]?.options)
    return []
  else
    return Object.values(spinProfiles.value[props.profileId].options)
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWidth = 800
const canvasHeight = 800
let canvasOrigin = { x: 0, y: 0 }
const wheelRadius = 380
let isWheelSpinning = false

onUpdated(() => {
  // When props are changed, i.e. when the spin profile id changes, re-draw the wheel
  const ctx = canvasRef.value?.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    drawWheel(ctx, Math.random() * 2 * Math.PI)
  }
})

function drawWheel(ctx: CanvasRenderingContext2D, rotation: number = 0) {
  // Create the frame of the spinner wheel
  ctx.beginPath()
  ctx.moveTo(canvasOrigin.x, canvasOrigin.y)
  ctx.arc(canvasOrigin.x, canvasOrigin.y, wheelRadius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.stroke()

  // Create each slice
  if (spinOptions.value) {
    spinOptions.value.forEach((option, i) => {
      const turnAmount = (2 * Math.PI / spinOptions.value.length)
      const startAngle = i * turnAmount
      const endAngle = startAngle + turnAmount

      // Create the colored slice
      ctx.beginPath()
      ctx.moveTo(canvasOrigin.x, canvasOrigin.y)
      ctx.arc(
        canvasOrigin.x,
        canvasOrigin.y,
        wheelRadius,
        startAngle + rotation,
        endAngle + rotation,
      )

      let color = ''

      // TODO: Come up with a way to guarantee no side by side colors
      if (spinOptions.value.length % 2 === 0) {
        // Color scheme when it's an even number
        color = i % 2 === 0 ? 'red' : 'orange'
      }
      else {
        // Color scheme when it's a multiple of 3
        if (i % 3 === 0)
          color = 'red'
        else if (i % 3 === 1)
          color = 'orange'
        else
          color = 'white'
      }

      ctx.fillStyle = color
      ctx.fill()

      // Add the text on top
      ctx.save()
      ctx.translate(canvasOrigin.x, canvasOrigin.y)
      ctx.rotate(startAngle + turnAmount / 2 + rotation)
      ctx.font = '15px Comic Sans MS'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'black'

      // TODO: Find a better way to define x
      ctx.fillText(option.name, wheelRadius / 4, 0)
      ctx.restore()
    })
  }

  // Create the center spin button
  // Center circle
  ctx.beginPath()
  ctx.arc(canvasOrigin.x, canvasOrigin.y, 30, 0, 2 * Math.PI)
  ctx.fillStyle = 'black'
  ctx.fill()

  // Triangle
  ctx.beginPath()
  ctx.moveTo(canvasOrigin.x - 8, canvasOrigin.y - 25)
  ctx.lineTo(canvasOrigin.x, canvasOrigin.y - 40)
  ctx.lineTo(canvasOrigin.x + 8, canvasOrigin.y - 25)
  ctx.fill()

  // Text
  ctx.font = '20px Comic Sans MS'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  ctx.fillText('Spin', canvasOrigin.x, canvasOrigin.y)
}

function getWinRotation(winningIndex: number): number {
  let returnValue = -Math.PI / 2 - Math.PI / spinOptions.value.length - (winningIndex % spinOptions.value.length) * (2 * Math.PI / spinOptions.value.length)
  while (returnValue < 0)
    returnValue += 2 * Math.PI

  return returnValue
}

// https://stackoverflow.com/a/66902484
function linspace(start: number, stop: number, num: number, endpoint = true): number[] {
  const div = endpoint ? (num - 1) : num
  const step = (stop - start) / div
  return Array.from({ length: num }, (_, i) => start + step * i)
}

// 500 Frames ~= 7.5 seconds
function getRotationFrames(winningIndex: number): number[] {
  const resultArray: number[] = []

  // // For the first 250 frames, just spin at really fast speeds
  let stepNumPerFullRotation = 10
  let step = 2 * Math.PI / stepNumPerFullRotation

  for (let i = 1; i <= stepNumPerFullRotation * 20; i++)
    resultArray.push(i * step)

  // Taper off
  stepNumPerFullRotation = 25
  step = 2 * Math.PI / stepNumPerFullRotation

  for (let i = 1; i <= stepNumPerFullRotation * 4; i++)
    resultArray.push(i * step)

  // Land on the winningIndex
  resultArray.push(...linspace(0, getWinRotation(winningIndex), 200))

  return resultArray
}

function animateWheel(ctx: CanvasRenderingContext2D, rotations: number[]): Promise<void> {
  return new Promise<void>((resolve) => {
    let rotationIndex = 0

    const frame = () => {
      if (rotationIndex < rotations.length) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        drawWheel(ctx, rotations[rotationIndex])
        rotationIndex += 1
        setTimeout(frame, 16.67)
      }
      else {
        resolve()
      }
    }

    frame()
  })
}

function handleMouseClickOnSpin(ctx: CanvasRenderingContext2D) {
  if (!isWheelSpinning && spinOptions.value.length > 0) {
    isWheelSpinning = true
    const winningIndex = Math.floor(Math.random() * spinOptions.value.length)
    const rotations = getRotationFrames(winningIndex)

    animateWheel(ctx, rotations).then(() => {
      // TODO: Make this not an alert
      alert(spinOptions.value[winningIndex].name)
      isWheelSpinning = false
    })
  }
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d')

  if (ctx) {
    canvasOrigin = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    }

    // Start the wheel on a random rotation
    drawWheel(ctx, Math.random() * 2 * Math.PI)

    canvasRef.value?.addEventListener('mousedown', () => {
      handleMouseClickOnSpin(ctx)
    })
  }
  else {
    console.error('Canvas context is null or undefined')
  }
})
</script>

<template>
  <div>
    <span v-if="profileId === EMPTY_UUID">No spin profile selected</span>
    <span v-if="profileId !== EMPTY_UUID && spinOptions.length === 0">Spin profile has no options!</span>

    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
      tabindex="0"
    />

    <!-- TODO: This is needed for the canvas to be reactive to profile changes. Find a better way to do this -->
    <ul>
      <li
        v-for="(option, index) in spinOptions"
        :key="index"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>
