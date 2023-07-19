<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal';
import { useTrackStore } from '@/stores/trackStore';
import { useCarStore } from '@/stores/carStore';

const trackStore = useTrackStore();
const carStore = useCarStore();
</script>

<template>
  <ClientOnly>
    <TopNav />
    <SpinnyWheel
      :options='trackStore.getOwnedTrackNameArray'
    />
    <SpinnyWheel
      :options='carStore.getOwnedCarNameArray'
    />

    <ModalsContainer />
  </ClientOnly>
</template>
