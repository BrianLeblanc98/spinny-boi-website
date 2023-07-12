<script setup lang='ts'>
const props = defineProps<{
  options: string[]
}>()
import { ref } from 'vue';

const track = ref('');

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
</template>