const tempTracks: ownedInfo = {
  '1': {
    name: '[Legacy] Lime Rock Park - 2008',
    owned: false
  },
  '100': {
    name: 'Barber Motorsports Park',
    owned: false
  },
  '173': {
    name: 'Suzuka International Racing Course',
    owned: false
  },
  '195': {
    name: 'Twin Ring Motegi',
    owned: false
  },
  '199': {
    name: 'Circuit Zolder',
    owned: false
  }
}

export const useTrackStore = defineStore('tracks', {
  state: () => ({
    trackInfo: tempTracks as ownedInfo
  }),
  getters: {
    getOwnedTrackNameArray(state): string[] {
      let returnArray: string[] = [];

      Object.keys(state.trackInfo).forEach((trackId) => {
        if (state.trackInfo[trackId].owned) {
          returnArray.push(state.trackInfo[trackId].name);
        }
      });

      return returnArray;
    }
  },
  actions: {

  },
});