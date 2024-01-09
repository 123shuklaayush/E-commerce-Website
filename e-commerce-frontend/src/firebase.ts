// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjNN8cSDsCx1johwOXBEum3Js8sECmLnc",
  authDomain: "e-commerce-website-2024.firebaseapp.com",
  projectId: "e-commerce-website-2024",
  storageBucket: "e-commerce-website-2024.appspot.com",
  messagingSenderId: "585217949761",
  appId: "1:585217949761:web:e06c07eeb44bc0ca8786c0",
  measurementId: "G-JKXGSQX6VQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);