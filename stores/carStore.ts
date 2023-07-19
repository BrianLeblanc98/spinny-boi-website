const tempCars: ownedInfo = {
  '1': {
    name: 'Skip Barber Formula 2000',
    owned: false
  },
  '94': {
    name: '[Legacy] Ferrari 488 GT3',
    owned: false
  }
}

export const useCarStore = defineStore('cars', {
  state: () => ({
    carInfo: tempCars as ownedInfo
  }),
  getters: {
    getOwnedCarNameArray(state): string[] {
      let returnArray: string[] = [];

      Object.keys(state.carInfo).forEach((carId) => {
        if (state.carInfo[carId].owned) {
          returnArray.push(state.carInfo[carId].name);
        }
      });

      return returnArray;
    }
  },
  actions: {

  },
});