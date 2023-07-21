function getOwnedNameArray(ownedInfo: ownedInfo): string[] {
  const returnArray: string[] = []

  Object.keys(ownedInfo).forEach((id) => {
    if (ownedInfo[id].owned)
      returnArray.push(ownedInfo[id].name)
  })

  return returnArray
}

export const useUserStore = defineStore('user', {
  state: () => ({
    carInfo: {} as ownedInfo,
    trackInfo: {} as ownedInfo,
  }),
  getters: {
    getOwnedCarNameArray(state): string[] {
      return getOwnedNameArray(state.carInfo)
    },
    getOwnedTrackNameArray(state): string[] {
      return getOwnedNameArray(state.trackInfo)
    },
  },
  actions: {
    clear() {
      this.carInfo = {}
      this.trackInfo = {}
    },
  },
})
