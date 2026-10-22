import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { 
  ArrowLeft, 
  Trash2, 
  Calendar, 
  Tag, 
  Receipt, 
  DollarSign, 
  Code, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransactionById, deleteTransaction } = useTransactions();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getTransactionById(id)
      .then((data) => {
        if (isMounted) setTransaction(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || `Transaction #${id} not found in database.`);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, getTransactionById]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete transaction #${id}?`)) return;
    setDeleting(true);
    try {
      await deleteTransaction(id);
      navigate('/');
    } catch (err) {
      alert(`Failed to delete transaction: ${err.message}`);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-slate-400">Loading transaction #{id} from SQLite REST API...</p>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="glass-card rounded-2xl border border-rose-500/30 p-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Record Not Found</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {error || `Transaction #${id} could not be retrieved from the database.`}
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const isIncome = transaction.type === 'income';
  const formattedAmount = (parseFloat(transaction.amount) || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const createdDate = transaction.created_at ? new Date(transaction.created_at) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-xs font-mono text-slate-500">Record ID: #{transaction.id}</span>
      </div>

      {/* Main Details Card */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
        
        {/* Top Header & Amount Display */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                  isIncome
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {transaction.type}
              </span>
              <span className="text-xs font-mono text-slate-500">SQLite ID #{transaction.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {transaction.title}
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-slate-400 block">Monetary Value</span>
            <span
              className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                isIncome ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isIncome ? `+$${formattedAmount}` : `-$${formattedAmount}`}
            </span>
          </div>
        </div>

        {/* Detailed Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Category */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Categorization Tag</span>
            </span>
            <span className="text-sm font-semibold text-white block">
              {transaction.category}
            </span>
          </div>

          {/* Timestamp */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Timestamp of Record</span>
            </span>
            <span className="text-sm font-semibold text-white font-mono block">
              {createdDate ? createdDate.toUTCString() : 'N/A'}
            </span>
          </div>

          {/* Database Persistence */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
              <Receipt className="w-3.5 h-3.5 text-violet-400" />
              <span>Storage Table</span>
            </span>
            <span className="text-sm font-semibold text-slate-200 font-mono block">
              SQLite <code className="text-violet-300">transactions</code>
            </span>
          </div>

          {/* Numeric Float */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Raw Float Representation</span>
            </span>
            <span className="text-sm font-semibold text-slate-200 font-mono block">
              {transaction.amount} USD
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowRawJson(!showRawJson)}
            className="px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-center space-x-1.5 w-full sm:w-auto justify-center"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showRawJson ? 'Hide Raw API JSON' : 'Inspect Raw API JSON'}</span>
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center space-x-1.5 disabled:opacity-50 w-full sm:w-auto justify-center"
          >
            <Trash2 className="w-4 h-4" />
            <span>{deleting ? 'Deleting from SQLite...' : 'Delete Transaction'}</span>
          </button>
        </div>

        {/* Raw JSON inspection collapsible */}
        {showRawJson && (
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-4">
            <pre className="font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
              {JSON.stringify(transaction, null, 2)}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
}
