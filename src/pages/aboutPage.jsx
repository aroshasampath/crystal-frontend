import { useNavigate } from "react-router-dom";

export default function AboutPage() {

    const navigate = useNavigate();

    return (
        <div className="w-full min-h-[100vh] bg-[#FCF8FF] px-6 py-12 flex justify-center">
            
            <div className="max-w-5xl w-full">

                <h1 className="text-4xl font-bold text-[#8A5FBF] text-center">
                    About Crystal Beauty ✨
                </h1>

                <p className="text-center text-gray-500 mt-3 mb-10">
                    Enhancing your natural beauty with premium cosmetic products
                </p>

                {/* Section 1 */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-[#8A5FBF] mb-3">
                        Who We Are
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Crystal Beauty is a modern cosmetic brand dedicated to bringing out the confidence and elegance in every woman. 
                        We carefully select high-quality beauty products that are safe, effective, and designed to enhance your natural glow.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-[#8A5FBF] mb-3">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Our mission is to provide affordable luxury beauty products that empower women to feel confident and beautiful every day. 
                        We believe beauty should be simple, accessible, and enjoyable.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-[#8A5FBF] mb-3">
                        Why Choose Us
                    </h2>
                    <ul className="text-gray-600 space-y-2">
                        <li>💜 High-quality and trusted products</li>
                        <li>🌿 Skin-friendly ingredients</li>
                        <li>🚚 Fast and reliable delivery</li>
                        <li>💄 Latest beauty trends</li>
                        <li>⭐ Excellent customer support</li>
                    </ul>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-10">
                    <button 
                        onClick={() => navigate("/products")}
                        className="px-6 py-3 bg-[#8A5FBF] text-white rounded-full font-semibold hover:bg-[#7a4ec0] transition"
                    >
                        Explore Products
                    </button>
                </div>

            </div>

        </div>
    )
}