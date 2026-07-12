import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useWarnings() {
  const [warnings, setWarnings] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    return onSnapshot(doc(db, "meta", "kuddusStatus"), (snap) => {
      if (snap.exists()) {
        setWarnings(snap.data().warnings || 0);
        setTotal(snap.data().totalComplaints || 0);
      }
    });
  }, []);

  return { warnings, total };
}