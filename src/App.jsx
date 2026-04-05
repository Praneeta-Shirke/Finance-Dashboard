import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import RoleSwitcher from './components/RoleSwitcher';
import { useFinance } from './context/FinanceContext';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { role } = useFinance();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`app-shell ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="topbar">
        <h1>Finance Dashboard</h1>
        <div className="header-actions">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <RoleSwitcher />
          <div className="page-nav">
            <button
              className={activePage === 'dashboard' ? 'active' : ''}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={activePage === 'transactions' ? 'active' : ''}
              onClick={() => setActivePage('transactions')}
            >
              Transactions
            </button>
          </div>
          <span className="role-pill">Role: {role}</span>
        </div>
      </header>

      <main>
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'transactions' && <Transactions />}
      </main>

      <footer>
        <p> Assignment | React + Recharts | Praneeta Shirke</p>
      </footer>
    </div>
  );
}

export default App;
