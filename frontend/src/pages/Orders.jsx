import { useEffect, useState } from "react";
import axios from "axios";

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
        "http://localhost:5000/api/orders/myorders",
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

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4"
        >
          <p>
            Order ID: {order._id}
          </p>

          <p>
            Total: ₹{order.totalPrice}
          </p>

          <p>
            Items: {order.orderItems.length}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;