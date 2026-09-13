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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#2874F0] text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Register</h1>

          <p className="text-lg">
            Create your account and start shopping or selling products.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">Create Account 🚀</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />

            {/* Role Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
            >
              <option value="customer">Customer</option>

              <option value="seller">Seller</option>
            </select>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-600 mt-2 text-sm"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FB641B] hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
