import { useParams } from 'react-router-dom'
import { useProduct } from '@/features/product-detail/use-product'
import { ProductGallery } from '@/features/product-detail/components/product-gallery'
import { SizeColorSelector } from '@/features/product-detail/components/size-color-selector'
import { StockIndicator } from '@/features/product-detail/components/stock-indicator'
import { WhatsappOrderButton } from '@/features/product-detail/components/whatsapp-order-button'

export function ProductDetailPage() {
  const { id } = useParams()
  const { product, selectedVariant, setSelectedVariant, loading, error } = useProduct(id)

  if (loading) return <div className="p-4">Cargando producto...</div>
  if (error || !product) return <div className="p-4 error">Producto no encontrado</div>

  return (
    <div className="product-detail-page">
      <div className="product-detail-grid">
        <ProductGallery image={product.image} name={product.name} />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-desc">{product.description}</p>
          <SizeColorSelector
            variants={product.variants || []}
            selectedVariant={selectedVariant}
            onSelect={setSelectedVariant}
          />
          <StockIndicator stock={selectedVariant?.stock ?? 0} />
          <WhatsappOrderButton product={product} variant={selectedVariant} />
        </div>
      </div>
    </div>
  )
}
