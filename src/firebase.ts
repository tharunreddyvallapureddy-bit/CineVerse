import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS1K-C5J1L2wJRw2aLIIQSGrNhXnelvMo",
  authDomain: "cineverse-f20a7.firebaseapp.com",
  projectId: "cineverse-f20a7",
  storageBucket: "cineverse-f20a7.firebasestorage.app",
  messagingSenderId: "241943501972",
  appId: "1:241943501972:web:00b16fbf03b3a3100b2881",
  measurementId: "G-176894QQKG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
