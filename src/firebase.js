import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace this with your actual Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBKpv9NFnhMeaIpNDPKqSUQiEMf6Ukyw4A",
  authDomain: "cresendo-app.firebaseapp.com",
  projectId: "cresendo-app",
  storageBucket: "cresendo-app.firebasestorage.app",
  messagingSenderId: "1093036230952",
  appId: "1:1093036230952:web:b82856f8add86c09b7281d",
  measurementId: "G-3E3MPRMPKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics conditionally
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Firebase Analytics could not be initialized:", e);
}

export { db, auth, analytics };

