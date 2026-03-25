import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { AddToCart, LoadCart } from "../utills/cart";

export default function ProductOverview() {
    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const params = useParams();
    const location = useLocation();
    const productData = location.state;

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then(
            (response) => {
                setProduct(response.data);
                setSelectedImage(response.data.images?.[0] || null);
                setStatus("success");
            }).catch(
                () => {
                    toast.error("Failed to load product");
                    setStatus("error");
                }
            )
    }, [])

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-[#FCF8FF] px-4 py-4 md:px-6 lg:px-8 flex items-center">
            {
                status == "loading" && (
                    <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
                        <div className="bg-white border border-[#D9C2F0] rounded-3xl px-8 py-6 shadow-[0_10px_30px_rgba(138,95,191,0.10)]">
                            <p className="text-[#8A5FBF] text-lg font-semibold">Loading...</p>
                        </div>
                    </div>
                )
            }

            {
                status == "success" && (
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                            <div className="bg-white border border-[#D9C2F0] rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(138,95,191,0.10)] flex flex-col h-full">
                                <div className="w-full h-[280px] md:h-[360px] lg:h-[430px] bg-[#FCF8FF]">
                                    <img
                                        src={selectedImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-3 flex flex-wrap gap-2 justify-center bg-white">
                                    {product.images?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={product.name}
                                            onClick={() => setSelectedImage(img)}
                                            className={`w-[56px] h-[56px] md:w-[64px] md:h-[64px] object-cover rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                                                selectedImage === img
                                                    ? "border-[#8A5FBF] scale-105"
                                                    : "border-[#D9C2F0]"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white border border-[#D9C2F0] rounded-[30px] p-4 md:p-5 lg:p-6 shadow-[0_20px_50px_rgba(138,95,191,0.10)] h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-[#D9C2F0] text-[#5B3B87] text-xs md:text-sm font-semibold">
                                            {product.category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-[#FCF8FF] border border-[#D9C2F0] text-[#8A5FBF] text-xs md:text-sm font-medium">
                                            In Stock: {product.stock}
                                        </span>
                                    </div>

                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4B2E6F] leading-tight">
                                        {product.name}
                                    </h1>

                                    <p className="text-[#8A5FBF] text-sm md:text-base mt-2 font-medium">
                                        {productData?.altNames || ""}
                                    </p>

                                    <div className="mt-4 p-4 rounded-3xl bg-[#FCF8FF] border border-[#E8D8FA]">
                                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
                                            Product Description
                                        </p>
                                        <p className="text-gray-700 leading-6 text-[14px] md:text-[15px] line-clamp-4">
                                            {product.discription}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="rounded-2xl bg-[#FCF8FF] border border-[#D9C2F0] p-4">
                                            <p className="text-xs text-gray-500 mb-1">Selling Price</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-[#111827]">
                                                LKR {product.price}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white border border-[#D9C2F0] p-4">
                                            <p className="text-xs text-gray-500 mb-1">Labeled Price</p>
                                            <p className="text-xl md:text-2xl font-bold text-gray-400 line-through">
                                                LKR {product.labledPrice}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="rounded-2xl border border-[#E8D8FA] bg-[#FCF8FF] p-3">
                                            <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                                                Category
                                            </p>
                                            <p className="text-base font-semibold text-[#5B3B87]">
                                                {product.category}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-[#E8D8FA] bg-[#FCF8FF] p-3">
                                            <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                                                Available Stock
                                            </p>
                                            <p className="text-base font-semibold text-[#5B3B87]">
                                                {product.stock}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-[#EADDF7]">
                                        <p className="text-xs text-gray-500">Product ID</p>
                                        <p className="text-sm md:text-base font-semibold text-[#4B2E6F] mt-1 break-words">
                                            {product.productID}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => {
                                            AddToCart(product, 1)
                                            toast.success("Add to cart successfully")
                                        }}
                                        className="h-[44px] px-6 rounded-2xl bg-[#8A5FBF] text-white text-sm md:text-[15px] font-semibold shadow-[0_10px_25px_rgba(138,95,191,0.25)] hover:bg-[#7447ab] transition-all duration-300"
                                    >
                                        Add to Cart
                                    </button>

                                    <Link
                                        to="/cheackout"
                                        state={[
                                            {
                                                ...product,
                                                quantity: 1,
                                                image: selectedImage || product.images?.[0]
                                            }
                                        ]}
                                        className="h-[44px] px-6 rounded-2xl border border-[#D9C2F0] bg-white text-[#8A5FBF] text-sm md:text-[15px] font-semibold hover:bg-[#FCF8FF] transition-all duration-300 inline-flex items-center justify-center"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                status == "error" && (
                    <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
                        <div className="bg-white border border-red-200 rounded-3xl px-8 py-6 shadow-md">
                            <h1 className="text-red-500 text-xl font-bold">Failed to load product</h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}