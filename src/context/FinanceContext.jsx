import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialTransactions } from '../data/mockTransactions';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [role, setRole] = useState('Viewer');
  const [transactions, setTransactions] = useState(() => {
    const fromStorage = window.localStorage.getItem('fin-dashboard-transactions');
    return fromStorage ? JSON.parse(fromStorage) : initialTransactions;
  });
  const [filter, setFilter] = useState({ category: 'All', search: '', sortBy: 'date-desc' });

  useEffect(() => {
    window.localStorage.setItem('fin-dashboard-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);

  const transactionsByMonth = useMemo(() => {
    const map = new Map();
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('en-US', { month: 'short', year: 'numeric' });
      map.set(month, (map.get(month) || 0) + t.amount);
    });
    return Array.from(map)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([month, value]) => ({ month, value }));
  }, [transactions]);

  const spendingByCategory = useMemo(() => {
    const map = {};
    transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
      });
    return Object.entries(map).map(([category, value]) => ({ category, value }));
  }, [transactions]);

  const insights = useMemo(() => {
    const count = transactions.length;
    const avgSpending = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0) / Math.max(count, 1);
    const categories = [...new Set(transactions.map(t => t.category))];
    const highestSpendingCategory = spendingByCategory.reduce((prev, next) => (next.value > prev.value ? next : prev), { category: 'None', value: 0 });
    const currentMonth = new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' });
    const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('en-US', { month: 'short', year: 'numeric' });
    const currentSpend = transactionsByMonth.find(item => item.month === currentMonth)?.value || 0;
    const previousSpend = transactionsByMonth.find(item => item.month === previousMonth)?.value || 0;

    return {
      count,
      avgSpending: Number(avgSpending.toFixed(2)),
      highestSpendingCategory,
      monthlyComparison: {
        currentMonth,
        previousMonth,
        currentSpend: Number(currentSpend.toFixed(2)),
        previousSpend: Number(previousSpend.toFixed(2))
      },
      categoriesCount: categories.length
    };
  }, [transactions, spendingByCategory, transactionsByMonth]);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = filter.search.trim().toLowerCase();

    let set = transactions
      .filter(t =>
        filter.category === 'All' ? true : t.category === filter.category
      )
      .filter(t => {
        if (!normalizedSearch) return true;
        return (
          t.category.toLowerCase().includes(normalizedSearch) ||
          t.type.toLowerCase().includes(normalizedSearch) ||
          t.date.toLowerCase().includes(normalizedSearch) ||
          String(t.amount).includes(normalizedSearch)
        );
      });

    if (filter.sortBy === 'date-asc') set = set.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    if (filter.sortBy === 'date-desc') set = set.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    if (filter.sortBy === 'amount-asc') set = set.slice().sort((a, b) => a.amount - b.amount);
    if (filter.sortBy === 'amount-desc') set = set.slice().sort((a, b) => b.amount - a.amount);

    return set;
  }, [transactions, filter]);

  const addTransaction = transaction => {
    if (role !== 'Admin') return;
    const nextId = Math.max(0, ...transactions.map(t => t.id)) + 1;
    setTransactions(prev => [...prev, { id: nextId, ...transaction }]);
  };

  const editTransaction = (id, updates) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTransaction = id => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const value = {
    role,
    setRole,
    transactions,
    filteredTransactions,
    setFilter,
    filter,
    summary,
    transactionsByMonth,
    spendingByCategory,
    insights,
    addTransaction,
    editTransaction,
    deleteTransaction
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};
