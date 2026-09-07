import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { NotificationPanel } from './notification-panel'
import { useAuth } from '@/context/use-auth'

export function AdminLayout() {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="admin-layout-root">
      <Sidebar />
      <div className="admin-layout-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title">Urban-Rack Admin</div>
          <div className="admin-topbar-actions">
            <button
              type="button"
              className="btn-notification-toggle"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔 Notificaciones
            </button>
            <span className="admin-user-badge">
              {user?.name || 'Usuario'} ({user?.role || 'admin'})
            </span>
            <button type="button" onClick={logout} className="btn-admin-logout">
              Cerrar Sesión
            </button>
          </div>
        </header>
        {showNotifications && (
          <NotificationPanel
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
        <main className="admin-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
