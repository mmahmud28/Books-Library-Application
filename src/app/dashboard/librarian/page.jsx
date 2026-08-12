import { librarianSummeryData } from "@/lib/api/userList";
import { auth } from "@/lib/auth";
import { getUserSession } from "@/lib/core/session";
import { headers } from "next/headers";
import React from "react";

const LibrianPage = async () => {
  const userSession = await getUserSession();
  const userId = userSession?.id;

  if (!userId) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 p-6">
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-rose-400 backdrop-blur-xl">
          <p className="font-semibold">Unauthorized Access! Please log in as a Librarian.</p>
        </div>
      </div>
    );
  }

  const {token} = await auth.api.getToken({
    headers: await headers(),
  })
  

  const summaryData = await librarianSummeryData(userId, token);

  

  // Destructure Data safely
  const librarian = summaryData?.librarian;
  const stats = summaryData?.stats;
  const sales = summaryData?.sales;
  const booksStats = summaryData?.books;
  const delivery = summaryData?.delivery;
  const orders = summaryData?.orders || [];
  const librarianBooks = summaryData?.librarianBooks || [];
  const reviews = summaryData?.reviews || [];

  // Calculating max heights for dynamic bar charts
  const maxSales = Math.max(...(sales?.monthly?.map((s) => s.amount) || [1]), 1);
  const maxBooksSold = Math.max(...(booksStats?.monthly?.map((b) => b.books) || [1]), 1);

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8">
      {/* Profile Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-600/20 blur-3xl"></div>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5">
            {librarian?.photo ? (
              <img
                src={librarian.photo}
                alt={librarian.name}
                className="h-20 w-20 rounded-2xl border-2 border-emerald-500/50 object-cover shadow-xl shadow-emerald-500/20"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-3xl font-bold text-white shadow-xl">
                {librarian?.name?.charAt(0) || "L"}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
                Librarian Portal,{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  {librarian?.name || "Manager"}
                </span>{" "}
                📚
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {librarian?.email} • {librarian?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              {librarian?.role || "Librarian"} Dashboard
            </span>
            <div className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-400">
              ★ {stats?.averageRating ?? 0} / 5 Rating
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats Overview (4 Grid Cards) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Revenue / Sales */}
        <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Revenue</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                ৳{stats?.totalSales ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              💵
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            Paid Orders: {stats?.paidOrders ?? 0}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Total Orders */}
        <div className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Borrow Requests</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                {stats?.totalOrders ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              📦
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-400">
            Completed: {stats?.completedOrders ?? 0} • Pending: {stats?.pendingOrders ?? 0}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Total Library Books */}
        <div className="group relative overflow-hidden rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Active Books Stock</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                {stats?.totalBooks ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              📖
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-violet-400">
            Active Titles: {booksStats?.active ?? 0}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Books Rented / Sold */}
        <div className="group relative overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500 hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Books Delivered</p>
              <h2 className="mt-2 text-4xl font-black text-white transition-all duration-300 group-hover:scale-105">
                {stats?.totalBooksSold ?? 0}
              </h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-3xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              🏷️
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-amber-400">
            Unique Titles Sold: {stats?.uniqueBooksSold ?? 0}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
      </div>

      {/* Analytics Charts & Delivery Performance */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              📈 Revenue Analytics
            </h2>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Monthly Growth
            </span>
          </div>

          <div className="flex h-52 items-end justify-around gap-3 pt-6">
            {sales?.monthly && sales.monthly.length > 0 ? (
              sales.monthly.map((item, idx) => {
                const heightPercent =
                  maxSales > 0 ? Math.round((item.amount / maxSales) * 100) : 15;
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
                      style={{ height: `${Math.max(heightPercent, 20)}%` }}
                    ></div>
                    <span className="mt-3 text-xs font-medium text-slate-400">
                      {item.month}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                No sales records found.
              </p>
            )}
          </div>
        </div>

        {/* Books Distribution Chart */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              📊 Book Circulation Rate
            </h2>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              Monthly Distribution
            </span>
          </div>

          <div className="flex h-52 items-end justify-around gap-3 pt-6">
            {booksStats?.monthly && booksStats.monthly.length > 0 ? (
              booksStats.monthly.map((item, idx) => {
                const heightPercent =
                  maxBooksSold > 0 ? Math.round((item.books / maxBooksSold) * 100) : 15;
                return (
                  <div
                    key={idx}
                    className="group flex h-full w-full max-w-[60px] flex-col items-center justify-end"
                  >
                    <span className="mb-2 text-xs font-semibold text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      {item.books} Items
                    </span>
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-cyan-600 to-blue-400 shadow-lg shadow-cyan-900/30 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-125"
                      style={{ height: `${Math.max(heightPercent, 20)}%` }}
                    ></div>
                    <span className="mt-3 text-xs font-medium text-slate-400">
                      {item.month}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                No book distribution history.
              </p>
            )}
          </div>
        </div>

        {/* Delivery Ratio Conic Meter */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              🚚 Order Fulfillment & Delivery Status
            </h2>
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              Fulfillment
            </span>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Dynamic Circular Meter */}
            <div className="flex items-center justify-center">
              <div
                className="relative flex h-52 w-52 items-center justify-center rounded-full shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{
                  background: `conic-gradient(
                    #10b981 0% ${delivery?.percentage?.delivered ?? 0}%, 
                    #f59e0b ${delivery?.percentage?.delivered ?? 0}% ${(delivery?.percentage?.delivered ?? 0) + (delivery?.percentage?.pending ?? 0)}%, 
                    #ef4444 ${(delivery?.percentage?.delivered ?? 0) + (delivery?.percentage?.pending ?? 0)}% 100%
                  )`,
                }}
              >
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-slate-950 shadow-inner">
                  <h3 className="text-3xl font-black text-white">
                    {delivery?.percentage?.delivered ?? 0}%
                  </h3>
                  <p className="text-xs font-medium text-slate-400">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Status Breakdown Bars */}
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span> Delivered ({delivery?.delivered ?? 0})
                  </span>
                  <span className="font-bold text-emerald-400">{delivery?.percentage?.delivered ?? 0}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${delivery?.percentage?.delivered ?? 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-amber-400"></span> Pending Approval ({delivery?.pending ?? 0})
                  </span>
                  <span className="font-bold text-amber-400">{delivery?.percentage?.pending ?? 0}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-amber-400 transition-all duration-1000"
                    style={{ width: `${delivery?.percentage?.pending ?? 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500"></span> Canceled ({delivery?.canceled ?? 0})
                  </span>
                  <span className="font-bold text-rose-400">{delivery?.percentage?.canceled ?? 0}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-rose-500 transition-all duration-1000"
                    style={{ width: `${delivery?.percentage?.canceled ?? 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
          📋 Recent Orders Managed
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Borrower</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="transition hover:bg-slate-800/40">
                    <td className="flex items-center gap-3 px-4 py-3 font-semibold text-white">
                      <img
                        src={order.booksImage}
                        alt={order.booksName}
                        className="h-12 w-9 rounded object-cover"
                      />
                      {order.booksName}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-200">{order.borrowerName}</p>
                      <p className="text-xs text-slate-500">{order.email}</p>
                    </td>
                    <td className="px-4 py-3">{order.borrowDays} Days</td>
                    <td className="px-4 py-3 font-bold text-white">৳{order.booksPrice}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-400 border border-emerald-500/20">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          order.borrowStatus === "delivered"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {order.borrowStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Books Managed & Reader Reviews */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Librarian Managed Books */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-bold text-white">📚 Books Collection</h2>
          <div className="space-y-4">
            {librarianBooks.length > 0 ? (
              librarianBooks.map((book) => (
                <div
                  key={book._id}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-800/40 p-4 transition duration-300 hover:border-emerald-500/30"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-16 w-12 rounded-lg object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{book.title}</h3>
                    <p className="text-xs text-slate-400">
                      Author: {book.author} • Category: {book.category}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-400">
                      Price: ৳{book.price} | Stock: {book.stockQuantity} pcs
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    {book.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No books added yet.</p>
            )}
          </div>
        </div>

        {/* Reader Reviews */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-bold text-white">⭐ Reader Feedback</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-slate-800/40 p-4 transition duration-300 hover:border-amber-500/30"
                >
                  <img
                    src={rev.bookImage}
                    alt={rev.bookName}
                    className="h-16 w-12 rounded-lg object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{rev.bookName}</h3>
                      <div className="flex text-xs text-amber-400">
                        {"★".repeat(rev.rating)}
                        <span className="text-slate-600">{"★".repeat(5 - rev.rating)}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">{rev.reviewText}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                      <span>By {rev.borrowerName}</span>
                      <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No reviews received yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrianPage;