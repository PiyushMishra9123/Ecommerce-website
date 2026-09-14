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
  Legend,
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

      if (!userInfo?.token) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        "https://ecommerce-website-00z8.onrender.com/api/orders/seller/analytics",
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );

      setStats(data);
    } catch (error) {
      console.log(
        "Analytics Error:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= CALCULATIONS ================= */

  const totalIncome = stats.reduce(
    (total, item) => total + Number(item.income || 0),
    0
  );

  const totalPurchased = stats.reduce(
    (total, item) => total + Number(item.purchased || 0),
    0
  );

  const totalCancelled = stats.reduce(
    (total, item) => total + Number(item.cancelled || 0),
    0
  );

  const totalReturned = stats.reduce(
    (total, item) => total + Number(item.returned || 0),
    0
  );

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">

          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
            <span className="text-xl sm:text-2xl">📊</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-5">
            Loading Analytics...
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Preparing your store performance data.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-7 sm:mb-10">

          <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600 mb-2">
            Seller Insights
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Income Analytics
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
                Track your income, orders and overall store performance.
              </p>
            </div>

            <div className="w-full md:w-auto px-5 py-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between md:justify-start gap-2">

              <span className="text-sm text-slate-500 font-semibold">
                Data Points
              </span>

              <span className="text-xl font-black text-indigo-600">
                {stats.length}
              </span>

            </div>

          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7 sm:mb-10">

          {/* TOTAL INCOME */}
          <div className="premium-card p-5 sm:p-6">

            <div className="flex items-start justify-between gap-3">

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Total Income
                </p>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 break-words">
                  ₹{totalIncome.toLocaleString("en-IN")}
                </h2>
              </div>

              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-lg sm:text-xl">
                💰
              </div>

            </div>

            <p className="text-xs font-bold text-indigo-600 mt-4">
              Overall earnings
            </p>

          </div>

          {/* PURCHASED */}
          <div className="premium-card p-5 sm:p-6">

            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Purchased
                </p>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {totalPurchased}
                </h2>
              </div>

              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center text-lg sm:text-xl">
                🛒
              </div>

            </div>

            <p className="text-xs font-bold text-emerald-600 mt-4">
              Successful purchases
            </p>

          </div>

          {/* CANCELLED */}
          <div className="premium-card p-5 sm:p-6">

            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Cancelled
                </p>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {totalCancelled}
                </h2>
              </div>

              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-red-50 flex items-center justify-center text-lg sm:text-xl">
                ✕
              </div>

            </div>

            <p className="text-xs font-bold text-red-600 mt-4">
              Cancelled orders
            </p>

          </div>

          {/* RETURNED */}
          <div className="premium-card p-5 sm:p-6">

            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Returned
                </p>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {totalReturned}
                </h2>
              </div>

              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-lg sm:text-xl">
                ↩
              </div>

            </div>

            <p className="text-xs font-bold text-orange-600 mt-4">
              Returned orders
            </p>

          </div>

        </div>

        {/* ================= INCOME CHART ================= */}

        <div className="premium-card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-7">

            <div>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-indigo-600">
                Revenue
              </p>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-1">
                Income Trend
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-1">
                View how your income changes over time.
              </p>
            </div>

            <div className="self-start md:self-auto px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-bold">
              ₹{totalIncome.toLocaleString("en-IN")} Total
            </div>

          </div>

          {/* Chart */}
          <div className="w-full h-[280px] sm:h-[330px] lg:h-[350px]">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats}
                margin={{
                  top: 10,
                  right: 5,
                  left: -10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fill: "#64748b",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={20}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={45}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    boxShadow:
                      "0 10px 30px rgba(15, 23, 42, 0.1)",
                  }}
                  labelStyle={{
                    color: "#0f172a",
                    fontWeight: "700",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: "#6366F1",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* ================= ORDERS CHART ================= */}

        <div className="premium-card p-4 sm:p-6 lg:p-8">

          <div className="mb-6 sm:mb-7">

            <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-purple-600">
              Orders
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-1">
              Orders Overview
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Compare purchased, cancelled and returned orders.
            </p>

          </div>

          {/* Chart */}
          <div className="w-full h-[300px] sm:h-[340px] lg:h-[350px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats}
                margin={{
                  top: 10,
                  right: 5,
                  left: -10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fill: "#64748b",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={20}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    boxShadow:
                      "0 10px 30px rgba(15, 23, 42, 0.1)",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    paddingTop: "15px",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="purchased"
                  name="Purchased"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="cancelled"
                  name="Cancelled"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="returned"
                  name="Returned"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </div>
  );
}

export default IncomeAnalytics;