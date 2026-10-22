import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ExternalLink, Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070a12]/85 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070a12] rounded-[10px] flex items-center justify-center font-bold text-emerald-400 text-lg">
              YR
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-tight text-base sm:text-lg">YR NOVATECH</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Task 5
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:block">
              Financial Tracker Single-Page App
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-2 sm:space-x-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`
            }
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Transaction</span>
          </NavLink>

          {/* External Link to Task 3 Backend Swagger API */}
          <a
            href="https://yr-novatech-rest-api.vercel.app/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-slate-800 transition-colors"
            title="Open Task 3 Swagger OpenAPI Documentation"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>API Docs</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </nav>

      </div>
    </header>
  );
}
