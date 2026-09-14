import { useEffect, useState } from "react";
import axios from "axios";

function CancelOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo?.token) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller/cancelled",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log("Cancelled Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm uppercase tracking-wider font-bold text-red-600 mb-2">
            Order Management
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                Cancel Orders
              </h1>

              <p className="text-slate-500 mt-2">
                View and manage orders that have been cancelled.
              </p>
            </div>

            <div className="px-5 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-slate-500">
                Cancelled
              </span>

              <span className="ml-2 text-xl font-black text-red-600">
                {orders.length}
              </span>
            </div>

          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="premium-card p-6 mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
              ✕
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Cancelled Orders
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                These orders were cancelled by customers or due to order
                processing issues.
              </p>
            </div>

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="premium-card py-20 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center animate-pulse">
              <span className="text-2xl">⏳</span>
            </div>

            <h2 className="text-xl font-black text-slate-900 mt-5">
              Loading Orders...
            </h2>

            <p className="text-slate-500 mt-2">
              Please wait while we fetch cancelled orders.
            </p>

          </div>
        ) : orders.length === 0 ? (

          /* EMPTY STATE */
          <div className="premium-card py-20 text-center">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 flex items-center justify-center text-4xl">
              ✓
            </div>

            <h2 className="text-2xl font-black text-slate-900 mt-5">
              No Cancelled Orders
            </h2>

            <p className="text-slate-500 mt-2">
              Great! There are currently no cancelled orders.
            </p>

          </div>
        ) : (

          /* ORDERS */
          <div className="space-y-6">

            {orders.map((order, index) => (
              <div
                key={order._id}
                className="premium-card p-6 md:p-7"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-100">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl">
                      🛍️
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        Order #{index + 1}
                      </p>

                      <h3 className="text-lg font-black text-slate-900 mt-1">
                        {order.user?.name || "Customer"}
                      </h3>
                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />

                    <span className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-bold">
                      Cancelled
                    </span>

                  </div>

                </div>

                {/* CUSTOMER DETAILS */}
                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Customer
                    </p>

                    <h4 className="font-black text-slate-900 mt-2">
                      {order.user?.name || "N/A"}
                    </h4>

                    <p className="text-sm text-slate-500 mt-1 break-all">
                      {order.user?.email || "N/A"}
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">

                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Order Amount
                    </p>

                    <h4 className="text-2xl font-black text-slate-900 mt-2">
                      ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </h4>

                  </div>

                </div>

                {/* ADDRESS */}
                <div className="mt-5 p-5 rounded-2xl border border-slate-100">

                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Delivery Address
                  </p>

                  <p className="text-slate-700 font-semibold mt-2 leading-6">
                    {order.address || "Address not available"}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5 border-t border-slate-100">

                  <div>
                    <p className="text-xs text-slate-400 font-semibold">
                      Order ID
                    </p>

                    <p className="text-sm font-bold text-slate-700 mt-1 break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-sm">
                    Order Cancelled
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default CancelOrders;