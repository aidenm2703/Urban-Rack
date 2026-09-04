
import { Link } from 'react-router-dom'

export function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span className="hero-tag">Nueva Colección 2026</span>
        <h1 className="hero-title">Estilo Urbano Sin Límites</h1>
        <p className="hero-subtitle">
          Prendas exclusivas, confección premium y estética streetwear auténtica.
        </p>
        <Link to="/catalogo" className="btn btn-primary">
          Ver Catálogo
        </Link>
      </div>
    </section>
  )
}
