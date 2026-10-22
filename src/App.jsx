import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import { TransactionProvider } from './hooks/useTransactions';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import TransactionDetails from './pages/TransactionDetails';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <GlobalErrorBoundary>
      <TransactionProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
            
            {/* Ambient Background Glow */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none -z-10"></div>
            <div className="fixed top-1/3 right-10 w-[28rem] h-[28rem] bg-cyan-500/10 rounded-full filter blur-[140px] pointer-events-none -z-10"></div>
            <div className="fixed inset-0 bg-grid pointer-events-none opacity-40 -z-10"></div>

            {/* Header / Navbar */}
            <Navbar />

            {/* Main Application Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-grow w-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddTransaction />} />
                <Route path="/transaction/:id" element={<TransactionDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800/80 bg-[#05070c] py-6 text-xs text-slate-500 font-mono mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-slate-400 font-bold">Stephen Baraka Kakui (@Obraims)</span> &bull; YR NOVATECH Task 5 Frontend Evaluation
                </div>
                <div className="flex items-center space-x-4 text-slate-400">
                  <a
                    href="https://yr-novatech-rest-api.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Backend API
                  </a>
                  <a
                    href="https://yr-novatech-rest-api.vercel.app/api-docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Swagger Docs
                  </a>
                  <a
                    href="https://github.com/Obraims/yr-novatech-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    GitHub Repo
                  </a>
                </div>
              </div>
            </footer>

          </div>
        </BrowserRouter>
      </TransactionProvider>
    </GlobalErrorBoundary>
  );
}
