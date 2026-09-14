import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { userInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [totalIncome, setTotalIncome] = useState(0);
  const [cancelOrders, setCancelOrders] = useState(0);
  const [returnOrders, setReturnOrders] = useState(0);

  useEffect(() => {
    if (userInfo?.user?.role === "seller") {
      fetchStats();
    }
  }, [userInfo]);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller/stats",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      setTotalIncome(data.totalIncome);
      setCancelOrders(data.cancelOrders);
      setReturnOrders(data.returnOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const isSeller =
    userInfo?.user?.role === "seller";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 sm:py-12">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ================= PROFILE CARD ================= */}

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">

          {/* ================= PROFILE HEADER ================= */}

          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 sm:px-10 py-10 sm:py-12 text-white">

            {/* Decorative circles */}

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-28 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Avatar */}

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl sm:text-5xl font-extrabold shadow-2xl shadow-indigo-900/40 border border-white/20">

                {userInfo?.user?.name
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

              {/* User Information */}

              <div>

                <p className="text-indigo-300 text-sm font-bold uppercase tracking-[0.15em] mb-2">
                  My Profile
                </p>

                <h1 className="text-3xl sm:text-4xl font-extrabold">
                  {userInfo?.user?.name}
                </h1>

                <p className="text-slate-300 mt-2">
                  {userInfo?.user?.email}
                </p>

                {/* Role Badge */}

                <div className="mt-4">

                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-sm font-bold">

                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>

                    {isSeller
                      ? "Seller Account"
                      : "Customer Account"}

                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================= PROFILE BODY ================= */}

          <div className="p-6 sm:p-10">

            {/* ================= ACCOUNT INFORMATION ================= */}

            <div>

              <div className="mb-5">

                <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-600">
                  Account
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Account Information
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Name */}

                <div className="group rounded-2xl bg-slate-50 border border-slate-100 p-5 hover:border-indigo-200 hover:bg-indigo-50/40 transition duration-300">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
                      👤
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                        Full Name
                      </p>

                      <p className="text-lg font-bold text-slate-900">
                        {userInfo?.user?.name}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Email */}

                <div className="group rounded-2xl bg-slate-50 border border-slate-100 p-5 hover:border-purple-200 hover:bg-purple-50/40 transition duration-300">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                      ✉️
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                        Email Address
                      </p>

                      <p className="text-lg font-bold text-slate-900 truncate">
                        {userInfo?.user?.email}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= QUICK ACTIONS ================= */}

            <div className="mt-10">

              <div className="mb-5">

                <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-600">
                  Dashboard
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Quick Actions
                </h2>

              </div>

              {isSeller ? (

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                  {/* Income */}

                  <div
                    onClick={() =>
                      navigate(
                        "/income-analytics"
                      )
                    }
                    className="group cursor-pointer rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
                        💰
                      </div>

                      <span className="text-white/60 group-hover:text-white transition">
                        →
                      </span>

                    </div>

                    <p className="text-indigo-100 text-sm font-semibold mt-6">
                      Total Income
                    </p>

                    <p className="text-3xl font-extrabold mt-1">
                      ₹{totalIncome}
                    </p>

                    <p className="text-xs text-indigo-200 mt-2">
                      View income analytics
                    </p>

                  </div>

                  {/* Cancel Orders */}

                  <div
                    onClick={() =>
                      navigate(
                        "/cancel-orders"
                      )
                    }
                    className="group cursor-pointer rounded-3xl bg-white border border-red-100 p-6 shadow-sm hover:shadow-xl hover:shadow-red-100 hover:-translate-y-1 transition duration-300"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
                        ❌
                      </div>

                      <span className="text-slate-300 group-hover:text-red-500 transition">
                        →
                      </span>

                    </div>

                    <p className="text-slate-500 text-sm font-semibold mt-6">
                      Cancel Orders
                    </p>

                    <p className="text-3xl font-extrabold text-red-600 mt-1">
                      {cancelOrders}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      View cancelled orders
                    </p>

                  </div>

                  {/* Return Orders */}

                  <div
                    onClick={() =>
                      navigate(
                        "/return-orders"
                      )
                    }
                    className="group cursor-pointer rounded-3xl bg-white border border-orange-100 p-6 shadow-sm hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1 transition duration-300"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">
                        ↩️
                      </div>

                      <span className="text-slate-300 group-hover:text-orange-500 transition">
                        →
                      </span>

                    </div>

                    <p className="text-slate-500 text-sm font-semibold mt-6">
                      Return Orders
                    </p>

                    <p className="text-3xl font-extrabold text-orange-500 mt-1">
                      {returnOrders}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      View return requests
                    </p>

                  </div>

                </div>

              ) : (

                <div className="grid sm:grid-cols-2 gap-5">

                  {/* My Orders */}

                  <div
                    onClick={() =>
                      navigate("/orders")
                    }
                    className="group cursor-pointer rounded-3xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition duration-300"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl">
                        📦
                      </div>

                      <span className="text-slate-300 text-xl group-hover:text-indigo-600 transition">
                        →
                      </span>

                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mt-6">
                      My Orders
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      Track your orders and view
                      order history.
                    </p>

                  </div>

                  {/* Cart */}

                  <div
                    onClick={() =>
                      navigate("/cart")
                    }
                    className="group cursor-pointer rounded-3xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1 transition duration-300"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl">
                        🛒
                      </div>

                      <span className="text-slate-300 text-xl group-hover:text-purple-600 transition">
                        →
                      </span>

                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mt-6">
                      My Cart
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      View your cart and continue
                      shopping.
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* ================= BOTTOM INFO ================= */}

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-100 p-5">

              <div className="flex items-start gap-4">

                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  🔐
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    Your Account is Secure
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Your account information is
                    protected and securely stored.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;