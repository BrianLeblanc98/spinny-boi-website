import { onValue, ref, set, update } from 'firebase/database'
import { useIRacingDataStore } from '@/stores/iRacingDataStore'
import { useUserStore } from '@/stores/userStore'

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
        userStore.spinProfiles = snapshot.val().spinProfiles
        userStore.selectedSpinProfile = snapshot.val().selectedSpinProfile
      }
      else {
        // User is not yet in database (first sign on), create an entry for them
        const initialOwnedCarData = iRacingDataStore.initialOwnedCarData
        const initialOwnedTrackData = iRacingDataStore.initialOwnedTrackData
        const initialSpinProfiles = userStore.initialSpinProfiles
        const initialSelectedSpinProfile = EMPTY_UUID

        set(ref($database, `/users/${userId}`), {
          ownedCars: initialOwnedCarData,
          ownedTracks: initialOwnedTrackData,
          spinProfiles: initialSpinProfiles,
          selectedSpinProfile: initialSelectedSpinProfile,
        }).then(() => {
          // Once the database entry is created, we can safely update the user store with the initial values
          userStore.ownedCars = initialOwnedCarData
          userStore.ownedTracks = initialOwnedTrackData
          userStore.spinProfiles = initialSpinProfiles
          userStore.selectedSpinProfile = initialSelectedSpinProfile
        })
      }
    },
    {
      onlyOnce: true,
    })
  }

  function saveUserStoreToDatabase(saveTracks: boolean, saveCars: boolean, saveSpinProfiles: boolean, saveSelectedSpinProfile: boolean) {
    // When the user is done changing their owned tracks, save that data to the database
    if (!$auth.currentUser) {
      console.error('saveUserStoreToDatabase() called with no user signed in')
      return
    }

    if (!saveTracks && !saveCars && !saveSpinProfiles && !saveSelectedSpinProfile) {
      // If none are false for some reason, don't do anything
      return
    }

    const userId = $auth.currentUser.uid
    const updates: any = {}

    if (saveCars)
      updates[`/users/${userId}/ownedCars`] = userStore.ownedCars

    if (saveTracks)
      updates[`/users/${userId}/ownedTracks`] = userStore.ownedTracks

    if (saveSpinProfiles)
      updates[`/users/${userId}/spinProfiles`] = userStore.spinProfiles

    if (saveSelectedSpinProfile)
      updates[`/users/${userId}/selectedSpinProfile`] = userStore.selectedSpinProfile

    update(ref($database), updates)
  }

  return {
    updateIRacingDataStoreWithDatabase,
    updateUserStoreWithDatabase,
    saveUserStoreToDatabase,
  }
}
