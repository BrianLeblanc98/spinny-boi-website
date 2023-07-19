<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal';
import { useTrackStore } from '@/stores/trackStore';

const trackStore = useTrackStore();
</script>

<template>
  <div>
    <TopNav />
    <SpinnyWheel
      :options='trackStore.getOwnedTrackNameArray'
    />

    <ModalsContainer />
  </div>
</template>
