// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigTest = {
  apiKey: "AIzaSyAFJmvjGOY24vbbOoJCgYEsXzkGd7rLtTE",
  authDomain: "coccan-gg-auth.firebaseapp.com",
  projectId: "coccan-gg-auth",
  storageBucket: "coccan-gg-auth.appspot.com",
  messagingSenderId: "580818144635",
  appId: "1:580818144635:web:891acc8a5e3edaf88881de",
  measurementId: "G-P7SQED90D7"
};

const firebaseConfig = {
  apiKey: "AIzaSyCZy9DWEsqb4Ll98UbCz3nnCUHGjcKLJso",
  authDomain: "coccan.firebaseapp.com",
  projectId: "coccan",
  storageBucket: "coccan.appspot.com",
  messagingSenderId: "975101521802",
  appId: "1:975101521802:web:bb1393a3040140d7262273",
  measurementId: "G-1D2B7WE7FC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const logoRef = ref(storage, 'logo');
const provider = new GoogleAuthProvider();
export {auth,provider,storage,logoRef};
//const analytics = getAnalytics(app);