import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Receipt, 
  Search, 
  Filter, 
  ArrowRight, 
  Trash2, 
  RefreshCw, 
  Plus, 
  AlertCircle 
} from 'lucide-react';

export default function Dashboard() {
  const { transactions, loading, error, metrics, fetchTransactions, deleteTransaction } = useTransactions();
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Filter transactions based on active filters
  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = !typeFilter || tx.type === typeFilter;
    const matchesSearch = !searchTerm || 
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deleteTransaction(id);
    } catch (err) {
      alert(`Failed to delete transaction: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = () => {
    fetchTransactions({ type: typeFilter, category: searchTerm });
  };

  return (
    <div className="space-y-8">
      
      {/* Hero / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Connected to Task 3 REST API
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Financial Overview &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time cash flow monitoring, category allocation, and transaction logs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors disabled:opacity-50"
            title="Refresh transactions from API"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
          <Link
            to="/add"
            className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Transaction</span>
          </Link>
        </div>
      </div>

      {/* Financial Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Balance */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Net Balance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            ${metrics.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {metrics.balance >= 0 ? 'Surplus / In Credit' : 'Deficit / In Debit'}
          </span>
        </div>

        {/* Total Income */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Income</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            +${metrics.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Credits received
          </span>
        </div>

        {/* Total Expenses */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            -${metrics.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Debits recorded
          </span>
        </div>

        {/* Transaction Count */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Recorded Entries</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {metrics.count}
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            SQLite ledger entries
          </span>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or category (e.g. Consulting, DevOps)..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-1 pl-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Type:</span>
          </span>
          <button
            onClick={() => setTypeFilter('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              typeFilter === ''
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              typeFilter === 'income'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-800'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              typeFilter === 'expense'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800'
            }`}
          >
            Expense
          </button>
        </div>

      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-rose-300 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleRefresh}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Transactions List / Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
            <span>Recent Transactions</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {filteredTransactions.length}
            </span>
          </h2>
          <span className="text-xs font-mono text-slate-400 hidden sm:block">
            Sorted by most recent
          </span>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex items-center justify-between py-3 border-b border-slate-800/60 last:border-0">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-800/60 rounded w-1/4"></div>
                </div>
                <div className="h-6 bg-slate-800 rounded w-20"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTransactions.length === 0 && (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No transactions found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchTerm || typeFilter
                ? 'Try adjusting your search terms or filters to find what you are looking for.'
                : 'Your database is ready for records. Click below to add your first transaction.'}
            </p>
            <Link
              to="/add"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Transaction</span>
            </Link>
          </div>
        )}

        {/* Data Table */}
        {!loading && filteredTransactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-mono uppercase bg-slate-900/60">
                  <th className="py-3 px-4 sm:px-6">Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredTransactions.map((tx) => {
                  const isIncome = tx.type === 'income';
                  const formattedAmount = (parseFloat(tx.amount) || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  const formattedDate = tx.created_at
                    ? new Date(tx.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'N/A';

                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors group">
                      
                      {/* Title */}
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">
                        <Link
                          to={`/transaction/${tx.id}`}
                          className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5"
                        >
                          <span>{tx.title}</span>
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {tx.category}
                        </span>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                            isIncome
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {formattedDate}
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                        <span className={isIncome ? 'text-emerald-400' : 'text-rose-400'}>
                          {isIncome ? `+$${formattedAmount}` : `-$${formattedAmount}`}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/transaction/${tx.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                            title="View Transaction Details"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(tx.id, tx.title)}
                            disabled={deletingId === tx.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors disabled:opacity-50"
                            title="Delete Transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
