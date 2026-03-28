import { Routes, Route, Link } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingBag,
  MdShoppingCart,
  MdPeople
} from "react-icons/md";
import { useState } from "react";

import AddProduct from "./admin/adminAddNewProducts";
import AdminProductPage from "./admin/adminProductPage";
import UpdateProducts from "./admin/adminUpdateProduct";
import AdminOrderPage from "./admin/adminOrderPage";

export default function AdminPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row p-2 bg-[#FCF8FF] gap-2">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-[#D9C2F0] p-4 rounded-xl shadow">
        <h1 className="text-xl font-semibold">✨ Admin</h1>
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 bg-white rounded-lg"
        >
          Menu
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-[300px] min-h-[calc(100vh-16px)] bg-[#D9C2F0] rounded-xl p-5 text-[#2F2A2E] gap-5 shadow-md`}
      >
        <div className="hidden md:flex items-center justify-center w-full h-[75px] border-b border-white/50">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-center">
            ✨ Admin Panel
          </h1>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdDashboard size={22} />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdShoppingCart size={22} />
            Orders
          </Link>

          <Link
            to="/admin/products"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdShoppingBag size={22} />
            Products
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdPeople size={22} />
            Users
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full md:w-[calc(100%-300px)] min-h-[calc(100vh-16px)] bg-white rounded-xl p-4 md:p-5 text-[#2F2A2E] overflow-hidden shadow-md">
        <div className="h-full w-full overflow-y-auto">
          <Routes>
            <Route
              index
              element={
                <div className="space-y-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#8A5FBF]">
                    Dashboard
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-[#8A5FBF]">
                        Total Products
                      </h2>
                      <p className="text-2xl md:text-3xl font-bold mt-3">--</p>
                    </div>

                    <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-[#8A5FBF]">
                        Orders
                      </h2>
                      <p className="text-2xl md:text-3xl font-bold mt-3">--</p>
                    </div>

                    <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-[#8A5FBF]">
                        Users
                      </h2>
                      <p className="text-2xl md:text-3xl font-bold mt-3">--</p>
                    </div>
                  </div>
                </div>
              }
            />

            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-products" element={<AddProduct />} />
            <Route path="update-products" element={<UpdateProducts />} />
            <Route path="orders" element={<AdminOrderPage />} />

            <Route
              path="users"
              element={
                <h1 className="text-2xl font-bold text-[#8A5FBF]">
                  user page
                </h1>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}