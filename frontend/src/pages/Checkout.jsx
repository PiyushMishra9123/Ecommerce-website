import { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handleOrder = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (paymentMethod === "COD") {
      await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
            image: item.image,
            product: item._id,
          })),
          totalPrice,
          address,
          paymentMethod: "COD",
        },
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );
      setCartItems([]);
      localStorage.removeItem("cartItems");
      toast.success("🎉 Your order has been confirmed!", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/orders");
    } else {
      const { data } = await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/payment/create-order",
        {
          amount: totalPrice,
        },
      );

      const options = {
        key: "rzp_test_T30uQaenFdz2Df",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "ShopKart",

        description: "Order Payment",

        handler: async function (response) {
          await axios.post(
            "https://ecommerce-website-00z8.onrender.com/api/orders",
            {
              orderItems: cartItems.map((item) => ({
                name: item.name,
                qty: item.qty,
                price: item.price,
                image: item.image,
                product: item._id,
              })),

              totalPrice,

              address,

              paymentMethod: "ONLINE",

              paymentId: response.razorpay_payment_id,

              isPaid: true,
            },
            {
              headers: {
                authorization: userInfo.token,
              },
            },
          );
          setCartItems([]);
          localStorage.removeItem("cartItems");
          alert("Payment Successful");

          navigate("/orders");
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>

        <textarea
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Enter your address"
        />

        <h2 className="text-2xl font-bold mt-8 mb-4">Payment Method</h2>

        <div className="space-y-3">
          <label className="block">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <span className="ml-2">Cash On Delivery</span>
          </label>

          <label className="block">
            <input
              type="radio"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <span className="ml-2">Online Payment</span>
          </label>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Total: ₹{totalPrice}</h3>

          <button
            onClick={handleOrder}
            className="bg-green-600 text-white px-8 py-3 rounded-lg"
          >
            {paymentMethod === "COD" ? "Confirm Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
