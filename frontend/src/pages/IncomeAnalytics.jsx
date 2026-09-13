import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

function IncomeAnalytics() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller/analytics",
        {
          headers: {
            authorization: userInfo.token,
          },
        },
      );

      setStats(data);
    } catch (error) {
      console.log("Analytics Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold">Loading Analytics...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Income Analytics</h1>

      {/* Income Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">Income Trend</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#2874F0"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Chart */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-2xl font-bold mb-5">Orders Overview</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="purchased" fill="#16a34a" />

            <Bar dataKey="cancelled" fill="#dc2626" />

            <Bar dataKey="returned" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeAnalytics;
