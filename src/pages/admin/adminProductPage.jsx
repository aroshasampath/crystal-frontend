import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ProductDeleteConfirm(props) {
  const productID = props.productID;
  const close = props.close;
  const onDeleted = props.onDeleted;

  function deleteProduct() {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        close();
        onDeleted();
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete product");
      });
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 relative animate-[fadeIn_0.2s_ease]">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center hover:bg-red-200 transition"
        >
          ✕
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-2xl text-red-600">!</span>
        </div>

        <h1 className="text-xl font-bold text-center text-[#2F2A2E] mb-2">
          Delete Product
        </h1>

        <p className="text-center text-[#666] text-sm mb-6">
          Are you sure you want to delete the product {productID} ?
          <br />
          <span className="text-red-500 font-medium">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={close}
            className="px-5 py-2 rounded-lg border border-[#D9C2F0] text-[#6B4B93] font-medium hover:bg-[#F8F1FF] transition"
          >
            Cancel
          </button>

          <button
            onClick={deleteProduct}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [isLoading]);

  return (
    <div className="w-full h-full p-4">
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm
          productID={productToDelete}
          close={() => {
            setIsDeleteConfirmVisible(false);
          }}
          onDeleted={() => {
            setIsLoading((prev) => !prev);
          }}
        />
      )}

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
                <th className="p-4">Stock</th>
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
                    <td className="p-4">{item?.stock ?? 0}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            navigate("/admin/update-products", {
                              state: item,
                            });
                          }}
                          className="px-3 py-1 bg-[#8A5FBF] text-white rounded-md hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(item.productID);
                            setIsDeleteConfirmVisible(true);
                          }}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
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