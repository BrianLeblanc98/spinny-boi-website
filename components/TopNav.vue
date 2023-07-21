<script setup lang='ts'>
import { useUserStore } from '@/stores/userStore'

const modalShow = ref<boolean>(false)
const modalTitle = ref<string>('')
const modalType = ref<MODAL_TYPE>('')
const modalOwnedInfo = ref<ownedInfo>({})

const { user, firebaseSignIn, firebaseSignOut } = useFirebaseAuth()
const { saveUserStoreToDatabase } = useFirebaseDatabase()

const userStore = useUserStore()

function signIn() {
  firebaseSignIn().then(() => {

  }).catch(() => {
    console.error('Error signing in')
  })
}

function signOut() {
  firebaseSignOut().then(() => {
    userStore.clear()
  }).catch(() => {
    console.error('Error signing out')
  })
}

function modalUpdateVisibility() {
  modalShow.value = false
}

function handleClosed(modalReturn: modalReturn) {
  // TODO: Check if the data is actually changed before saving to the firebase database
  if (modalReturn.modalType === 'tracks') {
    userStore.trackInfo = modalReturn.ownedInfo
    saveUserStoreToDatabase(true, false)
  }
  else if (modalReturn.modalType === 'cars') {
    userStore.carInfo = modalReturn.ownedInfo
    saveUserStoreToDatabase(false, true)
  }
  else {
    console.error('Closing modal returned invalid modalType')
  }
}

function openModal(title: string, type: MODAL_TYPE, options: ownedInfo) {
  modalTitle.value = title
  modalType.value = type
  modalOwnedInfo.value = options
  modalShow.value = true
}

function openSetOwnedTracks() {
  openModal('Set Owned Tracks', 'tracks', userStore.trackInfo)
}

function openSetOwnedCars() {
  openModal('Set Owned Cars', 'cars', userStore.carInfo)
}
</script>

<template>
  <div>
    <SelectOwnedInfoModal
      v-model="modalShow"
      :title="modalTitle"
      :type="modalType"
      :owned-info="modalOwnedInfo"
      @update-visibility="() => modalUpdateVisibility()"
      @closed="(modalReturn: modalReturn) => handleClosed(modalReturn)"
    />

    <ul class="flex justify-between bg-pink-100 py-2 border-b-2 border-black">
      <li>
        <span href="#" class="py-1 px-4 text-lg font-semibold">
          Spinny Boi
        </span>
      </li>
      <li>
        <ul class="flex justify-around">
          <li class="py-1 px-2">
            <span
              class="text-sm text-stone-600"
            >
              Edit spin profiles
            </span>
          </li>
          <li class="py-1 px-2">
            <span
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="openSetOwnedTracks()"
            >
              Set Owned Tracks
            </span>
          </li>
          <li class="py-1 px-2">
            <span
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="openSetOwnedCars()"
            >
              Set Owned Cars
            </span>
          </li>
          <li class="py-1 px-2">
            <span
              v-if="!user"
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="signIn()"
            >
              Login
            </span>
            <span
              v-else
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="signOut()"
            >
              Sign out
            </span>
          </li>
          <li v-if="user" class="py-1">
            <img
              class="rounded-full w-6 h-6 mx-2"
              :src="user.photoURL as any"
            >
          </li>
        </ul>
      </li>
    </ul>

    <!-- <font-awesome-icon icon='fa-solid fa-home' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-solid fa-user' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-brands fa-github' class='fa-fw fa-lg'/>
    <h1 class='text-3xl font-bold underline'>Spinny Boi</h1> -->
  </div>
</template>
