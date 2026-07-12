import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ScrollText, Search } from "lucide-react";

const MOCK_RULES = [
  { keyword: ["homework", "captain"], ruleText: "All captains must complete homework like every other student." },
  { keyword: ["veto", "sports", "pt"], ruleText: "Captains may not override the PT teacher's activity schedule." },
];

export default function RuleCheckerPage() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);

  function checkClaim() {
    const words = claim.toLowerCase().split(/\s+/);
    let best = null;
    let bestScore = 0;
    for (const rule of MOCK_RULES) {
      const score = rule.keyword.filter((k) => words.includes(k)).length;
      if (score > bestScore) {
        bestScore = score;
        best = rule;
      }
    }
    setResult(best);
    setChecked(true);
  }

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(45,212,191,0.06),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition mb-6">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <ScrollText className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Kuddus Fact-Checker</h2>
            <p className="text-sm text-gray-500">Debunk his made-up rules instantly</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)] p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 lg:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                placeholder='e.g. "Captains don&apos;t need homework"'
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
              />
            </div>
            <button onClick={checkClaim} className="bg-emerald-600 text-white px-6 py-2.5 lg:py-3 rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-200">
              Check
            </button>
          </div>

          {checked && result && (
            <div className="mt-6 border border-red-200 bg-red-50 rounded-2xl p-4 sm:p-5 lg:p-6">
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2">FALSE</span>
              <p className="text-sm sm:text-base text-gray-700">{result.ruleText}</p>
            </div>
          )}
          {checked && !result && (
            <p className="mt-4 text-gray-500 text-sm">No matching rule found — try different wording.</p>
          )}
        </div>
      </div>
    </div>
  );
}