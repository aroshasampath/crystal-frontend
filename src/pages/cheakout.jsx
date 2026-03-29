import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheakoutPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [cart, setCart] = useState(() => {
        if (location.state && Array.isArray(location.state)) {
            return location.state;
        }

        try {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                return Array.isArray(parsedCart) ? parsedCart : [];
            }
        } catch (error) {
            console.error("Error reading cart:", error);
        }

        return [];
    });

    
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const updateQuantity = (index, change) => {
        setCart((prev) => {
            const updated = [...prev];
            const item = updated[index];
            if (!item) return prev;

            const qty = Number(item.quantity) || 1;
            const price = Number(item.price) || 0;
            const unit = qty > 0 ? price / qty : price;

            const newQty = qty + change;
            if (newQty < 1) return prev;

            updated[index] = {
                ...item,
                quantity: newQty,
                price: unit * newQty,
            };

            return updated;
        });
    };

    const removeItem = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const totalPrice = cart.reduce((t, i) => t + (Number(i.price) || 0), 0);

    async function purchaseCart() {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        
        if (!name || !phone || !address) {
            toast.error("Please fill all fields");
            return;
        }

        
        if (!/^[0-9]{10}$/.test(phone)) {
            toast.error("Invalid phone number");
            return;
        }

        try {
            setIsPlacingOrder(true);

            const items = cart.map((item) => ({
                productID: item.productID,
                quantity: Number(item.quantity),
            }));

            const res = await axios.post(
               `${import.meta.env.VITE_API_URL}/api/orders`,{

                customerName: name === "" ? "Guest" : name,
                name: name === "" ? "Guest" : name, 
                phone,
                address,
                 items,
             },
            {
               headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

            toast.success(res?.data?.message || "Order placed successfully");
            setCart([]);
            localStorage.removeItem("cart");

            
            setName("");
            setPhone("");
            setAddress("");

        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#FCF8FF] px-3 sm:px-6 py-8 flex justify-center">
            <div className="w-full max-w-6xl">

                
                <div className="text-center mb-6">
                    <p className="text-[#8A5FBF] text-xs sm:text-sm uppercase tracking-widest">
                        Secure Checkout
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#8A5FBF]">
                        Complete Your Order
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Review items & place your order
                    </p>
                </div>

            
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    
                    <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold text-[#8A5FBF] text-lg">
                                Order Items
                            </h2>
                        </div>

                        <div className="p-4 space-y-4">
                            {cart.length > 0 ? cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row justify-between gap-4 bg-[#FCF8FF] p-4 rounded-2xl border"
                                >
                                    <div className="flex gap-3">
                                        <img
                                            src={item.image}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-[#8A5FBF] text-sm sm:text-base">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Rs. {item.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(index, -1)}
                                            className="px-3 py-1 border rounded"
                                        >-</button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() => updateQuantity(index, 1)}
                                            className="px-3 py-1 border rounded"
                                        >+</button>

                                        <button
                                            onClick={() => removeItem(index)}
                                            className="px-3 py-1 text-red-500 border rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-gray-500">
                                    Cart is empty
                                </p>
                            )}
                        </div>
                    </div>

                    
                    <div className="bg-white rounded-3xl border shadow-sm p-4 h-fit">
                        <h2 className="font-semibold text-[#8A5FBF] mb-3">
                            Summary
                        </h2>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Items</span>
                            <span>{cart.length}</span>
                        </div>

                        <div className="flex justify-between text-sm mb-4">
                            <span>Status</span>
                            <span>
                                {cart.length ? "Ready" : "Empty"}
                            </span>
                        </div>

                        
                        <div className="space-y-2 mb-4">

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />

                            <textarea
                                placeholder="Delivery Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />

                        </div>

                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>Rs. {totalPrice}</span>
                        </div>

                        <button
                            onClick={purchaseCart}
                            disabled={isPlacingOrder || !cart.length}
                            className="w-full bg-[#8A5FBF] text-white py-2 rounded-full disabled:bg-gray-400"
                        >
                            {isPlacingOrder ? "Processing..." : "Order"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}