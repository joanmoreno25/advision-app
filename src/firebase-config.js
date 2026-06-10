import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDseqUMidcZokkkjZP4VI8nq0FPKY6nf9g",
  authDomain: "tfg-catalogador.firebaseapp.com",
  projectId: "tfg-catalogador",
  storageBucket: "tfg-catalogador.firebasestorage.app",
  messagingSenderId: "788684301194",
  appId: "1:788684301194:web:fd8dfb2d871e706ed9de73",
  measurementId: "G-5RR7MZ5E17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();   




console.log("Firebase Config:", firebaseConfig);