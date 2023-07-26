<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  result: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

function handleOpened() {

}

function handleClosed() {

}
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col px-4 pb-2 bg-white rounded border border-gray-100 max-h-[90%] w-100 overflow-auto"
    @update:model-value="val => emit('update:modelValue', val)"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <div class="z-50 bg-white flex items-center mb-2 pt-2 h-10 border-b border-black">
      <h1 class="text-2xl">
        Your spin result is
      </h1>
      <ClientOnly>
        <button class="ml-auto" @click="emit('update:modelValue', false)">
          <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
        </button>
      </ClientOnly>
    </div>
    <div>
      {{ props.result }}
    </div>
  </VueFinalModal>
</template>
