import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { userInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [totalIncome, setTotalIncome] = useState(0);

  const [cancelOrders, setCancelOrders] = useState(0);

  const [returnOrders, setReturnOrders] = useState(0);

  useEffect(() => {
    if (userInfo?.user?.role === "seller") {
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller/stats",
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      setTotalIncome(data.totalIncome);

      setCancelOrders(data.cancelOrders);

      setReturnOrders(data.returnOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#2874F0] text-white p-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-white text-[#2874F0] flex items-center justify-center text-3xl font-bold">
                {userInfo?.user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1 className="text-3xl font-bold">{userInfo.user.name}</h1>

                <p className="text-blue-100">{userInfo.user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Account Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-xl p-5">
                <p className="text-gray-500 mb-1">Full Name</p>

                <p className="text-lg font-semibold">{userInfo.user.name}</p>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500 mb-1">Email Address</p>

                <p className="text-lg font-semibold">{userInfo.user.email}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5">Quick Actions</h2>

              <div className="grid md:grid-cols-3 gap-5">
                {userInfo?.user?.role === "customer" ? (
                  <>
                    <div
                      onClick={() => navigate("/orders")}
                      className="bg-gray-50 border rounded-xl p-5 text-center cursor-pointer hover:bg-gray-100 transition"
                    >
                      <div className="text-4xl mb-3">📦</div>

                      <h3 className="font-semibold">My Orders</h3>
                    </div>

                    <div
                      onClick={() => navigate("/cart")}
                      className="bg-gray-50 border rounded-xl p-5 text-center cursor-pointer hover:bg-gray-100 transition"
                    >
                      <div className="text-4xl mb-3">🛒</div>

                      <h3 className="font-semibold">Cart</h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => navigate("/income-analytics")}
                      className="bg-gray-50 border rounded-xl p-5 text-center cursor-pointer hover:bg-gray-100 transition"
                    >
                      <div className="text-4xl mb-3">💰</div>

                      <h3 className="font-semibold">Total Income</h3>

                      <p className="text-green-600 text-2xl font-bold mt-2">
                        ₹{totalIncome}
                      </p>
                    </div>

                    <div
                      onClick={() => navigate("/cancel-orders")}
                      className="bg-gray-50 border rounded-xl p-5 text-center cursor-pointer hover:bg-gray-100 transition"
                    >
                      <div className="text-4xl mb-3">❌</div>

                      <h3 className="font-semibold">Cancel Orders</h3>

                      <p className="text-red-600 text-2xl font-bold mt-2">
                        {cancelOrders}
                      </p>
                    </div>

                    <div
                      onClick={() => navigate("/return-orders")}
                      className="bg-gray-50 border rounded-xl p-5 text-center cursor-pointer hover:bg-gray-100 transition"
                    >
                      <div className="text-4xl mb-3">↩️</div>

                      <h3 className="font-semibold">Return Orders</h3>

                      <p className="text-orange-600 text-2xl font-bold mt-2">
                        {returnOrders}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
