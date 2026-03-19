import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Loginpage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function Login() {

        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", {
            email: email,
            password: password
        })
        localStorage.setItem("token", response.data.token)
        const user = response.data.user;
        if(user.role == "admin") {
            window.location.href = "/admin"
        }else{
            window.location.href = "/"
        }

        }catch(error){
            console.log("login failed",error)
            toast.error("Login failed.cheak your credentials")
        }
        
    }

    return (
        <div
            className="w-full min-h-screen flex bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80')"
            }}
        >
            <div className="w-full min-h-screen bg-black/30 flex">
                
                <div className="hidden lg:flex w-1/2 h-screen flex-col justify-center px-16">
                    <div className="max-w-lg">
                        <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4">
                            Premium Cosmetic Store
                        </p>

                        <h1 className="text-6xl font-bold text-white leading-tight">
                            Crystal Beauty
                        </h1>

                        <p className="text-white/90 text-lg mt-6 leading-8">
                            Discover elegant beauty essentials crafted to enhance your confidence, glow, and everyday self-care routine.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm border border-white/20">
                                Luxury Care
                            </div>
                            <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm border border-white/20">
                                Trusted Products
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 min-h-screen flex justify-center items-center px-4 sm:px-8">
                    <div className="w-full max-w-md bg-white/25 backdrop-blur-xl border border-white/30 shadow-2xl rounded-[30px] p-8 sm:p-10">
                        
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#D9C2F0] flex items-center justify-center text-2xl shadow-md">
                                ✨
                            </div>

                            <h2 className="text-4xl font-bold text-white mt-4">
                                Welcome Back
                            </h2>

                            <p className="text-white/85 mt-2 text-sm sm:text-base">
                                Sign in to continue your Crystal Beauty journey
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="text-left">
                                <label className="block text-white text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    placeholder="Enter your email address"
                                    className="w-full h-[52px] bg-white/90 rounded-2xl px-4 outline-none border border-white/40 focus:ring-2 focus:ring-[#D9C2F0] text-gray-700 placeholder:text-gray-400 shadow-sm"
                                />
                            </div>

                            <div className="text-left">
                                <label className="block text-white text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full h-[52px] bg-white/90 rounded-2xl px-4 outline-none border border-white/40 focus:ring-2 focus:ring-[#D9C2F0] text-gray-700 placeholder:text-gray-400 shadow-sm"
                                />
                            </div>

                            

                            <button
                                className="w-full h-[52px] bg-[#8A5FBF] text-white rounded-2xl font-semibold text-lg hover:bg-[#7448aa] transition duration-300 shadow-lg"
                                onClick={Login}
                            >
                                Login
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/90 text-sm">
                                Don’t have an account?
                                <span className="ml-2 font-semibold cursor-pointer hover:underline text-[#F3EAFE]">
                                    Register Now
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}