// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "flavor-finds.firebaseapp.com",
  projectId: "flavor-finds",
  storageBucket: "flavor-finds.appspot.com",
  messagingSenderId: "1067867935127",
  appId: "1:1067867935127:web:3ccb8edfc35af5bd6134d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
