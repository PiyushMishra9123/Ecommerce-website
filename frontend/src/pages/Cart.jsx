import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

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
        name: "ShopKart",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "https://ecommerce-website-00z8.onrender.com/api/payment/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
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
          color: "#6366F1",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-indigo-600 mb-2">
            Shopping Bag
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              My Cart
            </h1>

            <p className="text-slate-500">
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>

        </div>

        {/* ================= EMPTY CART ================= */}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-10 sm:p-16 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-4xl mb-6">
              🛒
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Your cart is empty
            </h2>

            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Looks like you haven't added anything
              to your cart yet. Start shopping and
              discover something you love.
            </p>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition duration-300 hover:-translate-y-0.5"
            >
              Start Shopping →
            </button>

          </div>
        ) : (

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            {/* ================= CART ITEMS ================= */}

            <div className="lg:col-span-2 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition duration-300 p-4 sm:p-6"
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* Product Image */}

                    <div className="w-full sm:w-36 h-36 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-contain transition duration-300 hover:scale-110"
                      />

                    </div>

                    {/* Product Information */}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold mb-1">
                            Product
                          </p>

                          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                            {item.name}
                          </h2>

                        </div>

                        {/* Remove */}

                        <button
                          onClick={() =>
                            removeFromCart(item._id)
                          }
                          className="text-slate-400 hover:text-red-500 transition text-sm font-semibold"
                        >
                          Remove
                        </button>

                      </div>

                      {/* Price */}

                      <p className="text-2xl font-extrabold text-slate-900 mt-3">
                        ₹{item.price}
                      </p>

                      {/* Quantity */}

                      <div className="flex items-center justify-between mt-5">

                        <div>

                          <p className="text-xs text-slate-400 font-semibold mb-2">
                            Quantity
                          </p>

                          <div className="inline-flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50">

                            <button
                              onClick={() =>
                                decreaseQty(item._id)
                              }
                              className="w-10 h-10 flex items-center justify-center text-lg font-bold text-slate-700 hover:bg-slate-200 transition"
                            >
                              −
                            </button>

                            <span className="w-12 h-10 flex items-center justify-center bg-white border-x border-slate-200 font-bold text-slate-900">
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                increaseQty(item._id)
                              }
                              disabled={
                                item.qty >= item.stock
                              }
                              className={`w-10 h-10 flex items-center justify-center text-lg font-bold transition ${
                                item.qty >= item.stock
                                  ? "text-slate-300 cursor-not-allowed"
                                  : "text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              +
                            </button>

                          </div>

                        </div>

                        {/* Item Total */}

                        <div className="text-right">

                          <p className="text-xs text-slate-400 font-semibold mb-1">
                            Item Total
                          </p>

                          <p className="text-lg font-extrabold text-indigo-600">
                            ₹{item.price * item.qty}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* ================= PRICE DETAILS ================= */}

            <div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-7 sticky top-24">

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Price Details
                  </h2>

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    💳
                  </div>

                </div>

                {/* Total Items */}

                <div className="flex justify-between mb-4 text-slate-600">

                  <span>
                    Total Items
                  </span>

                  <span className="font-semibold text-slate-900">
                    {cartItems.length}
                  </span>

                </div>

                {/* Subtotal */}

                <div className="flex justify-between mb-4 text-slate-600">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-semibold text-slate-900">
                    ₹{totalPrice}
                  </span>

                </div>

                {/* Delivery */}

                <div className="flex justify-between mb-5 text-slate-600">

                  <span>
                    Delivery
                  </span>

                  <span className="text-emerald-600 font-bold">
                    FREE
                  </span>

                </div>

                <div className="border-t border-dashed border-slate-200 pt-5">

                  <div className="flex justify-between items-end">

                    <span className="font-bold text-slate-900">
                      Total Amount
                    </span>

                    <span className="text-2xl font-extrabold text-slate-900">
                      ₹{totalPrice}
                    </span>

                  </div>

                </div>

                {/* Checkout */}

                <button
                  disabled={cartItems.length === 0}
                  onClick={() =>
                    navigate("/checkout")
                  }
                  className="w-full mt-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold shadow-lg shadow-indigo-200 hover:shadow-xl transition duration-300 hover:-translate-y-0.5 disabled:bg-slate-300 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  PROCEED TO CHECKOUT →
                </button>

                {/* Security */}

                <div className="mt-5 pt-5 border-t border-slate-100">

                  <p className="text-xs text-center text-slate-400">
                    🔒 Secure checkout • Your payment
                    information is protected
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;