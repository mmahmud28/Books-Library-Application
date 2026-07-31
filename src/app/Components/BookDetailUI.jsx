/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Folder, Building2, Globe,
  Calendar, Package, Sparkles, UserCheck,
  BookOpen, Heart, ShoppingCart, CheckCircle2,
  Info, ExternalLink, ShieldCheck, Share2
} from 'lucide-react';
import Link from 'next/link';

export default function BookDetailUI({ safeBook }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  console.log(safeBook);
  console.log(safeBook.coverImage);

  //on back
  const handleBackClick = () => {
    // Implement your back navigation logic here, e.g., using Next.js router
    window.history.back();
  }


  return (
    <div className="min-h-screen bg-base-300/60 text-base-content py-6 sm:py-12 px-4 sm:px-8 flex justify-center items-center font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-base-100/80 backdrop-blur-xl rounded-3xl border border-base-200/80 shadow-2xl overflow-hidden"
      >
        {/* Navigation Top Bar */}
        <motion.div variants={itemVariants} className="p-4 sm:p-6 border-b border-base-200/60 flex items-center justify-between">
          <button onClick={handleBackClick} className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Books
          </button>
          <button className="btn btn-circle btn-ghost btn-sm text-base-content/70 hover:text-base-content">
            <Share2 className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="p-8 md:p-10 bg-gradient-to-br from-base-100 via-base-100 to-base-200/40"
        >
          <div className="flex flex-col md:flex-row items-center">

            {/* Left Side - Book Cover */}
            <div className="w-full md:w-1/2 flex justify-center items-center md:pr-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="relative w-[400px] h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-base-300 bg-base-200"
              >
                <img
                  src={safeBook.coverImage || "/placeholder.png"}
                  alt={safeBook.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                />
              </motion.div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block h-[520px] border-l border-base-300/70"></div>

            {/* Right Side - Book Details */}
            <div className="w-full md:w-1/2 md:pl-10 mt-8 md:mt-0 text-left">

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-success badge-md px-3 py-3">
                  {safeBook?.status}
                </span>

                <span className="badge badge-outline badge-md px-3 py-3">
                  {safeBook?.condition}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {safeBook?.title}
              </h1>

              <p className="mt-3 text-base lg:text-lg text-base-content/70">
                Written by
                <span className="font-semibold text-primary ml-2">
                  {safeBook?.author}
                </span>
              </p>

              <div className="space-y-3 mt-6 text-base">

                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>{safeBook?.publisher}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-info" />
                  <span>{safeBook?.languages}</span>
                </div>

              </div>

              <div className="flex flex-wrap gap-3 mt-8">

                <button className="btn btn-primary rounded-xl px-6">
                  <BookOpen className="w-4 h-4" />
                  Borrow Now
                </button>

                <button
                  onClick={() => setIsCartAdded(!isCartAdded)}
                  className={`btn rounded-xl px-6 ${isCartAdded ? "btn-success" : "btn-neutral"
                    }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isCartAdded ? "In Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`btn rounded-xl ${isWishlisted ? "btn-error" : "btn-outline"
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                </button>

              </div>

            </div>

          </div>
        </motion.div>

        {/* Details Grid Section */}
        <motion.div variants={itemVariants} className="p-6 sm:p-10 border-b border-base-200/60">
          <h2 className="text-xl font-bold mb-6 text-base-content flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Key Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InfoGridCard icon={<User className="w-4 h-4 text-primary" />} label="Author" value={safeBook?.author} />
            <InfoGridCard icon={<Folder className="w-4 h-4 text-secondary" />} label="Category" value={safeBook?.category} />
            <InfoGridCard icon={<Building2 className="w-4 h-4 text-accent" />} label="Publisher" value={safeBook?.publisher} />
            <InfoGridCard icon={<Globe className="w-4 h-4 text-info" />} label="Language" value={safeBook?.languages} />
            <InfoGridCard icon={<Calendar className="w-4 h-4 text-warning" />} label="Published Year" value={safeBook?.publishedYear} />
            <InfoGridCard icon={<Package className="w-4 h-4 text-success" />} label="Stock Availability" value={safeBook?.stockQuantity ? `${safeBook.stockQuantity} Copies Available` : null} />
          </div>

          {/* Added By Profile Section */}
          <div className="mt-6 p-4 rounded-2xl bg-base-200/40 border border-base-200/80 flex items-center justify-between hover:bg-base-200/70 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-base-content/60 font-medium">Librarian</p>
                <p className="text-sm font-bold text-base-content">{safeBook?.addedBy || 'N/A'}</p>
              </div>
            </div>
            <Link
              href={`/dashboard/readers/books/publisherbooks/${encodeURIComponent(safeBook.addedBy)}`}
              className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-primary font-semibold hover:bg-primary/10"
            >
              View Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Book Overview / Description Section */}
        <motion.div variants={itemVariants} className="p-6 sm:p-10 bg-base-200/30">
          <div className="flex items-center gap-2 mb-3 text-base-content font-extrabold text-xl">
            <Info className="w-5 h-5 text-primary" /> Overview & Synopsis
          </div>
          <p className="text-base text-base-content/80 leading-relaxed max-w-none">
            {safeBook?.description || 'No detailed description available for this title at the moment.'}
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}



function InfoGridCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-base-200/40 border border-base-200/80 hover:bg-base-200/80 hover:border-base-300 transition-all group">
      <div className="p-3 rounded-xl bg-base-100 shadow-sm border border-base-200/60 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-xs text-base-content/60 font-medium">{label}</p>
        <p className="text-sm font-bold text-base-content truncate">{value || 'N/A'}</p>
      </div>
    </div>
  );
}