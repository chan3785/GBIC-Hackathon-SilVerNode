// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUfoVFJmjjOlrTIcb6b-Rel3Nhe62E9LI",
  authDomain: "daocollege-a4a3f.firebaseapp.com",
  projectId: "daocollege-a4a3f",
  storageBucket: "daocollege-a4a3f.appspot.com",
  messagingSenderId: "1074023104829",
  appId: "1:1074023104829:web:413d835de46eff298a4554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);