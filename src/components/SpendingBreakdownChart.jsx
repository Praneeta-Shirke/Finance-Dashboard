import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4299e1', '#f6ad55', '#fc8181', '#9f7aea', '#48bb78', '#63b3ed'];

function SpendingBreakdownChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No spending breakdown data available</div>;
  }

  return (
    <div className="chart-card">
      <h3>Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Tooltip formatter={value => `$${Number(value).toFixed(2)}`} />
          <Legend verticalAlign="bottom" height={36} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            innerRadius={50}
            outerRadius={100}
            paddingAngle={3}
            label={false}
            labelLine={false}
          >
            {data.map((entry, idx) => (
              <Cell key={entry.category} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <small className="chart-note">Hover segments for exact values</small>
    </div>
  );
}

export default SpendingBreakdownChart;
