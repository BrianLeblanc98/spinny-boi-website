<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  type: setOwnedContentModalType
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const title = ref<string>('')
const ownedPackages = ref<ownedPackages>({})
const checkedPackageIds = ref<string[]>([])

const { saveUserStoreToDatabase } = useFirebaseDatabase()

const userStore = useUserStore()
const {
  ownedCars,
  ownedTracks,
} = storeToRefs(userStore)

const sortedPackages = computed(() => {
  const result = Object.keys(ownedPackages.value).sort((a, b) => {
    if (ownedPackages.value[a].name > ownedPackages.value[b].name)
      return 1

    if (ownedPackages.value[a].name < ownedPackages.value[b].name)
      return -1

    return 0
  })

  return result
})

function handleOpened() {
  if (props.type === '') {
    console.error('SetOwnedPackagesModal opened with invalid modal type')
    return
  }
  else if (props.type === 'cars') {
    title.value = 'Set Owned Cars'
    ownedPackages.value = ownedCars.value
  }
  else if (props.type === 'tracks') {
    title.value = 'Set Owned Tracks'
    ownedPackages.value = ownedTracks.value
  }

  // When the modal is opened, populate checkedIds with previously selected options
  Object.keys(ownedPackages.value).forEach((packageId) => {
    if (ownedPackages.value[packageId].owned)
      checkedPackageIds.value.push(packageId)
  })
}

function handleClosed() {
  const ownedPackagesToSave: ownedPackages = {}

  Object.keys(ownedPackages.value).forEach((optionId) => {
    const packageDataToSave: packageData = {
      name: ownedPackages.value[optionId].name,
      owned: false,
    }

    if (checkedPackageIds.value.includes(optionId))
      packageDataToSave.owned = true

    if (ownedPackages.value[optionId].free)
      packageDataToSave.free = true

    ownedPackagesToSave[optionId] = packageDataToSave
  })

  // Clear the checkedIds otherwise they will be held over the next time the modal is opened
  checkedPackageIds.value = []

  if (props.type === 'cars') {
    ownedCars.value = ownedPackagesToSave
    saveUserStoreToDatabase(false, true, false, false)
  }
  else if (props.type === 'tracks') {
    ownedTracks.value = ownedPackagesToSave
    saveUserStoreToDatabase(true, false, false, false)
  }
}
</script>

<template>
  <VueFinalModal
    class="flex justify-center pt-10"
    content-class="flex flex-col px-4 pb-2 bg-white rounded border border-gray-100 max-h-[90%] overflow-auto"
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
          :checked="ownedPackages[packageId].owned"
          :value="packageId"
          :disabled="ownedPackages[packageId].free"
          class="mr-4 align-middle"
        >
        <span> {{ ownedPackages[packageId].name }} </span>
      </li>
    </ul>
  </VueFinalModal>
</template>
