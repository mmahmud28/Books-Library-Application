"use client";

import React, { useEffect, useState } from "react";
import { userSummeryData } from "@/lib/api/userList";
import { useSession } from "@/lib/auth-client";

const Readers_Page = () => {
  const { data: session, isPending } = useSession();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const loadUserSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const tokenResponse = await fetch("/api/auth/token");

        if (!tokenResponse.ok) {
          throw new Error("Failed to get authentication token");
        }

        const tokenData = await tokenResponse.json();

        const token = tokenData.token;        

        const data = await userSummeryData(userId, token);

        setUserData(data);
      } catch (error) {
        console.error("User Summary Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserSummary();
  }, [userId]);

  // Session loading state
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <span className="text-lg font-medium text-violet-400">Loading session...</span>
        </div>
      </div>
    );
  }

  // Summary loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent shadow-lg shadow-fuchsia-500/50"></div>
          <p className="text-sm font-semibold tracking-wide text-slate-300">Fetching reader metrics...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 p-6">
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-rose-400 backdrop-blur-xl">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  // Destructure Data safely
  const user = userData?.user;
  const stats = userData?.stats;
  const delivery = userData?.delivery;
  const spending = userData?.spending;
  const readingActivity = userData?.readingActivity;
  const orders = userData?.orders || [];
  const reviews = userData?.reviews || [];

  // Calculating maximums for relative chart bar heights
  const maxBooksRead = Math.max(...(readingActivity?.monthly?.map((item) => item.books) || [1]), 1);
  const maxSpending = Math.max(...(spending?.monthly?.map((item) => item.amount) || [1]), 1);

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8">
      {/* User Welcome Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-violet-950/40 to-slate-900 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="h-20 w-20 rounded-2xl border-2 border-violet-500/50 object-cover shadow-xl shadow-violet-500/20"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-3xl font-bold text-white shadow-xl">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
                Welcome Back,{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  {user?.name || "Reader"}
                </span>{" "}
                👋
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {user?.email} • {user?.phone}
              </p>
            </div>
          </div>
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
            {user?.role || "User"} Account
          </span>
        </div>
      </div>

      {/* Top Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Books Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Books</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                {stats?.totalBooks ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              📚
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-violet-400">
            <span className="h-2 w-2 animate-ping rounded-full bg-violet-400"></span>
            Total Collection Available
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Total Orders Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Orders</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                {stats?.totalOrders ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              📦
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-400">
            Completed: {stats?.completedOrders ?? 0}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Pending Orders Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500 hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Pending Orders</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                {stats?.pendingOrders ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              🚚
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
            {stats?.pendingOrders ? "Awaiting Delivery" : "All Processed"}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Total Spent Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Spent</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                ৳{stats?.totalSpent ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              💰
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            Paid Orders: {spending?.paidOrders ?? 0}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
      </div>

      {/* Dynamic Charts Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Books Read Monthly Activity */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              📚 Reading Activity
            </h2>
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              Monthly Log
            </span>
          </div>

          <div className="space-y-4">
            {readingActivity?.monthly && readingActivity.monthly.length > 0 ? (
              readingActivity.monthly.map((item, idx) => {
                const percentage = Math.round((item.books / maxBooksRead) * 100);
                return (
                  <div key={idx} className="group">
                    <div className="mb-1 flex justify-between text-sm text-slate-300">
                      <span className="font-medium">
                        {item.month} {item.year}
                      </span>
                      <span className="font-bold text-violet-400">
                        {item.books} {item.books > 1 ? "Books" : "Book"}
                      </span>
                    </div>
                    <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-800 p-0.5">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-1000 ease-out group-hover:brightness-125"
                        style={{ width: `${Math.max(percentage, 10)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                No monthly reading history.
              </p>
            )}
          </div>
        </div>

        {/* Monthly Spending Chart */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              💳 Spending History
            </h2>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Expenses
            </span>
          </div>

          <div className="flex h-52 items-end justify-around gap-3 pt-6">
            {spending?.monthly && spending.monthly.length > 0 ? (
              spending.monthly.map((item, idx) => {
                const heightPercent =
                  maxSpending > 0 ? Math.round((item.amount / maxSpending) * 100) : 15;
                return (
                  <div
                    key={idx}
                    className="group flex h-full w-full max-w-[60px] flex-col items-center justify-end"
                  >
                    <span className="mb-2 text-xs font-semibold text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      ৳{item.amount}
                    </span>
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-900/30 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-125"
                      style={{ height: `${Math.max(heightPercent, 15)}%` }}
                    ></div>
                    <span className="mt-3 text-xs font-medium text-slate-400">
                      {item.month}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                No spending data recorded.
              </p>
            )}
          </div>
        </div>

        {/* Delivery Progress & Breakdown */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              🚚 Delivery & Order Fulfillment
            </h2>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              Logistics
            </span>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Dynamic Conic Doughnut Simulation */}
            <div className="flex items-center justify-center">
              <div
                className="relative flex h-52 w-52 items-center justify-center rounded-full shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{
                  background: `conic-gradient(
                    #22c55e 0% ${delivery?.percentage?.delivered ?? 0}%, 
                    #facc15 ${delivery?.percentage?.delivered ?? 0}% ${(delivery?.percentage?.delivered ?? 0) + (delivery?.percentage?.pending ?? 0)}%, 
                    #ef4444 ${(delivery?.percentage?.delivered ?? 0) + (delivery?.percentage?.pending ?? 0)}% 100%
                  )`,
                }}
              >
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-slate-950 shadow-inner">
                  <h3 className="text-3xl font-black text-white">
                    {delivery?.percentage?.delivered ?? 0}%
                  </h3>
                  <p className="text-xs font-medium text-slate-400">Delivered</p>
                </div>
              </div>
            </div>

            {/* Detailed Progress Bars */}
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500"></span> Delivered ({delivery?.delivered ?? 0})
                  </span>
                  <span className="font-bold text-green-400">{delivery?.percentage?.delivered ?? 0}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${delivery?.percentage?.delivered ?? 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-yellow-400"></span> Pending ({delivery?.pending ?? 0})
                  </span>
                  <span className="font-bold text-yellow-400">{delivery?.percentage?.pending ?? 0}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-yellow-400 transition-all duration-1000"
                    style={{ width: `${delivery?.percentage?.pending ?? 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span> Canceled ({delivery?.canceled ?? 0})
                  </span>
                  <span className="font-bold text-red-400">{delivery?.percentage?.canceled ?? 0}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-red-500 transition-all duration-1000"
                    style={{ width: `${delivery?.percentage?.canceled ?? 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders and Reviews Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Order */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-bold text-white">📦 Recent Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-slate-800/40 p-4 transition duration-300 hover:border-violet-500/30 sm:flex-row"
              >
                <img
                  src={order.booksImage}
                  alt={order.booksName}
                  className="h-20 w-16 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-white">{order.booksName}</h3>
                  <p className="text-xs text-slate-400">
                    Borrow Days: {order.borrowDays} Days • Price: ৳{order.booksPrice}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Address: {order.address}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold capitalize text-emerald-400 border border-emerald-500/20">
                    {order.borrowStatus}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No orders found.</p>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-bold text-white">⭐ Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div
                key={rev._id}
                className="flex items-start gap-4 rounded-2xl border border-white/5 bg-slate-800/40 p-4 transition duration-300 hover:border-fuchsia-500/30"
              >
                <img
                  src={rev.bookImage}
                  alt={rev.bookName}
                  className="h-16 w-12 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{rev.bookName}</h3>
                    <div className="flex text-amber-400 text-xs">
                      {"★".repeat(rev.rating)}
                      <span className="text-slate-600">{"★".repeat(5 - rev.rating)}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{rev.reviewText}</p>
                  <span className="mt-2 block text-[10px] text-slate-500">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Readers_Page;