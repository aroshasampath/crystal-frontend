import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utills/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProducts() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [discription, setDiscription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [labledPrice, setLabledPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  async function addProduct(){
    const token = localStorage.getItem("token");
    if(token == null){
      navigate("/login")
      return;
    }
    const promises = [];
    for(let i=0; i < images.length;i++){
      promises[i] = mediaUpload(images[i]);

    }
    try{
      const urls = await Promise.all(promises);
      const alternativeNames = altNames.split(",");
      const product ={
        productID: productID,
        name: name,
        altNames: alternativeNames,
        discription: discription,
        images: urls,
        price: price,
        labledPrice: labledPrice,
        category: category,
        stock: stock
      }
      await axios.post(import.meta.env.VITE_API_URL + "/api/products", product,
        {
          headers:{
            Authorization: "Bearer " + token
          }
        }
      );
      toast.success("Product added successfully");
      navigate("/admin/products");
  }catch{
      toast.error("an error occured while uploading") 
    }
 
    
  }

  

  return (
    <div className="w-full min-h-screen bg-[#FCF8FF] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-[28px] shadow-[0_20px_60px_rgba(138,95,191,0.18)] border border-[#D9C2F0] overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#8A5FBF] to-[#B08AD9] px-8 py-7">
          <div className="flex flex-col gap-2">
            <span className="w-fit px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase">
              Crystal Beauty Admin
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Add New Product
            </h1>
            <p className="text-[#F8F1FF] mt-1 text-sm md:text-base max-w-2xl">
              Create and organize premium beauty products for the Crystal Beauty store dashboard.
            </p>
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
                Type
              </p>
              <h3 className="text-lg font-bold text-[#4B2E68] mt-1">
                Cosmetics & Skincare
              </h3>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#4B2E68]">Product Information</h2>
            <p className="text-sm text-[#7A6598] mt-1">
              Enter the product details below to list a new beauty item.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#5B3E84]">
                Product ID
              </label>
              <input
                value={productID}
                onChange={(e) => {
                  setProductID(e.target.value);
                }}
                placeholder="Enter product ID"
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
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
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
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
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
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
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-[#5B3E84]">
                Product Images
              </label>
              <div className="rounded-2xl border border-dashed border-[#8A5FBF] bg-[#FCF8FF] p-4">
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}
                  className="w-full text-gray-700 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#8A5FBF] file:text-white file:font-medium file:cursor-pointer hover:file:opacity-90"
                />
                <p className="text-xs text-[#7A6598] mt-3">
                  Upload multiple product images for Crystal Beauty listings.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#5B3E84]">
                Price
              </label>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="Enter price"
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#5B3E84]">
                Labeled Price
              </label>
              <input
                value={labledPrice}
                onChange={(e) => {
                  setLabledPrice(e.target.value);
                }}
                placeholder="Enter labeled price"
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
              />
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
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
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
                className="w-full h-12 px-4 rounded-xl border border-[#D9C2F0] bg-[#FCF8FF] text-[#4B2E68] outline-none focus:ring-2 focus:ring-[#8A5FBF] focus:border-[#8A5FBF] transition"
              />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#EADDF7] flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => navigate("/admin/products")}
              className="px-8 h-12 rounded-xl border border-[#D9C2F0] bg-white text-[#6B4B93] font-semibold hover:bg-[#F8F1FF] active:scale-[0.98] transition"
            >
              Cancel
            </button>

            <button
              onClick={addProduct}
              className="px-8 h-12 rounded-xl bg-[#8A5FBF] text-white font-semibold shadow-lg hover:opacity-90 active:scale-[0.98] transition"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}