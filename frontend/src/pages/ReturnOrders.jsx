import { useEffect, useState } from "react";
import axios from "axios";

function ReturnOrders() {
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
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller/returned",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log("Returned Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-7 sm:mb-10">
          <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-orange-600 mb-2">
            Order Management
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Return Orders
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
                View and manage products returned by customers.
              </p>
            </div>

            <div className="w-full md:w-auto px-5 py-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between md:justify-start gap-2">
              <span className="text-sm font-semibold text-slate-500">
                Returned
              </span>

              <span className="text-xl font-black text-orange-600">
                {orders.length}
              </span>
            </div>

          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="premium-card p-5 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start sm:items-center gap-4">

            <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-2xl bg-orange-50 flex items-center justify-center text-xl sm:text-2xl">
              ↩
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Returned Orders
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-5">
                Review customer returns and keep track of returned orders.
              </p>
            </div>

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="premium-card py-16 sm:py-20 px-5 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center animate-pulse">
              <span className="text-2xl">⏳</span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-5">
              Loading Orders...
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Please wait while we fetch returned orders.
            </p>

          </div>
        ) : orders.length === 0 ? (

          /* EMPTY STATE */
          <div className="premium-card py-16 sm:py-20 px-5 text-center">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 flex items-center justify-center text-4xl">
              ✓
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-5">
              No Returned Orders
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-2">
              There are currently no returned orders.
            </p>

          </div>
        ) : (

          /* ORDERS */
          <div className="space-y-4 sm:space-y-6">

            {orders.map((order, index) => (
              <div
                key={order._id}
                className="premium-card p-4 sm:p-6 lg:p-7"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">

                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                    <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-lg sm:text-xl">
                      📦
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">
                        Order #{index + 1}
                      </p>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 truncate">
                        {order.user?.name || "Customer"}
                      </h3>
                    </div>

                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">

                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />

                    <span className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 text-xs sm:text-sm font-bold">
                      Returned
                    </span>

                  </div>

                </div>

                {/* CUSTOMER + AMOUNT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-5 sm:mt-6">

                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Customer
                    </p>

                    <h4 className="font-black text-slate-900 mt-2 break-words">
                      {order.user?.name || "N/A"}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1 break-all">
                      {order.user?.email || "N/A"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Order Amount
                    </p>

                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      ₹
                      {Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </h4>
                  </div>

                </div>

                {/* ADDRESS */}
                <div className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-white">

                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Delivery Address
                  </p>

                  <p className="text-sm sm:text-base text-slate-700 font-semibold mt-2 leading-6 break-words">
                    {order.address || "Address not available"}
                  </p>

                </div>

                {/* RETURN INFO */}
                <div className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl bg-orange-50 border border-orange-100">

                  <div className="flex items-start gap-3">

                    <span className="text-xl flex-shrink-0">
                      ↩
                    </span>

                    <div>
                      <p className="font-black text-orange-700">
                        Product Returned
                      </p>

                      <p className="text-xs sm:text-sm text-orange-600 mt-1 leading-5">
                        This order has been marked as returned and requires
                        seller attention.
                      </p>
                    </div>

                  </div>

                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 sm:mt-6 pt-5 border-t border-slate-100">

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-semibold">
                      Order ID
                    </p>

                    <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="self-start sm:self-auto px-4 py-2 rounded-xl bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm">
                    Return Process
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

export default ReturnOrders;