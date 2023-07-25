import { useIRacingDataStore } from './iRacingDataStore'

export const useUserStore = defineStore('user', {
  state: () => ({
    ownedCars: {} as ownedPackages,
    ownedTracks: {} as ownedPackages,
    spinProfiles: {} as spinProfiles,
    selectedSpinProfile: EMPTY_UUID,
  }),
  getters: {
    initialSpinProfiles(): spinProfiles {
      const returnObject: spinProfiles = {}
      returnObject[crypto.randomUUID()] = {
        name: 'New Tracks Spin Profile',
        type: 'tracks',
        typeLocked: true,
        options: {},
      }

      return returnObject
    },
    ownedCarsAndVariants(state): string[] {
      const { getCarWithVariantsById } = useIRacingDataStore()
      const ownedCarIds: string[] = []

      Object.entries(state.ownedCars).forEach(([packageId, car]) => {
        if (car.owned)
          ownedCarIds.push(packageId)
      })

      const returnArray: string[] = []
      ownedCarIds.forEach((id) => {
        const car: carWithVariants = getCarWithVariantsById(id)
        Object.values(car.cars).forEach((carVariant) => {
          returnArray.push(carVariant.name)
        })
      })

      return returnArray.sort()
    },
    ownedTracksAndConfigsArray(state): string[] {
      const { getTrackWithConfigsById } = useIRacingDataStore()
      const ownedTrackIds: string[] = []

      Object.entries(state.ownedTracks).forEach(([packageId, track]) => {
        if (track.owned)
          ownedTrackIds.push(packageId)
      })

      const returnArray: string[] = []
      ownedTrackIds.forEach((id) => {
        const track: trackWithConfigs = getTrackWithConfigsById(id)
        if (Object.keys(track.configs).length > 1) {
          Object.values(track.configs).forEach((config) => {
            returnArray.push(`${track.name} - ${config.name}`)
          })
        }
        else {
          returnArray.push(track.name)
        }
      })

      return returnArray.sort()
    },
  },
  actions: {
    addNewOption(id: uuid) {
      if (!this.spinProfiles[id].options)
        this.spinProfiles[id].options = {}

      this.spinProfiles[id].options[crypto.randomUUID()] = {
        name: '',
      }
    },
    createNewSpinProfile() {
      if (!this.spinProfiles)
        this.spinProfiles = {}

      this.spinProfiles[crypto.randomUUID()] = {
        name: 'New Spin Profile',
        type: '',
        typeLocked: false,
        options: {},
      }
    },
    deleteOption(profileId: uuid, optionId: uuid) {
      delete this.spinProfiles[profileId].options[optionId]
    },
    deleteSpinProfile(id: uuid) {
      if (this.selectedSpinProfile === id)
        this.selectedSpinProfile = EMPTY_UUID

      delete this.spinProfiles[id]
    },
  },
})
