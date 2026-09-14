import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/users/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Registration Successful");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-x-hidden">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Section */}
        <div className="hidden md:flex relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8 lg:p-12 flex-col justify-center overflow-hidden">

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="text-5xl mb-6">
              🚀
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
              Join ShopKart
            </h1>

            <p className="text-base lg:text-lg text-indigo-100 leading-relaxed max-w-md">
              Create your account and start your personalized shopping
              experience.
            </p>

            <div className="mt-8 lg:mt-10 space-y-4 text-indigo-100">
              <p>✓ Easy shopping experience</p>
              <p>✓ Track your orders</p>
              <p>✓ Become a seller</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-5 sm:p-8 lg:p-12">

          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl shadow-lg">
              🛍️
            </div>

            <p className="mt-3 text-sm font-bold text-indigo-600">
              SHOPKART
            </p>
          </div>

          <div className="mb-6 sm:mb-7">
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              ShopKart
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 leading-tight">
              Create your account
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-2">
              It only takes a minute to get started.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Type
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-modern"
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-modern pr-20"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xs sm:text-sm font-semibold hover:text-purple-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full gradient-button py-3 sm:py-3.5 rounded-xl font-bold shadow-lg text-sm sm:text-base"
            >
              Create Account →
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 sm:mt-7 text-center text-sm sm:text-base text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:text-purple-600 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;