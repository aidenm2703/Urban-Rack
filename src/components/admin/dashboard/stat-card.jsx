export function StatCard({ title, value, trend, alert = false }) {
  return (
    <div className={`p-4 rounded-lg border bg-surface ${alert ? 'border-danger/30 bg-danger/5' : 'border-border'}`}>
      <h3 className="text-sm font-medium text-text-muted">{title}</h3>
      <div className="flex items-baseline justify-between mt-2">
        <span className="text-2xl font-bold text-text-main">{value}</span>
        {trend && <span className="text-xs font-semibold text-emerald-600">{trend}</span>}
      </div>
    </div>
  )
}
