import { useEffect, useState } from "react";
import axios from "axios";

function CancelOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.get(
      "https://ecommerce-website-00z8.onrender.com/api/orders/seller/cancelled",
      {
        headers: {
          authorization: userInfo.token,
        },
      },
    );

    setOrders(data);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Cancel Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-5 rounded-lg shadow mb-4">
          <h3 className="font-bold">{order.user?.name}</h3>

          <p>{order.user?.email}</p>

          <p>
            Address:
            {order.address}
          </p>

          <p>Amount: ₹{order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default CancelOrders;
