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
        },
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      setUserInfo(data);

      // alert("Login Successful");

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
  <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">

    <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

      {/* Left */}

      <div className="hidden md:flex relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-12 flex-col justify-center overflow-hidden">

        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">

          <div className="text-5xl mb-6">
            🛍️
          </div>

          <h1 className="text-5xl font-extrabold mb-5">
            Welcome Back
          </h1>

          <p className="text-lg text-indigo-100 leading-relaxed">
            Login to continue your shopping journey
            and explore amazing products.
          </p>

          <div className="mt-10 space-y-4 text-indigo-100">
            <p>✓ Discover amazing products</p>
            <p>✓ Track your orders</p>
            <p>✓ Secure online payments</p>
          </div>

        </div>
      </div>

      {/* Right */}

      <div className="p-8 sm:p-12">

        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            ShopKart
          </p>

          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Login to your account
          </h2>

          <p className="text-slate-500 mt-2">
            Enter your details to continue.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="input-modern"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="input-modern"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-indigo-600 text-sm font-medium mt-2 hover:text-purple-600"
            >
              {showPassword
                ? "Hide Password"
                : "Show Password"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full gradient-button py-3.5 rounded-xl font-bold shadow-lg"
          >
            Login →
          </button>

        </form>

        <p className="mt-8 text-center text-slate-500">
          New to ShopKart?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:text-purple-600"
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
