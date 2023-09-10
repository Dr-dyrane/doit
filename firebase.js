// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLP8h4WgEq4dCeS5kcHoVPqEfwpP4DLuk",
  authDomain: "doit-by-dyrane.firebaseapp.com",
  projectId: "doit-by-dyrane",
  storageBucket: "doit-by-dyrane.appspot.com",
  messagingSenderId: "117473795319",
  appId: "1:117473795319:web:8b174db0c0fdefe29cc7f2",
  measurementId: "G-085M6S3L4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; // Export the initialized Firebase app and analytics