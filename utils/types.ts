interface packageData {
  name: string
  owned: boolean
  free?: boolean
}

interface ownedPackages {
  [packageId: string]: packageData
}

interface iRacingData {
  carData: {
    [packageId: string]: {
      free?: boolean
      cars: {
        [carId: string]: {
          name: string
        }
      }
    }
  }
  trackData: {
    [packageId: string]: {
      name: string
      free?: boolean
      configs: {
        [configId: string]: {
          name: string
          type: string
        }
      }
    }
  }
}

interface spinOption {
  name: string
  weight?: number // TODO: Add ui to change the weight
}

interface spinProfile {
  name: string
  type: string // TODO: Will be used to filter between cars/tracks/time/weather profiles
  options: spinOption[]
}

// For whatever reason eslint thinks this isn't used. It might not notice the usage in .vue files
// eslint-disable-next-line unused-imports/no-unused-vars
interface setOwnedContentModalReturn {
  type: SET_OWNED_CONTENT_MODAL_TYPE
  ownedPackages: ownedPackages
}

type SET_OWNED_CONTENT_MODAL_TYPE = '' | 'tracks' | 'cars'
