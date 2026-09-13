import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CustomerOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const { data } = await axios.get(
      `https://ecommerce-website-00z8.onrender.com/api/orders/seller/${id}`,

      {
        headers: {
          authorization: userInfo.token,
        },
      },
    );

    setOrder(data);
  };

  if (!order) return <h2>Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">Customer Details</h1>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p>
              <b>Name :</b> {order.user.name}
            </p>

            <p>
              <b>Email :</b> {order.user.email}
            </p>

            <p>
              <b>Address :</b> {order.address}
            </p>

            <p>
              <b>Payment :</b> {order.paymentMethod}
            </p>

            <p>
              <b>Status :</b> {order.status}
            </p>

            <p>
              <b>Total :</b> ₹{order.totalPrice}
            </p>
          </div>
        </div>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold mb-5">Ordered Products</h2>

        <div className="space-y-5">
          {order.orderItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 border rounded-lg p-4"
            >
              <img
                src={`https://ecommerce-website-00z8.onrender.com${item.image}`}
                alt={item.name}
                className="w-28 h-28 object-contain"
              />

              <div>
                <h2 className="font-bold">{item.name}</h2>

                <p>Qty : {item.qty}</p>

                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderDetails;
