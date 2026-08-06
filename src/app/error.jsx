'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Search, 
  HelpCircle,
  Compass
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">

        {/* Dynamic 404 Visual Showcase */}
        <div className="relative inline-block">
          {/* Main Glowing 404 Text */}
          <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 select-none filter drop-shadow-[0_10px_20px_rgba(99,102,241,0.2)]">
            404
          </h1>

          {/* Floating Badge */}
          <div className="absolute -top-3 -right-6 sm:-right-8 bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 flex items-center gap-1.5 shadow-lg animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Page Not Found</span>
          </div>

          {/* Icon Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shadow-xl text-purple-400">
            <Compass className="w-7 h-7 animate-spin-slow" />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            অপেক্ষার বইটি খুজে পাওয়া যাচ্ছে না!
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয়তো স্থানান্তরিত হয়েছে, মুছে ফেলা হয়েছে অথবা লিংকটিতে কোনো টাইপিং ভুল রয়েছে।
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-slate-800/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            পূর্বের পৃষ্ঠায় ফিরে যান
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4" />
            হোমপেজে যান
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <div className="pt-8 border-t border-slate-800/80">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            সহায়ক বিষয়সমূহ
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/dashboard/readers/my-orders"
              className="group p-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 text-left transition-all duration-200 backdrop-blur-md"
            >
              <div className="p-2 w-fit rounded-lg bg-indigo-500/10 text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                আমার অর্ডার
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                আপনার বইয়ের তালিকা দেখুন
              </p>
            </Link>

            <Link
              href="/books"
              className="group p-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 text-left transition-all duration-200 backdrop-blur-md"
            >
              <div className="p-2 w-fit rounded-lg bg-purple-500/10 text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                বই ব্রাউজ করুন
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                লাইব্রেরির নতুন বই খুঁজুন
              </p>
            </Link>

            <Link
              href="/contact"
              className="group p-3.5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-pink-500/40 text-left transition-all duration-200 backdrop-blur-md"
            >
              <div className="p-2 w-fit rounded-lg bg-pink-500/10 text-pink-400 mb-2 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-200 group-hover:text-pink-300 transition-colors">
                সহায়তা কেন্দ্র
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                যেকোনো প্রয়োজনে যোগাযোগ করুন
              </p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}