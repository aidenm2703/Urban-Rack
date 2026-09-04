import { useState, useEffect } from 'react'
import { productsService } from '@/features/catalog/products-service'
import { ProductCard } from '@/features/catalog/components/product-card'

export function NewArrivals() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    productsService
      .getAll('?featured=true')
      .then((data) => {
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : [])
        }
      })
      .catch((err) => {
        console.error('Error fetching new arrivals', err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="new-arrivals-section">
      <div className="section-header-centered">
        <span className="section-kicker">DROP EXCLUSIVO</span>
        <h2 className="section-title">Lanzamientos Destacados</h2>
        <p className="section-subtitle">Prendas seleccionadas con los mejores cortes y materiales de la temporada</p>
      </div>
      <div className="catalog-grid">
        {loading ? (
          <p className="loading-text">Cargando novedades...</p>
        ) : (
          products?.map((prod) => <ProductCard key={prod.id} product={prod} />)
        )}
      </div>
    </section>
  )
}
