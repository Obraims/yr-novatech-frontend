import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-[#070a12] flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full rounded-2xl border border-rose-500/30 p-8 space-y-6 text-center shadow-2xl shadow-rose-950/40 relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Something went wrong</h2>
          <p className="text-sm text-slate-300">
            An unexpected error occurred in the React component tree. The error was caught gracefully by the Global Error Boundary.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-left font-mono text-xs text-rose-300 max-h-36 overflow-auto">
            <span className="block font-semibold text-rose-400 mb-1">Error Message:</span>
            {error.message || error.toString()}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={resetErrorBoundary}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <a
            href="/"
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.href = '/';
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
