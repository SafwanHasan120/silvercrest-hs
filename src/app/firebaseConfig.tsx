// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUTgGdeEtnH5_ErtlU3oEUfKkS1ueL3c8",
  authDomain: "silvercrest-hs.firebaseapp.com",
  projectId: "silvercrest-hs",
  storageBucket: "silvercrest-hs.firebasestorage.app",
  messagingSenderId: "944172322154",
  appId: "1:944172322154:web:bdc823eb6004af78bda913",
  measurementId: "G-7PS0ERG556"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);