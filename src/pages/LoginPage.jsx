import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldAlert, MessageSquareWarning, Siren, BookOpenCheck } from "lucide-react";
import { loginWithRollNumber } from "../services/auth";

export default function LoginPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithRollNumber(rollNumber, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid roll number or password.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.10),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(45,212,191,0.08),transparent_40%)]" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-gray-900 mb-8">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
              <ShieldAlert size={16} />
            </div>
            Anti-Kuddus Protocol
          </Link>
          <h2 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
            Join the <span className="text-emerald-600">Resistance</span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Every complaint is anonymous. Every alert is instant. Three strikes and Kuddus is out.
          </p>
          <div className="space-y-4">
            {[
              { icon: MessageSquareWarning, text: "File complaints without revealing your identity" },
              { icon: BookOpenCheck, text: "Get AI-powered help with impossible syllabi" },
              { icon: Siren, text: "Send instant SOS alerts to your Captains" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  <f.icon size={16} className="text-emerald-600" />
                </div>
                <p className="text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Link to="/" className="flex lg:hidden items-center justify-center gap-2 font-bold text-gray-900 mb-8">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
              <ShieldAlert size={16} />
            </div>
            Anti-Kuddus Protocol
          </Link>

          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_20px_40px_-12px_rgba(0,0,0,0.1)]">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 text-center">
              Enter the Resistance
            </h1>
            <p className="text-sm text-gray-400 text-center mb-6">Sign in with your roll number</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Roll Number</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 lg:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                  placeholder="7B-14"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 lg:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                disabled={loading}
                className="w-full bg-emerald-600 text-white rounded-xl py-3 font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-200 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-5">
              First time?{" "}
              <Link to="/signup" className="text-emerald-600 font-medium hover:text-emerald-700">
                Create an account
              </Link>
            </p>
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            Your identity stays anonymous once you're in.
          </p>
        </div>
      </div>
    </div>
  );
}