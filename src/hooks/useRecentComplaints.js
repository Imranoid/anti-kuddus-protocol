import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useRecentComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"), limit(10));
    return onSnapshot(q, (snap) => {
      setComplaints(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            category: data.category,
            description: data.description,
            createdAt: data.createdAt?.toDate().toLocaleString() || "just now",
          };
        })
      );
    });
  }, []);

  return complaints;
}