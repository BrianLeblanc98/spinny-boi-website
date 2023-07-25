// ESLint doesn't seem to work well with nuxt auto-imports
/* eslint unused-imports/no-unused-vars: 0 */
type setOwnedContentModalType = '' | 'tracks' | 'cars'
type spinProfileType = '' | 'tracks' | 'cars'
type uuid = `${string}-${string}-${string}-${string}-${string}`

interface packageData {
  name: string
  owned: boolean
  free?: boolean
}

interface ownedPackages {
  [packageId: string]: packageData
}

interface carWithVariants {
  free?: boolean
  cars: {
    [carId: string]: {
      name: string
    }
  }
}

interface carsWithVariants {
  [packageId: string]: carWithVariants
}

interface trackWithConfigs {
  name: string
  free?: boolean
  configs: {
    [configId: string]: {
      name: string
      type: string
    }
  }
}

interface tracksWithConfigs {
  [packageId: string]: trackWithConfigs
}
interface iRacingData {
  carData: carsWithVariants
  trackData: tracksWithConfigs
}

interface spinOption {
  name: string
  weight?: number // TODO: Add ui to change the weight
}

interface spinProfile {
  name: string
  type: spinProfileType // TODO: Will be used to filter between cars/tracks/time/weather profiles
  typeLocked: boolean
  options: {
    [id: uuid]: spinOption
  }
}

interface spinProfiles {
  [id: uuid]: spinProfile
}

interface setOwnedContentModalReturn {
  type: setOwnedContentModalType
  ownedPackages: ownedPackages
}
