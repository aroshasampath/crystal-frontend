import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StatusBadge({ status }) {
  const normalized = (status || "pending").toLowerCase();

  const styles = {
    pending: "bg-yellow-100 text-yellow-600",
    processing: "bg-blue-100 text-blue-600",
    delivered: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
        styles[normalized] || "bg-gray-100 text-gray-600"
      }`}
    >
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </span>
  );
}

function OrderDetailsModal({ order, close, updateStatus }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative shadow-2xl animate-fadeIn">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-[#8A5FBF] border-b pb-2">
          Order #{order.orderID}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm mb-5">
          <p><span className="font-medium text-gray-600">Customer:</span> {order.customerName}</p>
          <p><span className="font-medium text-gray-600">Phone:</span> {order.phone}</p>
          <p><span className="font-medium text-gray-600">Email:</span> {order.email}</p>
          <p><span className="font-medium text-gray-600">Address:</span> {order.address}</p>
        </div>

        {/* ✅ STATUS CHANGE HERE */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Status</p>

          <StatusBadge status={order.status} />

          <select
            className="w-full mt-2 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#8A5FBF] outline-none"
            value={(order.status || "pending").toLowerCase()}
            onChange={(e) =>
              updateStatus(order.orderID, e.target.value)
            }
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Items</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#FCF8FF] p-3 rounded-lg border"
              >
                <img
                  src={item.image}
                  className="w-14 h-14 object-cover rounded-md border"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-[#8A5FBF] font-semibold text-sm">
                  Rs. {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right mt-5 text-lg font-bold text-[#8A5FBF]">
          Total: Rs. {order.total}
        </div>
      </div>
    </div>
  );
}

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (setLoading) {
      const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/login");
        return;
      }

      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const updateStatus = async (orderID, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderID}`,
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.orderID === orderID ? { ...o, status: newStatus } : o
        )
      );

      // ✅ modal ekath update wenna
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: newStatus } : prev
      );

    } catch (err) {
      console.log(err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderID?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase());

    const currentStatus = (o.status || "pending").toLowerCase();
    const filterStatus = statusFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All" || currentStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#FCF8FF] p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#8A5FBF]">
          Orders Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and track customer orders
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-[#8A5FBF] outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8A5FBF] outline-none bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>pending</option>
          <option>processing</option>
          <option>delivered</option>
          <option>cancelled</option>
        </select>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
          updateStatus={updateStatus}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-[#D9C2F0] border-t-[#8A5FBF] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#D9C2F0]/40 text-gray-700">
                <tr>
                  <th className="p-4 text-left">Order</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="border-t hover:bg-[#FCF8FF] transition">
                    <td className="p-4 font-medium text-gray-800">
                      #{order.orderID}
                    </td>

                    <td className="p-4">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </td>

                    <td className="p-4">{order.phone}</td>

                    <td className="p-4 font-semibold text-[#8A5FBF]">
                      Rs. {order.total}
                    </td>

                    <td className="p-4">
                      {order.items?.length} items
                    </td>

                    <td className="p-4 text-gray-500 text-xs">
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-1.5 text-sm bg-[#8A5FBF] text-white rounded-lg hover:bg-[#7448aa] transition shadow-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No orders found
            </div>
          )}
        </>
      )}
    </div>
  );
}