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
        }
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

              paymentId: response.razorpay_payment_id,

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

          toast.success("🎉 Payment successful! Order placed.", {
            position: "top-center",
            autoClose: 3000,
          });

          navigate("/orders");
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-6 sm:py-10 lg:py-12">
      
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-6 sm:mb-8">
          
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-indigo-600 mb-2">
            Secure Checkout
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
            Complete Your Order
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
            Enter your delivery details and choose your preferred payment method.
          </p>

        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

          {/* ================= LEFT SECTION ================= */}
          <div className="w-full min-w-0 lg:col-span-2 space-y-5 sm:space-y-6">

            {/* ================= DELIVERY ADDRESS ================= */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 lg:p-8">

              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">

                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl sm:rounded-2xl bg-indigo-50 flex items-center justify-center text-lg sm:text-xl">
                  📍
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900">
                    Delivery Address
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
                onChange={(e) => setAddress(e.target.value)}
                className="input-modern w-full max-w-full resize-none"
                placeholder="Enter your complete address, including house number, street, city and PIN code..."
              />

            </div>

            {/* ================= PAYMENT METHOD ================= */}
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 lg:p-8">

              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">

                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl sm:rounded-2xl bg-purple-50 flex items-center justify-center text-lg sm:text-xl">
                  💳
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Choose how you want to pay.
                  </p>
                </div>

              </div>

              <div className="space-y-3 sm:space-y-4">

                {/* COD */}
                <label
                  className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition duration-300 ${
                    paymentMethod === "COD"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >

                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 accent-indigo-600"
                  />

                  <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 rounded-lg sm:rounded-xl bg-emerald-50 flex items-center justify-center">
                    💵
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-900">
                      Cash On Delivery
                    </p>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Pay when your order arrives.
                    </p>
                  </div>

                  {paymentMethod === "COD" && (
                    <span className="text-indigo-600 font-bold flex-shrink-0">
                      ✓
                    </span>
                  )}

                </label>

                {/* ONLINE PAYMENT */}
                <label
                  className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition duration-300 ${
                    paymentMethod === "ONLINE"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >

                  <input
                    type="radio"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 accent-indigo-600"
                  />

                  <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 rounded-lg sm:rounded-xl bg-purple-50 flex items-center justify-center">
                    💳
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-900">
                      Online Payment
                    </p>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Pay securely using Razorpay.
                    </p>
                  </div>

                  {paymentMethod === "ONLINE" && (
                    <span className="text-indigo-600 font-bold flex-shrink-0">
                      ✓
                    </span>
                  )}

                </label>

              </div>

            </div>

            {/* ================= SECURITY ================= */}
            <div className="w-full flex items-start gap-3 rounded-xl sm:rounded-2xl bg-slate-900 text-white p-4 sm:p-5">

              <div className="text-lg sm:text-xl flex-shrink-0">
                🔒
              </div>

              <div className="min-w-0">
                <p className="font-bold text-sm sm:text-base">
                  Secure Checkout
                </p>

                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Your personal and payment information is securely protected.
                </p>
              </div>

            </div>

          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="w-full min-w-0">

            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-4 sm:p-6 lg:p-7 lg:sticky lg:top-24">

              {/* SUMMARY HEADER */}
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                    Summary
                  </p>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    Your Order
                  </h2>
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center">
                  🛍️
                </div>

              </div>

              {/* PRODUCTS */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="w-full flex items-center gap-3 min-w-0"
                  >

                    {/* IMAGE */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-100 flex items-center justify-center">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
                      />

                    </div>

                    {/* PRODUCT NAME */}
                    <div className="flex-1 min-w-0">

                      <p className="font-bold text-sm sm:text-base text-slate-800 break-words line-clamp-2">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Qty: {item.qty}
                      </p>

                    </div>

                    {/* PRICE */}
                    <p className="font-bold text-sm sm:text-base text-slate-900 flex-shrink-0">
                      ₹{item.price * item.qty}
                    </p>

                  </div>

                ))}

              </div>

              {/* DIVIDER */}
              <div className="border-t border-dashed border-slate-200 my-5 sm:my-6"></div>

              {/* ITEMS */}
              <div className="flex justify-between items-center text-sm sm:text-base text-slate-500 mb-3">

                <span>
                  Items
                </span>

                <span className="font-semibold text-slate-800">
                  {cartItems.length}
                </span>

              </div>

              {/* DELIVERY */}
              <div className="flex justify-between items-center text-sm sm:text-base text-slate-500 mb-3">

                <span>
                  Delivery
                </span>

                <span className="text-emerald-600 font-bold">
                  FREE
                </span>

              </div>

              {/* TOTAL */}
              <div className="border-t border-slate-100 pt-4 sm:pt-5 mt-4 sm:mt-5">

                <div className="flex justify-between items-end gap-3">

                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    Total
                  </span>

                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ₹{totalPrice}
                  </span>

                </div>

              </div>

              {/* ORDER BUTTON */}
              <button
                onClick={handleOrder}
                disabled={
                  cartItems.length === 0 ||
                  !address.trim()
                }
                className="w-full mt-6 sm:mt-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm sm:text-base font-extrabold shadow-lg shadow-indigo-200 hover:shadow-xl transition duration-300 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {paymentMethod === "COD"
                  ? "Confirm Order →"
                  : "Pay Now →"}
              </button>

              <p className="text-[11px] sm:text-xs text-center text-slate-400 mt-4 leading-relaxed">
                By placing this order, you agree to our terms and conditions.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;