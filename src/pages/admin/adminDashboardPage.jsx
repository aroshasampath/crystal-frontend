import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StatCard({ title, value, subtitle, icon, color = "purple" }) {
  const colorMap = {
    purple: "from-[#8A5FBF] to-[#B08AE0]",
    green: "from-emerald-500 to-green-400",
    blue: "from-sky-500 to-cyan-400",
    pink: "from-pink-500 to-rose-400",
    orange: "from-amber-500 to-orange-400",
    red: "from-red-500 to-rose-500",
  };

  return (
    <div className="rounded-3xl bg-white border border-[#EADCF8] p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#2F2A2E]">
            {value}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">{subtitle}</p>
        </div>

        <div
          className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${colorMap[color]} text-white flex items-center justify-center text-2xl shadow-md`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, colorClass }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-sm font-semibold text-[#2F2A2E]">{value}%</p>
      </div>
      <div className="h-3 w-full rounded-full bg-[#F3ECFB] overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/login");
      return;
    }

    async function loadDashboard() {
      try {
        const [productRes, orderRes, userRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/api/products"),
          axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
            headers: {
              Authorization: "Bearer " + token,
            },
          }),
          axios.get(import.meta.env.VITE_API_URL + "/api/users/all", {
            headers: {
              Authorization: "Bearer " + token,
            },
          }),
        ]);

        setProducts(Array.isArray(productRes.data) ? productRes.data : []);
        setOrders(Array.isArray(orderRes.data) ? orderRes.data : []);
        setUsers(Array.isArray(userRes.data) ? userRes.data : []);
      } catch (err) {
        console.log("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [navigate]);

  const dashboardData = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalUsers = users.length;

    const totalRevenue = orders
      .filter((o) => (o.status || "").toLowerCase() !== "cancelled")
      .reduce((sum, order) => sum + (Number(order.total) || 0), 0);

    const pendingOrders = orders.filter(
      (o) => (o.status || "pending").toLowerCase() === "pending"
    ).length;

    const processingOrders = orders.filter(
      (o) => (o.status || "").toLowerCase() === "processing"
    ).length;

    const deliveredOrders = orders.filter(
      (o) => (o.status || "").toLowerCase() === "delivered"
    ).length;

    const cancelledOrders = orders.filter(
      (o) => (o.status || "").toLowerCase() === "cancelled"
    ).length;

    const adminUsers = users.filter(
      (u) => (u.role || "").toLowerCase() === "admin"
    ).length;

    const normalUsers = users.filter(
      (u) => (u.role || "user").toLowerCase() === "user"
    ).length;

    const verifiedUsers = users.filter((u) => u.isEmailVerified).length;

    const lowStockProducts = products.filter((p) => Number(p.stock) <= 5);
    const outOfStockProducts = products.filter((p) => Number(p.stock) === 0);

    const totalTracked =
      pendingOrders + processingOrders + deliveredOrders + cancelledOrders || 1;

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      cancelledOrders,
      adminUsers,
      normalUsers,
      verifiedUsers,
      lowStockProducts,
      outOfStockProducts,
      pendingPercent: Math.round((pendingOrders / totalTracked) * 100),
      processingPercent: Math.round((processingOrders / totalTracked) * 100),
      deliveredPercent: Math.round((deliveredOrders / totalTracked) * 100),
      cancelledPercent: Math.round((cancelledOrders / totalTracked) * 100),
    };
  }, [products, orders, users]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF8FF] flex justify-center items-center">
        <div className="w-14 h-14 border-4 border-[#D9C2F0] border-t-[#8A5FBF] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8FF] p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#8A5FBF]">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Crystal Beauty overview and business summary
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="px-4 py-2.5 rounded-2xl border border-[#D9C2F0] text-[#8A5FBF] bg-white font-semibold hover:bg-[#F8F1FF] transition"
          >
            Go Home
          </Link>
        </div>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Products"
          value={dashboardData.totalProducts}
          subtitle="Products in the store"
          icon="🧴"
          color="purple"
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          subtitle="Orders placed by customers"
          icon="📦"
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={`Rs. ${dashboardData.totalRevenue.toLocaleString()}`}
          subtitle="Revenue from active orders"
          icon="💰"
          color="green"
        />
        <StatCard
          title="Total Users"
          value={dashboardData.totalUsers}
          subtitle="Registered customers and admins"
          icon="👥"
          color="pink"
        />
      </div>

      {/* Admin summary + order summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-[#EADCF8] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#2F2A2E]">
                Order Status Summary
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Overview of current order distribution
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Pending Orders</p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-2">
                {dashboardData.pendingOrders}
              </h3>
            </div>

            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Processing Orders</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-2">
                {dashboardData.processingOrders}
              </h3>
            </div>

            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Delivered Orders</p>
              <h3 className="text-2xl font-bold text-green-600 mt-2">
                {dashboardData.deliveredOrders}
              </h3>
            </div>

            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Cancelled Orders</p>
              <h3 className="text-2xl font-bold text-red-600 mt-2">
                {dashboardData.cancelledOrders}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <ProgressBar
              label="Pending Orders"
              value={dashboardData.pendingPercent}
              colorClass="bg-yellow-400"
            />
            <ProgressBar
              label="Processing Orders"
              value={dashboardData.processingPercent}
              colorClass="bg-blue-500"
            />
            <ProgressBar
              label="Delivered Orders"
              value={dashboardData.deliveredPercent}
              colorClass="bg-green-500"
            />
            <ProgressBar
              label="Cancelled Orders"
              value={dashboardData.cancelledPercent}
              colorClass="bg-red-500"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-[#EADCF8] p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#2F2A2E] mb-1">
            Admin Summary
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Quick insight about system users and store health
          </p>

          <div className="space-y-3">
            <div className="rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] p-4">
              <p className="text-sm text-gray-500">Admin Users</p>
              <h3 className="mt-1 text-2xl font-bold text-[#8A5FBF]">
                {dashboardData.adminUsers}
              </h3>
            </div>

            <div className="rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] p-4">
              <p className="text-sm text-gray-500">Normal Users</p>
              <h3 className="mt-1 text-2xl font-bold text-[#2F2A2E]">
                {dashboardData.normalUsers}
              </h3>
            </div>

            <div className="rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] p-4">
              <p className="text-sm text-gray-500">Verified Users</p>
              <h3 className="mt-1 text-2xl font-bold text-green-600">
                {dashboardData.verifiedUsers}
              </h3>
            </div>

            <div className="rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] p-4">
              <p className="text-sm text-gray-500">Low Stock Products</p>
              <h3 className="mt-1 text-2xl font-bold text-amber-600">
                {dashboardData.lowStockProducts.length}
              </h3>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#8A5FBF] to-[#B08AE0] p-4 text-white">
            <p className="text-sm opacity-90">System Status</p>
            <h3 className="text-2xl font-bold mt-1">
              {dashboardData.outOfStockProducts.length === 0
                ? "Stable"
                : "Attention Needed"}
            </h3>
            <p className="text-sm mt-1 opacity-90">
              {dashboardData.outOfStockProducts.length} products are out of stock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}