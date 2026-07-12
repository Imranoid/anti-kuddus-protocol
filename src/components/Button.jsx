export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]",
    outline: "border border-gray-200 text-gray-700 bg-white hover:border-indigo-300 hover:text-indigo-600 active:scale-[0.98]",
    danger: "bg-red-500 text-white shadow-sm shadow-red-200 hover:bg-red-600 active:scale-[0.98]",
  };
  return (
    <button className={`${base} ${variants[variant]} px-5 py-2.5 text-sm sm:text-base ${className}`} {...props}>
      {children}
    </button>
  );
}