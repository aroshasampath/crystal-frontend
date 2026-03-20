import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full p-4">
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#8A5FBF]">Admin Products</h1>

        <Link
          to="/admin/add-products"
          className="px-4 py-2 bg-[#8A5FBF] text-white rounded-md font-medium hover:bg-[#7448aa] transition"
        >
          + Add Product
        </Link>
      </div>

      {loading && (
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-[#D9C2F0] border-t-[#8A5FBF] rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="w-full mb-4 p-4 rounded-md bg-red-100 text-red-600 font-medium">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="w-full bg-[#FCF8FF] border border-[#E9DDF7] rounded-xl p-8 text-center text-[#555]">
          No products found.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#D9C2F0] text-[#2F2A2E]">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Labeled Price</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => {
                const image =
                  item?.images?.length > 0
                    ? item.images[0]
                    : "https://via.placeholder.com/100x100?text=No+Image";

                return (
                  <tr
                    key={item._id || item.productID || index}
                    className="border-b hover:bg-[#FCF8FF] transition"
                  >
                    <td className="p-4">
                      <img
                        src={image}
                        alt={item?.name || "Product"}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="p-4">{item?.productID || "-"}</td>
                    <td className="p-4 font-medium">{item?.name || "-"}</td>
                    <td className="p-4">Rs. {item?.price ?? 0}</td>
                    <td className="p-4">Rs. {item?.labledPrice ?? 0}</td>
                    <td className="p-4">{item?.category || "-"}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}