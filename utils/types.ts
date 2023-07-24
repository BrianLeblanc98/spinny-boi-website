interface ownedPackages {
  [package_id: string]: {
    name: string
    owned: boolean
    free?: boolean
  }
}

interface iRacingData {
  carData: {
    [package_id: string]: {
      free?: boolean
      cars: {
        [car_id: string]: {
          name: string
        }
      }
    }
  }
  trackData: {
    [package_id: string]: {
      name: string
      free?: boolean
      configs: {
        [config_id: string]: {
          name: string
          type: string
        }
      }
    }
  }
}

// For whatever reason eslint thinks this isn't used. It might not notice the usage in .vue files
// eslint-disable-next-line unused-imports/no-unused-vars
interface setOwnedContentModalReturn {
  type: SET_OWNED_CONTENT_MODAL_TYPE
  ownedPackages: ownedPackages
}

type SET_OWNED_CONTENT_MODAL_TYPE = '' | 'tracks' | 'cars'
