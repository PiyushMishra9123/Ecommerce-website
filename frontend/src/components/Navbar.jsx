import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 text-white shadow-xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
              🛍️
            </div>

            <div>
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight">
                Shop<span className="text-indigo-400">Kart</span>
              </h1>

              <p className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                Smart Shopping
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-3 text-sm">

            {(!userInfo || userInfo.user.role === "customer") && (
              <Link
                to="/"
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
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
                      <span className="ml-1">Cart</span>

                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
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
                    Seller Dashboard
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
                  className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  Profile
                </Link>

                {/* User */}
                <div className="hidden lg:flex items-center gap-2 text-slate-300 ml-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                    {userInfo.user.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="font-medium">
                    Hi, {userInfo.user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="ml-1 px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-200 transition shadow-sm"
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
                  className="px-3 py-2 text-slate-300 hover:text-white transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="flex md:hidden items-center gap-2">

            {/* Mobile Cart */}
            {userInfo?.user.role === "customer" && (
              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition"
              >
                🛒

                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-white/10 flex flex-col items-center justify-center gap-1.5 hover:bg-white/15 transition"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-white transition ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`w-5 h-0.5 bg-white transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`w-5 h-0.5 bg-white transition ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-2">

              {(!userInfo || userInfo.user.role === "customer") && (
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 transition"
                >
                  🏠 Home
                </Link>
              )}

              {userInfo ? (
                <>
                  {userInfo.user.role === "customer" && (
                    <>
                      <Link
                        to="/orders"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 transition"
                      >
                        📦 Orders
                      </Link>
                    </>
                  )}

                  {userInfo.user.role === "seller" && (
                    <Link
                      to="/seller"
                      onClick={closeMenu}
                      className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 transition"
                    >
                      🏪 Seller Dashboard
                    </Link>
                  )}

                  {userInfo.user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 transition"
                    >
                      ⚙️ Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 transition"
                  >
                    👤 Profile
                  </Link>

                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 mt-1 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                      {userInfo.user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {userInfo.user.name}
                      </p>

                      <p className="text-xs text-slate-400 capitalize">
                        {userInfo.user.role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl bg-white/10 text-slate-200 text-center hover:bg-white/15 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;