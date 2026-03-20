import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MediaUpload from "../../utills/mediaUpload";


export default function AddProducts() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [discription, setDiscription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [labledPrice, setLabledPrice] = useState(0);
  const [category, setCategory] = useState("cream");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  async function AddProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }

    const promises = [];
    for (let i = 0; i < images.length; i++) {
      promises[i] = MediaUpload(images[i]);
    }

    try {
      const urls = await Promise.all(promises);
      const altNamesArray = altNames.split(",");

      const product = {
        productID: productID,
        name: name,
        altNames: altNamesArray,
        discription: discription,
        images: urls,
        price: price,
        labledPrice: labledPrice,
        category: category,
        stock: stock,
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      console.log(urls);
      navigate("/admin/products");
    } catch (e) {
      toast.error("An error occured");
    }
  }

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center px-4 py-10 relative overflow-hidden"
      style={{ backgroundColor: "#FCF8FF" }}
    >
      <div
        className="absolute top-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full blur-3xl opacity-40"
        style={{ backgroundColor: "#D9C2F0" }}
      ></div>
      <div
        className="absolute bottom-[-100px] right-[-80px] w-[260px] h-[260px] rounded-full blur-3xl opacity-40"
        style={{ backgroundColor: "#D9C2F0" }}
      ></div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-4xl rounded-[32px] border shadow-2xl p-6 md:p-10 backdrop-blur-sm relative z-10"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#D9C2F0",
          boxShadow: "0 20px 60px rgba(138, 95, 191, 0.12)",
        }}
      >
        <div className="mb-10 text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl shadow-md"
            style={{ backgroundColor: "#D9C2F0", color: "#8A5FBF" }}
          >
            ✨
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#8A5FBF" }}
          >
            Crystal Beauty
          </h1>

          <p className="text-sm md:text-base mt-2 text-gray-500">
            Add a new cosmetic product to your premium beauty collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
              placeholder="Enter product ID"
              className="w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter product name"
              className="w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Alternative Names
            </label>
            <input
              type="text"
              value={altNames}
              onChange={(e) => {
                setAltNames(e.target.value);
              }}
              placeholder="Example: glow cream, brightening cream"
              className="w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Discription
            </label>
            <textarea
              value={discription}
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
              placeholder="Write product description..."
              rows={5}
              className="w-full rounded-2xl border px-4 py-3.5 outline-none resize-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="w-full rounded-2xl border px-4 py-3.5 outline-none bg-white transition-all duration-200"
              style={{
                borderColor: "#D9C2F0",
              }}
            >
              <option value="cream">Cream</option>
              <option value="serum">Serum</option>
              <option value="cleanser">Cleanser</option>
              <option value="toner">Toner</option>
              <option value="moisturizer">Moisturizer</option>
              <option value="sunscreen">Sunscreen</option>
              <option value="face-wash">Face Wash</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Product Images
            </label>

            <div
              className="w-full rounded-2xl border px-4 py-4 bg-white"
              style={{ borderColor: "#D9C2F0" }}
            >
              <input
                type="file"
                onChange={(e) => {
                  setImages(e.target.files);
                }}
                multiple
                className="w-full text-sm outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                Upload one or more product images
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter price"
              className="w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Labeled Price
            </label>
            <input
              type="number"
              value={labledPrice}
              onChange={(e) => {
                setLabledPrice(e.target.value);
              }}
              placeholder="Enter labeled price"
              className="w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              placeholder="Enter available stock"
              className="w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 bg-white"
              style={{
                borderColor: "#D9C2F0",
              }}
            />
          </div>
        </div>

        <div
          className="mt-8 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ backgroundColor: "#FCF8FF" }}
        >
          <div>
            <h3 className="font-semibold" style={{ color: "#8A5FBF" }}>
              Crystal Beauty Admin Panel
            </h3>
            <p className="text-sm text-gray-500">
              Make sure all product details are correct before submitting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-3 rounded-2xl font-semibold border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#ffffff",
                color: "#8A5FBF",
                borderColor: "#8A5FBF",
              }}
            >
              Cancel
            </button>

            <button
              onClick={AddProduct}
              type="button"
              className="px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                backgroundColor: "#8A5FBF",
              }}
            >
              Submit Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}