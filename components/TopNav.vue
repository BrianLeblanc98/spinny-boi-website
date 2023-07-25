<script setup lang='ts'>
import { useUserStore } from '@/stores/userStore'

const setOwnedContentModalShow = ref<boolean>(false)
const setOwnedContentModalType = ref<SET_OWNED_CONTENT_MODAL_TYPE>('')

const editSpinProfilesModalShow = ref<boolean>(false)

const { user, firebaseSignIn, firebaseSignOut } = useFirebaseAuth()

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

function openSetOwnedContentModal(type: SET_OWNED_CONTENT_MODAL_TYPE) {
  setOwnedContentModalType.value = type
  setOwnedContentModalShow.value = true
}

function openEditSpinProfiles() {
  editSpinProfilesModalShow.value = true
}
</script>

<template>
  <div>
    <SetOwnedPackagesModal
      v-model="setOwnedContentModalShow"
      :type="setOwnedContentModalType"
    />

    <EditSpinProfilesModal
      v-model="editSpinProfilesModalShow"
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
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="openEditSpinProfiles()"
            >
              Edit spin profiles
            </span>
          </li>
          <li class="py-1 px-2">
            <span
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="openSetOwnedContentModal('tracks')"
            >
              Set Owned Tracks
            </span>
          </li>
          <li class="py-1 px-2">
            <span
              class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="openSetOwnedContentModal('cars')"
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
