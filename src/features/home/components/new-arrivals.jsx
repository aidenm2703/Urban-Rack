import { useFetch } from '@/shared/hooks/use-fetch'
import { ProductCard } from '@/features/catalog/components/product-card'

export function NewArrivals() {
  const { data: products, loading } = useFetch('/products?featured=true')

  return (
    <section className="new-arrivals-section">
      <div className="section-header">
        <h2>Lanzamientos Destacados</h2>
        <p>Las últimas tendencias seleccionadas para vos</p>
      </div>
      <div className="products-carousel">
        {loading ? (
          <p>Cargando novedades...</p>
        ) : (
          products?.map((prod) => <ProductCard key={prod.id} product={prod} />)
        )}
      </div>
    </section>
  )
}
