import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useProduct } from '@/features/product-detail/use-product'
import { ProductGallery } from '@/features/product-detail/components/product-gallery'
import { SizeColorSelector } from '@/features/product-detail/components/size-color-selector'
import { StockIndicator } from '@/features/product-detail/components/stock-indicator'
import { WhatsappOrderButton } from '@/features/product-detail/components/whatsapp-order-button'
import { useCurrency } from '@/shared/hooks/use-currency'
import { useCart } from '@/shared/hooks/use-cart'

export function ProductDetailPage() {
  const { id } = useParams()
  const { product, selectedVariant, setSelectedVariant, loading, error } = useProduct(id)
  const { formatPrice } = useCurrency()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="spinner" />
        <p>Cargando información de la prenda...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>Prenda no encontrada</h2>
        <p>El producto solicitado no existe o no se encuentra disponible actualmente.</p>
        <Link to="/catalogo" className="btn btn-primary">
          Regresar al Catálogo
        </Link>
      </div>
    )
  }

  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addToCart(product, {
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    })
  }

  return (
    <div className="product-detail-page">
      <nav className="detail-breadcrumb" aria-label="Migas de pan">
        <Link to="/">Inicio</Link> &rsaquo;
        <Link to="/catalogo">Catálogo</Link> &rsaquo;
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="product-detail-grid">
        <div className="product-detail-gallery-wrap">
          <ProductGallery image={product.image} name={product.name} />
        </div>

        <div className="product-detail-info">
          <div className="detail-tags">
            <span className="detail-category">{product.category}</span>
            <span className="detail-section">{product.section?.toUpperCase()}</span>
          </div>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-price-box">
            <span className="detail-current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="detail-original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="product-desc">{product.description}</p>

          <SizeColorSelector
            variants={product.variants || []}
            selectedVariant={selectedVariant}
            onSelect={setSelectedVariant}
          />

          <StockIndicator stock={selectedVariant?.stock ?? 0} />

          {/* Cantidad y Agregar al Carrito */}
          <div className="detail-purchase-row">
            <div className="cart-qty-selector">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={isOutOfStock}
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                disabled={isOutOfStock || (selectedVariant && quantity >= selectedVariant.stock)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-lg btn-add-cart-detail"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Agotado en este talle' : `🛒 Agregar al Carrito (${formatPrice(product.price * quantity)})`}
            </button>
          </div>

          <div className="detail-secondary-actions">
            <WhatsappOrderButton product={product} variant={selectedVariant} />
          </div>

          <div className="detail-perks">
            <div className="detail-perk-item">
              <span>🚚</span> Envíos a todo el país. Gratis en compras superiores a $70 USD.
            </div>
            <div className="detail-perk-item">
              <span>🔄</span> Cambios dentro de los 30 días en prendas con etiqueta intacta.
            </div>
            <div className="detail-perk-item">
              <span>🛡️</span> Garantía oficial de confección y autenticidad Urban-Rack.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
