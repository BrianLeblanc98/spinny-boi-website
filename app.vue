<script setup lang='ts'>
import { ref } from 'vue';
import { Track } from 'utils/tempRawTrackData';
import { ModalsContainer } from 'vue-final-modal';
import { useCounterStore } from '@/stores/tempCounterStore';

const tempCounterStore = useCounterStore();

setInterval(() => {
  tempCounterStore.increment();
}, 1000);

const tracks = ref<string[]>([]);

RAW_TRACK_DATA.forEach((track: Track, i) => {
  if (i < 33) {
    tracks.value.push(track.track_name);
  }
})
</script>

<template>
  <div>
    <TopNav />
    <p>Counter: {{ tempCounterStore.count }}</p>
    <SpinnyWheel
      :options='tracks'
    />

    <ModalsContainer />
  </div>
</template>
