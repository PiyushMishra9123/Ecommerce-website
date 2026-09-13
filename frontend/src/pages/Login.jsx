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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#2874F0] text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Login</h1>

          <p className="text-lg">
            Get access to your Orders, Wishlist and Recommendations.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">Welcome Back 👋</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            New User?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
