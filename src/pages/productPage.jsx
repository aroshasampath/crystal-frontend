import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCart from "../components/productCart";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/products")
                .then((response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    toast.error("Failed to load products");
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-screen bg-[#FCF8FF] p-6 flex flex-wrap gap-6 items-center justify-center">
            {products.map((item) => {
                return (
                    <ProductCart key={item.productID} product={item} />
                );
            })}
        </div>
    );
}