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
    0
  );

  const handleOrder = async () => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

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
        }
      );

      setCartItems([]);

      localStorage.removeItem("cartItems");

      toast.success(
        "🎉 Your order has been confirmed!",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );

      navigate("/orders");
    } else {
      const { data } = await axios.post(
        "https://ecommerce-website-00z8.onrender.com/api/payment/create-order",
        {
          amount: totalPrice,
        }
      );

      const options = {
        key: "rzp_test_T30uQaenFdz2Df",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "ShopKart",

        description: "Order Payment",

        theme: {
          color: "#6366F1",
        },

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

              paymentId:
                response.razorpay_payment_id,

              isPaid: true,
            },
            {
              headers: {
                authorization: userInfo.token,
              },
            }
          );

          setCartItems([]);

          localStorage.removeItem("cartItems");

          toast.success(
            "🎉 Payment successful! Order placed.",
            {
              position: "top-center",
              autoClose: 3000,
            }
          );

          navigate("/orders");
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 sm:py-12">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-600 mb-2">
            Secure Checkout
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Complete Your Order
          </h1>

          <p className="text-slate-500 mt-2">
            Enter your delivery details and choose
            your preferred payment method.
          </p>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ================= LEFT SECTION ================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Address */}

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl">
                  📍
                </div>

                <div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-slate-500">
                    Where should we deliver your order?
                  </p>

                </div>

              </div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                Full Delivery Address
              </label>

              <textarea
                rows="5"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="input-modern resize-none"
                placeholder="Enter your complete address, including house number, street, city and PIN code..."
              />

            </div>

            {/* Payment Method */}

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-xl">
                  💳
                </div>

                <div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-slate-500">
                    Choose how you want to pay.
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {/* COD */}

                <label
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition duration-300 ${
                    paymentMethod === "COD"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >

                  <input
                    type="radio"
                    value="COD"
                    checked={
                      paymentMethod === "COD"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-5 h-5 accent-indigo-600"
                  />

                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    💵
                  </div>

                  <div className="flex-1">

                    <p className="font-bold text-slate-900">
                      Cash On Delivery
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pay when your order arrives.
                    </p>

                  </div>

                  {paymentMethod === "COD" && (
                    <span className="text-indigo-600 font-bold">
                      ✓
                    </span>
                  )}

                </label>

                {/* Online Payment */}

                <label
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition duration-300 ${
                    paymentMethod === "ONLINE"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >

                  <input
                    type="radio"
                    value="ONLINE"
                    checked={
                      paymentMethod === "ONLINE"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-5 h-5 accent-indigo-600"
                  />

                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    💳
                  </div>

                  <div className="flex-1">

                    <p className="font-bold text-slate-900">
                      Online Payment
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Pay securely using Razorpay.
                    </p>

                  </div>

                  {paymentMethod === "ONLINE" && (
                    <span className="text-indigo-600 font-bold">
                      ✓
                    </span>
                  )}

                </label>

              </div>

            </div>

            {/* Security */}

            <div className="flex items-start gap-3 rounded-2xl bg-slate-900 text-white p-5">

              <div className="text-xl">
                🔒
              </div>

              <div>

                <p className="font-bold">
                  Secure Checkout
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Your personal and payment
                  information is securely protected.
                </p>

              </div>

            </div>

          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-7 sticky top-24">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                    Summary
                  </p>

                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Your Order
                  </h2>

                </div>

                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  🛍️
                </div>

              </div>

              {/* Products */}

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-3"
                  >

                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-100 flex items-center justify-center flex-shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 object-contain"
                      />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-bold text-slate-800 truncate">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Qty: {item.qty}
                      </p>

                    </div>

                    <p className="font-bold text-slate-900">
                      ₹{item.price * item.qty}
                    </p>

                  </div>

                ))}

              </div>

              {/* Divider */}

              <div className="border-t border-dashed border-slate-200 my-6"></div>

              {/* Price */}

              <div className="flex justify-between text-slate-500 mb-3">

                <span>
                  Items
                </span>

                <span className="font-semibold text-slate-800">
                  {cartItems.length}
                </span>

              </div>

              <div className="flex justify-between text-slate-500 mb-3">

                <span>
                  Delivery
                </span>

                <span className="text-emerald-600 font-bold">
                  FREE
                </span>

              </div>

              <div className="border-t border-slate-100 pt-5 mt-5">

                <div className="flex justify-between items-end">

                  <span className="font-bold text-slate-900">
                    Total
                  </span>

                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹{totalPrice}
                  </span>

                </div>

              </div>

              {/* Order Button */}

              <button
                onClick={handleOrder}
                disabled={
                  cartItems.length === 0 ||
                  !address.trim()
                }
                className="w-full mt-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold shadow-lg shadow-indigo-200 hover:shadow-xl transition duration-300 hover:-translate-y-0.5 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {paymentMethod === "COD"
                  ? "Confirm Order →"
                  : "Pay Now →"}
              </button>

              <p className="text-xs text-center text-slate-400 mt-4">
                By placing this order, you agree
                to our terms and conditions.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;