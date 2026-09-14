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
        },
      );

      alert("Registration Successful");
    } catch (error) {
      alert(error.response?.data?.message);
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
            🚀
          </div>

          <h1 className="text-5xl font-extrabold mb-5">
            Join ShopKart
          </h1>

          <p className="text-lg text-indigo-100 leading-relaxed">
            Create your account and start your
            personalized shopping experience.
          </p>

          <div className="mt-10 space-y-4 text-indigo-100">
            <p>✓ Easy shopping experience</p>
            <p>✓ Track your orders</p>
            <p>✓ Become a seller</p>
          </div>

        </div>
      </div>

      {/* Right */}

      <div className="p-8 sm:p-12">

        <div className="mb-7">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            ShopKart
          </p>

          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Create your account
          </h2>

          <p className="text-slate-500 mt-2">
            It only takes a minute to get started.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="input-modern"
              required
            />
          </div>

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
              Account Type
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="input-modern"
            >
              <option value="customer">
                Customer
              </option>

              <option value="seller">
                Seller
              </option>
            </select>
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
              placeholder="Create a password"
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
              className="text-indigo-600 text-sm font-medium mt-2"
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
            Create Account →
          </button>

        </form>

        <p className="mt-7 text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:text-purple-600"
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
