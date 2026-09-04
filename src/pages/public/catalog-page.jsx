import { useProducts } from '@/features/catalog/use-products'
import { HeroBanner } from '@/features/catalog/components/hero-banner'
import { Filters } from '@/features/catalog/components/filters'
import { ProductCard } from '@/features/catalog/components/product-card'
import styles from './catalog-page.module.css'

export function CatalogPage() {
  const {
    products,
    totalProductsCount,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearFilters,
  } = useProducts()

  return (
    <div className={styles.catalogContainer}>
      {/* 1. Hero Section Full-Width (Inspiración Foot Locker) */}
      <HeroBanner totalProducts={totalProductsCount} />

      {/* 2. Barra de Control: Conteo de Resultados y Ordenamiento */}
      <div className={styles.controlsBar}>
        <div className={styles.resultsCount}>
          Mostrando <span>{products.length}</span> prendas de colección
        </div>
        <select
          className={styles.sortSelect}
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="featured">Destacados / Hype</option>
          <option value="price-low">Precio: Menor a Mayor</option>
          <option value="price-high">Precio: Mayor a Menor</option>
          <option value="name">Nombre: A - Z</option>
        </select>
      </div>

      {/* 3. Layout Principal: Sticky Sidebar + Grid */}
      <div className={styles.mainLayout}>
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearFilters={clearFilters}
        />

        <section className={styles.productGrid}>
          {loading && (
            <>
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
            </>
          )}

          {error && (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyStateTitle}>Error al cargar catálogo</h3>
              <p className={styles.emptyStateText}>{error}</p>
              <button type="button" onClick={clearFilters} className={styles.resetBtn}>
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyStateTitle}>No encontramos resultados</h3>
              <p className={styles.emptyStateText}>
                No hay prendas que coincidan con los filtros aplicados.
              </p>
              <button type="button" onClick={clearFilters} className={styles.resetBtn}>
                Ver Todo el Catálogo
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </section>
      </div>
    </div>
  )
}
