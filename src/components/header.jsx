import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full min-h-[75px] bg-[#8A5FBF] flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-4 md:py-0 text-white shadow-md gap-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-wide cursor-pointer select-none">
        ✨ Crystal Beauty
      </h1>

      <div className="flex items-center flex-wrap justify-center gap-5 md:gap-8 text-[16px] md:text-[18px] font-bold">
        <Link to="/" className="hover:underline hover:underline-offset-4 transition">
          Home
        </Link>
        <Link
          to="/products"
          className="hover:underline hover:underline-offset-4 transition"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="hover:underline hover:underline-offset-4 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:underline hover:underline-offset-4 transition"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}