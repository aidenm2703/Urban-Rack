import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/use-auth'
import { useCart } from '@/shared/hooks/use-cart'
import { CurrencySelector } from '@/shared/components/ui/currency-selector'

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { totalItems, openCart } = useCart()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-badge">UR</span>
          <span className="brand-text">Urban-Rack</span>
        </Link>

        {/* Links Principales */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/catalogo"
            className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Catálogo Completo
          </Link>
          <Link
            to="/catalogo?category=jackets"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Jackets
          </Link>
          <Link
            to="/catalogo?category=tennis"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tennis
          </Link>
          <Link
            to="/catalogo?category=hombre"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Hombre
          </Link>
          <Link
            to="/catalogo?category=mujer"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Mujer
          </Link>

          {isAuthenticated && user?.role === 'admin' && (
            <Link
              to="/dashboard"
              className="nav-link admin-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⚙️ Admin
            </Link>
          )}
        </nav>

        {/* Acciones: Selector de Moneda + Carrito + Auth */}
        <div className="navbar-actions">
          <CurrencySelector className="navbar-currency" />

          {/* Botón de Carrito */}
          <button
            type="button"
            className="btn-cart-trigger"
            onClick={openCart}
            aria-label={`Ver carrito, ${totalItems} artículos`}
          >
            <span className="cart-trigger-icon">🛍️</span>
            <span className="cart-trigger-label">Carrito</span>
            {totalItems > 0 && (
              <span className="cart-trigger-badge">{totalItems}</span>
            )}
          </button>

          {/* Autenticación */}
          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="user-greeting">Hola, {user.name}</span>
              <button type="button" onClick={logout} className="btn-logout">
                Salir
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Ingresar
            </Link>
          )}

          {/* Botón Menú Móvil */}
          <button
            type="button"
            className="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
