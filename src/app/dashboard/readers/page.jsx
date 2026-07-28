"use client";
import { useSession } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const Readers_Page = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>;
    }

    const user = session?.user;



    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold p-4">Welcome Back, {user?.name}!</h1>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {/* Books Read */}
                <div className="group relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-violet-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.35)]">
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl transition-all duration-500 group-hover:scale-150"></div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Books Read</p>
                            <h2 className="mt-3 text-5xl font-black text-white transition duration-500 group-hover:scale-110">
                                48
                            </h2>

                            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
                                +12% this month
                            </div>
                        </div>

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-4xl shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                            📚
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full"></div>
                </div>

                {/* Pending Orders */}
                <div className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.35)]">
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange-500/20 blur-3xl transition-all duration-500 group-hover:scale-150"></div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Pending Orders</p>
                            <h2 className="mt-3 text-5xl font-black text-white transition duration-500 group-hover:scale-110">
                                5
                            </h2>

                            <div className="mt-5 flex items-center gap-2 text-sm text-yellow-400">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></span>
                                Awaiting Delivery
                            </div>
                        </div>

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-4xl shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                            🚚
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500 group-hover:w-full"></div>
                </div>

                {/* Total Spent */}
                <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.35)]">
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/20 blur-3xl transition-all duration-500 group-hover:scale-150"></div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Spent</p>
                            <h2 className="mt-3 text-4xl font-black text-white transition duration-500 group-hover:scale-105">
                                ৳8,450
                            </h2>

                            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
                                Total Fees Paid
                            </div>
                        </div>

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-4xl shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                            💰
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:w-full"></div>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">

                {/* Books Read by Month */}
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            📚 Books Read by Month
                        </h2>

                        <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300">
                            Monthly
                        </span>
                    </div>

                    <div className="space-y-4">

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-gray-300">
                                <span>Jan</span>
                                <span>3 Books</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700">
                                <div className="h-3 w-1/4 rounded-full bg-violet-500 transition-all duration-500 hover:w-[30%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-gray-300">
                                <span>Feb</span>
                                <span>5 Books</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700">
                                <div className="h-3 w-2/5 rounded-full bg-violet-500"></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-gray-300">
                                <span>Mar</span>
                                <span>7 Books</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700">
                                <div className="h-3 w-3/5 rounded-full bg-violet-500"></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-gray-300">
                                <span>Apr</span>
                                <span>4 Books</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700">
                                <div className="h-3 w-1/3 rounded-full bg-violet-500"></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-gray-300">
                                <span>May</span>
                                <span>6 Books</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700">
                                <div className="h-3 w-1/2 rounded-full bg-violet-500"></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-gray-300">
                                <span>Jun</span>
                                <span>8 Books</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700">
                                <div className="h-3 w-3/4 rounded-full bg-violet-500"></div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Monthly Spending */}
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-500">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            💰 Monthly Spending
                        </h2>

                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                            Expenses
                        </span>
                    </div>

                    <div className="flex h-56 items-end justify-between gap-3">

                        <div className="flex flex-col items-center">
                            <div className="w-12 rounded-t-xl bg-emerald-500 transition-all duration-500 hover:h-24" style={{ height: "60px" }}></div>
                            <span className="mt-2 text-sm text-gray-400">Jan</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 rounded-t-xl bg-emerald-500" style={{ height: "90px" }}></div>
                            <span className="mt-2 text-sm text-gray-400">Feb</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 rounded-t-xl bg-emerald-500" style={{ height: "130px" }}></div>
                            <span className="mt-2 text-sm text-gray-400">Mar</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 rounded-t-xl bg-emerald-500" style={{ height: "170px" }}></div>
                            <span className="mt-2 text-sm text-gray-400">Apr</span>
                        </div>

                    </div>
                </div>

                {/* Delivery Status */}
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-500 lg:col-span-2">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            🚚 Delivery Status
                        </h2>

                        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                            Overall
                        </span>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">

                        <div className="flex items-center justify-center">
                            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-[conic-gradient(#22c55e_80%,#facc15_80%_95%,#ef4444_95%)]">

                                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-900">
                                    <div className="text-center">
                                        <h3 className="text-4xl font-black text-white">80%</h3>
                                        <p className="text-gray-400">Delivered</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="space-y-6">

                            <div>
                                <div className="mb-2 flex justify-between text-white">
                                    <span>Delivered</span>
                                    <span>80%</span>
                                </div>

                                <div className="h-3 rounded-full bg-slate-700">
                                    <div className="h-3 w-4/5 rounded-full bg-green-500"></div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between text-white">
                                    <span>Pending</span>
                                    <span>15%</span>
                                </div>

                                <div className="h-3 rounded-full bg-slate-700">
                                    <div className="h-3 w-[15%] rounded-full bg-yellow-400"></div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between text-white">
                                    <span>Canceled</span>
                                    <span>5%</span>
                                </div>

                                <div className="h-3 rounded-full bg-slate-700">
                                    <div className="h-3 w-[5%] rounded-full bg-red-500"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Readers_Page;