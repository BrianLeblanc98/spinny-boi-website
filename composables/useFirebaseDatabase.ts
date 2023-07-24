import { onValue, ref, set, update } from 'firebase/database'
import { useIRacingDataStore } from '@/stores/iRacingDataStore'
import { useUserStore } from '@/stores/userStore'

function createInitalOwnedCarData(iRacingData: iRacingData): ownedPackages {
  // Called when a new user signs in
  // Create inital ownedPackages for cars to save to the user by using the iRacingDataStore
  const initialOwnedCarData = {} as ownedPackages

  Object.keys(iRacingData.carData).forEach((packageId) => {
    const carIds = Object.keys(iRacingData.carData[packageId].cars)
    // const temp = iRacingData.carData[packageId].cars[carIds[0]].name

    initialOwnedCarData[packageId] = {
      name: iRacingData.carData[packageId].cars[carIds[0]].name,
      owned: false,
    }

    if (iRacingData.carData[packageId].free) {
      initialOwnedCarData[packageId].owned = true
      initialOwnedCarData[packageId].free = true
    }
  })

  return initialOwnedCarData
}

function createInitalOwnedTrackData(iRacingData: iRacingData): ownedPackages {
  // Called when a new user signs in
  // Create inital ownedPackages for tracks to save to the user by using the iRacingDataStore
  const initialOwnedTrackData = {} as ownedPackages

  Object.keys(iRacingData.trackData).forEach((packageId) => {
    initialOwnedTrackData[packageId] = {
      name: iRacingData.trackData[packageId].name,
      owned: false,
    }

    if (iRacingData.trackData[packageId].free) {
      initialOwnedTrackData[packageId].owned = true
      initialOwnedTrackData[packageId].free = true
    }
  })

  return initialOwnedTrackData
}

export default function () {
  const { $auth, $database } = useNuxtApp()
  const iRacingDataStore = useIRacingDataStore()
  const userStore = useUserStore()

  function updateIRacingDataStoreWithDatabase() {
    // This gets run when the app is mounted
    onValue(ref($database, '/iRacingData'), (snapshot) => {
      iRacingDataStore.data = snapshot.val()
    },
    {
      onlyOnce: true,
    })
  }

  function updateUserStoreWithDatabase() {
    // Updates the userStore with data from the firebase database
    if (!$auth.currentUser) {
      console.error('updateUserStoreWithDatabase() called with no user signed in')
      return
    }

    const userId = $auth.currentUser.uid

    onValue(ref($database, `/users/${userId}`), (snapshot) => {
      if (snapshot.val()) {
        // User is in database, pull their data into the store
        userStore.ownedCars = snapshot.val().ownedCars
        userStore.ownedTracks = snapshot.val().ownedTracks
      }
      else {
        // User is not yet in database (first sign on), create an entry for them
        const initialOwnedCarData = createInitalOwnedCarData(iRacingDataStore.data)
        const initialOwnedTrackData = createInitalOwnedTrackData(iRacingDataStore.data)

        set(ref($database, `/users/${userId}`), {
          ownedCars: initialOwnedCarData,
          ownedTracks: initialOwnedTrackData,
        }).then(() => {
          // Once the database entry is created, we can safely update the store with the default values
          userStore.ownedCars = initialOwnedCarData
          userStore.ownedTracks = initialOwnedTrackData
        })
      }
    },
    {
      onlyOnce: true,
    })
  }

  function saveUserStoreToDatabase(saveTracks: boolean, saveCars: boolean) {
    // When the user is done changing their owned tracks, save that data to the database
    if (!$auth.currentUser) {
      console.error('saveUserStoreToDatabase() called with no user signed in')
      return
    }

    if (!saveTracks && !saveCars) {
      // If both are false for some reason, don't do anything
      return
    }

    const userId = $auth.currentUser.uid
    const updates: any = {}

    if (saveCars)
      updates[`/users/${userId}/ownedCars`] = userStore.ownedCars

    if (saveTracks)
      updates[`/users/${userId}/ownedTracks`] = userStore.ownedTracks

    update(ref($database), updates)
  }

  return {
    updateIRacingDataStoreWithDatabase,
    updateUserStoreWithDatabase,
    saveUserStoreToDatabase,
  }
}
