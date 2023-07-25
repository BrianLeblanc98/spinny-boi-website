<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal'

import { useUserStore } from '@/stores/userStore'

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const userStore = useUserStore()

function handleOpened() {}

function handleClosed() {}
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col px-4 pb-2 bg-white rounded border border-gray-100 max-h-[90%] w-100 overflow-auto"
    @update:model-value="val => emit('update:modelValue', val)"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <div class="sticky top-0 z-50 bg-white flex items-center mb-2 pt-2 h-10 border-b border-black">
      <h1 class="text-2xl">
        Edit Spin Profiles
      </h1>
      <ClientOnly>
        <button class="ml-auto" @click="emit('update:modelValue', false)">
          <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
        </button>
      </ClientOnly>
    </div>

    <div>
      <ul>
        <li
          v-for="profile in userStore.spinProfiles"
          :key="profile.name"
        >
          {{ profile.name }}
          <ul>
            <li
              v-for="option in profile.options"
              :key="option.name"
            >
              {{ option.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </VueFinalModal>
</template>
