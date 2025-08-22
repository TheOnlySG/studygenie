import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up
export async function signup(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Login
export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Logout
export async function logout() {
  return await signOut(auth);
}
