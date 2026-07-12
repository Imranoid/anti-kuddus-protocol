import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const LOCATIONS = ["Classroom", "Library", "Playground", "Corridor", "Canteen"];

export default function SOSPage() {
  const [showLocations, setShowLocations] = useState(false);
  const [sent, setSent] = useState(false);
  const { user } = useAuth();

  async function sendSOS(location) {
    await addDoc(collection(db, "sos_alerts"), {
      raisedBy: user.uid,
      location,
      status: "active",
      timestamp: serverTimestamp(),
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen w-full bg-[#f7fdfa] relative flex flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 text-4xl">🚨</div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Help is on the way</p>
          <p className="text-gray-500 mb-6">Your Captains have been notified instantly.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700">
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.06),transparent_45%)]" />

      <Link to="/dashboard" className="absolute top-8 left-4 sm:left-8 lg:left-16 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition">
        <ArrowLeft size={15} /> Back to Dashboard
      </Link>

      <div className="relative flex flex-col items-center">
        {!showLocations ? (
          <>
            <button
              onClick={() => setShowLocations(true)}
              className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white text-xl sm:text-2xl lg:text-3xl font-bold shadow-2xl shadow-red-300/50 hover:shadow-red-400/60 active:scale-95 transition-all"
            >
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
              <span className="relative">SOS</span>
            </button>
            <p className="text-gray-500 text-sm mt-6 text-center max-w-xs">
              Press if Kuddus corners you. Your Captains get notified immediately.
            </p>
          </>
        ) : (
          <div className="w-full max-w-sm lg:max-w-md">
            <p className="text-center text-gray-700 mb-5 font-medium lg:text-lg">Where are you?</p>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => sendSOS(loc)}
                  className="px-4 lg:px-6 py-3.5 lg:py-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition text-sm sm:text-base font-medium"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}