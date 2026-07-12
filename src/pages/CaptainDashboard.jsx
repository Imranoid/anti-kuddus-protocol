import { Siren } from "lucide-react";
import { useWarnings } from "../hooks/useWarnings";
import { useRecentComplaints } from "../hooks/useRecentComplaints";
import { useSOSFeed } from "../hooks/useSOSFeed";

const CATEGORY_COLORS = {
  "Tiffin Theft": "bg-orange-50 text-orange-600",
  "Bribes": "bg-red-50 text-red-600",
  "Syllabus Bloat": "bg-teal-50 text-teal-600",
  "Seating Abuse": "bg-blue-50 text-blue-600",
  "Other": "bg-gray-100 text-gray-600",
};

export default function CaptainDashboard() {
  const { warnings, total } = useWarnings();
  const recentComplaints = useRecentComplaints();
  const sosAlerts = useSOSFeed();

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.06),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-1">Captain Dashboard</h1>
        <p className="text-gray-500 mb-8 lg:mb-10 text-sm sm:text-base">Live overview for Biltu & Miltu.</p>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 p-6 sm:p-8 lg:p-10 mb-6 lg:mb-8 shadow-xl shadow-gray-300/40">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-500/20 rounded-full blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-1">{warnings}<span className="text-gray-500 text-2xl sm:text-3xl">/3</span></p>
              <p className="text-gray-400 text-sm sm:text-base">warnings issued to Kuddus</p>
            </div>
            <div className="w-full sm:w-64">
              <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-red-400 to-red-500 h-full rounded-full transition-all duration-700" style={{ width: `${(warnings / 3) * 100}%` }} />
              </div>
              <p className="text-xs text-gray-400">{total} total complaints filed</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Siren size={16} className="text-red-500" />
          <h2 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Active SOS Alerts</h2>
        </div>
        <div className="space-y-2 lg:space-y-3 mb-8 lg:mb-12">
          {sosAlerts.length === 0 && (
            <p className="text-gray-400 text-sm">No active alerts.</p>
          )}
          {sosAlerts.map((a) => (
            <div key={a.id} className="border border-red-200 bg-red-50 rounded-xl p-4 flex justify-between items-center shadow-sm">
              <span className="font-medium text-sm sm:text-base text-gray-900">{a.location}</span>
              <span className="text-xs lg:text-sm text-gray-500 whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>

        <h2 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg mb-3">Recent Complaints</h2>
        <div className="space-y-2 lg:space-y-3">
          {recentComplaints.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-4 lg:p-5 flex justify-between items-start gap-3">
              <div className="min-w-0">
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-md mb-1 ${CATEGORY_COLORS[c.category] || "bg-gray-100 text-gray-600"}`}>
                  {c.category}
                </span>
                <p className="text-sm lg:text-base text-gray-700 break-words">{c.description}</p>
              </div>
              <span className="text-xs lg:text-sm text-gray-400 whitespace-nowrap flex-shrink-0">{c.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}