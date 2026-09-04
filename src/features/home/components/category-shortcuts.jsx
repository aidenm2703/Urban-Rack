import { Link } from 'react-router-dom'

export function CategoryShortcuts() {
  const categories = [
    { name: 'Buzos & Hoodies', path: '/catalogo?category=buzos' },
    { name: 'Remeras Street', path: '/catalogo?category=remeras' },
    { name: 'Pantalones & Cargos', path: '/catalogo?category=pantalones' },
    { name: 'Accesorios', path: '/catalogo?category=accesorios' },
  ]

  return (
    <section className="category-shortcuts-section">
      <h2>Categorías Principales</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.path} className="category-card">
            <span className="category-name">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
