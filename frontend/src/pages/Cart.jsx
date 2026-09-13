import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handlePayment = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

        name: "ShopKart",

        description: "Order Payment",

        order_id: data.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "https://ecommerce-website-00z8.onrender.com/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_signature: response.razorpay_signature,
              },
            );

            if (verifyRes.data.success) {
              await axios.post(
                "https://ecommerce-website-00z8.onrender.com/api/orders",
                {
                  orderItems: cartItems.map((item) => ({
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    product: item._id,
                  })),

                  totalPrice,

                  paymentId: response.razorpay_payment_id,

                  isPaid: true,
                },
                {
                  headers: {
                    authorization: userInfo.token,
                  },
                },
              );

              localStorage.removeItem("cartItems");

              alert("Payment Successful");

              navigate("/orders");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.log(error);

            alert("Payment Failed");
          }
        },

        prefill: {
          name: userInfo.user.name,

          email: userInfo.user.email,
        },

        theme: {
          color: "#2874F0",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5 mb-4 flex gap-5"
              >
                {/* Product Image */}
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={`https://ecommerce-website-00z8.onrender.com${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p className="text-green-600 text-xl font-semibold mt-2">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      disabled={item.qty >= item.stock}
                      className={`px-3 py-1 rounded ${
                        item.qty >= item.stock
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gray-200"
                      }`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-4 text-red-500 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Section */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 sticky top-5">
              <h2 className="text-2xl font-bold mb-5">Price Details</h2>

              <div className="flex justify-between mb-3">
                <span>Total Items</span>

                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total Amount</span>

                <span className="font-bold text-green-600">₹{totalPrice}</span>
              </div>

              <hr className="mb-4" />

              <button
                disabled={cartItems.length === 0}
                onClick={() => navigate("/checkout")}
                className={`w-full py-3 rounded-lg font-bold text-white ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
