'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, User, Mail,
  Phone, MapPin, CheckCircle2, ShieldCheck, Info,
  Sparkles, Clock, Send, Loader2, BookmarkCheck, Building, Tag
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function BorrowOrderForm({ safeBook }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDays, setSelectedDays] = useState('7');
  const [isPending, startTransition] = useTransition();

  const onBorrowAction = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const borrowRequest = {
      bookId: data.bookId,
      borrowerName: data.borrowerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      borrowDays: Number(data.borrowDays),
      notes: data.notes || "",
    };

    console.log("Borrow Request Data:", borrowRequest);
    // Go to payment Page
  };

  const durationOptions = [
    { value: '7', label: '7 Days', badge: '1 Week' },
    { value: '14', label: '14 Days', badge: '2 Weeks' },
    { value: '30', label: '30 Days', badge: '1 Month' },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-base-200/60 to-base-300/40 p-4 sm:p-6 md:p-10 flex justify-center items-center relative overflow-hidden">

      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl bg-base-100/70 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-base-100/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative z-10"
      >
        {/* Navigation Top Bar */}
        <motion.div variants={itemVariants} className="p-4 sm:p-6 border-b border-base-200/80 flex items-center justify-between bg-base-100/40">
          <Link
            href={`/books/${safeBook?._id || ''}`}
            className="btn btn-ghost btn-sm rounded-2xl gap-2 hover:bg-base-200/80 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Details</span>
          </Link>

          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="font-bold text-sm tracking-wide">Borrow Request</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Success Card */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 sm:p-14 text-center space-y-6 max-w-xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-success/15 border-2 border-success/30 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-success/10"
              >
                <CheckCircle2 className="w-12 h-12 text-success" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Order Request Placed!
                </h2>
                <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                  Your borrow request for <span className="font-semibold text-base-content underline decoration-primary/40">{safeBook?.title || 'the book'}</span> has been sent.
                </p>
              </div>

              <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200 text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Borrowing Fee:</span>
                  <span className="font-bold text-primary">৳{safeBook?.price || '200'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Duration Selected:</span>
                  <span className="font-bold">{selectedDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Status:</span>
                  <span className="badge badge-warning badge-sm font-medium">Pending Approval</span>
                </div>
              </div>

              <Link href="/books" className="btn btn-primary rounded-2xl px-10 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all w-full sm:w-auto">
                Explore More Books
              </Link>
            </motion.div>
          ) : (
            /* Main Form Layout */
            <form onSubmit={onBorrowAction} className="p-6 sm:p-8 md:p-10">
              <input type="hidden" name="bookId" value={safeBook?._id || ''} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT SIDE: ENLARGED BOOK SUMMARY CARD WITH PRICE */}
                <motion.div variants={itemVariants} className="lg:col-span-6 space-y-5">
                  <div className="relative group bg-gradient-to-b from-base-200/90 via-base-200/50 to-base-200/30 p-6 sm:p-8 rounded-3xl border border-base-200/80 shadow-md overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-6">
                      <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                        <Info className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold">Selected Book Summary</h3>
                    </div>

                    {/* ENLARGED BOOK DETAILS BLOCK */}
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                      {/* Enriched & Larger Book Cover */}
                      <div className="relative w-40 sm:w-44 h-56 sm:h-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-base-300 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={safeBook?.coverImage || "/placeholder.png"}
                          alt={safeBook?.title || "Book Cover"}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Text Information */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/20">
                            <BookmarkCheck className="w-3.5 h-3.5" />
                            {safeBook?.category || 'General'}
                          </span>

                          {/* PRICE BADGE ADDED HERE */}
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Tag className="w-3.5 h-3.5" />
                            ৳{safeBook?.price || '200'}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-xl sm:text-2xl text-base-content leading-snug">
                          {safeBook?.title || 'Untitled Book'}
                        </h4>

                        <p className="text-sm text-base-content/80">
                          By <span className="font-bold text-primary">{safeBook?.author || 'Unknown Author'}</span>
                        </p>

                        <div className="pt-1 text-xs text-base-content/60 space-y-1">
                          <p className="flex items-center justify-center sm:justify-start gap-1.5">
                            <Building className="w-3.5 h-3.5 text-base-content/40" />
                            Publisher: <span className="font-medium text-base-content/80">{safeBook?.publisher || 'N/A'}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="divider my-6 before:bg-base-300/60 after:bg-base-300/60"></div>

                    {/* Book Metadata List (4 Grid Layout with Price Box) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-base-100/60 border border-base-200 text-center space-y-1">
                        <span className="text-base-content/50 block">Borrow Price</span>
                        <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                          ৳{safeBook?.price || '200'}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-base-100/60 border border-base-200 text-center space-y-1">
                        <span className="text-base-content/50 block">Condition</span>
                        <span className="font-bold text-sm text-base-content">{safeBook?.condition || 'Good'}</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-base-100/60 border border-base-200 text-center space-y-1">
                        <span className="text-base-content/50 block">Availability</span>
                        <span className="font-bold text-sm text-success flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                          {safeBook?.stockQuantity ? `${safeBook.stockQuantity} Left` : 'In Stock'}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-base-100/60 border border-base-200 text-center space-y-1">
                        <span className="text-base-content/50 block">Managed By</span>
                        <span className="font-bold text-sm text-base-content truncate block">{safeBook?.addedBy || 'Library'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Policy Info Box */}
                  <div className="p-4 rounded-2xl bg-info/10 text-info border border-info/20 flex gap-3 items-start text-xs leading-relaxed">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-info" />
                    <p>
                      Kindly ensure the return of the book within the chosen timeframe to avoid overdue fees as per library terms.
                    </p>
                  </div>
                </motion.div>

                {/* RIGHT SIDE: Interactive Borrower Input Form */}
                <motion.div variants={itemVariants} className="lg:col-span-6 space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> Borrower Details
                    </h3>
                    <span className="text-xs text-base-content/50">* Required fields</span>
                  </div>

                  {/* Name Input */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">Full Name *</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                      <input
                        type="text"
                        name="borrowerName"
                        required
                        placeholder="e.g. John Doe"
                        className="input input-bordered text-white rounded-2xl pl-11 w-full focus:input-primary bg-base-100/60 transition-all border-base-200"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">Email Address *</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="input text-white input-bordered rounded-2xl pl-11 w-full focus:input-primary bg-base-100/60 transition-all border-base-200"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">Phone Number *</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+880 17XXXXXXXX"
                          className="input text-white input-bordered rounded-2xl pl-11 w-full focus:input-primary bg-base-100/60 transition-all border-base-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Days Picker Cards */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> Select Duration *
                      </span>
                    </label>

                    <input type="hidden" name="borrowDays" value={selectedDays} />

                    <div className="grid grid-cols-3 gap-3">
                      {durationOptions.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setSelectedDays(option.value)}
                          className={`cursor-pointer p-3 rounded-2xl border transition-all text-center relative overflow-hidden flex flex-col justify-center items-center ${selectedDays === option.value
                              ? 'border-primary bg-primary/10 text-primary shadow-md shadow-primary/10'
                              : 'border-base-200 bg-base-100/40 hover:bg-base-200/50 text-base-content/80'
                            }`}
                        >
                          <span className="text-sm font-extrabold">{option.label}</span>
                          <span className="text-[10px] opacity-70 font-medium">{option.badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">Address / Department *</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Campus, Dept or Delivery Address"
                        className="input text-white input-bordered rounded-2xl pl-11 w-full focus:input-primary bg-base-100/60 transition-all border-base-200"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">Additional Notes (Optional)</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="Special requirements or notes for the librarian..."
                      className="textarea text-white textarea-bordered rounded-2xl w-full focus:textarea-primary bg-base-100/60 transition-all border-base-200 text-sm"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="btn btn-primary w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
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