<script setup lang='ts'>
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const { saveUserStoreToDatabase } = useFirebaseDatabase()

const userStore = useUserStore()
const {
  addNewOption,
  createNewSpinProfile,
  deleteOption,
  deleteSpinProfile,
} = userStore
const {
  ownedCarsAndVariants,
  ownedTracksAndConfigsArray,
  selectedSpinProfile,
  spinProfiles,
} = storeToRefs(userStore)

function handleOpened() {}

function handleClosed() {
  saveUserStoreToDatabase(false, false, true, true)
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
          v-for="(profile, profileId) in spinProfiles"
          :key="profileId"
          class="border-b border-slate-400 pb-2 mt-1"
        >
          <div class="flex border-b border-slate-200 pb-1">
            <input
              v-model="profile.name"
              class="border rounded"
              placeholder="Enter spin profile name"
            >
            <select
              v-if="!profile.typeLocked"
              v-model="profile.type"
              class="border rounded"
              @change="() => profile.typeLocked = true"
            >
              <option value="" disabled selected>
                Profile type
              </option>
              <option value="tracks">
                Tracks
              </option>
              <option value="cars">
                Cars
              </option>
            </select>

            <div v-else class="ml-2">
              <span> - </span>
              <span v-if="profile.type === 'tracks'">
                Track Profile
              </span>

              <span v-else-if="profile.type === 'cars'">
                Car Profile
              </span>
            </div>

            <span v-if="selectedSpinProfile === profileId" class="ml-10 italic text-red-400">
              Selected Profile
            </span>

            <button class="ml-auto" @click="deleteSpinProfile(profileId)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>

          <div class="pt-1 pl-4">
            <ul>
              <li
                v-for="(option, optionId) in profile.options"
                :key="optionId"
                class="flex items-center"
              >
                <button @click="deleteOption(profileId, optionId)">
                  <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
                <div v-if="profile.type === 'tracks'">
                  <select
                    v-model="option.name"
                    class="border rounded"
                  >
                    <option
                      v-for="trackName in ownedTracksAndConfigsArray"
                      :key="trackName"
                      :value="trackName"
                    >
                      {{ trackName }}
                    </option>
                  </select>
                </div>

                <div v-else-if="profile.type === 'cars'">
                  <select
                    v-model="option.name"
                    class="border rounded"
                  >
                    <option
                      v-for="carName in ownedCarsAndVariants"
                      :key="carName"
                      :value="carName"
                    >
                      {{ carName }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
            <button
              v-if="profile.type !== ''"
              class="text-blue-500 hover:text-blue-800 cursor-pointer"
              @click="addNewOption(profileId)"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
              <span class="pl-1">Add option</span>
            </button>
            <span v-else>
              Please select a profile type
            </span>
          </div>
        </li>
      </ul>

      <button class="text-blue-500 hover:text-blue-800 cursor-pointer">
        <font-awesome-icon icon="fa-solid fa-plus" />
        <span class="pl-1" @click="createNewSpinProfile">Create new Spin Profile</span>
      </button>
    </div>
  </VueFinalModal>
</template>
