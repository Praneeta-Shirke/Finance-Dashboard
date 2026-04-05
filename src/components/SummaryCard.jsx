function SummaryCard({ title, value, subtitle, color = '#2f4f4f' }) {
  return (
    <div className="summary-card" style={{ borderLeft: `5px solid ${color}` }}>
      <h3>{title}</h3>
      <p className="value">{value}</p>
      {subtitle && <small>{subtitle}</small>}
    </div>
  );
}

export default SummaryCard;
