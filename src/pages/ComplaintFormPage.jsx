import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquareWarning } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { submitComplaint } from "../services/complaints";

const CATEGORIES = ["Tiffin Theft", "Bribes", "Syllabus Bloat", "Seating Abuse", "Other"];

export default function ComplaintFormPage() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await submitComplaint(user.uid, category, description);
    setSubmitted(true);
    setDescription("");
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(239,68,68,0.05),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition mb-6">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
            <MessageSquareWarning className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">File a Complaint</h2>
            <p className="text-sm text-gray-500">Your submission stays anonymous</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)] p-5 sm:p-7 lg:p-8">
          <label className="text-xs font-medium text-gray-500 mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-3.5 sm:px-4 py-2 rounded-full border text-sm transition ${
                  category === c
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl p-3.5 lg:p-4 h-32 lg:h-40 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              placeholder="What happened?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              disabled={loading || !description.trim()}
              className="mt-5 w-full sm:w-auto bg-emerald-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-200 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Anonymously"}
            </button>
          </form>

          {submitted && (
            <div className="mt-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl px-4 py-3 text-sm font-medium">
              Filed anonymously ✅ — this complaint counts toward the strike total.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}