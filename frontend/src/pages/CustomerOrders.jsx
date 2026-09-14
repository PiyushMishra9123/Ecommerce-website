import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller",
        {
          headers: {
            authorization: userInfo?.token,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/status`,
        { status },
        {
          headers: {
            authorization: userInfo?.token,
          },
        }
      );

      await fetchOrders();
    } catch (error) {
      console.log("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "Returned":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
            <span className="text-2xl">🛍️</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-5">
            Loading Orders...
          </h2>

          <p className="text-slate-500 mt-2">
            Please wait while we fetch customer orders.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          <p className="text-sm uppercase tracking-wider font-bold text-indigo-600 mb-2">
            Seller Management
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                Customer Orders
              </h1>

              <p className="text-slate-500 mt-2">
                Manage customer orders and update delivery status.
              </p>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">

              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Total Orders
              </p>

              <p className="text-2xl font-black text-indigo-600 mt-1">
                {orders.length}
              </p>

            </div>

          </div>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          {/* TOTAL */}

          <div className="premium-card p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Total Orders
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {orders.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                🛍️
              </div>

            </div>

            <p className="text-xs font-bold text-indigo-600 mt-4">
              All customer orders
            </p>

          </div>

          {/* ACTIVE */}

          <div className="premium-card p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Active Orders
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {
                    orders.filter(
                      (order) =>
                        !["Delivered", "Cancelled", "Returned"].includes(
                          order.status
                        )
                    ).length
                  }
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                🚚
              </div>

            </div>

            <p className="text-xs font-bold text-blue-600 mt-4">
              Orders in progress
            </p>

          </div>

          {/* DELIVERED */}

          <div className="premium-card p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  Delivered
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-2">
                  {
                    orders.filter(
                      (order) => order.status === "Delivered"
                    ).length
                  }
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                ✅
              </div>

            </div>

            <p className="text-xs font-bold text-emerald-600 mt-4">
              Successfully delivered
            </p>

          </div>

        </div>

        {/* ================= EMPTY STATE ================= */}

        {orders.length === 0 ? (
          <div className="premium-card p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">
              📦
            </div>

            <h2 className="text-2xl font-black text-slate-900 mt-5">
              No Orders Found
            </h2>

            <p className="text-slate-500 mt-2">
              Customer orders will appear here once they are placed.
            </p>

          </div>
        ) : (

          /* ================= ORDERS ================= */

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="premium-card p-6 md:p-8"
              >

                {/* ORDER HEADER */}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-2xl font-black text-slate-900">
                        {order.user?.name || "Customer"}
                      </h2>

                      <span
                        className={`px-3 py-1.5 rounded-xl border text-xs font-black ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                    </div>

                    <p className="text-slate-500 mt-1">
                      {order.user?.email}
                    </p>

                  </div>

                  <div className="lg:text-right">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Order Total
                    </p>

                    <p className="text-2xl font-black text-slate-900 mt-1">
                      ₹
                      {Number(
                        order.totalPrice || 0
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

                {/* ORDER INFORMATION */}

                <div className="grid md:grid-cols-2 gap-4 mt-7">

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Delivery Address
                    </p>

                    <p className="font-bold text-slate-900 mt-2">
                      {order.address || "N/A"}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Payment Method
                    </p>

                    <p className="font-black text-slate-900 mt-2">
                      {order.paymentMethod || "N/A"}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Order Date
                    </p>

                    <p className="font-bold text-slate-900 mt-2">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">

                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Products
                    </p>

                    <p className="font-black text-slate-900 mt-2">
                      {order.orderItems?.length || 0} Items
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-6 border-t border-slate-100">

                  <Link
                    to={`/customer-orders/${order._id}`}
                    className="flex-1 text-center gradient-button py-3 rounded-xl font-black shadow-lg shadow-indigo-200"
                  >
                    View Order Details →
                  </Link>

                  {order.status === "Order Placed" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "Confirmed"
                        )
                      }
                      disabled={updatingId === order._id}
                      className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {updatingId === order._id
                        ? "Updating..."
                        : "✓ Accept Order"}
                    </button>

                  )}

                  {order.status === "Confirmed" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "Shipped"
                        )
                      }
                      disabled={updatingId === order._id}
                      className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-black hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {updatingId === order._id
                        ? "Updating..."
                        : "🚚 Ship Order"}
                    </button>

                  )}

                  {order.status === "Shipped" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "Delivered"
                        )
                      }
                      disabled={updatingId === order._id}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {updatingId === order._id
                        ? "Updating..."
                        : "✓ Deliver Order"}
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default CustomerOrders;