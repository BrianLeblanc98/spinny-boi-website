<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { spinProfiles, selectedSpinProfile } = storeToRefs(userStore)

const { updateIRacingDataStoreWithDatabase, saveUserStoreToDatabase } = useFirebaseDatabase()

function handleSelectSpinProfileChange() {
  saveUserStoreToDatabase(false, false, false, true)
}

onMounted(() => {
  updateIRacingDataStoreWithDatabase()
})
</script>

<template>
  <ClientOnly>
    <TopNav class="sticky top-0 z-50" />
    <select v-model="selectedSpinProfile" @change="handleSelectSpinProfileChange">
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
    <div>
      <SpinnyWheel
        :profile-id="selectedSpinProfile"
      />
    </div>
    <ModalsContainer />
  </ClientOnly>
</template>
