<script setup lang='ts'>
import { ModalsContainer } from 'vue-final-modal'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
userStore.spinProfiles = [
  {
    name: 'Profile 1 - Tracks',
    type: 'tracks',
    options: [
      {
        name: 'Track 1',
      },
      {
        name: 'Track 2',
      },
      {
        name: 'Track 3',
      },
      {
        name: 'Track 4',
      },
      {
        name: 'Track 5',
      },
    ],
  },
  {
    name: 'Profile 2 - Cars',
    type: 'cars',
    options: [
      {
        name: 'Car 1',
      },
      {
        name: 'Car 2',
      },
      {
        name: 'Car 3',
      },
    ],
  },
  {
    name: 'Profile X - FILLER',
    type: 'track',
    options: [
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
    ],
  },
  {
    name: 'Profile X - FILLER',
    type: 'track',
    options: [
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
    ],
  },
  {
    name: 'Profile X - FILLER',
    type: 'track',
    options: [
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
    ],
  },
  {
    name: 'Profile X - FILLER',
    type: 'track',
    options: [
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
    ],
  },
  {
    name: 'Profile X - FILLER',
    type: 'track',
    options: [
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
    ],
  },
  {
    name: 'Profile X - FILLER',
    type: 'track',
    options: [
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
      {
        name: 'FILLER FILLER FILLER FILLER FILLER FILLER',
      },
    ],
  },
]
const { updateIRacingDataStoreWithDatabase } = useFirebaseDatabase()

const selectedProfileIndex = ref<number>(0)
onMounted(() => {
  updateIRacingDataStoreWithDatabase()
})
</script>

<template>
  <ClientOnly>
    <TopNav class="sticky top-0 z-50" />
    <select v-model="selectedProfileIndex">
      <option disabled value="">
        Select your spin profile
      </option>
      <option
        v-for="(profile, index) in userStore.spinProfiles"
        :key="profile.name"
        :value="index"
      >
        {{ userStore.spinProfiles[index].name }}
      </option>
    </select>
    <SpinnyWheel
      :profile="userStore.spinProfiles[selectedProfileIndex]"
    />
    <ModalsContainer />
  </ClientOnly>
</template>
