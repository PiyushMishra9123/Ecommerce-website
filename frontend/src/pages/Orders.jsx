import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/myorders",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      toast.success(
        "✅ Order Cancelled Successfully",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong",
        {
          position: "top-center",
        }
      );
    }
  };

  const returnOrder = async (id) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/return`,
        {},
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      toast.success(
        "✅ Return Request Submitted",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong",
        {
          position: "top-center",
        }
      );
    }
  };

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("ShopKart Invoice", 70, 20);

    doc.setFontSize(12);

    doc.text(
      `Order ID : ${order._id}`,
      15,
      40
    );

    doc.text(
      `Status : ${order.status}`,
      15,
      50
    );

    doc.text(
      `Payment : ${order.paymentMethod}`,
      15,
      60
    );

    doc.text(
      `Total : ₹${order.totalPrice}`,
      15,
      70
    );

    autoTable(doc, {
      startY: 85,

      head: [
        ["Product", "Qty", "Price"],
      ],

      body: order.orderItems.map((item) => [
        item.name,
        item.qty,
        `₹${item.price}`,
      ]),
    });

    doc.save(
      `Invoice-${order._id}.pdf`
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "Confirmed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";

      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-orange-50 text-orange-700 border-orange-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-amber-500";

      case "Confirmed":
        return "bg-indigo-500";

      case "Shipped":
        return "bg-purple-500";

      case "Delivered":
        return "bg-emerald-500";

      case "Cancelled":
        return "bg-red-500";

      default:
        return "bg-orange-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-600 mb-2">
            Shopping History
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">

            <div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                My Orders
              </h1>

              <p className="text-slate-500 mt-2">
                Track and manage all your orders.
              </p>

            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-2">

              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>

              <span className="text-sm font-bold text-slate-700">
                {orders.length}{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </span>

            </div>

          </div>

        </div>

        {/* ================= EMPTY ORDERS ================= */}

        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-12 sm:p-20 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-4xl mb-6">
              📦
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              No Orders Found
            </h2>

            <p className="text-slate-500 max-w-md mx-auto">
              You haven't placed any orders yet.
              Start shopping and your orders will
              appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition duration-300 overflow-hidden"
              >

                {/* ================= ORDER HEADER ================= */}

                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-5 sm:px-8 py-5">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Order ID
                      </p>

                      <p className="font-mono text-sm sm:text-base break-all text-slate-200">
                        {order._id}
                      </p>

                    </div>

                    <div>

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm ${getStatusStyle(
                          order.status
                        )}`}
                      >

                        <span
                          className={`w-2 h-2 rounded-full ${getStatusDot(
                            order.status
                          )}`}
                        ></span>

                        {order.status}

                      </span>

                    </div>

                  </div>

                </div>

                {/* ================= ORDER BODY ================= */}

                <div className="p-5 sm:p-8">

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-5">
                    Ordered Products
                  </h2>

                  {/* Products */}

                  <div className="space-y-4">

                    {order.orderItems.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/40 transition"
                        >

                          {/* Product */}

                          <div className="flex items-center gap-4">

                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">

                              <img
                                src={
                                  item.product?.image
                                    ? `https://ecommerce-website-00z8.onrender.com${item.product.image}`
                                    : item.image
                                      ? `https://ecommerce-website-00z8.onrender.com${item.image}`
                                      : "https://via.placeholder.com/150"
                                }
                                alt={item.name}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-contain transition duration-300 hover:scale-105"
                              />

                            </div>

                            <div>

                              <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold mb-1">
                                Product
                              </p>

                              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                                {item.name}
                              </h3>

                              <p className="text-xl font-extrabold text-slate-900 mt-2">
                                ₹{item.price}
                              </p>

                            </div>

                          </div>

                          {/* Quantity */}

                          <div className="sm:text-right">

                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                              Quantity
                            </p>

                            <p className="text-lg font-extrabold text-slate-800">
                              × {item.qty}
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  {/* ================= ORDER SUMMARY ================= */}

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-7 border-t border-slate-100">

                    {/* Order ID */}

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                        Order ID
                      </p>

                      <p className="font-semibold text-slate-700 text-sm break-all">
                        {order._id}
                      </p>

                    </div>

                    {/* Items */}

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                        Items
                      </p>

                      <p className="font-extrabold text-xl text-slate-900">
                        {order.orderItems.length}
                      </p>

                    </div>

                    {/* Total */}

                    <div className="rounded-2xl bg-indigo-50 p-4">

                      <p className="text-xs uppercase tracking-wider text-indigo-500 font-bold mb-2">
                        Total Amount
                      </p>

                      <p className="font-extrabold text-2xl text-indigo-700">
                        ₹{order.totalPrice}
                      </p>

                    </div>

                    {/* Payment */}

                    <div className="rounded-2xl bg-emerald-50 p-4">

                      <p className="text-xs uppercase tracking-wider text-emerald-600 font-bold mb-2">
                        Payment
                      </p>

                      <p className="font-extrabold text-slate-800">
                        {order.paymentMethod}
                      </p>

                    </div>

                  </div>

                  {/* ================= ACTION BUTTONS ================= */}

                  <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">

                    {/* Cancel */}

                    {[
                      "Order Placed",
                      "Confirmed",
                      "Shipped",
                    ].includes(order.status) && (

                      <button
                        onClick={() =>
                          cancelOrder(order._id)
                        }
                        className="px-5 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 font-bold hover:bg-red-100 transition duration-300"
                      >
                        Cancel Order
                      </button>

                    )}

                    {/* Return */}

                    {order.status ===
                      "Delivered" && (

                      <button
                        onClick={() =>
                          returnOrder(order._id)
                        }
                        className="px-5 py-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 font-bold hover:bg-orange-100 transition duration-300"
                      >
                        Return Order
                      </button>

                    )}

                    {/* Invoice */}

                    <button
                      onClick={() =>
                        downloadInvoice(order)
                      }
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition duration-300 hover:-translate-y-0.5"
                    >
                      📄 Download Invoice
                    </button>

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

export default Orders;