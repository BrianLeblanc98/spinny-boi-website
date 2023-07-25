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
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    databaseURL: config.public.firebaseDatabaseURL,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
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
