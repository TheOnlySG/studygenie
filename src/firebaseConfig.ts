// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDKiTqA2RdKDmou6kNNE-U-nik56bqavyg",
  authDomain: "studygenie-b63ae.firebaseapp.com",
  projectId: "studygenie-b63ae",
  storageBucket: "studygenie-b63ae.appspot.com",  // 👈 check this, should end with .appspot.com
  messagingSenderId: "715395988321",
  appId: "1:715395988321:web:b0b1c2d48d00c4526ca320",
  measurementId: "G-XD65514RQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export for use in other files
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
