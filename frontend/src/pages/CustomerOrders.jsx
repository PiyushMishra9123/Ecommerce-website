import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller",
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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://ecommerce-website-00z8.onrender.com/api/orders/${id}/status`,
        { status },
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Customer Orders</h1>

        <h2 className="text-xl font-semibold text-blue-600">
          Total Orders : {orders.length}
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold">No Orders Found</h2>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{order.user?.name}</h2>

                  <p className="text-gray-600">{order.user?.email}</p>

                  <p className="mt-2">
                    <b>Address :</b> {order.address}
                  </p>

                  <p>
                    <b>Payment :</b> {order.paymentMethod}
                  </p>

                  <p>
                    <b>Total :</b> ₹{order.totalPrice}
                  </p>

                  <p>
                    <b>Date :</b>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-4 py-2 rounded-full text-white font-semibold
                    ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Cancelled"
                          ? "bg-red-600"
                          : order.status === "Returned"
                            ? "bg-orange-500"
                            : order.status === "Shipped"
                              ? "bg-purple-600"
                              : order.status === "Confirmed"
                                ? "bg-blue-600"
                                : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>

                  <div className="mt-5">
                    <Link
                      to={`/customer-orders/${order._id}`}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details →
                    </Link>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {order.status === "Order Placed" && (
                        <button
                          onClick={() => updateStatus(order._id, "Confirmed")}
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Accept Order
                        </button>
                      )}

                      {order.status === "Confirmed" && (
                        <button
                          onClick={() => updateStatus(order._id, "Shipped")}
                          className="bg-purple-600 text-white px-4 py-2 rounded"
                        >
                          Ship Order
                        </button>
                      )}

                      {order.status === "Shipped" && (
                        <button
                          onClick={() => updateStatus(order._id, "Delivered")}
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Deliver Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;
