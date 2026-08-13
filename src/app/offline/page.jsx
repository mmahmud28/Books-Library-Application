'use client';

import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function Offline() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        <div className="w-28 h-28 mx-auto bg-sky-500/10 border border-sky-500/30 rounded-3xl flex items-center justify-center backdrop-blur-md shadow-2xl">
          <WifiOff className="w-14 h-14 text-sky-400 animate-pulse" />
        </div>

        <div className="space-y-3">
          <span className="badge badge-info badge-outline font-bold text-xs uppercase tracking-wider px-3 py-1">
            Network Connection Lost
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">
            You are Offline
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            Please check your internet connection to continue browsing books on BiblioDrop.
          </p>
        </div>

        <div className="pt-4">
          <button 
            onClick={handleReload}
            className="btn btn-info bg-sky-500 hover:bg-sky-400 text-slate-950 border-none shadow-lg shadow-sky-500/20 font-bold gap-2 px-8"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}