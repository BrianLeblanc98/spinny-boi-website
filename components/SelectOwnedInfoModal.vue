<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  title: string,
  type: MODAL_TYPE,
  ownedInfo: ownedInfo
}>();

const checkedIds = ref<string[]>([]);

const emit = defineEmits<{
  (e: 'updateVisibility', modelValue: boolean): void,
  (e: 'closed', data: modalReturn): modalReturn
}>();

function handleOpened() {
  // When the modal is opened, populate checkedIds with previously selected options
  Object.keys(props.ownedInfo).forEach((ownedInfoId) => {
    if(props.ownedInfo[ownedInfoId].owned) {
      checkedIds.value.push(ownedInfoId);
    }
  });
}

function handleClosed() {
  const optionsToEmit: ownedInfo = {};

  Object.keys(props.ownedInfo).forEach((optionId) => {
    let optionToEmit = {
      name: props.ownedInfo[optionId].name,
      owned: false
    };

    if (checkedIds.value.includes(optionId)) {
      optionToEmit.owned = true;
    }

    optionsToEmit[optionId] = optionToEmit;
  });

  // Clear the checkedIds otherwise they will be held over the next time the modal is opened
  checkedIds.value = [];

  // Emit which store to update, and the information to update it with
  emit('closed', {
    modalType: props.type,
    ownedInfo: optionsToEmit
  });
}
</script>

<template>
  <VueFinalModal
    class='flex justify-center items-center'
    content-class='flex flex-col p-4 bg-white rounded border border-gray-100'
    @update:model-value='val => emit("updateVisibility", val)'
    @opened='handleOpened'
    @closed='handleClosed'
  >
    <div class='flex items-center h-10'>
      <h1 v-if='title' class='text-2xl'>
        {{ title }}
      </h1>
      <ClientOnly>
        <button class='ml-auto' @click='emit("updateVisibility", false)'>
          <font-awesome-icon icon='fa-solid fa-xmark' size='2xl' />
        </button>
      </ClientOnly>
    </div>
    <slot />

    <ul>
      <li v-for='(option, key) in ownedInfo'>
        <span> {{ option.name }} </span>
        <input
          type='checkbox'
          v-model='checkedIds'
          :checked='option.owned'
          :value='key'
        />
      </li>
    </ul>
  </VueFinalModal>
</template>