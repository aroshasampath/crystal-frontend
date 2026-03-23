import { Routes, Route, Link } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingBag,
  MdShoppingCart,
  MdPeople,
  MdEdit
} from "react-icons/md";
import AddProduct from "./admin/adminAddNewProducts";
import AdminProductPage from "./admin/adminProductPage";
import UpdateProducts from "./admin/adminUpdateProduct";

export default function AdminPage() {
  return (
    <div className="w-full min-h-screen flex p-2 bg-[#FCF8FF] gap-2">
      <div className="w-[300px] min-h-[calc(100vh-16px)] bg-[#D9C2F0] rounded-xl p-5 text-[#2F2A2E] flex flex-col gap-5 shadow-md">
        <div className="flex items-center justify-center w-full h-[75px] border-b border-white/50">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide cursor-pointer select-none text-center">
            ✨ Admin Panel
          </h1>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Link
            to="/admin"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdDashboard size={22} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/orders"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdShoppingCart size={22} />
            <span>Orders</span>
          </Link>

          <Link
            to="/admin/products"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdShoppingBag size={22} />
            <span>Products</span>
          </Link>
          

          <Link
            to="/admin/users"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition font-medium"
          >
            <MdPeople size={22} />
            <span>Users</span>
          </Link>
        </div>
      </div>

      <div className="w-[calc(100%-300px)] min-h-[calc(100vh-16px)] bg-white rounded-xl ml-1 p-5 text-[#2F2A2E] overflow-hidden shadow-md">
        <div className="h-full w-full max-w-full max-h-full overflow-y-auto">
          <Routes>
            <Route
              index
              element={
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-[#8A5FBF]">
                    Dashboard
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-[#8A5FBF]">
                        Total Products
                      </h2>
                      <p className="text-3xl font-bold mt-3">--</p>
                    </div>

                    <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-[#8A5FBF]">
                        Orders
                      </h2>
                      <p className="text-3xl font-bold mt-3">--</p>
                    </div>

                    <div className="bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-5 shadow-sm">
                      <h2 className="text-lg font-semibold text-[#8A5FBF]">
                        Users
                      </h2>
                      <p className="text-3xl font-bold mt-3">--</p>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-products" element={<AddProduct />} />
            <Route path="update-products" element={<UpdateProducts />} />
            <Route
              path="orders"
              element={
                <h1 className="text-2xl font-bold text-[#8A5FBF]">order page</h1>
              }
            />
            <Route
              path="users"
              element={
                <h1 className="text-2xl font-bold text-[#8A5FBF]">user page</h1>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}