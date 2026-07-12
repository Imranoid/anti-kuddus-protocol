import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ title, subtitle, back }) {
  return (
    <div className="mb-8 lg:mb-10">
      {back && (
        <Link to={back} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition mb-4">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>
      )}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-500 mt-1.5 text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}