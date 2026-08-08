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
  Compass,
  Bookmark,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Animated Gradient Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Graphic Accessories */}
      <div className="hidden lg:block absolute top-1/4 left-16 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl animate-bounce [animation-duration:6s]">
        <BookOpen className="w-8 h-8 text-indigo-400" />
      </div>
      <div className="hidden lg:block absolute bottom-1/4 right-16 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl animate-bounce [animation-duration:8s]">
        <Bookmark className="w-8 h-8 text-pink-400" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10 my-auto">

        {/* Hero Visual Area with Floating Badges */}
        <div className="relative inline-block my-2">
          
          {/* Main 404 Glowing Header */}
          <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-500 select-none filter drop-shadow-[0_15px_30px_rgba(99,102,241,0.25)]">
            404
          </h1>

          {/* Sparkle Status Badge */}
          <div className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-indigo-300 flex items-center gap-2 shadow-xl hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Page Lost in Space</span>
          </div>

          {/* Spinning Compass Badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-800/80 p-3 rounded-2xl shadow-2xl text-purple-400 backdrop-blur-xl">
            <Compass className="w-7 h-7 animate-[spin_10s_linear_infinite]" />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Lost Between the Pages?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            The page or book you are looking for has been moved, archived, or doesn't exist in our digital library.
          </p>
        </div>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-slate-200 text-sm font-semibold transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Quick Navigation Cards Grid */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Explore Popular Destinations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <Link
              href="/dashboard/readers/my-orders"
              className="group p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/60 hover:border-indigo-500/40 text-left transition-all duration-300 backdrop-blur-xl hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                My Orders
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                Track your active book borrowings
              </p>
            </Link>

            <Link
              href="/books"
              className="group p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/60 hover:border-purple-500/40 text-left transition-all duration-300 backdrop-blur-xl hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                  <Search className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors">
                Browse Books
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                Discover new library additions
              </p>
            </Link>

            <Link
              href="/contact"
              className="group p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/60 hover:border-pink-500/40 text-left transition-all duration-300 backdrop-blur-xl hover:shadow-xl hover:shadow-pink-500/5 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 group-hover:text-pink-300 transition-colors">
                Help Desk
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                Get support and answers
              </p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}