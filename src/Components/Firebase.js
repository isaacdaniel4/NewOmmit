/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyDGtk223Ddr-xt3Zllc9h7DSPrM1GJ41AY",
  authDomain: "note-app-eab2d.firebaseapp.com",
  projectId: "note-app-eab2d",
  storageBucket: "note-app-eab2d.appspot.com",
  messagingSenderId: "265332039375",
  appId: "1:265332039375:web:65c8813eca9c593a3821ba",
  measurementId: "G-2J2CM267BC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getAuth(app)