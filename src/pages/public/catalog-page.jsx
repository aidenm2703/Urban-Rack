import { SearchBar } from '@/features/catalog/components/search-bar'
import { Filters } from '@/features/catalog/components/filters'
import { ProductCard } from '@/features/catalog/components/product-card'
import { useProducts } from '@/features/catalog/use-products'

export function CatalogPage() {
  const { products, loading, error, searchTerm, setSearchTerm } = useProducts()

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <h1>Catálogo Urbano</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>
      <div className="catalog-content">
        <aside className="catalog-sidebar">
          <Filters />
        </aside>
        <section className="catalog-grid">
          {loading && <p>Cargando productos...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  )
}
