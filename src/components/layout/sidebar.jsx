import { NavLink } from 'react-router-dom'
import { useAuth } from '@/context/use-auth'

export function Sidebar() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const links = [
    { to: '/dashboard', label: '📊 Dashboard', adminOnly: true },
    { to: '/productos', label: '🏷️ Productos', adminOnly: true },
    { to: '/inventario', label: '📦 Inventario', adminOnly: true },
    { to: '/movimientos', label: '🔄 Movimientos', adminOnly: true },
    { to: '/apartados', label: '📌 Apartados', adminOnly: false },
    { to: '/pos', label: '🛒 Punto de Venta (POS)', adminOnly: false },
    { to: '/ventas', label: '💰 Ventas', adminOnly: true },
    { to: '/caja', label: '💵 Caja', adminOnly: false },
    { to: '/devoluciones', label: '↩️ Devoluciones', adminOnly: false },
    { to: '/reportes', label: '📈 Reportes', adminOnly: true },
    { to: '/usuarios', label: '👥 Usuarios', adminOnly: true },
    { to: '/perfil', label: '👤 Mi Perfil', adminOnly: false },
  ]

  const visibleLinks = links.filter((link) => !link.adminOnly || isAdmin)

  return (
    <aside className="sidebar-root">
      <div className="sidebar-brand">
        <h2>Urban-Rack</h2>
        <span className="sidebar-role">{user?.role === 'admin' ? 'Administrador' : 'Vendedor'}</span>
      </div>
      <nav className="sidebar-nav">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
