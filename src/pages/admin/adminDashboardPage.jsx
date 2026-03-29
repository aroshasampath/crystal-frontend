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

function StatusBadge({ status }) {
  const normalized = (status || "pending").toLowerCase();

  const styles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
        styles[normalized] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </span>
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
        const [productRes, orderRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/api/products"),
          axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
            headers: {
              Authorization: "Bearer " + token,
            },
          }),
        ]);

        setProducts(Array.isArray(productRes.data) ? productRes.data : []);
        setOrders(Array.isArray(orderRes.data) ? orderRes.data : []);
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

    const lowStockProducts = products.filter((p) => Number(p.stock) <= 5);
    const outOfStockProducts = products.filter((p) => Number(p.stock) === 0);

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const topProducts = [...products]
      .sort((a, b) => (Number(a.stock) || 0) - (Number(b.stock) || 0))
      .slice(0, 5);

    const totalTracked =
      pendingOrders + processingOrders + deliveredOrders + cancelledOrders || 1;

    return {
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      cancelledOrders,
      lowStockProducts,
      outOfStockProducts,
      recentOrders,
      topProducts,
      pendingPercent: Math.round((pendingOrders / totalTracked) * 100),
      processingPercent: Math.round((processingOrders / totalTracked) * 100),
      deliveredPercent: Math.round((deliveredOrders / totalTracked) * 100),
      cancelledPercent: Math.round((cancelledOrders / totalTracked) * 100),
    };
  }, [products, orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF8FF] flex justify-center items-center">
        <div className="w-14 h-14 border-4 border-[#D9C2F0] border-t-[#8A5FBF] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8FF] p-3 sm:p-6">
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#8A5FBF]">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Welcome to Crystal Beauty management panel
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="px-4 py-2.5 rounded-2xl border border-[#D9C2F0] text-[#8A5FBF] bg-white font-semibold hover:bg-[#F8F1FF] transition"
          >
            Go Home
          </Link>

          <Link
            to="/admin/add-products"
            className="px-4 py-2.5 rounded-2xl bg-[#8A5FBF] text-white font-semibold hover:bg-[#7448aa] transition shadow-sm"
          >
            + Add Product
          </Link>

          <Link
            to="/admin/orders"
            className="px-4 py-2.5 rounded-2xl border border-[#D9C2F0] text-[#8A5FBF] bg-white font-semibold hover:bg-[#F8F1FF] transition"
          >
            View Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Products"
          value={dashboardData.totalProducts}
          subtitle="Items in your store"
          icon="🧴"
          color="purple"
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          subtitle="Customer purchases"
          icon="📦"
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={`Rs. ${dashboardData.totalRevenue.toLocaleString()}`}
          subtitle="From completed & active orders"
          icon="💰"
          color="green"
        />
        <StatCard
          title="Low Stock Alerts"
          value={dashboardData.lowStockProducts.length}
          subtitle="Products need restocking"
          icon="⚠️"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-[#EADCF8] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#2F2A2E]">
                Order Status Overview
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Quick summary of current order flow
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-2">
                {dashboardData.pendingOrders}
              </h3>
            </div>

            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Processing</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-2">
                {dashboardData.processingOrders}
              </h3>
            </div>

            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Delivered</p>
              <h3 className="text-2xl font-bold text-green-600 mt-2">
                {dashboardData.deliveredOrders}
              </h3>
            </div>

            <div className="rounded-2xl bg-[#FCF8FF] border border-[#EEE2FA] p-4">
              <p className="text-sm text-gray-500">Cancelled</p>
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
            Quick Actions
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Manage your store faster
          </p>

          <div className="space-y-3">
            <Link
              to="/admin/add-products"
              className="flex items-center justify-between rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] px-4 py-4 hover:bg-[#F7EEFF] transition"
            >
              <div>
                <p className="font-semibold text-[#2F2A2E]">Add New Product</p>
                <p className="text-xs text-gray-500">Create store inventory</p>
              </div>
              <span className="text-xl text-[#8A5FBF]">+</span>
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center justify-between rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] px-4 py-4 hover:bg-[#F7EEFF] transition"
            >
              <div>
                <p className="font-semibold text-[#2F2A2E]">Manage Products</p>
                <p className="text-xs text-gray-500">Edit and delete items</p>
              </div>
              <span className="text-xl text-[#8A5FBF]">→</span>
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center justify-between rounded-2xl border border-[#EADCF8] bg-[#FCF8FF] px-4 py-4 hover:bg-[#F7EEFF] transition"
            >
              <div>
                <p className="font-semibold text-[#2F2A2E]">Manage Orders</p>
                <p className="text-xs text-gray-500">Track customer orders</p>
              </div>
              <span className="text-xl text-[#8A5FBF]">→</span>
            </Link>
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#8A5FBF] to-[#B08AE0] p-4 text-white">
            <p className="text-sm opacity-90">Store Health</p>
            <h3 className="text-2xl font-bold mt-1">
              {dashboardData.outOfStockProducts.length === 0
                ? "Excellent"
                : "Needs Attention"}
            </h3>
            <p className="text-sm mt-1 opacity-90">
              {dashboardData.outOfStockProducts.length} out of stock products
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white border border-[#EADCF8] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#2F2A2E]">
                Recent Orders
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest customer purchases
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-[#8A5FBF] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData.recentOrders.length > 0 ? (
              dashboardData.recentOrders.map((order, index) => (
                <div
                  key={order._id || order.orderID || index}
                  className="rounded-2xl border border-[#F0E6FB] bg-[#FCF8FF] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#2F2A2E]">
                        #{order.orderID}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "No date"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-[#8A5FBF]">
                        Rs. {order.total}
                      </p>
                      <div className="mt-2">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-400">
                No recent orders found
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-[#EADCF8] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#2F2A2E]">
                Stock Alerts
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Products that need restocking soon
              </p>
            </div>

            <Link
              to="/admin/products"
              className="text-sm font-semibold text-[#8A5FBF] hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData.topProducts.length > 0 ? (
              dashboardData.topProducts.map((product, index) => {
                const image =
                  product?.images?.length > 0
                    ? product.images[0]
                    : "https://via.placeholder.com/80x80?text=No+Image";

                return (
                  <div
                    key={product._id || product.productID || index}
                    className="flex items-center gap-4 rounded-2xl border border-[#F0E6FB] bg-[#FCF8FF] p-4"
                  >
                    <img
                      src={image}
                      alt={product?.name || "Product"}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#2F2A2E] truncate">
                        {product?.name || "Unnamed product"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {product?.productID || "-"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          Number(product?.stock) === 0
                            ? "text-red-600"
                            : Number(product?.stock) <= 5
                            ? "text-amber-600"
                            : "text-green-600"
                        }`}
                      >
                        {product?.stock ?? 0}
                      </p>
                      <p className="text-xs text-gray-400">in stock</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-10 text-center text-gray-400">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}