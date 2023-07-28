<script setup lang='ts'>
const spinResultModalShow = ref<boolean>(false)
const spinResultModalResult = ref<string>('')
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isWheelSpinning = ref<boolean>(false)

const { saveUserStoreToDatabase } = useFirebaseDatabase()

const userStore = useUserStore()
const {
  spinProfiles,
  selectedSpinProfile,
} = storeToRefs(userStore)

const spinOptions = computed(() => {
  if (selectedSpinProfile.value === EMPTY_UUID || !spinProfiles.value[selectedSpinProfile.value]?.options)
    return []
  else
    return Object.values(spinProfiles.value[selectedSpinProfile.value].options)
})

const canvasWidth = 800
const canvasHeight = 800
const wheelRadius = 380
let canvasOrigin = { x: 0, y: 0 }

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

onUpdated(() => {
  const ctx = canvasRef.value?.getContext('2d')

  // Don't redraw when the modal opens, only update when it closes
  if (!spinResultModalShow.value && ctx) {
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

  // Create each slice, but only if there are actually spin options
  if (spinOptions.value.length > 0) {
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
        color = i % 2 === 0 ? 'purple' : 'white'
      }
      else {
        // Color scheme when it's a multiple of 3
        if (i % 3 === 0)
          color = 'pink'
        else if (i % 3 === 1)
          color = 'purple'
        else
          color = 'white'
      }

      ctx.fillStyle = color
      ctx.fill()

      // Add the text on top
      ctx.save()
      ctx.translate(canvasOrigin.x, canvasOrigin.y)
      ctx.rotate(startAngle + turnAmount / 2 + rotation)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'black'

      // There's probably a better way to do this, but this works for now
      let font = ''
      if (option.name.length >= 65)
        font = '9px REM'
      else if (option.name.length >= 50)
        font = '11px REM'
      else if (option.name.length >= 45)
        font = '14px REM'
      else if (option.name.length >= 40)
        font = '15px REM'
      else if (option.name.length >= 35)
        font = '16px REM'
      else if (option.name.length >= 30)
        font = '17px REM'
      else font = '20px REM'

      ctx.font = font

      // TODO: Find a better way to define x
      ctx.fillText(option.name, wheelRadius / 10, 0)
      ctx.restore()
    })
    // console.log('---------------------')
  }

  // Create the center spin button
  // Center circle
  ctx.beginPath()
  ctx.arc(canvasOrigin.x, canvasOrigin.y, 26, 0, 2 * Math.PI)
  ctx.fillStyle = 'black'
  ctx.fill()

  // Triangle
  ctx.beginPath()
  ctx.moveTo(canvasOrigin.x - 8, canvasOrigin.y - 25)
  ctx.lineTo(canvasOrigin.x, canvasOrigin.y - 37)
  ctx.lineTo(canvasOrigin.x + 8, canvasOrigin.y - 25)
  ctx.fill()

  // Text
  ctx.font = '20px REM'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  ctx.fillText('Spin', canvasOrigin.x, canvasOrigin.y)
}

function getWinRotation(winningIndex: number): number {
  let returnValue = -Math.PI / 2 - Math.PI / spinOptions.value.length - (winningIndex % spinOptions.value.length) * (2 * Math.PI / spinOptions.value.length)
  while (returnValue < 0)
    returnValue += 2 * Math.PI

  const sliceSize = (2 * Math.PI / spinOptions.value.length)
  returnValue += (Math.random() - 0.5) * sliceSize
  return returnValue
}

// 500 Frames ~= 7.5 seconds
function getRotationFrames(winningIndex: number): number[] {
  // https://gist.github.com/gre/1650294#file-easing-js-L11
  const easeInCubic = (t: number) => t * t * t
  const easeOutQuad = (t: number) => t * (2 - t)

  const resultArray: number[] = []
  const winRotation = getWinRotation(winningIndex)
  const randomStartingOffset = Math.random() * 2 * Math.PI

  // Ease in to full speed
  for (let i = 0; i < 1; i += 0.015)
    resultArray.push(easeInCubic(i) * 2 * (2 * Math.PI) + randomStartingOffset)

  // End speed of the ease in ~= Math.PI / 8, so do a bunch of full rotations at that speed (1 rotation = 16 steps)
  for (let i = 0; i < (16 * 9); i++)
    resultArray.push(i * Math.PI / 8 + winRotation)

  for (let i = 0; i < 4; i++) {
    const divisor = i * 8 + 16 // 16, 24, 32, 40
    for (let j = 0; j < divisor * 2; j++)
      resultArray.push(j * Math.PI / divisor + winRotation)
  }

  // Start speed of the ease out is ~= Math.PI / 50
  for (let i = 0; i < 1; i += 0.005)
    resultArray.push(easeOutQuad(i) * (2 * Math.PI) + winRotation)

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
  if (!isWheelSpinning.value && spinOptions.value.length > 0) {
    isWheelSpinning.value = true
    const winningIndex = Math.floor(Math.random() * spinOptions.value.length)
    const rotations = getRotationFrames(winningIndex)

    animateWheel(ctx, rotations).then(() => {
      spinResultModalResult.value = spinOptions.value[winningIndex].name
      spinResultModalShow.value = true
      isWheelSpinning.value = false
    })
  }
}

function handleSelectSpinProfileChange() {
  saveUserStoreToDatabase(false, false, false, true)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <SpinResultModal
      v-model="spinResultModalShow"
      :result="spinResultModalResult"
    />
    <select
      v-model="selectedSpinProfile"
      class="border rounded"
      :disabled="isWheelSpinning"
      @change="handleSelectSpinProfileChange"
    >
      <option :value="EMPTY_UUID" disabled selected>
        Select your spin profile
      </option>
      <option
        v-for="(profile, id) in spinProfiles"
        :key="id"
        :value="id"
      >
        {{ profile.name }}
      </option>
    </select>

    <span v-if="selectedSpinProfile === EMPTY_UUID">No spin profile selected</span>
    <span v-if="selectedSpinProfile !== EMPTY_UUID && spinOptions.length === 0">Spin profile has no options!</span>

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
