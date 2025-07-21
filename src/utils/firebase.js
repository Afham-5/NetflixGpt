// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3EBfzvViS0wAzf3u7FVGMzeoxMLXh9AM",
  authDomain: "netflixgpt-ae15e.firebaseapp.com",
  projectId: "netflixgpt-ae15e",
  storageBucket: "netflixgpt-ae15e.firebasestorage.app",
  messagingSenderId: "489614513379",
  appId: "1:489614513379:web:5fe933296b3bc1206b21d6",
  measurementId: "G-GL7S1N4ZMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
