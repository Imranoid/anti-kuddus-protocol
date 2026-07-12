import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function submitComplaint(uid, category, description) {
  await addDoc(collection(db, "complaints"), {
    submittedBy: uid,
    category,
    description,
    createdAt: serverTimestamp(),
  });

  const metaRef = doc(db, "meta", "kuddusStatus");
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(metaRef);
    const current = snap.exists() ? snap.data().totalComplaints : 0;
    const total = current + 1;
    const warnings = Math.min(3, Math.floor(total / 3));
    tx.set(metaRef, { totalComplaints: total, warnings }, { merge: true });
  });
}