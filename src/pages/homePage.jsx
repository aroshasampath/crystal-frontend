import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import NotFoundPage from "./404Page";
import ContactPage from "./contactusPage";
import AboutPage from "./aboutPage";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import Loginpage from "./loginPage";
import CheakoutPage from "./cheakout";



function HomeLandingPage() {
  return (
    <div className="w-full min-h-[calc(100vh-75px)] bg-[#FCF8FF]">
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#8A5FBF] font-semibold tracking-wide uppercase mb-4">
              Premium Cosmetic Collection
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-[#2F2A2E] leading-tight">
              Glow With Confidence, Shine With Beauty ✨
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8 max-w-xl">
              Discover skincare and beauty essentials crafted to elevate your
              daily self-care routine with elegance, softness, and confidence.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/products"
                className="px-6 py-3 bg-[#8A5FBF] text-white rounded-full shadow-md hover:bg-[#7a4ec0] transition"
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="px-6 py-3 bg-white text-[#8A5FBF] border border-[#D9C2F0] rounded-full shadow-sm hover:bg-[#F8F1FF] transition"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
              alt="Beauty products"
              className="w-full max-w-xl h-[500px] object-cover rounded-[30px] shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <Routes>
        <Route path="login" element={<Loginpage />} />
        <Route index element={<HomeLandingPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="overview/:id" element={<ProductOverview />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cheackout" element={<CheakoutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}