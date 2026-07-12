import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpenCheck, Sparkles } from "lucide-react";

const MOCK_RESULT = {
  topics: ["Chapter 3: Photosynthesis", "Chapter 5: Simple Machines", "Chapter 7: The Solar System"],
  summary: [
    "Focus on how plants convert light into energy.",
    "Know the 6 types of simple machines and one real-world example each.",
    "Memorize planet order and one fact about each.",
  ],
  checklist: [
    "Review Chapter 3 diagrams",
    "Practice simple machine examples",
    "Make solar system flashcards",
  ],
};

export default function SyllabusSummarizerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSummarize() {
    setLoading(true);
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.06),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition mb-6">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
            <BookOpenCheck className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">AI Syllabus Summarizer</h2>
            <p className="text-sm text-gray-500">Cut through the noise, keep what matters</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)] p-5 sm:p-7 lg:p-8">
          <textarea
            className="w-full border border-gray-200 rounded-xl p-3.5 lg:p-4 h-36 sm:h-40 lg:h-44 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            placeholder="Paste Kuddus's terrifying syllabus here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSummarize}
            disabled={loading || !input}
            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-50 active:scale-[0.98] transition-all shadow-sm shadow-emerald-200"
          >
            <Sparkles size={16} />
            {loading ? "Summarizing..." : "Summarize with AI"}
          </button>
        </div>

        {result && (
          <div className="mt-6 lg:mt-8 grid gap-4 lg:gap-5">
            {[
              { title: "Important Topics", items: result.topics, color: "border-emerald-100 bg-emerald-50" },
              { title: "Summary", items: result.summary, color: "border-teal-100 bg-teal-50" },
            ].map((block) => (
              <div key={block.title} className={`border rounded-2xl p-4 sm:p-5 lg:p-7 ${block.color}`}>
                <h3 className="font-semibold mb-2 text-sm sm:text-base lg:text-lg text-gray-900">{block.title}</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700">
                  {block.items.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            ))}
            <div className="border border-green-100 bg-green-50 rounded-2xl p-4 sm:p-5 lg:p-7">
              <h3 className="font-semibold mb-2 text-sm sm:text-base lg:text-lg text-gray-900">Study Checklist</h3>
              {result.checklist.map((c, i) => (
                <label key={i} className="flex items-center gap-2 mb-1.5 text-sm sm:text-base text-gray-700">
                  <input type="checkbox" className="accent-emerald-600" /> {c}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}