// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: config.public.fireBaseApiKey,
    authDomain: config.public.fireBaseAuthDomain,
    databaseURL: config.public.fireBaseDatabaseURL,
    projectId: config.public.fireBaseProjectId,
    storageBucket: config.public.fireBaseStorageBucket,
    messagingSenderId: config.public.fireBaseMessagingSenderId,
    appId: config.public.fireBaseappId,
    measurementId: config.public.fireBaseMeasurementId,
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const database = getDatabase(app)

  return {
    provide: {
      auth,
      provider,
      database,
    },
  }
})
