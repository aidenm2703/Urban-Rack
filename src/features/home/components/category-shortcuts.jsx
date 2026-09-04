import { Link } from 'react-router-dom'

export function CategoryShortcuts() {
  const categories = [
    { name: 'Jackets & Abrigos', path: '/catalogo?category=jackets', icon: '🧥', count: 'Colección 2026' },
    { name: 'Tennis & Calzado', path: '/catalogo?category=tennis', icon: '👟', count: 'Streetwear Kicks' },
    { name: 'Hombre', path: '/catalogo?category=hombre', icon: '👕', count: 'Oversize & Drops' },
    { name: 'Mujer', path: '/catalogo?category=mujer', icon: '✨', count: 'Tendencia Urbana' },
    { name: 'Buzos & Hoodies', path: '/catalogo?category=buzos', icon: '🔥', count: 'Heavyweight Cotton' },
    { name: 'Remeras Street', path: '/catalogo?category=remeras', icon: '🛹', count: 'Boxy Fit' },
    { name: 'Pantalones & Cargos', path: '/catalogo?category=pantalones', icon: '👖', count: 'Cargo & Baggy' },
    { name: 'Accesorios & Gorras', path: '/catalogo?category=accesorios', icon: '🎒', count: 'Bolsos & Caps' },
  ]

  return (
    <section className="category-shortcuts-section">
      <div className="section-header-centered">
        <span className="section-kicker">EXPLORA POR SECCIÓN</span>
        <h2 className="section-title">Categorías Destacadas</h2>
        <p className="section-subtitle">Encuentra tu estilo streetwear por categoría</p>
      </div>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.path} className="category-card">
            <span className="category-card-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
            <span className="category-count-hint">{cat.count}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
