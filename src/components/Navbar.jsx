import { Link, useLocation } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") return null;
  const linkClass = (path) =>
    `text-sm font-medium transition ${pathname === path ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"}`;

  return (
    <nav className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-gray-900">
          <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
            <ShieldAlert size={16} />
          </div>
          <span className="hidden xs:inline text-sm sm:text-base">Anti-Kuddus Protocol</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
          <Link to="/captain" className={linkClass("/captain")}>Captain</Link>
        </div>
      </div>
    </nav>
  );
}