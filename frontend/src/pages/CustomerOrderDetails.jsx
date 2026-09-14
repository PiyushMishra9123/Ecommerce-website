import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CustomerOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-website-00z8.onrender.com/api/orders/seller/${id}`,
        {
          headers: {
            authorization: userInfo?.token,
          },
        }
      );

      setOrder(data);
    } catch (error) {
      console.log("Customer Order Details Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= STATUS =================

  const getStatusStyle = () => {
    switch (order.status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "cancelled":
      case "canceled":
        return "bg-red-50 text-red-700 border-red-200";

      case "returned":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
            <span className="text-xl sm:text-2xl">📦</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-5">
            Loading Order...
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Please wait while we fetch order details.
          </p>

        </div>
      </div>
    );
  }

  // ================= ORDER NOT FOUND =================

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
        <div className="premium-card max-w-md w-full p-6 sm:p-8 text-center">

          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-red-50 flex items-center justify-center text-3xl sm:text-4xl">
            ⚠️
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-5">
            Order Not Found
          </h2>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            We couldn't find the requested order.
          </p>

          <Link
            to="/customer-orders"
            className="inline-block mt-6 gradient-button px-5 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base"
          >
            Back to Orders
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 overflow-x-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-7 sm:mb-8">

          <Link
            to="/customer-orders"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            ← Back to Customer Orders
          </Link>

          <div className="mt-6 sm:mt-7">

            <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600 mb-2">
              Order Management
            </p>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

              <div className="min-w-0">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Order Details
                </h1>

                <p className="text-sm sm:text-base text-slate-500 mt-2">
                  View customer information and ordered products.
                </p>

              </div>

              <div
                className={`inline-flex w-fit items-center gap-2 px-4 py-2 rounded-xl border text-sm font-black ${getStatusStyle()}`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {order.status}
              </div>

            </div>

          </div>

        </div>

        {/* ================= ORDER SUMMARY ================= */}

        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-5 sm:p-7 lg:p-9 mb-6 sm:mb-8 shadow-2xl">

          <div className="absolute -right-20 -top-20 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -left-20 -bottom-20 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative">

            <p className="text-indigo-300 text-xs sm:text-sm uppercase tracking-wider font-bold">
              Order Summary
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-2">
              Customer Order
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mt-5 sm:mt-7">

              {/* TOTAL AMOUNT */}

              <div className="rounded-2xl bg-white/10 border border-white/10 p-4 sm:p-5">

                <p className="text-xs sm:text-sm text-slate-400">
                  Total Amount
                </p>

                <p className="text-xl sm:text-2xl font-black text-white mt-1 break-words">
                  ₹
                  {Number(
                    order.totalPrice || 0
                  ).toLocaleString("en-IN")}
                </p>

              </div>

              {/* PAYMENT */}

              <div className="rounded-2xl bg-white/10 border border-white/10 p-4 sm:p-5">

                <p className="text-xs sm:text-sm text-slate-400">
                  Payment Method
                </p>

                <p className="text-base sm:text-lg font-black text-white mt-2 break-words">
                  {order.paymentMethod || "N/A"}
                </p>

              </div>

              {/* PRODUCTS */}

              <div className="rounded-2xl bg-white/10 border border-white/10 p-4 sm:p-5">

                <p className="text-xs sm:text-sm text-slate-400">
                  Products
                </p>

                <p className="text-xl sm:text-2xl font-black text-white mt-1">
                  {order.orderItems?.length || 0}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= CUSTOMER INFORMATION ================= */}

        <div className="premium-card p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">

          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7">

            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl sm:text-2xl">
              👤
            </div>

            <div className="min-w-0">

              <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600">
                Customer
              </p>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Customer Information
              </h2>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">

            {/* NAME */}

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">

              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Customer Name
              </p>

              <p className="text-base sm:text-lg font-black text-slate-900 mt-2 break-words">
                {order.user?.name || "N/A"}
              </p>

            </div>

            {/* EMAIL */}

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">

              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Email Address
              </p>

              <p className="text-base sm:text-lg font-black text-slate-900 mt-2 break-all">
                {order.user?.email || "N/A"}
              </p>

            </div>

            {/* ADDRESS */}

            <div className="sm:col-span-2 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">

              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Delivery Address
              </p>

              <p className="text-base sm:text-lg font-bold text-slate-900 mt-2 break-words leading-relaxed">
                {order.address || "N/A"}
              </p>

            </div>

          </div>

        </div>

        {/* ================= ORDERED PRODUCTS ================= */}

        <div className="premium-card overflow-hidden">

          <div className="p-5 sm:p-6 lg:p-8 border-b border-slate-100">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-purple-600">
                  Order Items
                </p>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Ordered Products
                </h2>

              </div>

              <div className="w-fit px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-black">
                {order.orderItems?.length || 0} Items
              </div>

            </div>

          </div>

          <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">

            {order.orderItems?.map((item, index) => (

              <div
                key={index}
                className="group border border-slate-100 rounded-2xl p-3 sm:p-4 lg:p-5 hover:border-indigo-200 hover:bg-indigo-50/30 transition"
              >

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">

                  {/* IMAGE */}

                  <div className="w-full sm:w-28 h-40 sm:h-28 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden shrink-0">

                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `https://ecommerce-website-00z8.onrender.com${item.image}`
                      }
                      alt={item.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition"
                    />

                  </div>

                  {/* PRODUCT INFO */}

                  <div className="flex-1 min-w-0">

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 break-words">
                      {item.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">

                      <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs sm:text-sm font-bold">
                        Qty: {item.qty}
                      </span>

                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold">
                        ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                  {/* TOTAL */}

                  <div className="sm:text-right border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Item Total
                    </p>

                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.qty || 0)
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ================= TOTAL ================= */}

          <div className="border-t border-slate-100 p-5 sm:p-6 lg:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <p className="text-sm font-bold text-slate-500">
                  Order Total
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Final amount for this order
                </p>

              </div>

              <p className="text-2xl sm:text-3xl font-black gradient-text">
                ₹
                {Number(
                  order.totalPrice || 0
                ).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerOrderDetails;