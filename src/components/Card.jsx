export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.06)] ${className}`}>
      {children}
    </div>
  );
}