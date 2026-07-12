import { Link } from "react-router-dom";
import { ShieldAlert, MessageSquareWarning, Siren, BookOpenCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-16">
      <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-emerald-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-teal-200 rounded-full blur-3xl opacity-40" />

      <div className="relative w-full max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6">
          <ShieldAlert size={16} /> Class 7, Section B — Resistance HQ
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
          The Anti-Kuddus <span className="text-emerald-600">Protocol</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto mb-10 px-2">
          A secure, anonymous system to organize students, track Kuddus's tyranny,
          and deliver the 3 strikes to Rashid Sir.
        </p>

        <Link
          to="/login"
          className="inline-block bg-emerald-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold text-base sm:text-lg lg:text-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-transform"
        >
          Enter the Resistance →
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-14 sm:mt-20 w-full">
          {[
            { icon: MessageSquareWarning, label: "File Complaints", desc: "Anonymous, 3-strike tracking" },
            { icon: BookOpenCheck, label: "AI Study Help", desc: "Gemini-powered syllabus cleanup" },
            { icon: Siren, label: "Instant SOS", desc: "Live alerts to your Captains" },
          ].map((f) => (
            <Link
              key={f.label}
              to="/login"
              className="bg-white/70 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-7 text-left hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all block"
            >
              <f.icon className="text-emerald-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900 text-base lg:text-lg">{f.label}</p>
              <p className="text-sm lg:text-base text-gray-500">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}