import { onValue, ref, set, update } from 'firebase/database'
import { tempMockCars, tempMockTracks } from '@/utils/tempMockData'
import { useUserStore } from '@/stores/userStore'

export default function () {
  const { $auth, $database } = useNuxtApp()
  const userStore = useUserStore()

  function updateUserStoreWithDatabase() {
    // Updates the userStore with data from the firebase database
    if (!$auth.currentUser) {
      console.error('updateUserStoreWithDatabase() called with no user signed in')
      return
    }

    const userId = $auth.currentUser.uid

    // If the user does not exist (first sign on), create an entry for them
    onValue(ref($database, `/users/${userId}`), (snapshot) => {
      if (snapshot.val()) {
        // User is in database, pull their data into the store
        userStore.ownedCars = snapshot.val().ownedCars
        userStore.ownedTracks = snapshot.val().ownedTracks
      }
      else {
        // User is not yet in database, so we'll create an entry for them
        set(ref($database, `/users/${userId}`), {
          ownedCars: tempMockCars,
          ownedTracks: tempMockTracks,
        }).then(() => {
          // Once the database entry is created, we can safely update the store with the default values
          userStore.ownedCars = tempMockCars
          userStore.ownedTracks = tempMockTracks
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
    updateUserStoreWithDatabase,
    saveUserStoreToDatabase,
  }
}
