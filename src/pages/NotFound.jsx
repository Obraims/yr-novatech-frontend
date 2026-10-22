import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24 text-center space-y-6 max-w-md mx-auto">
      
      {/* 404 Icon / Badge */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/40">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
          Error 404
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400">
          The route you navigated to does not exist in the client-side router or has been moved.
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

    </div>
  );
}
