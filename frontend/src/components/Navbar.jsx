import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 text-white shadow-xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
              🛍️
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Shop<span className="text-indigo-400">Kart</span>
              </h1>

              <p className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                Smart Shopping
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <div className="flex items-center gap-2 sm:gap-5 text-sm">

            {(!userInfo ||
              userInfo.user.role === "customer") && (
              <Link
                to="/"
                className="hidden sm:block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                Home
              </Link>
            )}

            {userInfo ? (
              <>
                {userInfo.user.role === "customer" && (
                  <>
                    <Link
                      to="/cart"
                      className="relative px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                    >
                      🛒
                      <span className="hidden sm:inline ml-1">
                        Cart
                      </span>

                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="hidden sm:block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                    >
                      Orders
                    </Link>
                  </>
                )}

                {userInfo.user.role === "seller" && (
                  <Link
                    to="/seller"
                    className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                  >
                    <span className="hidden sm:inline">
                      Seller Dashboard
                    </span>
                    <span className="sm:hidden">
                      Seller
                    </span>
                  </Link>
                )}

                {userInfo.user.isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="hidden sm:block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  Profile
                </Link>

                <div className="hidden lg:flex items-center gap-2 text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                    {userInfo.user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <span className="font-medium">
                    Hi, {userInfo.user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-200 transition shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:from-indigo-600 hover:to-purple-700 transition shadow-lg shadow-indigo-500/20"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hidden sm:block px-3 py-2 text-slate-300 hover:text-white transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;