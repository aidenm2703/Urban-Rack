import { useState } from 'react'

export function NotificationPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Stock bajo en Hoodie Boxy Fit (3 unidades)', time: 'Hace 10 min', read: false },
    { id: 2, message: 'Apartado #1 pendiente de pago final', time: 'Hace 1 hora', read: false },
    { id: 3, message: 'Apertura de caja registrada', time: 'Hoy 08:00 AM', read: true }
  ])

  if (!isOpen) return null

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="notification-panel-root">
      <div className="notification-panel-header">
        <h4>Notificaciones</h4>
        {notifications.length > 0 && (
          <button type="button" onClick={clearAll} className="btn-clear-notifications">
            Limpiar todo
          </button>
        )}
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
