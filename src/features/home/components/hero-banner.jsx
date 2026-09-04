import { Link } from 'react-router-dom'

export function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-tag">DROP 2026 // URBAN CULTURE</span>
        <h1 className="hero-title">
          Estilo Urbano <span className="text-gradient">Sin Límites</span>
        </h1>
        <p className="hero-subtitle">
          Prendas exclusivas, confección premium y estética streetwear auténtica. Descubre nuestras colecciones de Jackets, Tennis, Hoodies y Accesorios.
        </p>
        <div className="hero-cta-group">
          <Link to="/catalogo" className="btn btn-primary btn-lg">
            Explorar Catálogo 🚀
          </Link>
          <Link to="/catalogo?category=jackets" className="btn btn-outline-light btn-lg">
            Ver Jackets & Tennis 🧥
          </Link>
        </div>

        <div className="hero-features-bar">
          <div className="hero-feature-item">
            <span>🚚</span>
            <div>
              <strong>Envío Gratis</strong>
              <small>En órdenes desde $70</small>
            </div>
          </div>
          <div className="hero-feature-item">
            <span>💱</span>
            <div>
              <strong>Multi-Moneda</strong>
              <small>USD, CRC, EUR, ARS, MXN</small>
            </div>
          </div>
          <div className="hero-feature-item">
            <span>💳</span>
            <div>
              <strong>Pagos Seguros</strong>
              <small>Tarjeta, SINPE, Mercado Pago</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
