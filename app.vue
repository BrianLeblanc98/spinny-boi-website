<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
  <ClientOnly>
    <TopNav />
    <SpinnyWheel
      :options='userStore.getOwnedTrackNameArray'
    />
    <SpinnyWheel
      :options='userStore.getOwnedCarNameArray'
    />

    <ModalsContainer />
  </ClientOnly>
</template>
