// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;

const firebaseConfig = {
  apiKey: "AIzaSyCIQSnluJdFihd4E23CaetW0h_GPcUiB24",
  authDomain: "rhapsody-749ee.firebaseapp.com",
  projectId: "rhapsody-749ee",
  storageBucket: "rhapsody-749ee.appspot.com",
  messagingSenderId: "121567102251",
  appId: "1:121567102251:web:712cdb114db2c6ec3d316e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()

const db = getFirestore(app);

export { auth, db }