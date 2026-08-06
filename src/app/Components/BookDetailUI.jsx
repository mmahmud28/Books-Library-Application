/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Folder, Building2, Globe,
  Calendar, Package, Sparkles, UserCheck,
  BookOpen, Heart, CheckCircle2,
  Info, ExternalLink, ShieldCheck, Share2,
  Clock, Tag
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { checkAlreadyOrdered } from '@/lib/api/booksOrder';
import toast from 'react-hot-toast';

export default function BookDetailUI({ safeBook, userData }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [alreadyOrdered, setAlreadyOrdered] = useState(false);
  const [checkingOrder, setCheckingOrder] = useState(true);

  const router = useRouter();

  const userId = userData?.id;
  const bookId = safeBook?._id;

  useEffect(() => {
    const checkOrder = async () => {
      if (!userId || !bookId) {
        setCheckingOrder(false);
        return;
      }

      try {      
        const result = await checkAlreadyOrdered(userId, bookId);
        if (result?.success) {
          setAlreadyOrdered(result.alreadyOrdered === true);
        } else {
          setAlreadyOrdered(false);
        }
      } catch (error) {
        console.error("Error checking existing order:", error);
        setAlreadyOrdered(false);
      } finally {
        setCheckingOrder(false);
      }
    };

    checkOrder();
  }, [userId, bookId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const handleBackClick = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push('/books');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: safeBook?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleBorrow = () => {
    if (alreadyOrdered) {
      toast.error("You have already requested this book.");
      return;
    }

    if (checkingOrder) {
      toast.info("Please wait, checking your previous request...");
      return;
    }

    if (!userId) {
      toast.error("Please login first.");
      return;
    }

    if (!bookId) {
      toast.error("Book information not found.");
      return;
    }

    router.push(`/dashboard/readers/books/booksOrder/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-12 px-4 sm:px-8 flex justify-center items-center font-sans relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-slate-800/80 shadow-2xl shadow-indigo-950/20 overflow-hidden relative z-10"
      >
        {/* Navigation Top Bar */}
        <motion.div variants={itemVariants} className="p-4 sm:p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
          <button 
            onClick={handleBackClick} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 border border-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" /> Back to Books
          </button>
          
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 border border-slate-700/50 transition-all duration-200"
            title="Share Book"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Main Hero Section */}
        <motion.div variants={itemVariants} className="p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Left Column: Book Cover */}
            <div className="md:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02, rotateY: -3 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-700/60 bg-slate-950 group"
              >
                <img
                  src={safeBook?.coverImage || "/placeholder.png"}
                  alt={safeBook?.title || "Book Cover"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                />
                
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                {/* Category Badge Floating */}
                {safeBook?.category && (
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 flex items-center gap-1.5 shadow-lg">
                    <Tag className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{safeBook.category}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column: Book Main Info */}
            <div className="md:col-span-7 space-y-6 text-left">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {safeBook?.status && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {safeBook.status}
                  </span>
                )}

                {safeBook?.condition && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    {safeBook.condition}
                  </span>
                )}
              </div>

              {/* Title & Author */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  {safeBook?.title || "Untitled Book"}
                </h1>
                <p className="text-sm sm:text-base text-slate-400 flex items-center gap-2">
                  <span>Written by</span>
                  <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
                    {safeBook?.author || "Unknown Author"}
                  </span>
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-[10px] text-slate-500 font-medium uppercase">Publisher</p>
                    <p className="text-xs font-bold text-slate-200 truncate">{safeBook?.publisher || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-[10px] text-slate-500 font-medium uppercase">Language</p>
                    <p className="text-xs font-bold text-slate-200 truncate">{safeBook?.languages || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950/30 border border-indigo-500/20 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Borrow Price</span>
                <span className="text-3xl font-black text-indigo-400">
                  {safeBook?.price ? `৳${safeBook.price}` : 'Free'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleBorrow}
                  disabled={checkingOrder || alreadyOrdered}
                  className={`w-full sm:flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                    alreadyOrdered 
                      ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" 
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {checkingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Checking Status...
                    </>
                  ) : alreadyOrdered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Already Requested
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Request Delivery
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full sm:w-auto py-3.5 px-5 rounded-xl font-semibold text-sm transition-all duration-200 border flex items-center justify-center gap-2 ${
                    isWishlisted 
                      ? "bg-rose-500/10 border-rose-500/40 text-rose-400" 
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Key Details Grid Section */}
        <motion.div variants={itemVariants} className="p-6 sm:p-10 border-t border-slate-800/80 bg-slate-950/30">
          <h2 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" /> Specification Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoGridCard icon={<User className="w-4 h-4 text-indigo-400" />} label="Author" value={safeBook?.author} />
            <InfoGridCard icon={<Folder className="w-4 h-4 text-purple-400" />} label="Category" value={safeBook?.category} />
            <InfoGridCard icon={<Building2 className="w-4 h-4 text-pink-400" />} label="Publisher" value={safeBook?.publisher} />
            <InfoGridCard icon={<Globe className="w-4 h-4 text-emerald-400" />} label="Language" value={safeBook?.languages} />
            <InfoGridCard icon={<Calendar className="w-4 h-4 text-amber-400" />} label="Published Year" value={safeBook?.publishedYear} />
            <InfoGridCard icon={<Package className="w-4 h-4 text-teal-400" />} label="Stock Availability" value={safeBook?.stockQuantity ? `${safeBook.stockQuantity} Copies Left` : 'Out of Stock'} />
          </div>

          {/* Librarian / Added By Card */}
          {safeBook?.addedBy && (
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-indigo-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Added By Librarian</p>
                  <p className="text-sm font-bold text-slate-200">{safeBook.addedBy}</p>
                </div>
              </div>
              <Link
                href={`/dashboard/readers/books/publisherbooks/${encodeURIComponent(safeBook.addedBy)}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-all"
              >
                View Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Overview & Synopsis Section */}
        <motion.div variants={itemVariants} className="p-6 sm:p-10 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-2 mb-4 text-white font-bold text-lg">
            <Info className="w-5 h-5 text-indigo-400" /> Synopsis & Description
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-none whitespace-pre-line">
            {safeBook?.description || 'No detailed description available for this title at the moment.'}
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}

function InfoGridCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-all group backdrop-blur-md">
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-200 truncate">{value || 'N/A'}</p>
      </div>
    </div>
  );
}