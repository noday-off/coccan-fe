// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFJmvjGOY24vbbOoJCgYEsXzkGd7rLtTE",
  authDomain: "coccan-gg-auth.firebaseapp.com",
  projectId: "coccan-gg-auth",
  storageBucket: "coccan-gg-auth.appspot.com",
  messagingSenderId: "580818144635",
  appId: "1:580818144635:web:891acc8a5e3edaf88881de",
  measurementId: "G-P7SQED90D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const avatarRef = ref(storage, 'avatars/');
const provider = new GoogleAuthProvider();
export {auth,provider,storage,avatarRef};
//const analytics = getAnalytics(app);