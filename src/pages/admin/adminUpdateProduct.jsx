import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utills/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";
import AddProducts from "./adminAddNewProducts";

export default function UpdateProducts() {
  const location = useLocation();
  const [productID, setProductID] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [discription, setDiscription] = useState(location.state.discription);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labledPrice, setLabledPrice] = useState(location.state.labledPrice);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  async function AddProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }

    const promises = [];
    for (let i = 0; i < images.length; i++) {
      promises[i] = mediaUpload(images[i]);
    }

    try {
      let urls = await Promise.all(promises);

      if (urls.length == 0) {
        urls = location.state.images;
      }

      const alternativeNames = altNames.split(",");
      const product = {
        productID: productID,
        name: name,
        altNames: alternativeNames,
        discription: discription,
        images: urls,
        price: price,
        labledPrice: labledPrice,
        category: category,
        stock: stock,
      };

      await axios.put(
        import.meta.env.VITE_API_URL + "/api/products/" + productID,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch {
      toast.error("an error occured while editing product");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FCF8FF] via-[#F9F3FF] to-[#F3EAFE] px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="w-full">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#8A5FBF] to-[#B893E6] flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">✦</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EEDFFD] text-[#7A4BB0] text-xs font-bold tracking-[0.2em] uppercase">
                  Crystal Beauty Admin
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E68]">
                Update Product
              </h1>
              <p className="text-sm md:text-base text-[#7A6598] mt-2">
                Edit and manage premium product details for your beauty store.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <div className="rounded-2xl border border-[#E8DAF8] bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium text-[#8A5FBF] uppercase tracking-wider">
                  Action
                </p>
                <p className="text-sm font-bold text-[#4B2E68] mt-1">Update Item</p>
              </div>
              <div className="rounded-2xl border border-[#E8DAF8] bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium text-[#8A5FBF] uppercase tracking-wider">
                  Section
                </p>
                <p className="text-sm font-bold text-[#4B2E68] mt-1">
                  Product Management
                </p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[30px] bg-white border border-[#E6D8F5] overflow-hidden shadow-[0_20px_60px_rgba(138,95,191,0.16)]">
            <div className="bg-gradient-to-r from-[#8A5FBF] via-[#9C70CE] to-[#B78EE3] px-8 py-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Update Product Details
                  </h2>
                  <p className="text-[#F8F1FF] mt-2 text-sm md:text-base max-w-2xl">
                    Modify product information, media, pricing, and inventory for
                    Crystal Beauty.
                  </p>
                </div>

                <div className="w-fit px-4 py-2 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                    Product Editor
                  </p>
                  <p className="text-white font-semibold mt-1">Luxury Cosmetics</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-[#E9DDF7] bg-[#FCF8FF] px-5 py-4">
                  <p className="text-xs font-medium text-[#8A5FBF] uppercase tracking-wider">
                    Store
                  </p>
                  <h3 className="text-lg font-bold text-[#4B2E68] mt-1">
                    Crystal Beauty
                  </h3>
                </div>

                <div className="rounded-2xl border border-[#E9DDF7] bg-[#FCF8FF] px-5 py-4">
                  <p className="text-xs font-medium text-[#8A5FBF] uppercase tracking-wider">
                    Section
                  </p>
                  <h3 className="text-lg font-bold text-[#4B2E68] mt-1">
                    Product Management
                  </h3>
                </div>

                <div className="rounded-2xl border border-[#E9DDF7] bg-[#FCF8FF] px-5 py-4">
                  <p className="text-xs font-medium text-[#8A5FBF] uppercase tracking-wider">
                    Mode
                  </p>
                  <h3 className="text-lg font-bold text-[#4B2E68] mt-1">
                    Update Existing Product
                  </h3>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#4B2E68]">
                  Product Information
                </h2>
                <p className="text-sm text-[#7A6598] mt-1">
                  Update the fields below to keep your product listing accurate and fresh.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Product ID
                  </label>
                  <input
                    disabled
                    value={productID}
                    onChange={(e) => {
                      setProductID(e.target.value);
                    }}
                    placeholder="Enter product ID"
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Product Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter product name"
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Alternative Names
                  </label>
                  <input
                    value={altNames}
                    onChange={(e) => {
                      setAltNames(e.target.value);
                    }}
                    placeholder="Enter alternative names"
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Description
                  </label>
                  <input
                    value={discription}
                    onChange={(e) => {
                      setDiscription(e.target.value);
                    }}
                    placeholder="Enter product description"
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <label className="text-sm font-semibold text-[#5B3E84]">
                      Product Images
                    </label>
                    <span className="px-3 py-1 rounded-full bg-[#EFE5FA] text-[#7A4BB0] text-xs font-bold">
                      {images?.length || 0} files selected
                    </span>
                  </div>

                  <div className="rounded-3xl border border-dashed border-[#8A5FBF] bg-gradient-to-br from-[#FCF8FF] to-[#F8F1FF] p-5">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        setImages(e.target.files);
                      }}
                      className="w-full text-gray-700 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-[#8A5FBF] file:text-white file:font-medium file:cursor-pointer hover:file:opacity-90"
                    />
                    <p className="text-xs text-[#7A6598] mt-3">
                      Upload replacement or additional product images for this item.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A5FBF] font-semibold">
                      Rs.
                    </span>
                    <input
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      placeholder="Enter price"
                      className="w-full h-12 pl-14 pr-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Labeled Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A5FBF] font-semibold">
                      Rs.
                    </span>
                    <input
                      value={labledPrice}
                      onChange={(e) => {
                        setLabledPrice(e.target.value);
                      }}
                      placeholder="Enter labeled price"
                      className="w-full h-12 pl-14 pr-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                  >
                    <option value="">Select category</option>
                    <option value="cream">cream</option>
                    <option value="facewash">facewash</option>
                    <option value="serum">serum</option>
                    <option value="toner">toner</option>
                    <option value="cleanser">cleanser</option>
                    <option value="moisturizer">moisturizer</option>
                    <option value="sunscreen">sunscreen</option>
                    <option value="foundation">foundation</option>
                    <option value="lipstick">lipstick</option>
                    <option value="shampoo">shampoo</option>
                    <option value="conditioner">conditioner</option>
                    <option value="bodylotion">body lotion</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#5B3E84]">
                    Stock
                  </label>
                  <input
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                    placeholder="Enter stock amount"
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
                  />
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#EADDF7] flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={() => navigate("/admin/products")}
                  className="px-8 h-12 rounded-2xl border border-[#D9C2F0] bg-gradient-to-b from-white to-[#FAF5FF] text-[#6B4B93] font-semibold shadow-[0_8px_20px_rgba(138,95,191,0.08)] hover:bg-[#F8F1FF] active:scale-[0.98] transition"
                >
                  Cancel
                </button>

                <button
                  onClick={AddProduct}
                  className="px-8 h-12 rounded-2xl bg-gradient-to-r from-[#7F52B8] to-[#B387E0] text-white font-semibold shadow-[0_14px_30px_rgba(138,95,191,0.28)] hover:opacity-95 active:scale-[0.98] transition"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}