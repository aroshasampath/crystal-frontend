import React, { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    fristName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMessage("");
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.fristName ||
      !formData.lastName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fristName: formData.fristName,
          lastName: formData.lastName,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Account created successfully.");
        setFormData({
          email: "",
          fristName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.message || "Failed to create account.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8FF]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#D9C2F0] via-[#FCF8FF] to-[#f5edff] px-12">
          <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-[#8A5FBF]/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#8A5FBF]/10 blur-3xl"></div>

          <div className="relative z-10 max-w-lg">
            <span className="inline-block rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-[#8A5FBF] shadow-md">
              Crystal Beauty
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-[#3d2856]">
              Create Your Beauty Account
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#6f5f81]">
              Join Crystal Beauty and explore premium skincare, makeup, and
              beauty essentials crafted for your everyday glow.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white/75 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9C2F0] text-xl">
                  ✨
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d1f3d]">
                    Exclusive Offers
                  </h3>
                  <p className="text-sm text-[#7d6b91]">
                    Get members-only discounts and seasonal beauty deals.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/75 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9C2F0] text-xl">
                  💜
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d1f3d]">
                    Secure Shopping
                  </h3>
                  <p className="text-sm text-[#7d6b91]">
                    Safe checkout and a smoother shopping experience.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/75 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9C2F0] text-xl">
                  🌸
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d1f3d]">
                    Save Your Favorites
                  </h3>
                  <p className="text-sm text-[#7d6b91]">
                    Wishlist products and track orders with ease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side / Form */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl rounded-[28px] border border-[#eadcf8] bg-white p-6 shadow-[0_20px_50px_rgba(138,95,191,0.18)] sm:p-8">
            <div className="mb-8 text-center lg:text-left">
              <div className="mb-3 lg:hidden">
                <span className="inline-block rounded-full bg-[#D9C2F0]/60 px-4 py-2 text-sm font-semibold text-[#8A5FBF]">
                  Crystal Beauty
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#2d1f3d]">Sign Up</h2>
              <p className="mt-2 text-sm text-[#7d6b91]">
                Start your beauty journey with us
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2d1f3d]">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fristName"
                    placeholder="Enter your first name"
                    value={formData.fristName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#eadcf8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5FBF] focus:ring-4 focus:ring-[#8A5FBF]/15"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2d1f3d]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#eadcf8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5FBF] focus:ring-4 focus:ring-[#8A5FBF]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2d1f3d]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#eadcf8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5FBF] focus:ring-4 focus:ring-[#8A5FBF]/15"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2d1f3d]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#eadcf8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5FBF] focus:ring-4 focus:ring-[#8A5FBF]/15"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2d1f3d]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#eadcf8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5FBF] focus:ring-4 focus:ring-[#8A5FBF]/15"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#8A5FBF] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#7a4fb0] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-[#7d6b91]">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-[#8A5FBF] hover:underline"
                >
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}