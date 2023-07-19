<script setup lang='ts'>
import { useTrackStore } from '@/stores/trackStore';
import { useCarStore } from '@/stores/carStore';

const modalShow = ref<boolean>(false);
const modalTitle = ref<string>('');
const modalType = ref<MODAL_TYPE>('');
const modalOwnedInfo = ref<{}>([]);

const trackStore = useTrackStore();
const carStore = useCarStore();

function modalUpdateVisibility() {
  modalShow.value = false;
}

function handleClosed(modalReturn: modalReturn) {
  if (modalReturn.modalType == 'tracks') {
    trackStore.trackInfo = modalReturn.ownedInfo;
  } else if (modalReturn.modalType == 'cars') {
    carStore.carInfo = modalReturn.ownedInfo;
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
  openModal('Set Owned Tracks', 'tracks', trackStore.trackInfo);
}

function openSetOwnedCars() {
  openModal('Set Owned Cars', 'cars', carStore.carInfo);
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
      @closed='(modalReturn) => handleClosed(modalReturn)'
    />

    <ul class='mt-1 pb-1 border-b-2 border-black flex'>
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