import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useSOSFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "sos_alerts"),
      where("status", "==", "active"),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snap) => {
      setAlerts(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            location: data.location,
            time: data.timestamp?.toDate().toLocaleTimeString() || "just now",
          };
        })
      );
    });
  }, []);

  return alerts;
}