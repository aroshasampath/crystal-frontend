import { Link } from "react-router-dom";

export default function Header(){
    return (
        <div className="w-full h-[75px] bg-[#8A5FBF] flex items-center justify-between px-8 text-white shadow-md">
            
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide cursor-pointer select-none">
                ✨ Crystal Beauty
            </h1>

            <div className="flex items-center gap-8 text-[18px] font-bold">
                <Link to="/" className="hover:underline hover:underline-offset-4 transition">
                    Home
                </Link>
                <Link to="/products" className="hover:underline hover:underline-offset-4 transition">
                    Products
                </Link>
                <Link to="/about" className="hover:underline hover:underline-offset-4 transition">
                    About
                </Link>
                <Link to="/contact" className="hover:underline hover:underline-offset-4 transition">
                    Contact
                </Link>
            </div>

        </div>
    )
}