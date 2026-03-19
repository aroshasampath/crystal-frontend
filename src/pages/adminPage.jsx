import { Routes, Route } from "react-router-dom"

export default function AdminPage() {
    return (
        <div className="w-full h-full flex p-1 bg-[#FCF8FF]">
            
            <div className="w-[300px] h-full bg-[#D9C2F0] rounded-md p-4 text-[#2F2A2E]">
                <h1 className="text-2xl font-bold text-[#8A5FBF]">Admin Panel</h1>
            </div>

            <div className="w-[calc(100%-300px)] h-full bg-white rounded-md ml-1 p-4 text-[#2F2A2E]">
                <Routes>
                    <Route path="/" element={<h1 className="text-2xl font-bold text-[#8A5FBF]">dashboard</h1>} />
                    <Route path="/products" element={<h1 className="text-2xl font-bold text-[#8A5FBF]">product page</h1>} />
                    <Route path="/orders" element={<h1 className="text-2xl font-bold text-[#8A5FBF]">order page</h1>} />
                </Routes>
            </div>

        </div>
    )
}