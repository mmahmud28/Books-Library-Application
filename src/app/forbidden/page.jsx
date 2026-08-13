import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Lock, Home, LogIn } from 'lucide-react';

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        <div className="relative inline-block">
          <div className="w-28 h-28 mx-auto bg-amber-500/10 border border-amber-500/30 rounded-3xl flex items-center justify-center backdrop-blur-md shadow-2xl">
            <ShieldAlert className="w-14 h-14 text-amber-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-2 bg-amber-500 rounded-xl text-slate-950 shadow-lg">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="badge badge-warning badge-outline font-bold text-xs uppercase tracking-wider px-3 py-1">
            403 Forbidden
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Restricted Access
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            You do not have permission to view this section of the library. Please log in with an authorized account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link 
            href="/login" 
            className="btn btn-warning w-full sm:w-auto gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 border-none shadow-lg shadow-amber-500/20 font-bold"
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link 
            href="/" 
            className="btn btn-outline border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 w-full sm:w-auto gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}