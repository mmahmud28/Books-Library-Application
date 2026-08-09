/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Mail, Phone, MapPin,
  CheckCircle2, ShieldCheck, Sparkles,
  Clock, Send, Loader2, BookmarkCheck, Tag, FileText,
  BookOpen
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createBorrowRequest } from '@/lib/api/booksOrder';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function BorrowOrderForm({ safeBook, userData }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDays, setSelectedDays] = useState('7');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const userDataa = userData || {};

  const onBorrowAction = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Data payload payload properly mapped
    const borrowRequest = {
      bookId: safeBook?._id || null,
      borrowerName: data.borrowerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      borrowDays: Number(data.borrowDays),
      notes: data.notes || "",
      libraryId: safeBook?.addById || null,
      userId: userDataa?.id || userDataa?._id || null,
      booksName: safeBook?.title || null,
      booksImage: safeBook?.coverImage || null,
      booksPrice: safeBook?.price || 100,
      author: safeBook?.author || null,
      category: safeBook?.category || null,
    };

    startTransition(async () => {
      try {
        const result = await createBorrowRequest(borrowRequest);

        if (result?.status === 409) {
          toast.error("You have already requested this book.");
          return;
        }

        if (!result?.success) {
          toast.error(result?.message || "Failed to place borrow request.");
          return;
        }

        toast.success("Borrow request placed successfully!");
        
        // If API returns insertedId redirect to payment page, else show success state
        if (result?.insertedId) {
          router.push(
            `/dashboard/readers/books/booksOrder/payment/${result.insertedId}`
          );
        } else {
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("Error processing request:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  const durationOptions = [
    { value: '7', label: '7 Days', badge: '1 Week' },
    { value: '14', label: '14 Days', badge: '2 Weeks' },
    { value: '30', label: '30 Days', badge: '1 Month' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-8 lg:px-12 flex justify-center items-center relative font-sans selection:bg-indigo-500 selection:text-white">

      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl shadow-indigo-950/20 overflow-hidden relative z-10"
      >
        {/* Top Header Bar */}
        <motion.div variants={itemVariants} className="px-6 py-5 sm:px-10 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <Link
            href={`/books/${safeBook?._id || ''}`}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200 border border-slate-700/60 group"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Book Details</span>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Borrow Request Checkout</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Success State View */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-8 text-center space-y-6 max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Borrow Request Confirmed!
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Your request for <span className="font-semibold text-indigo-300">{safeBook?.title || 'the book'}</span> has been successfully generated.
                </p>
              </div>

              <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800 text-left space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Borrowing Price:</span>
                  <span className="font-bold text-indigo-400 text-base">৳{safeBook?.price || '100'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Duration Selected:</span>
                  <span className="font-bold text-slate-200">{selectedDays} Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Request Status:</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                    Pending Approval
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/books"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-600/30"
                >
                  Explore More Books
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Main Form View */
            <form onSubmit={onBorrowAction} className="p-6 sm:p-10 lg:p-12">
              <input type="hidden" name="bookId" value={safeBook?._id || ''} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* LEFT SIDE: ENLARGED BOOK PREVIEW */}
                <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">

                  <div className="bg-slate-950/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-xl relative overflow-hidden">

                    {/* Top Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" /> Book Overview
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        ৳{safeBook?.price || '100'}
                      </span>
                    </div>

                    {/* Book Cover Container */}
                    <div className="flex flex-col items-center text-center space-y-6">

                      <div className="relative w-70 sm:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 group">
                        <Image
                          src={safeBook?.coverImage || "/placeholder.png"}
                          alt={safeBook?.title || "Book Cover"}
                          fill
                          sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      </div>

                      <div className="space-y-2">
                        {safeBook?.category && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-400" />
                            {safeBook.category}
                          </span>
                        )}

                        <h3 className="font-extrabold text-2xl text-white leading-tight">
                          {safeBook?.title || 'Untitled Book'}
                        </h3>

                        <p className="text-sm text-slate-400">
                          By <span className="font-semibold text-indigo-400">{safeBook?.author || 'Unknown Author'}</span>
                        </p>
                      </div>

                    </div>

                    {/* Detailed Spec Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                        <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-semibold">Publisher</span>
                        <span className="font-bold text-slate-200 truncate block mt-0.5">{safeBook?.publisher || 'N/A'}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                        <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-semibold">Condition</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{safeBook?.condition || 'Good'}</span>
                      </div>
                    </div>

                  </div>

                  {/* Policy Box */}
                  <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex gap-3.5 items-start text-xs text-indigo-300 leading-relaxed">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-indigo-400" />
                    <p>
                      Please ensure to return the book within the chosen borrow period to keep your library membership active and free of extra charges.
                    </p>
                  </div>

                </motion.div>

                {/* RIGHT SIDE: SPACIOUS FORM */}
                <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">

                  <div className="pb-4 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                      <User className="w-5 h-5 text-indigo-400" /> Borrower Information
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Please fill in your valid delivery and contact information.</p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        name="borrowerName"
                        required
                        defaultValue={userDataa?.name || ""}
                        placeholder="Enter your full name"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          name="email"
                          required
                          defaultValue={userDataa?.email || ""}
                          placeholder="name@example.com"
                          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          defaultValue={userDataa?.phone || ""}
                          placeholder="+880 17XXXXXXXX"
                          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Borrow Duration Cards */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-400" /> Select Borrow Duration *
                    </label>

                    <input type="hidden" name="borrowDays" value={selectedDays} />

                    <div className="grid grid-cols-3 gap-4">
                      {durationOptions.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setSelectedDays(option.value)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all text-center flex flex-col justify-center items-center ${selectedDays === option.value
                              ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10'
                              : 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/50 text-slate-400'
                            }`}
                        >
                          <span className="text-sm font-extrabold">{option.label}</span>
                          <span className="text-xs opacity-70 font-medium mt-0.5">{option.badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Delivery Address / Department *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        name="address"
                        required
                        defaultValue={userDataa?.address || ""}
                        placeholder="Campus, Department or House Address"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Additional Notes (Optional)</label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-4 top-3.5 text-slate-500" />
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any specific delivery instructions or notes for librarian..."
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4 px-8 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Your Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Confirm & Place Borrow Request</span>
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>

              </div>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}