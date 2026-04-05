import { useMemo, useState } from 'react';
import { useFinance } from '../context/FinanceContext';

function TransactionTable() {
  const { filteredTransactions, filter, setFilter, role, addTransaction, editTransaction, deleteTransaction, transactions } = useFinance();
  const [form, setForm] = useState({ date: '', amount: '', category: '', type: 'Expense' });
  const [editingId, setEditingId] = useState(null);

  const categories = useMemo(() => {
    const uniq = [...new Set(transactions.map(t => t.category))];
    return ['All', ...uniq].sort();
  }, [transactions]);

  const handleSearch = e => setFilter(prev => ({ ...prev, search: e.target.value }));
  const handleCategory = e => setFilter(prev => ({ ...prev, category: e.target.value }));
  const handleSort = e => setFilter(prev => ({ ...prev, sortBy: e.target.value }));

  const resetForm = () => {
    setForm({ date: '', amount: '', category: '', type: 'Expense' });
    setEditingId(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { date: form.date, amount: Number(form.amount), category: form.category, type: form.type };
    if (!payload.date || !payload.amount || !payload.category) return;

    if (editingId) {
      editTransaction(editingId, payload);
    } else {
      addTransaction(payload);
    }

    resetForm();
  };

  const startEdit = t => {
    setEditingId(t.id);
    setForm({ date: t.date, amount: Math.abs(t.amount), category: t.category, type: t.type });
  };

  const formattedAmount = amount => (amount > 0 ? `+$${amount}` : `-$${Math.abs(amount)}`);

  return (
    <section className="transactions-section">
      <div className="transactions-controls">
        <div className="control-row">
          <input
            type="search"
            placeholder="Search by date/category/type/amount"
            value={filter.search}
            onChange={handleSearch}
          />
          <select value={filter.category} onChange={handleCategory}>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={filter.sortBy} onChange={handleSort}>
            <option value="date-desc">Date (newest)</option>
            <option value="date-asc">Date (oldest)</option>
            <option value="amount-desc">Amount (high-low)</option>
            <option value="amount-asc">Amount (low-high)</option>
          </select>
          {role === 'Admin' && (
            <button onClick={resetForm} className="primary-btn">
              Add New Transaction
            </button>
          )}
        </div>
      </div>

      {role === 'Admin' && (
        <form onSubmit={handleSubmit} className="transaction-form">
          <h3>{editingId ? 'Edit Transaction' : 'New Transaction'}</h3>
          <label>
            Date
            <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} required />
          </label>
          <label>
            Amount
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
              required
            />
          </label>
          <label>
            Category
            <input
              value={form.category}
              onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g. Groceries"
              required
            />
          </label>
          <label>
            Type
            <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </label>
          <div className="form-actions">
            <button type="submit" className="primary-btn">{editingId ? 'Save' : 'Add'} </button>
            <button type="button" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === 'Admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={role === 'Admin' ? 5 : 4}>No matching transactions</td>
            </tr>
          ) : (
            filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td className={t.amount >= 0 ? 'income' : 'expense'}>{formattedAmount(t.amount)}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                {role === 'Admin' && (
                  <td>
                    <button onClick={() => startEdit(t)}>Edit</button>
                    <button className="danger-btn" onClick={() => deleteTransaction(t.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TransactionTable;
