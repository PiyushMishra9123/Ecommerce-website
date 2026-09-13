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
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/myorders",
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      toast.success("✅ Order Cancelled Successfully", {
        position: "top-center",
        autoClose: 2000,
      });

      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  const returnOrder = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/return`,
        {},
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      toast.success("✅ Return Request Submitted", {
        position: "top-center",
        autoClose: 2000,
      });
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("ShopKart Invoice", 70, 20);

    doc.setFontSize(12);

    doc.text(`Order ID : ${order._id}`, 15, 40);
    doc.text(`Status : ${order.status}`, 15, 50);
    doc.text(`Payment : ${order.paymentMethod}`, 15, 60);
    doc.text(`Total : ₹${order.totalPrice}`, 15, 70);

    autoTable(doc, {
      startY: 85,
      head: [["Product", "Qty", "Price"]],
      body: order.orderItems.map((item) => [
        item.name,
        item.qty,
        `₹${item.price}`,
      ]),
    });

    doc.save(`Invoice-${order._id}.pdf`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Orders Found</h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              {/* Ordered Products */}

              <h2 className="text-2xl font-bold mb-6">Ordered Products</h2>

              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center border rounded-xl p-5 mb-5 bg-gray-50"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        item.product?.image
                          ? `https://ecommerce-website-00z8.onrender.com${item.product.image}`
                          : item.image
                            ? `https://ecommerce-website-00z8.onrender.com${item.image}`
                            : "https://via.placeholder.com/150"
                      }
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl border"
                    />

                    <div>
                      <h3 className="text-2xl font-bold">{item.name}</h3>

                      <p className="text-green-600 text-xl mt-2 font-semibold">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 md:mt-0">
                    <p className="text-xl font-semibold">Qty : {item.qty}</p>
                  </div>
                </div>
              ))}

              {/* Order Details */}

              <div className="grid md:grid-cols-4 gap-6 mt-8 border-t pt-6">
                <div>
                  <p className="text-gray-500">Order ID</p>

                  <p className="font-semibold break-all">{order._id}</p>
                </div>

                <div>
                  <p className="text-gray-500">Items</p>

                  <p className="font-bold text-xl">{order.orderItems.length}</p>
                </div>

                <div>
                  <p className="text-gray-500">Total Amount</p>

                  <p className="text-green-600 text-2xl font-bold">
                    ₹{order.totalPrice}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-2">Delivery Status</p>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      order.status === "Order Placed"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-8 flex gap-4">
                {["Order Placed", "Confirmed", "Shipped"].includes(
                  order.status,
                ) && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                  >
                    Cancel Order
                  </button>
                )}

                {order.status === "Delivered" && (
                  <button
                    onClick={() => returnOrder(order._id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
                  >
                    Return Order
                  </button>
                )}
                <button
                  onClick={() => downloadInvoice(order)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Download Invoice
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
