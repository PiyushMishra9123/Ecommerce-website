import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { userInfo, logout } =
    useContext(AuthContext);

  const { cartItems } =
    useContext(CartContext);

  return (
    <nav className="bg-[#2874F0] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold">
            ShopKart
          </h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {(!userInfo ||
  userInfo.user.role === "customer") && (
  <Link
    to="/"
    className="hover:text-yellow-300"
  >
    Home
  </Link>
)}

          {userInfo ? (
            <>
              {/* CUSTOMER MENU */}
              {userInfo.user.role ===
                "customer" && (
                <>
                  <Link
                    to="/cart"
                    className="relative hover:text-yellow-300"
                  >
                    🛒 Cart

                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/orders"
                    className="hover:text-yellow-300"
                  >
                    Orders
                  </Link>
                </>
              )}

              {/* SELLER MENU */}
              {userInfo.user.role ===
                "seller" && (
                <Link
                  to="/seller"
                  className="hover:text-yellow-300"
                >
                  Seller Dashboard
                </Link>
              )}

              {/* ADMIN MENU */}
              {userInfo.user.isAdmin && (
                <Link
                  to="/admin"
                  className="hover:text-yellow-300"
                >
                  Admin
                </Link>
              )}

              <Link
                to="/profile"
                className="hover:text-yellow-300"
              >
                Profile
              </Link>

              <span className="font-semibold">
                Hi, {userInfo.user.name}
              </span>

              <button
                onClick={logout}
                className="bg-white text-[#2874F0] px-4 py-1 rounded font-semibold hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-[#2874F0] px-4 py-1 rounded font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-yellow-300"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;