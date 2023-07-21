<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  title: string
  type: MODAL_TYPE
  ownedInfo: ownedInfo
}>()

const emit = defineEmits<{
  (e: 'updateVisibility', modelValue: boolean): void
  (e: 'closed', data: modalReturn): modalReturn
}>()

const checkedIds = ref<string[]>([])

function handleOpened() {
  // When the modal is opened, populate checkedIds with previously selected options
  Object.keys(props.ownedInfo).forEach((ownedInfoId) => {
    if (props.ownedInfo[ownedInfoId].owned)
      checkedIds.value.push(ownedInfoId)
  })
}

function handleClosed() {
  const optionsToEmit: ownedInfo = {}

  Object.keys(props.ownedInfo).forEach((optionId) => {
    const optionToEmit = {
      name: props.ownedInfo[optionId].name,
      owned: false,
    }

    if (checkedIds.value.includes(optionId))
      optionToEmit.owned = true

    if (props.ownedInfo[optionId].free)
      (optionToEmit as any).free = true

    optionsToEmit[optionId] = optionToEmit
  })

  // Clear the checkedIds otherwise they will be held over the next time the modal is opened
  checkedIds.value = []

  // Emit which store to update, and the information to update it with
  emit('closed', {
    modalType: props.type,
    ownedInfo: optionsToEmit,
  })
}
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col px-4 py-2 bg-white rounded border border-gray-100 max-h-[90%] w-100 overflow-auto"
    @update:model-value="val => emit(&quot;updateVisibility&quot;, val)"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <div class="flex items-center mb-2 h-10 border-b border-black">
      <h1 v-if="title" class="text-2xl">
        {{ title }}
      </h1>
      <ClientOnly>
        <button class="ml-auto" @click="emit(&quot;updateVisibility&quot;, false)">
          <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
        </button>
      </ClientOnly>
    </div>

    <ul>
      <li
        v-for="(option, id) in ownedInfo"
        :key="id"
        class="border-b border-slate-200"
      >
        <input
          v-model="checkedIds"
          type="checkbox"
          :checked="option.owned"
          :value="id"
          :disabled="option.free"
          class="mr-4 align-middle"
        >
        <span> {{ option.name }} </span>
      </li>
    </ul>
  </VueFinalModal>
</template>
