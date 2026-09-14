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

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
            <span className="text-2xl">📦</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-5">
            Loading Order...
          </h2>

          <p className="text-slate-500 mt-2">
            Please wait while we fetch order details.
          </p>
        </div>
      </div>
    );
  }

  // ================= ORDER NOT FOUND =================

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="premium-card max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 flex items-center justify-center text-4xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-5">
            Order Not Found
          </h2>

          <p className="text-slate-500 mt-2">
            We couldn't find the requested order.
          </p>

          <Link
            to="/customer-orders"
            className="inline-block mt-6 gradient-button px-6 py-3 rounded-xl font-bold"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-50 py-10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <Link
            to="/customer-orders"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            ← Back to Customer Orders
          </Link>

          <div className="mt-7">

            <p className="text-sm uppercase tracking-wider font-bold text-indigo-600 mb-2">
              Order Management
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                  Order Details
                </h1>

                <p className="text-slate-500 mt-2">
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

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-7 md:p-9 mb-8 shadow-2xl">

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative">

            <p className="text-indigo-300 text-sm uppercase tracking-wider font-bold">
              Order Summary
            </p>

            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              Customer Order
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-7">

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <p className="text-sm text-slate-400">
                  Total Amount
                </p>

                <p className="text-2xl font-black text-white mt-1">
                  ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <p className="text-sm text-slate-400">
                  Payment Method
                </p>

                <p className="text-lg font-black text-white mt-2">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <p className="text-sm text-slate-400">
                  Products
                </p>

                <p className="text-2xl font-black text-white mt-1">
                  {order.orderItems?.length || 0}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ================= CUSTOMER INFORMATION ================= */}

        <div className="premium-card p-6 md:p-8 mb-8">

          <div className="flex items-center gap-4 mb-7">

            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl">
              👤
            </div>

            <div>
              <p className="text-sm uppercase tracking-wider font-bold text-indigo-600">
                Customer
              </p>

              <h2 className="text-2xl font-black text-slate-900">
                Customer Information
              </h2>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* NAME */}

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Customer Name
              </p>

              <p className="text-lg font-black text-slate-900 mt-2">
                {order.user?.name || "N/A"}
              </p>
            </div>

            {/* EMAIL */}

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Email Address
              </p>

              <p className="text-lg font-black text-slate-900 mt-2 break-all">
                {order.user?.email || "N/A"}
              </p>
            </div>

            {/* ADDRESS */}

            <div className="md:col-span-2 rounded-2xl bg-slate-50 border border-slate-100 p-5">

              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Delivery Address
              </p>

              <p className="text-lg font-bold text-slate-900 mt-2">
                {order.address || "N/A"}
              </p>

            </div>

          </div>

        </div>

        {/* ================= ORDERED PRODUCTS ================= */}

        <div className="premium-card overflow-hidden">

          <div className="p-6 md:p-8 border-b border-slate-100">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <p className="text-sm uppercase tracking-wider font-bold text-purple-600">
                  Order Items
                </p>

                <h2 className="text-3xl font-black text-slate-900 mt-1">
                  Ordered Products
                </h2>

              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-black">
                {order.orderItems?.length || 0} Items
              </div>

            </div>

          </div>

          <div className="p-4 md:p-6 space-y-4">

            {order.orderItems?.map((item, index) => (

              <div
                key={index}
                className="group border border-slate-100 rounded-2xl p-4 md:p-5 hover:border-indigo-200 hover:bg-indigo-50/30 transition"
              >

                <div className="flex flex-col sm:flex-row gap-5">

                  {/* IMAGE */}

                  <div className="w-full sm:w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center overflow-hidden flex-shrink-0">

                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `https://ecommerce-website-00z8.onrender.com${item.image}`
                      }
                      alt={item.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition"
                    />

                  </div>

                  {/* PRODUCT INFO */}

                  <div className="flex-1">

                    <h3 className="text-xl font-black text-slate-900">
                      {item.name}
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-3">

                      <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold">
                        Qty: {item.qty}
                      </span>

                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold">
                        ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                  {/* TOTAL */}

                  <div className="sm:text-right">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Item Total
                    </p>

                    <p className="text-xl font-black text-slate-900 mt-1">
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

          <div className="border-t border-slate-100 p-6 md:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Order Total
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Final amount for this order
                </p>
              </div>

              <p className="text-3xl font-black gradient-text">
                ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CustomerOrderDetails;