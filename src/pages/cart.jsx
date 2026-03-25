import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadCart } from "../utills/cart";

export default function CartPage() {
    const [cart, setCart] = useState(LoadCart());

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const updateQuantity = (index, change) => {
        const updatedCart = [...cart];
        const item = updatedCart[index];

        const unitPrice = item.price / item.quantity;
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) {
            return;
        }

        item.quantity = newQuantity;
        item.price = unitPrice * newQuantity;

        setCart(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, itemIndex) => itemIndex !== index);
        setCart(updatedCart);
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-[#FCF8FF] px-4 py-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#8A5FBF]">
                        Shopping Cart
                    </h1>
                    <p className="text-[#8A5FBF] mt-2 text-sm md:text-base">
                        Review your selected items before checkout
                    </p>
                </div>

                <div className="bg-white border border-[#D9C2F0] rounded-[28px] shadow-[0_20px_50px_rgba(138,95,191,0.10)] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#D9C2F0] bg-gradient-to-r from-[#FCF8FF] to-white">
                        <h2 className="text-lg font-semibold text-[#8A5FBF]">
                            Cart Items
                        </h2>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col gap-4">
                        {
                            cart.map(
                                (item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="w-full bg-[#FCF8FF] border border-[#D9C2F0] rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:border-[#8A5FBF]"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-[56px] h-[56px] rounded-2xl bg-white border border-[#D9C2F0] flex items-center justify-center text-[#8A5FBF] font-bold shadow-sm">
                                                    {index + 1}
                                                </div>

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-[56px] h-[56px] rounded-2xl object-cover border border-[#D9C2F0] bg-white shadow-sm"
                                                />

                                                <div>
                                                    <h1 className="text-lg md:text-xl font-semibold text-[#8A5FBF]">
                                                        {item.name}
                                                    </h1>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Item ready in your cart
                                                    </p>
                                                    <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-3">
                                                        <span>Product ID: {item.productId}</span>
                                                        <span>Price: {item.price}</span>
                                                        <span>Quantity: {item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(index, -1)}
                                                        className="w-8 h-8 rounded-full bg-white border border-[#D9C2F0] text-[#8A5FBF] font-bold hover:bg-[#FCF8FF]"
                                                    >
                                                        -
                                                    </button>

                                                    <span className="min-w-[30px] text-center text-[#8A5FBF] font-medium">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(index, 1)}
                                                        className="w-8 h-8 rounded-full bg-white border border-[#D9C2F0] text-[#8A5FBF] font-bold hover:bg-[#FCF8FF]"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full bg-white border border-[#D9C2F0] text-[#8A5FBF] text-sm font-medium">
                                                    In Cart
                                                </div>

                                                <button
                                                    onClick={() => removeItem(index)}
                                                    className="px-4 py-2 rounded-full bg-white border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }
                            )
                        }
                    </div>

                    <div className="px-6 py-5 border-t border-[#D9C2F0] bg-[#FCF8FF] flex items-center justify-between">
                        <h3 className="text-lg md:text-xl font-semibold text-[#8A5FBF]">
                            Total Price
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-[#8A5FBF]">
                            Rs. {totalPrice}
                        </p>
                    </div>

                    <div className="px-6 pb-6 bg-[#FCF8FF] flex justify-end">
                        <Link
                         state={cart}
                            to="/cheackout"
                            className="px-6 py-3 rounded-full bg-[#8A5FBF] text-white font-semibold border border-[#8A5FBF] hover:opacity-90 transition-all duration-300 shadow-sm"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}