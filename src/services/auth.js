import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { rollToEmail } from "../utils/rollNumber";

export async function signUpWithRollNumber(rollNumber, password) {
  const email = rollToEmail(rollNumber);
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    rollNumber,
    role: "student",
    createdAt: new Date(),
  });
  return cred.user;
}

export async function loginWithRollNumber(rollNumber, password) {
  const email = rollToEmail(rollNumber);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export function listenToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}