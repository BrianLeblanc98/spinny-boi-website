<script setup lang='ts'>
const modalShow = ref<boolean>(false);
const modalTitle = ref<string>('');
const modalOptions = ref<any[]>([]);

function modalConfirm() {
  modalShow.value = false;
}

function openModal(title: string, options: any[]) {
  modalTitle.value = title;
  modalOptions.value = options;
  modalShow.value = true;
}

function openSetOwnedTracks() {
  openModal('Set Owned Tracks', [1,2,3]);
}

function openSetOwnedCars() {
  openModal('Set Owned Cars', ['a', 'b', 'c']);
}
</script>

<template>
  <div>
    <SelectOptionsModal
      v-model='modalShow'
      :title='modalTitle'
      :options='modalOptions'
      @confirm='() => modalConfirm()'
    >
      <!-- <p>VModel: The content of the modal</p> -->
    </SelectOptionsModal>

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