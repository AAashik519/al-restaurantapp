import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxCHr-HuCoRTNCZEBaAqJkCNNjmkDub_w",
  authDomain: "al-food.firebaseapp.com",
  databaseURL: "https://al-food-default-rtdb.firebaseio.com",
  projectId: "al-food",
  storageBucket: "al-food.appspot.com",
  messagingSenderId: "786371571521",
  appId: "1:786371571521:web:a8c1a60a5ca38579d2fbc0",
};

const app = getApps.length > 0 ? getApp() : initializeApp( firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage};