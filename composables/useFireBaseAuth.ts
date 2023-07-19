import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';

export default function() {
  const { $auth, $provider } = useNuxtApp();

  const user = useState<User | null>('user', () => null);

  const fireBaseSignIn = () => {
    signInWithPopup($auth, $provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const resultUser = result.user;
        user.value = resultUser;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const fireBaseSignOut = () => {
    signOut($auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  onAuthStateChanged($auth, (resultUser) => {
    if (resultUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = resultUser.uid;
      user.value = resultUser;
      // ...
    } else {
      // User is signed out
      user.value = null;
    }
  });

  return {
    user,
    fireBaseSignIn,
    fireBaseSignOut
  }
}