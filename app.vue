<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal'

const { updateIRacingDataStoreWithDatabase } = useFirebaseDatabase()

onMounted(() => {
  updateIRacingDataStoreWithDatabase()
})
</script>

<template>
  <ClientOnly>
    <TopNav class="sticky top-0 z-50" />
    <SpinnyWheel />
    <ModalsContainer />
  </ClientOnly>
</template>
