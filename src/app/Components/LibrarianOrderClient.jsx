'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  Search,
  User,
  Phone,
  MapPin,
  AlertCircle,
  FileText,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Tag,
  Banknote,
  Loader2
} from 'lucide-react';
import { updateBorrowStatus } from '@/lib/api/booksOrder';
import { toast } from 'react-hot-toast'; // অথবা আপনার প্রজেক্টের নোটিফিকেশন প্যাকেজ

const LibrarianOrderClient = ({ initialOrders = [] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loadingId, setLoadingId] = useState(null);

  // Filter orders based on Tab and Search term
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order?.borrowerName?.toLowerCase().includes(term) ||
      order?.email?.toLowerCase().includes(term) ||
      order?.booksName?.toLowerCase().includes(term) ||
      order?.phone?.includes(term) ||
      order?._id?.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'pending_payment') return order?.paymentStatus === 'pending' && order?.borrowStatus !== 'cancelled';
    if (activeTab === 'paid') return order?.paymentStatus === 'paid' && order?.borrowStatus !== 'cancelled';
    if (activeTab === 'cancelled') return order?.borrowStatus === 'cancelled';

    return true;
  });

  // Dynamic stats calculation
  const totalOrders = orders.length;
  const pendingCount = orders.filter(o => o.paymentStatus === 'pending' && o.borrowStatus !== 'cancelled').length;
  const paidCount = orders.filter(o => o.paymentStatus === 'paid' && o.borrowStatus !== 'cancelled').length;
  const cancelledCount = orders.filter(o => o.borrowStatus === 'cancelled').length;

  const totalRevenue = orders
    .filter(o => o.borrowStatus !== 'cancelled')
    .reduce((sum, order) => sum + (Number(order.booksPrice) || 0), 0);

  // 🚀 স্ট্যাটাস আপডেট করার সঠিক হ্যান্ডলার
  const handleBorrowStatusUpdate = async (orderId, newStatus) => {
    try {
      setLoadingId(orderId);

      // Backend API Call
      const result = await updateBorrowStatus(orderId, newStatus);

      if (result.success || result.acknowledged) {
        toast.success(`অর্ডারের স্ট্যাটাস সফলভাবে '${newStatus}' আপডেট হয়েছে!`);

        // UI Optimistic State Update
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { 
                  ...order, 
                  borrowStatus: newStatus,
                  // approved/delivered হলে পেমেন্ট স্ট্যাটাস স্বয়ংক্রিয়ভাবে paid করার অপশন
                  paymentStatus: (newStatus === 'approved' || newStatus === 'delivered') ? 'paid' : order.paymentStatus 
                }
              : order
          )
        );
      } else {
        toast.error(result.message || 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      console.error('Update Status Error:', error);
      toast.error('সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Librarian Order Management
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              লাইব্রেরির সমস্ত অর্ডার পরিচালনা করুন, বইয়ের স্ট্যাটাস আপডেট করুন এবং পেমেন্ট অনুমোদন বা বাতিল করুন।
            </p>
          </div>
        </div>

        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">সর্বমোট মূল্য</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-violet-400 mt-1">৳{totalRevenue}</h3>
              </div>
              <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl">
                <Banknote className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">সর্বমোট অর্ডার</p>
                <h3 className="text-3xl font-bold text-white mt-1">{totalOrders}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">পেন্ডিং পেমেন্ট</p>
                <h3 className="text-3xl font-bold text-amber-400 mt-1">{pendingCount}</h3>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">পরিশোধিত (Paid)</p>
                <h3 className="text-3xl font-bold text-emerald-400 mt-1">{paidCount}</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">বাতিলকৃত</p>
                <h3 className="text-3xl font-bold text-rose-400 mt-1">{cancelledCount}</h3>
              </div>
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Search Header */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'সব অর্ডার', count: totalOrders },
              { id: 'pending_payment', label: 'পেন্ডিং পেমেন্ট', count: pendingCount },
              { id: 'paid', label: 'পরিশোধিত', count: paidCount },
              { id: 'cancelled', label: 'বাতিলকৃত', count: cancelledCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="বইয়ের নাম, গ্রাহক, ইমেইল বা আইডি দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Orders Card Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-300">কোনো অর্ডার পাওয়া যায়নি</h3>
            <p className="text-slate-500 text-sm mt-1">অন্য কোনো ফিল্টার বা সার্চ দিয়ে চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => {
              const isLoading = loadingId === order._id;

              return (
                <div
                  key={order._id}
                  className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Book Image Header Section */}
                    <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
                      {order.booksImage ? (
                        <img
                          src={order.booksImage}
                          alt={order.booksName || 'Book Cover'}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-700">
                          <BookOpen className="w-16 h-16" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60">
                          ID: #{order._id?.slice(-6)}
                        </span>

                        <div className="flex gap-1.5">
                          <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border backdrop-blur-md capitalize ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                        <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                          {order.booksName || 'Untitled Book'}
                        </h3>
                        {order.booksPrice !== undefined && (
                          <div className="bg-indigo-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-white font-semibold text-xs shrink-0 shadow-md flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            ৳{order.booksPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Customer & Borrow Info */}
                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2.5">
                          <User className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold text-slate-200">
                              {order.borrowerName}
                            </h4>
                            <p className="text-xs text-slate-400">{order.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs text-slate-400">
                          <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{order.phone}</span>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs text-slate-400">
                          <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{order.address}</span>
                        </div>
                      </div>

                      <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/60 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-400" /> মেয়াদ:
                          </span>
                          <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            {order.borrowDays} Days
                          </span>
                        </div>

                        {order.notes && (
                          <div className="flex items-start gap-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-2 mt-2">
                            <FileText className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                            <span className="italic line-clamp-2">{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Footer Section */}
                  <div className="p-4 bg-slate-950/50 border-t border-slate-800/80 space-y-3">
                    {order.borrowStatus !== 'cancelled' ? (
                      <div className="grid grid-cols-3 gap-2">
                        {/* 🛠️ বাটনের ইভেন্ট হ্যান্ডলার আপডেট করা হয়েছে */}
                        <button
                          disabled={isLoading}
                          onClick={() => handleBorrowStatusUpdate(order._id, "approved")}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-1"
                        >
                          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Approve'}
                        </button>

                        <button
                          disabled={isLoading}
                          onClick={() => handleBorrowStatusUpdate(order._id, "cancelled")}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white transition-colors flex items-center justify-center gap-1"
                        >
                          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Cancel'}
                        </button>

                        <button
                          disabled={isLoading}
                          onClick={() => handleBorrowStatusUpdate(order._id, "delivered")}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white transition-colors flex items-center justify-center gap-1"
                        >
                          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Delivered'}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-1.5 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 text-xs font-medium">
                        অর্ডারটি বাতিল করা হয়েছে
                      </div>
                    )}

                    {/* Footer Date & Status */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'N/A'}
                      </span>
                      <span className="capitalize text-indigo-300 font-medium">
                        Status: {order.borrowStatus?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrarianOrderClient;