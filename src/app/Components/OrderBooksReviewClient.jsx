'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Star,
    BookOpen,
    Calendar,
    User,
    CheckCircle2,
    ArrowLeft,
    MessageSquareText,
    Send,
    Loader2,
    ShieldCheck,
    Tag,
    Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { BooksReviewSubmit, checkBookReview } from '@/lib/api/booksOrder'; // checkBookReview Import করা হয়েছে

const OrderBooksReviewClient = ({ order }) => {
    // Safe extraction of order details
    const orderData = order?.data || order || {};

    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Review States
    const [reviewed, setReviewed] = useState(false);
    const [existingReview, setExistingReview] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);

    // Fetch review status on load
    useEffect(() => {
        const loadReviewStatus = async () => {
            try {
                setLoadingStatus(true);
                // checkBookReview API থেকে আগের রিভিউ ডেটা চেক করা
                const result = await checkBookReview(orderData._id);

                if (result?.success && result?.reviewed) {
                    setReviewed(true);
                    setExistingReview(result.review || null);
                    if (result.review) {
                        setRating(result.review.rating || 5);
                        setReviewText(result.review.reviewText || '');
                    }
                }
            } catch (error) {
                console.error("Error checking review status:", error);
            } finally {
                setLoadingStatus(false);
            }
        };

        if (orderData?._id) {
            loadReviewStatus();
        } else {
            setLoadingStatus(false);
        }
    }, [orderData]);

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reviewed) {
            toast.error("আপনি ইতোমধ্যে একটি রিভিউ জমা দিয়েছেন।");
            return;
        }

        if (!reviewText.trim()) {
            toast.error("অনুগ্রহ করে আপনার রিভিউ লিখুন।");
            return;
        }

        setIsSubmitting(true);

        const reviewPayload = {
            orderId: orderData._id,
            bookId: orderData.bookId,
            userId: orderData.userId,
            borrowerName: orderData.borrowerName,
            rating,
            reviewText,
            createdAt: new Date().toISOString(),
            bookName: orderData.booksName,
            bookImage: orderData.booksImage,
        };

        try {
            const result = await BooksReviewSubmit(reviewPayload);

            if (result?.success) {
                toast.success(result.message || "রিভিউ সফলভাবে জমা হয়েছে!");
                setReviewed(true);
                setExistingReview(reviewPayload);
            } else {
                toast.error(result?.message || "রিভিউ জমা দিতে ব্যর্থ হয়েছে।");
            }
        } catch (error) {
            toast.error("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
                setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500 selection:text-white">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Navigation / Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
                    <Link
                        href="/dashboard/readers/my-orders"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        অর্ডার তালিকায় ফিরে যান
                    </Link>
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                        Order ID: #{orderData._id?.slice(-6)}
                    </span>
                </div>

                {/* Top Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                        বইয়ের অভিজ্ঞতা শেয়ার করুন
                    </h1>
                    <p className="text-sm text-slate-400 max-w-lg mx-auto">
                        আপনার মূল্যবান রিভিউটি অন্যান্য পাঠকদের সঠিক বই নির্বাচনে সাহায্য করবে।
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Book Details Card */}
                    <div className="lg:col-span-5 bg-slate-900/70 rounded-3xl p-6 border border-slate-800 backdrop-blur-xl space-y-6 shadow-xl">
                        <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                            {orderData.booksImage ? (
                                <img
                                    src={orderData?.booksImage}
                                    alt={orderData?.booksName || "Book Cover"}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    loading="eager"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-700">
                                    <BookOpen className="w-16 h-16" />
                                </div>
                            )}

                            <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-white line-clamp-2">
                                {orderData.booksName}
                            </h2>

                            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                                <span className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-indigo-400" />
                                    গ্রাহক: <strong className="text-slate-200">{orderData.borrowerName}</strong>
                                </span>
                                <span className="flex items-center gap-1.5 font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                                    <Tag className="w-3.5 h-3.5" /> ৳{orderData.booksPrice}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                                    <div>
                                        <p className="text-slate-500 text-[10px]">পড়ার সময়</p>
                                        <p className="font-medium text-slate-200">{orderData.borrowDays} দিন</p>
                                    </div>
                                </div>

                                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <div>
                                        <p className="text-slate-500 text-[10px]">অর্ডারের তারিখ</p>
                                        <p className="font-medium text-slate-200">
                                            {orderData.createdAt
                                                ? new Date(orderData.createdAt).toLocaleDateString('bn-BD', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Review Form or Submitted View */}
                    <div className="lg:col-span-7 bg-slate-900/70 rounded-3xl p-6 sm:p-8 border border-slate-800 backdrop-blur-xl shadow-xl">
                        {loadingStatus ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-3">
                                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                                <p className="text-sm text-slate-400">স্ট্যাটাস লোড হচ্ছে...</p>
                            </div>
                        ) : reviewed ? (
                            /* ----------------- পূর্বের দেওয়া রিভিউ ডিসপ্লে ----------------- */
                            <div className="space-y-6 py-4">
                                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-emerald-300">রিভিউ প্রদান সম্পন্ন হয়েছে</h4>
                                        <p className="text-xs text-slate-400">আপনি ইতোমধ্যেই এই বইটির জন্য আপনার মতামত জমা দিয়েছেন।</p>
                                    </div>
                                </div>

                                {/* Submitted Rating */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        আপনার দেওয়া রেটিং
                                    </label>
                                    <div className="flex items-center gap-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-6 h-6 ${
                                                    star <= (existingReview?.rating || rating)
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-slate-700'
                                                }`}
                                            />
                                        ))}
                                        <span className="ml-3 text-sm font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                                            {existingReview?.rating || rating} / 5
                                        </span>
                                    </div>
                                </div>

                                {/* Submitted Review Text */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <MessageSquareText className="w-4 h-4 text-indigo-400" />
                                        আপনার রিভিউ
                                    </label>
                                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                                        {existingReview?.reviewText || reviewText || "কোনো লিখিত বক্তব্য নেই।"}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href="/dashboard/readers/my-orders"
                                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs transition-all"
                                    >
                                        অন্যান্য অর্ডারে ফিরে যান
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* ----------------- রিভিউ ফর্ম (নতুন রিভিউ দেওয়ার জন্য) ----------------- */
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Rating Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        রেটিং নির্বাচন করুন
                                    </label>

                                    <div className="flex items-center gap-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 justify-center sm:justify-start">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="p-1 transition-transform transform hover:scale-125 focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${
                                                        star <= (hoverRating || rating)
                                                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                                                            : 'text-slate-700'
                                                    } transition-all duration-200`}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-3 text-sm font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                                            {rating} / 5
                                        </span>
                                    </div>
                                </div>

                                {/* Review Textarea Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <MessageSquareText className="w-4 h-4 text-indigo-400" />
                                        আপনার রিভিউ লিখুন
                                    </label>

                                    <textarea
                                        rows={5}
                                        required
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="বইটি পড়ে আপনার কেমন লাগলো? গল্পের বিষয়বস্তু, লেখার ধরন এবং লাইব্রেরি সার্ভিস কেমন ছিল বিবরণ দিন..."
                                        className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            জমা দেওয়া হচ্ছে...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            রিভিউ জমা দিন
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBooksReviewClient;