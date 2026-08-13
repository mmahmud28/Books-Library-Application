'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('System Error Logged:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        <div className="w-28 h-28 mx-auto bg-rose-500/10 border border-rose-500/30 rounded-3xl flex items-center justify-center backdrop-blur-md shadow-2xl animate-pulse">
          <AlertOctagon className="w-14 h-14 text-rose-400" />
        </div>

        <div className="space-y-3">
          <span className="badge badge-error badge-outline font-bold text-xs uppercase tracking-wider px-3 py-1">
            500 Internal Server Error
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            Our library servers encountered an unexpected issue. Don't worry, our team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button 
            onClick={() => reset()} 
            className="btn btn-error w-full sm:w-auto gap-2 bg-rose-600 hover:bg-rose-500 text-white border-none shadow-lg shadow-rose-600/30"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
          <Link 
            href="/" 
            className="btn btn-outline border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 w-full sm:w-auto gap-2"
          >
            <Home className="w-4 h-4" /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}