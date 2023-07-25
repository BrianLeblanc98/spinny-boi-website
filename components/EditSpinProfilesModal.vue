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
          class="border-b border-slate-200 pb-2"
        >
          <div class="flex items-center">
            <span>{{ profile.name }}</span>
            <button class="ml-auto">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
          <div class="pl-4">
            <ul>
              <li
                v-for="option in profile.options"
                :key="option.name"
              >
                <button>
                  <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
                <span class="pl-1">{{ option.name }}</span>
              </li>
            </ul>
            <button class="text-blue-500 hover:text-blue-800 cursor-pointer">
              <font-awesome-icon icon="fa-solid fa-plus" />
              <span class="pl-1">Add option</span>
            </button>
          </div>
        </li>
      </ul>

      <button class="text-blue-500 hover:text-blue-800 cursor-pointer">
        <font-awesome-icon icon="fa-solid fa-plus" />
        <span class="pl-1">Create new Spin Profile</span>
      </button>
    </div>
  </VueFinalModal>
</template>
