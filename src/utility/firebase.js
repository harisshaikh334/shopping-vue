// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApO382Van1YrCnWfnDseUfN4EjzVACKho",
  authDomain: "shopping-vue-241c5.firebaseapp.com",
  projectId: "shopping-vue-241c5",
  storageBucket: "shopping-vue-241c5.firebasestorage.app",
  messagingSenderId: "1007527467408",
  appId: "1:1007527467408:web:186ccdb21d63b2999dfb15",
  measurementId: "G-55R9EN8VHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export { app as firebaseApp, db, auth }