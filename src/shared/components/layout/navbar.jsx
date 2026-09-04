import { Link } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/use-auth'

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="navbar-root">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Urban-Rack
        </Link>
        <nav className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/dashboard">Panel Admin</Link>
          )}
        </nav>
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="navbar-user">
              <span>Hola, {user.name}</span>
              <button type="button" onClick={logout} className="btn-logout">
                Salir
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
