<script setup lang='ts'>
const props = defineProps<{
  options: string[]
}>()
import { ref } from 'vue';
import { onMounted } from 'vue';

const track = ref('');
const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref(700);
const canvasHeight = ref(700);
const wheelRadius = ref(300);

onMounted(() => {
  console.log('SpinnyWheel mounted');

  canvasRef.value?.addEventListener('mousedown', (e) => {
    console.log(`clicked on canvas`);
  });

  const ctx = canvasRef.value?.getContext('2d');
  if (ctx) {
    const origin = {x: canvasWidth.value/2, y: canvasHeight.value/2}
    // Create the frame of the spinner wheel
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, wheelRadius.value, 0, 2 * Math.PI);
    ctx.stroke();


    // Create each slice
    props.options.forEach((optionName, i) => {
      const turnAmount = (2 * Math.PI/props.options.length)
      const startAngle = i * turnAmount;
      const endAngle = startAngle + turnAmount;

      // Create the colored slice
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.arc(
        origin.x,
        origin.y,
        wheelRadius.value,
        startAngle,
        endAngle
      );
      ctx.fillStyle = i % 2 == 0 ? 'red' : 'orange';
      ctx.fill();

      // Add the text on top
      ctx.save();
      ctx.translate(origin.x, origin.y);
      ctx.rotate(startAngle + turnAmount/2);
      ctx.font = '15px Comic Sans MS';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.fillText(optionName, 35, 0);
      ctx.restore();
    })


    // Create the center spin button
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.font = '20px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText('Spin', origin.x, origin.y);
  } else {
    console.error('Canvas context is null or undefined');
  }
});

function getRandomOption() {
  const index = Math.floor(Math.random() * props.options.length);
  track.value = props.options[index];
}
</script>

<template>
  <button
    @click='getRandomOption'
    class='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
  >
    Get a random track
  </button>
  <h2>{{ track }}</h2>

  <div class='board'>
    <canvas
      ref='canvasRef'
      :width='canvasWidth'
      :height='canvasHeight'
      tabindex='0'
      style='border: 1px solid black;'
    />
  </div>
</template>