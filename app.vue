<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { updateIRacingDataStoreWithDatabase } = useFirebaseDatabase()

onMounted(() => {
  updateIRacingDataStoreWithDatabase()
})
</script>

<template>
  <ClientOnly>
    <TopNav class="sticky top-0 z-50" />
    <SpinnyWheel
      :options="userStore.getOwnedTrackNameArray"
    />
    <SpinnyWheel
      :options="userStore.getOwnedCarNameArray"
    />

    <ModalsContainer />
  </ClientOnly>
</template>
