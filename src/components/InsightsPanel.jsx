import SummaryCard from './SummaryCard';

function InsightsPanel({ insights }) {
  const { highestSpendingCategory, count, avgSpending, monthlyComparison } = insights;

  return (
    <section className="insights-panel">
      <h2>Insights</h2>
      <div className="grid-4">
        <SummaryCard title="Total Transactions" value={count} />
        <SummaryCard title="Avg Spending" value={`$${avgSpending}`} />
        <SummaryCard
          title="Top Spending Category"
          value={`${highestSpendingCategory.category} ($${highestSpendingCategory.value})`}
        />
        <SummaryCard
          title="Monthly Trend"
          value={`$${monthlyComparison.currentSpend} vs $${monthlyComparison.previousSpend}`}
          subtitle={`${monthlyComparison.previousMonth} → ${monthlyComparison.currentMonth}`}
        />
      </div>
    </section>
  );
}

export default InsightsPanel;
