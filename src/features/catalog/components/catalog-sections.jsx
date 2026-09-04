import { ProductCard } from './product-card'

const SECTION_CONFIG = [
  {
    id: 'jackets',
    title: 'Jackets & Abrigos Streetwear',
    icon: '🧥',
    description: 'Bombers, rompevientos reflectivos y camperas térmicas para la ciudad.',
    match: (p) => p.section === 'jackets' || p.category === 'Jackets',
  },
  {
    id: 'tennis',
    title: 'Tennis & Calzado Urbano',
    icon: '👟',
    description: 'High-tops retro, siluetas skate y suelas vulcanizadas de alto impacto.',
    match: (p) => p.section === 'tennis' || p.category === 'Tennis',
  },
  {
    id: 'hombre',
    title: 'Colección Hombre',
    icon: '👕',
    description: 'Hoodies pesados oversize, remeras acid wash y prendas esenciales.',
    match: (p) => p.section === 'hombre',
  },
  {
    id: 'mujer',
    title: 'Colección Mujer',
    icon: '✨',
    description: 'Cargos wide-leg, crop hoodies y siluetas urbanas contemporáneas.',
    match: (p) => p.section === 'mujer',
  },
  {
    id: 'nino',
    title: 'Colección Kids / Niño',
    icon: '🛹',
    description: 'Moda urbana para los más pequeños, con telas suaves y resistentes.',
    match: (p) => p.section === 'nino',
  },
  {
    id: 'accesorios',
    title: 'Accesorios & Detalles',
    icon: '🎒',
    description: 'Gorras snapback vintage, riñoneras tácticas y complementos.',
    match: (p) => p.section === 'accesorios' || p.category === 'Accesorios',
  },
]

export function CatalogSections({ products, onQuickView }) {
  const sectionsWithProducts = SECTION_CONFIG.map((sec) => ({
    ...sec,
    products: products.filter(sec.match),
  })).filter((sec) => sec.products.length > 0)

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(`section-${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (sectionsWithProducts.length === 0) {
    return (
      <div className="catalog-empty-search">
        <h3>No se encontraron productos en esta sección</h3>
        <p>Intenta ajustar tus términos de búsqueda o filtros.</p>
      </div>
    )
  }

  return (
    <div className="catalog-sections-container">
      {/* Barra de navegación rápida por secciones */}
      <nav className="sections-quick-nav" aria-label="Navegación por secciones">
        <span className="quick-nav-label">Saltar a:</span>
        <div className="quick-nav-buttons">
          {sectionsWithProducts.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className="quick-nav-btn"
              onClick={() => handleScrollToSection(sec.id)}
            >
              <span>{sec.icon}</span> {sec.title.split(' ')[0]} ({sec.products.length})
            </button>
          ))}
        </div>
      </nav>

      {/* Renderizado de cada sección con su grid */}
      <div className="sections-list">
        {sectionsWithProducts.map((sec) => (
          <section
            key={sec.id}
            id={`section-${sec.id}`}
            className="catalog-section-block"
          >
            <div className="section-block-header">
              <div className="section-title-wrap">
                <span className="section-icon">{sec.icon}</span>
                <div>
                  <h2 className="section-heading">{sec.title}</h2>
                  <p className="section-subtitle">{sec.description}</p>
                </div>
              </div>
              <span className="section-count-badge">
                {sec.products.length} {sec.products.length === 1 ? 'prenda' : 'prendas'}
              </span>
            </div>

            <div className="catalog-grid">
              {sec.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

