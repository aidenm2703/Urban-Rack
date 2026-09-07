import { NavLink } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/use-auth'

export function Sidebar() {
  const { user } = useAuth()

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/pos', label: 'Punto de Venta (POS)' },
    { to: '/caja', label: 'Caja' },
    { to: '/apartados', label: 'Apartados' },
    { to: '/devoluciones', label: 'Devoluciones' },
    { to: '/ventas', label: 'Ventas' },
    { to: '/productos', label: 'Productos' },
    { to: '/inventario', label: 'Inventario' },
    { to: '/movimientos', label: 'Movimientos' },
    { to: '/reportes', label: 'Reportes' },
    { to: '/usuarios', label: 'Usuarios' },
    { to: '/perfil', label: 'Mi Perfil' },
  ]

  return (
    <aside className="sidebar-root">
      <div className="sidebar-brand">
        <h2>Urban-Rack</h2>
        <span className="sidebar-role">{user?.role || 'Admin'}</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
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
