import { Link } from "react-router-dom";
import { MessageSquareWarning, BookOpenCheck, Siren, ScrollText, Flame, Users, Layers } from "lucide-react";
import { mockStats } from "../utils/mockData";
import { useWarnings } from "../hooks/useWarnings";
import { useRecentComplaints } from "../hooks/useRecentComplaints";

const CATEGORY_COLORS = {
  "Tiffin Theft": "bg-orange-50 text-orange-600",
  "Bribes": "bg-red-50 text-red-600",
  "Syllabus Bloat": "bg-teal-50 text-teal-600",
  "Seating Abuse": "bg-blue-50 text-blue-600",
  "Other": "bg-gray-100 text-gray-600",
};

export default function StudentDashboard() {
  const { warnings, total } = useWarnings();
  const recentComplaints = useRecentComplaints();

  return (
    <div className="min-h-screen w-full bg-[#f7fdfa] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.06),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-8 lg:mb-10 text-sm sm:text-base">Welcome back, resistance member.</p>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 p-6 sm:p-8 lg:p-10 mb-6 lg:mb-8 shadow-xl shadow-gray-300/40">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame size={16} className="text-red-400" />
                <span className="text-xs font-medium text-red-300 uppercase tracking-wider">Impeachment Watch</span>
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-1">{warnings}<span className="text-gray-500 text-2xl sm:text-3xl">/3</span></p>
              <p className="text-gray-400 text-sm sm:text-base">warnings issued to Kuddus</p>
            </div>
            <div className="w-full sm:w-64">
              <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-red-400 to-red-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(warnings / 3) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{total} total complaints filed · {3 - warnings} strikes left</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
          {[
            { icon: Layers, label: "Categories Reported", value: mockStats.categoriesReported },
            { icon: Users, label: "Students Involved", value: mockStats.studentsInvolved },
            { icon: Flame, label: "Days Active", value: mockStats.daysActive },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 sm:p-5">
              <s.icon className="text-emerald-500 mb-2" size={18} />
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8 lg:mb-12">
          {[
            { label: "File Complaint", to: "/complain", icon: MessageSquareWarning, color: "from-red-500 to-orange-500" },
            { label: "AI Syllabus", to: "/syllabus", icon: BookOpenCheck, color: "from-emerald-500 to-teal-500" },
            { label: "SOS", to: "/sos", icon: Siren, color: "from-rose-500 to-red-600" },
            { label: "Rule Checker", to: "/rules", icon: ScrollText, color: "from-teal-500 to-emerald-600" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 lg:p-6 text-center flex flex-col items-center gap-2.5"
            >
              <div className={`w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="text-white" size={20} />
              </div>
              <span className="font-medium text-sm sm:text-base text-gray-800">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Recent Complaints</h2>
          <span className="text-xs text-gray-400">{recentComplaints.length} entries</span>
        </div>
        <div className="space-y-2 lg:space-y-3">
          {recentComplaints.length === 0 && (
            <p className="text-gray-400 text-sm">No complaints filed yet.</p>
          )}
          {recentComplaints.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-4 lg:p-5 flex justify-between items-start gap-3 hover:border-gray-200 hover:shadow-md transition"
            >
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