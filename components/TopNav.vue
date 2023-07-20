<script setup lang='ts'>
import { useUserStore } from '@/stores/userStore';

const modalShow = ref<boolean>(false);
const modalTitle = ref<string>('');
const modalType = ref<MODAL_TYPE>('');
const modalOwnedInfo = ref<{}>([]);

const { user, firebaseSignIn, firebaseSignOut } = useFirebaseAuth();
const { saveUserStoreToDatabase } = useFirebaseDatabase();

const userStore = useUserStore();

function signIn() {
  firebaseSignIn().then(() => {

  }).catch(() => {
    console.error('Error signing in');
  });
}

function signOut() {
  firebaseSignOut().then(() => {
    userStore.clear();
  }).catch(() => {
    console.error('Error signing out');
  });
}

function modalUpdateVisibility() {
  modalShow.value = false;
}

function handleClosed(modalReturn: modalReturn) {
  // TODO: Check if the data is actually changed before saving to the firebase database
  if (modalReturn.modalType == 'tracks') {
    userStore.trackInfo = modalReturn.ownedInfo;
    saveUserStoreToDatabase(true, false);
  } else if (modalReturn.modalType == 'cars') {
    userStore.carInfo = modalReturn.ownedInfo;
    saveUserStoreToDatabase(false, true);
  } else {
    console.error('Closing modal returned invalid modalType');
  }
}

function openModal(title: string, type: MODAL_TYPE, options: ownedInfo) {
  modalTitle.value = title;
  modalType.value = type;
  modalOwnedInfo.value = options;
  modalShow.value = true;
}

function openSetOwnedTracks() {
  openModal('Set Owned Tracks', 'tracks', userStore.trackInfo);
}

function openSetOwnedCars() {
  openModal('Set Owned Cars', 'cars', userStore.carInfo);
}
</script>

<template>
  <div>
    <SelectOwnedInfoModal
      v-model='modalShow'
      :title='modalTitle'
      :type='modalType'
      :ownedInfo='modalOwnedInfo'
      @updateVisibility='() => modalUpdateVisibility()'
      @closed='(modalReturn: modalReturn) => handleClosed(modalReturn)'
    />

    <ul class='mt-1 pb-1 border-b-2 border-black flex'>
      <li class='ml-3 mr-6'>
        <img
          v-if='user'
          :src='(user.photoURL as any)'
          class='w-8'
        >

        <span
          v-else
          class='text-blue-500 hover:text-blue-800 cursor-pointer'
          @click='signIn()'
        >
          Login
        </span>
      </li>

      <li class='ml-3 mr-6'>
        <span
          v-if='user'
          class='text-blue-500 hover:text-blue-800 cursor-pointer'
          @click='signOut()'
        >
          Sign Out
        </span>
      </li>

      <li class='ml-3 mr-6'>
        <span
          class='text-blue-500 hover:text-blue-800 cursor-pointer'
          @click='openSetOwnedTracks()'
        >
          Set Owned Tracks
        </span>
      </li>

      <li class='ml-3 mr-6'>
        <span
          class='text-blue-500 hover:text-blue-800 cursor-pointer'
          @click='openSetOwnedCars()'
        >
          Set Owned Cars
        </span>
      </li>
    </ul>

    <!-- <font-awesome-icon icon='fa-solid fa-home' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-solid fa-user' class='fa-fw fa-lg'/>
    <font-awesome-icon icon='fa-brands fa-github' class='fa-fw fa-lg'/>
    <h1 class='text-3xl font-bold underline'>Spinny Boi</h1> -->
  </div>
</template>