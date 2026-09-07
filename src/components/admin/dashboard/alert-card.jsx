export function AlertCard({ message, type = 'info' }) {
  const styles = {
    warning: 'bg-warning/10 border-warning/30 text-warning',
    danger: 'bg-danger/10 border-danger/30 text-danger',
    info: 'bg-primary/10 border-primary/30 text-primary'
  }

  return (
    <div className={`p-3 rounded-md border text-sm mb-3 ${styles[type] || styles.info}`}>
      {message}
    </div>
  )
}
