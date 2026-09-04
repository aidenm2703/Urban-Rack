import { useNotifications } from '@/features/notifications'

export function NotificationPanel({ isOpen, onClose }) {
  const { notifications, markAsRead, clearAll } = useNotifications()

  if (!isOpen) return null

  return (
    <div className="notification-panel-root">
      <div className="notification-panel-header">
        <h4>Notificaciones</h4>
        <button type="button" onClick={clearAll} className="btn-clear-notifications">
          Limpiar
        </button>
        <button type="button" onClick={onClose} className="btn-close-notifications">
          &times;
        </button>
      </div>
      <div className="notification-panel-list">
        {notifications.length === 0 ? (
          <p className="notification-empty">No tienes notificaciones pendientes</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notif.id)}
            >
              <p className="notification-message">{notif.message}</p>
              <span className="notification-time">{notif.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
