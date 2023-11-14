import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkxvsDrhp2Idw8204zWMYNuoaaFKBc7rU",
  authDomain: "i2idemo-74d52.firebaseapp.com",
  databaseURL: "https://i2idemo-74d52-default-rtdb.firebaseio.com",
  projectId: "i2idemo-74d52",
  storageBucket: "i2idemo-74d52.appspot.com",
  messagingSenderId: "648109995556",
  appId: "1:648109995556:web:ecea36256207773a470ab1",
  measurementId: "G-8HZZM7JCKK"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Set persistence to IN_MEMORY (equivalent to NONE)
setPersistence(auth, inMemoryPersistence);


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.setCustomParameters({
  'display': 'popup'
});

export default firebaseApp;
export { firebaseApp, auth, googleProvider, facebookProvider };
