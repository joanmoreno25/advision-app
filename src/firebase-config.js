import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "tfg-catalogador.firebaseapp.com",
  projectId: "tfg-catalogador",
  storageBucket: "tfg-catalogador.firebasestorage.app",
  messagingSenderId: "788684301194",
  appId: "1:788684301194:web:fd8dfb2d871e706ed9de73",
  measurementId: "G-5RR7MZ5E17"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);