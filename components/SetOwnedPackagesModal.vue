<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  title: string
  type: SET_OWNED_CONTENT_MODAL_TYPE
  ownedPackages: ownedPackages
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'closed', data: setOwnedContentModalReturn): setOwnedContentModalReturn
}>()

const checkedPackageIds = ref<string[]>([])

const sortedPackages = computed(() => {
  const result = Object.keys(props.ownedPackages).sort((a, b) => {
    if (props.ownedPackages[a].name > props.ownedPackages[b].name)
      return 1

    if (props.ownedPackages[a].name < props.ownedPackages[b].name)
      return -1

    return 0
  })

  return result
})

function handleOpened() {
  // When the modal is opened, populate checkedIds with previously selected options
  Object.keys(props.ownedPackages).forEach((packageId) => {
    if (props.ownedPackages[packageId].owned)
      checkedPackageIds.value.push(packageId)
  })
}

function handleClosed() {
  const optionsToEmit: ownedPackages = {}

  Object.keys(props.ownedPackages).forEach((optionId) => {
    const optionToEmit = {
      name: props.ownedPackages[optionId].name,
      owned: false,
    }

    if (checkedPackageIds.value.includes(optionId))
      optionToEmit.owned = true

    if (props.ownedPackages[optionId].free)
      (optionToEmit as any).free = true

    optionsToEmit[optionId] = optionToEmit
  })

  // Clear the checkedIds otherwise they will be held over the next time the modal is opened
  checkedPackageIds.value = []

  // Emit which store to update, and the information to update it with
  emit('closed', {
    type: props.type,
    ownedPackages: optionsToEmit,
  })
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
    <div class="sticky top-0 z-50 bg-white flex items-center mb-2 pt-2 h-10 border-b border-black">
      <h1 v-if="title" class="text-2xl">
        {{ title }}
      </h1>
      <ClientOnly>
        <button class="ml-auto" @click="emit('update:modelValue', false)">
          <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
        </button>
      </ClientOnly>
    </div>

    <ul>
      <li
        v-for="packageId in sortedPackages"
        :key="packageId"
        class="border-b border-slate-200"
      >
        <input
          v-model="checkedPackageIds"
          type="checkbox"
          :checked="props.ownedPackages[packageId].owned"
          :value="packageId"
          :disabled="props.ownedPackages[packageId].free"
          class="mr-4 align-middle"
        >
        <span> {{ props.ownedPackages[packageId].name }} </span>
      </li>
    </ul>
  </VueFinalModal>
</template>
