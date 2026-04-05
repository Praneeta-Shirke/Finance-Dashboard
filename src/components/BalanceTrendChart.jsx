import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function BalanceTrendChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No trend data available</div>;
  }

  return (
    <div className="chart-card">
      <h3>Balance Trend (per month)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={value => `$${Number(value).toFixed(2)}`} />
          <Line type="monotone" dataKey="value" stroke="#2b6cb0" strokeWidth={3} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceTrendChart;
