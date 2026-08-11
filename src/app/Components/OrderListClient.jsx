'use client';

import React, { useState, useEffect } from 'react';
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
  Tag,
  Sparkles,
  CheckCircle2,
  Star,
  Loader2,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { checkBookReview } from '@/lib/api/booksOrder';
import { useRouter } from "next/navigation";

// Order Card Component
const OrderCard = ({ order }) => {
  const [isReviewed, setIsReviewed] = useState(false);
  const [checkingReview, setCheckingReview] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const verifyReviewStatus = async () => {
      if (order.borrowStatus === 'delivered' && order._id) {
        setCheckingReview(true);
        try {
          const res = await checkBookReview(order._id);
          if (isMounted && res?.success) {
            setIsReviewed(!!res.reviewed);
          }
        } catch (error) {
          console.error("Error checking review status:", error);
        } finally {
          if (isMounted) setCheckingReview(false);
        }
      }
    };

    verifyReviewStatus();

    return () => {
      isMounted = false;
    };
  }, [order._id, order.borrowStatus]);

  const handelMakePayment = (booksId) => {
    const bookId = booksId;
    router.push(`/dashboard/readers/books/booksOrder/payment/${bookId}`);
  };

  return (
    <div 
      className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Book Image Showcase Area */}
        <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
          {order.booksImage ? (
            <img
              src={order.booksImage}
              alt={order.booksName || 'Book cover'}
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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60">
              ID: #{order._id?.slice(-6)}
            </span>
            <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border backdrop-blur-md capitalize ${
              order.paymentStatus === 'paid'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {order.paymentStatus}
            </span>
          </div>

          {/* Book Title & Price */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
            <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
              {order.booksName || 'Untitled Book'}
            </h3>
            <div className="bg-indigo-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-white font-semibold text-xs shrink-0 shadow-md">
              ৳{order.booksPrice || 0}
            </div>
          </div>
        </div>

        {/* Customer & Borrow Details */}
        <div className="p-5 space-y-4">
          <div className="space-y-2.5">
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

          {/* Meta Info Box */}
          <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> ধার নেওয়ার মেয়াদ:
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

      {/* Footer Bar & Action Buttons */}
      <div className="px-5 py-3.5 bg-slate-950/40 border-t border-slate-800/60 space-y-3">
        
        {/* Pending Payment Button */}
        {order.paymentStatus === 'pending' && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents double click handling with parent div
              handelMakePayment(order._id);
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Now (পেমেন্ট করুন)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
        )}

        {/* Delivered & Review Options */}
        {order.borrowStatus === "delivered" && (
          <div>
            {checkingReview ? (
              <div className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>চেক করা হচ্ছে...</span>
              </div>
            ) : isReviewed ? (
              <Link
                href={`/dashboard/readers/books/review/${order._id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Review Submitted</span>
              </Link>
            ) : (
              <Link
                href={`/dashboard/readers/books/review/${order._id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Give Review</span>
              </Link>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }) : 'N/A'}
          </span>
          <span className="capitalize text-indigo-300 font-medium bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
            Status: {order.borrowStatus?.replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderListClient = ({ initialOrders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = initialOrders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order?.borrowerName?.toLowerCase().includes(term) ||
      order?.email?.toLowerCase().includes(term) ||
      order?.booksName?.toLowerCase().includes(term) ||
      order?.phone?.includes(term) ||
      order?._id?.toLowerCase().includes(term) ||
      order?.bookId?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'all' || order?.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = initialOrders.length;
  const paidPayments = initialOrders.filter(o => o.paymentStatus === 'paid').length;
  const pendingPayments = initialOrders.filter(o => o.paymentStatus === 'pending').length;
  const totalValue = initialOrders.reduce((sum, item) => sum + (item?.booksPrice || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                My Book Orders
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              আপনার সমস্ত বইয়ের অর্ডার, ধার নেওয়ার তথ্য এবং পেমেন্ট স্ট্যাটাস ড্যাশবোর্ড।
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">মোট অর্ডার</p>
                <h3 className="text-3xl font-bold text-white mt-2">{totalOrders}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">পরিশোধিত</p>
                <h3 className="text-3xl font-bold text-white mt-2">{paidPayments}</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">পেন্ডিং পেমেন্ট</p>
                <h3 className="text-3xl font-bold text-white mt-2">{pendingPayments}</h3>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">মোট বইয়ের দাম</p>
                <h3 className="text-3xl font-bold text-white mt-2">৳{totalValue}</h3>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                <Tag className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="বইয়ের নাম, গ্রাহক, ইমেইল বা আইডি দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'paid', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 shrink-0 ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Card Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-medium text-slate-300">কোনো অর্ডার পাওয়া যায়নি</h3>
            <p className="text-slate-500 text-sm mt-1">অন্য সার্চ টার্ম বা ফিল্টার নির্বাচন করে চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListClient;