const tempTracks: ownedInfo = {
  '1': {
    name: '[Legacy] Lime Rock Park - 2008',
    owned: false
  },
  '100': {
    name: 'Barber Motorsports Park',
    owned: true
  }
}

export const useTrackStore = defineStore('tracks', {
  state: () => ({
    trackInfo: tempTracks as ownedInfo
  }),
  getters: {
    getTrackInfo(state): ownedInfo {
      return state.trackInfo;
    }
  },
  actions: {

  },
});