<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <VueFinalModal
    class='flex justify-center items-center'
    content-class='flex flex-col p-4 bg-white rounded border border-gray-100'
    @update:model-value='val => emit("update:modelValue", val)'
  >
    <div class='flex items-center h-10'>
      <h1 v-if='title' class='text-2xl'>
        {{ title }}
      </h1>
      <ClientOnly>
        <button class='ml-auto' @click='emit("update:modelValue", false)'>
          <font-awesome-icon icon='fa-solid fa-xmark' size='2xl' />
        </button>
      </ClientOnly>
    </div>
    <slot />
  </VueFinalModal>
</template>