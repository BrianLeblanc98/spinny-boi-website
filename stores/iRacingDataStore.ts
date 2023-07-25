export const useIRacingDataStore = defineStore('iRacingData', {
  state: () => ({
    data: {} as iRacingData,
  }),
  getters: {
    getCarWithVariantsById: (state) => {
      return (packageId: string) => {
        return state.data.carData[packageId]
      }
    },
    getTrackWithConfigsById: (state) => {
      return (packageId: string) => {
        return state.data.trackData[packageId]
      }
    },
    initialOwnedCarData: (state) => {
      // Called when a new user signs in
      // Create initial ownedPackages for cars to save to the user
      const initialOwnedCarData = {} as ownedPackages

      Object.keys(state.data.carData).forEach((packageId) => {
        const carIds = Object.keys(state.data.carData[packageId].cars)

        initialOwnedCarData[packageId] = {
          name: state.data.carData[packageId].cars[carIds[0]].name,
          owned: false,
        }

        if (state.data.carData[packageId].free) {
          initialOwnedCarData[packageId].owned = true
          initialOwnedCarData[packageId].free = true
        }
      })

      return initialOwnedCarData
    },
    initialOwnedTrackData: (state) => {
      // Called when a new user signs in
      // Create initial ownedPackages for tracks to save to the user
      const initialOwnedTrackData = {} as ownedPackages

      Object.keys(state.data.trackData).forEach((packageId) => {
        initialOwnedTrackData[packageId] = {
          name: state.data.trackData[packageId].name,
          owned: false,
        }

        if (state.data.trackData[packageId].free) {
          initialOwnedTrackData[packageId].owned = true
          initialOwnedTrackData[packageId].free = true
        }
      })

      return initialOwnedTrackData
    },
  },
})
