<script setup lang='ts'>
import { useUserStore } from '@/stores/userStore'

const setOwnedContentModalShow = ref<boolean>(false)
const setOwnedContentModalTitle = ref<string>('')
const setOwnedContentModalType = ref<SET_OWNED_CONTENT_MODAL_TYPE>('')
const setOwnedContentModalOwnedPackages = ref<ownedPackages>({})

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

function handleSetOwnedContentModalClosed(modalReturn: setOwnedContentModalReturn) {
  // TODO: Check if the data is actually changed before saving to the firebase database
  if (modalReturn.type === 'tracks') {
    userStore.ownedTracks = modalReturn.ownedPackages
    saveUserStoreToDatabase(true, false)
  }
  else if (modalReturn.type === 'cars') {
    userStore.ownedCars = modalReturn.ownedPackages
    saveUserStoreToDatabase(false, true)
  }
  else {
    console.error('Closing modal returned invalid modalType')
  }
}

function openSetOwnedContentModal(title: string, type: SET_OWNED_CONTENT_MODAL_TYPE, ownedPackages: ownedPackages) {
  setOwnedContentModalTitle.value = title
  setOwnedContentModalType.value = type
  setOwnedContentModalOwnedPackages.value = ownedPackages
  setOwnedContentModalShow.value = true
}

function openSetOwnedTracks() {
  openSetOwnedContentModal('Set Owned Tracks', 'tracks', userStore.ownedTracks)
}

function openSetOwnedCars() {
  openSetOwnedContentModal('Set Owned Cars', 'cars', userStore.ownedCars)
}
</script>

<template>
  <div>
    <SetOwnedPackagesModal
      v-model="setOwnedContentModalShow"
      :title="setOwnedContentModalTitle"
      :type="setOwnedContentModalType"
      :owned-packages="setOwnedContentModalOwnedPackages"
      @closed="(setOwnedContentModalReturn: setOwnedContentModalReturn) => handleSetOwnedContentModalClosed(setOwnedContentModalReturn)"
    />

    <ul class="flex justify-between bg-pink-100 py-2 mb-2 border-b border-black">
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
              @click="openSetOwnedTracks()"
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
