// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDTQxGvQr37RqG2MSMZ8yz_SWV82jPlyU",
  authDomain: "opticare-569e0.firebaseapp.com",
  projectId: "opticare-569e0",
  storageBucket: "opticare-569e0.firebasestorage.app",
  messagingSenderId: "1017060851799",
  appId: "1:1017060851799:web:bfd9e94ef09380f97f2312",
  measurementId: "G-ZF47YZ2EV4"
};


// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP); 


setPersistence(FIREBASE_AUTH, browserLocalPersistence)
  .then(() => {
    console.log('Authentication state persistence is set to local.');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };

