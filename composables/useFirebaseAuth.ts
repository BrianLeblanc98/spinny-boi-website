import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';

export default function() {
  const { $auth, $provider } = useNuxtApp();
  const { updateUserStoreWithDatabase, saveUserStoreToDatabase } = useFirebaseDatabase();

  const user = useState<User | null>('user', () => null);

  const firebaseSignIn = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      signInWithPopup($auth, $provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const resultUser = result.user;
        user.value = resultUser;
        // IdP data available using getAdditionalUserInfo(result)
        resolve();
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        reject();
      });
    });
  }

  const firebaseSignOut = async () => {
    return new Promise<void>((resolve, reject) => {
      // When the user signs out, save the data in the store to the database
      // This shouldn't be needed as it gets save when the modal closes, but keeping it for now
      saveUserStoreToDatabase(true, true);

      signOut($auth).then(() => {
        resolve();
      }).catch((error) => {
        reject();
      });
    });
  }

  onAuthStateChanged($auth, (resultUser) => {
    if (resultUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = resultUser.uid;
      user.value = resultUser;

      // When the user signs in, pull their data into the store
      updateUserStoreWithDatabase();
    } else {
      // User is signed out
      user.value = null;
    }
  });

  return {
    user,
    firebaseSignIn,
    firebaseSignOut
  }
}
