export function StatCard({ title, value, trend, alert = false }) {
  return (
    <div className={`stat-card ${alert ? 'stat-card-alert' : ''}`}>
      <span className="stat-card-title">{title}</span>
      <div className="stat-card-value">{value}</div>
      {trend && <span className="stat-card-trend">{trend}</span>}
    </div>
  )
}
