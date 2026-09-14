import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);

      if (data.user.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Email or Password is incorrect", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-x-hidden">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">

        {/* ================= LEFT SECTION ================= */}

        <div className="hidden md:flex relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8 lg:p-12 flex-col justify-center overflow-hidden">

          {/* Decorative circles */}

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">

            <div className="text-5xl mb-6">
              🛍️
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
              Welcome Back
            </h1>

            <p className="text-base lg:text-lg text-indigo-100 leading-relaxed max-w-md">
              Login to continue your shopping journey
              and explore amazing products.
            </p>

            <div className="mt-8 lg:mt-10 space-y-4 text-indigo-100">

              <p>✓ Discover amazing products</p>

              <p>✓ Track your orders</p>

              <p>✓ Secure online payments</p>

            </div>

          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="p-5 sm:p-8 lg:p-12">

          {/* Mobile Logo */}

          <div className="md:hidden flex items-center justify-center mb-7">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              🛍️
            </div>

          </div>

          {/* Header */}

          <div className="mb-7 sm:mb-8">

            <p className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              ShopKart
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 leading-tight">
              Login to your account
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Enter your details to continue.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

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

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-modern pr-24"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 text-xs sm:text-sm font-semibold hover:text-purple-600 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full gradient-button py-3 sm:py-3.5 rounded-xl font-bold shadow-lg text-sm sm:text-base"
            >
              Login →
            </button>

          </form>

          {/* Register */}

          <p className="mt-7 sm:mt-8 text-center text-sm sm:text-base text-slate-500">
            New to ShopKart?{" "}

            <Link
              to="/register"
              className="text-indigo-600 font-bold hover:text-purple-600 transition"
            >
              Create Account
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;