<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <div>
    <TopNav />
    <SpinnyWheel
      :options='[
        "Lime Rock Park - Classic",
        "Mount Panorama Circuit",
        "Long Beach Street Circuit"
      ]'
    />
    <ModalsContainer />
  </div>
</template>
