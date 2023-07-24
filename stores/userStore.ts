function getOwnedNameArray(ownedInfo: ownedPackages): string[] {
  const returnArray: string[] = []

  Object.keys(ownedInfo).forEach((id) => {
    if (ownedInfo[id].owned)
      returnArray.push(ownedInfo[id].name)
  })

  return returnArray
}

export const useUserStore = defineStore('user', {
  state: () => ({
    ownedCars: {} as ownedPackages,
    ownedTracks: {} as ownedPackages,
  }),
  getters: {
    getOwnedCarNameArray(state): string[] {
      return getOwnedNameArray(state.ownedCars)
    },
    getOwnedTrackNameArray(state): string[] {
      return getOwnedNameArray(state.ownedTracks)
    },
  },
  actions: {
    clear() {
      this.ownedCars = {}
      this.ownedTracks = {}
    },
  },
})
