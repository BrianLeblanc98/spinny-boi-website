<script setup lang='ts'>
const setOwnedContentModalShow = ref<boolean>(false)
const setOwnedContentModalType = ref<setOwnedContentModalType>('')
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
    userStore.$reset()
  }).catch(() => {
    console.error('Error signing out')
  })
}

function openSetOwnedContentModal(type: setOwnedContentModalType) {
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

    <div class="flex justify-between items-center bg-pink-100 py-2 mb-2 border-b border-black">
      <span class="py-1 px-4 text-xl font-semibold italic tracking-widest">
        Spinny Boi
      </span>
      <div class="flex justify-around  space-x-3 pr-4">
        <span
          class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="openEditSpinProfiles()"
        >
          Edit spin profiles
        </span>
        <span
          class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="openSetOwnedContentModal('tracks')"
        >
          Set Owned Tracks
        </span>
        <span
          class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="openSetOwnedContentModal('cars')"
        >
          Set Owned Cars
        </span>

        <span
          v-if="!user"
          class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="signIn()"
        >
          Sign in with Google
        </span>
        <span
          v-else
          class="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          @click="signOut()"
        >
          Sign out
        </span>
        <img
          v-if="user?.photoURL"
          class="rounded-full w-6 h-6 mx-2"
          :src="user.photoURL"
        >
      </div>
    </div>

    <!-- <font-awesome-icon icon='fa-solid fa-home' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-solid fa-user' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-brands fa-github' class='fa-fw fa-lg'/>
    <h1 class='text-3xl font-bold underline'>Spinny Boi</h1> -->
  </div>
</template>
