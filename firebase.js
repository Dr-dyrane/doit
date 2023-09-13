// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.DOIT_FIREBASE_API_KEY,
  authDomain: process.env.DOIT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.DOIT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.DOIT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.DOIT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.DOIT_FIREBASE_APP_ID,
  measurementId: process.env.DOIT_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; // Export the initialized Firebase app and analytics