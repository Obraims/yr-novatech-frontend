import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../api/axios';

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all transactions with optional filtering
  const fetchTransactions = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.category) params.category = filters.category;

      const response = await apiClient.get('/transactions', { params });
      if (response.data && response.data.data) {
        setTransactions(response.data.data);
      } else {
        setTransactions([]);
      }
      return response.data;
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError(err.message || 'Failed to fetch transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single transaction by ID
  const getTransactionById = useCallback(async (id) => {
    try {
      const response = await apiClient.get(`/transactions/${id}`);
      return response.data?.data;
    } catch (err) {
      console.error(`Failed to fetch transaction ${id}:`, err);
      throw err;
    }
  }, []);

  // Create a new transaction
  const createTransaction = useCallback(async (transactionData) => {
    setError(null);
    try {
      const payload = {
        title: transactionData.title.trim(),
        amount: parseFloat(transactionData.amount),
        type: transactionData.type.toLowerCase(),
        category: transactionData.category.trim(),
      };
      const response = await apiClient.post('/transactions', payload);
      const newRecord = response.data?.data;
      if (newRecord) {
        setTransactions((prev) => [newRecord, ...prev]);
      }
      return response.data;
    } catch (err) {
      console.error('Failed to create transaction:', err);
      throw err;
    }
  }, []);

  // Delete transaction by ID
  const deleteTransaction = useCallback(async (id) => {
    setError(null);
    try {
      const response = await apiClient.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((tx) => tx.id !== parseInt(id, 10)));
      return response.data;
    } catch (err) {
      console.error(`Failed to delete transaction ${id}:`, err);
      throw err;
    }
  }, []);

  // Calculate financial summary metrics
  const metrics = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      const amount = parseFloat(tx.amount) || 0;
      if (tx.type === 'income') {
        income += amount;
      } else if (tx.type === 'expense') {
        expense += amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      count: transactions.length,
    };
  }, [transactions]);

  // Initial load
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const value = {
    transactions,
    loading,
    error,
    metrics,
    fetchTransactions,
    getTransactionById,
    createTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
