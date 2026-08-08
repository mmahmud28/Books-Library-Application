import { adminSummeryData } from '@/lib/api/userList';
import React from 'react';
import Image from 'next/image';

const AdminPage = async () => {
    const summary = await adminSummeryData();
    const { stats, users, books, orders, delivery, reviews } = summary;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md shadow-xl">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Admin Analytics Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Overview of platform operations, metrics, and activities
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">System Live</span>
                </div>
            </div>

            {/* Key Metrics / Overview Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="group relative overflow-hidden bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2">৳{stats.totalSales}</h3>
                        </div>
                        <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                    </div>
                    <p className="text-xs text-emerald-400 mt-4 flex items-center gap-1 font-medium">
                        <span>↑ {stats.paidOrders} Paid Orders</span>
                    </p>
                </div>

                <div className="group relative overflow-hidden bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Users</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2">{stats.totalUsers}</h3>
                        </div>
                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        </div>
                    </div>
                    <div className="flex gap-2 text-[11px] text-slate-400 mt-4">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300">{stats.totalReaders} Readers</span>
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300">{stats.totalLibrarians} Libs</span>
                    </div>
                </div>

                <div className="group relative overflow-hidden bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Books</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2">{stats.totalBooks}</h3>
                        </div>
                        <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        </div>
                    </div>
                    <p className="text-xs text-emerald-400 mt-4 flex items-center gap-1 font-medium">
                        <span>● {stats.activeBooks} Active Books</span>
                    </p>
                </div>

                <div className="group relative overflow-hidden bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Avg Rating</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2">{stats.averageRating} <span className="text-sm font-normal text-amber-400">★</span></h3>
                        </div>
                        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">
                        Based on {stats.totalReviews} customer reviews
                    </p>
                </div>
            </div>

            {/* Middle Section: Progress & Books */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Delivery Progress Status */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-100 mb-1">Delivery Performance</h2>
                        <p className="text-xs text-slate-400 mb-6">Fulfillment statistics for active orders</p>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-emerald-400">Delivered ({delivery.delivered})</span>
                                    <span className="text-slate-300">{delivery.percentage.delivered}%</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${delivery.percentage.delivered}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-amber-400">Pending ({delivery.pending})</span>
                                    <span className="text-slate-300">{delivery.percentage.pending}%</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${delivery.percentage.pending}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800/80">
                        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800 text-center">
                            <span className="block text-xs text-slate-400">Unique Buyers</span>
                            <span className="text-lg font-bold text-indigo-400">{stats.uniqueCustomers}</span>
                        </div>
                        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800 text-center">
                            <span className="block text-xs text-slate-400">Unique Books</span>
                            <span className="text-lg font-bold text-pink-400">{stats.uniqueBooksOrdered}</span>
                        </div>
                    </div>
                </div>

                {/* Available Books Section */}
                <div className="lg:col-span-2 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-100">Featured Catalog</h2>
                            <p className="text-xs text-slate-400">Active books available for readers</p>
                        </div>
                        <span className="bg-pink-500/10 text-pink-400 text-xs font-semibold px-3 py-1 rounded-full border border-pink-500/20">
                            {books.total} Books
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {books.list.map((book) => (
                            <div key={book._id} className="group bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 p-4 rounded-xl flex gap-4 transition-all duration-300 hover:bg-slate-800/80">
                                <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                                    <img 
                                        src={book.coverImage} 
                                        alt={book.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex flex-col justify-between overflow-hidden">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">{book.category}</span>
                                        <h4 className="font-semibold text-slate-100 truncate text-sm mt-0.5">{book.title}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">By {book.author}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
                                        <span className="text-sm font-bold text-emerald-400">৳{book.price}</span>
                                        <span className="text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">Stock: {book.stockQuantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Data Table */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-slate-100">Recent Orders</h2>
                        <p className="text-xs text-slate-400">List of latest user orders and borrow requests</p>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                        Total: {orders.total}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-800/50 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="p-4">Book</th>
                                <th className="p-4">Borrower</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Borrow Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {orders.list.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={order.booksImage} alt={order.booksName} className="w-8 h-10 object-cover rounded bg-slate-800" />
                                        <span className="font-semibold text-slate-200">{order.booksName}</span>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-medium text-slate-200">{order.borrowerName}</p>
                                        <p className="text-[10px] text-slate-500">{order.email}</p>
                                    </td>
                                    <td className="p-4 font-medium">{order.borrowDays} Days</td>
                                    <td className="p-4 font-bold text-slate-200">৳{order.booksPrice}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border capitalize ${
                                            order.borrowStatus === 'delivered' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                                        }`}>
                                            {order.borrowStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Grid: Users and Recent Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Users List */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-100">Registered Users</h2>
                        <span className="text-xs text-slate-400">Total: {users.total}</span>
                    </div>
                    <div className="space-y-3">
                        {users.list.map((u) => (
                            <div key={u._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/60 hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <img src={u.image} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                                    <div>
                                        <p className="text-xs font-semibold text-slate-200">{u.name}</p>
                                        <p className="text-[10px] text-slate-400">{u.email}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border capitalize ${
                                    u.role === 'admin' 
                                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                        : u.role === 'librarian'
                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                }`}>
                                    {u.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews List */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-100">Recent Customer Reviews</h2>
                        <span className="text-xs text-amber-400 font-bold">★ {reviews.averageRating} / 5.0</span>
                    </div>
                    <div className="space-y-3">
                        {reviews.list.map((review) => (
                            <div key={review._id} className="p-3.5 rounded-xl bg-slate-800/30 border border-slate-800/60">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-200">{review.borrowerName}</span>
                                        <span className="text-[10px] text-slate-500">• {review.bookName}</span>
                                    </div>
                                    <div className="flex text-amber-400 text-xs">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <span key={i}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-300 italic bg-slate-900/40 p-2 rounded-lg border border-slate-800/50">
                                    "{review.reviewText.trim()}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminPage;