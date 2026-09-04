export function AlertCard({ message, type = 'info' }) {
  return (
    <div className={`alert-card alert-card-${type}`}>
      <span className="alert-icon">⚠️</span>
      <span className="alert-text">{message}</span>
    </div>
  )
}
