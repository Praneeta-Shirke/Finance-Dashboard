import { useFinance } from '../context/FinanceContext';
import SummaryCard from '../components/SummaryCard';
import BalanceTrendChart from '../components/BalanceTrendChart';
import SpendingBreakdownChart from '../components/SpendingBreakdownChart';
import InsightsPanel from '../components/InsightsPanel';

function Dashboard() {
  const { summary, transactionsByMonth, spendingByCategory, insights } = useFinance();

  return (
    <div className="page-container">
      <section className="overview-cards grid-3">
        <SummaryCard title="Total Balance" value={`$${summary.balance}`} color="#0f766e" />
        <SummaryCard title="Total Income" value={`$${summary.income}`} color="#16a34a" />
        <SummaryCard title="Total Expenses" value={`$${summary.expenses}`} color="#dc2626" />
      </section>

      <section className="charts-grid">
        <BalanceTrendChart data={transactionsByMonth} />
        <SpendingBreakdownChart data={spendingByCategory} />
      </section>

      <InsightsPanel insights={insights} />
    </div>
  );
}

export default Dashboard;
