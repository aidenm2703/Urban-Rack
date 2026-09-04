import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/shared/hooks/use-cart'
import { useCurrency } from '@/shared/hooks/use-currency'
import { Badge } from '@/shared/components/ui/badge'

export function ProductQuickView({ product, onClose }) {
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()

  const [selectedSize, setSelectedSize] = useState((product?.sizes && product.sizes[0]) || 'M')
  const [selectedColor, setSelectedColor] = useState((product?.colors && product.colors[0]) || 'Negro')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(product?.image)

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
    onClose()
  }

  const galleryImages = [product.image, ...(product.gallery || [])].filter(
    (img, idx, arr) => img && arr.indexOf(img) === idx
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container quick-view-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button type="button" className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="quick-view-grid">
          <div className="quick-view-gallery">
            <div className="quick-view-main-image-wrap">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="quick-view-main-img"
              />
            </div>
            {galleryImages.length > 1 && (
              <div className="quick-view-thumbs">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`thumb-btn ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`Vista ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="quick-view-details">
            <div className="quick-view-meta">
              <span className="product-category">{product.category}</span>
              <Badge variant="default">{product.section?.toUpperCase() || 'URBANO'}</Badge>
            </div>

            <h2 className="quick-view-title">{product.name}</h2>

            <div className="quick-view-price-wrap">
              <span className="quick-view-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="quick-view-original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="quick-view-desc">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="quick-view-option-group">
                <label className="option-label">Color Seleccionado: <strong>{selectedColor}</strong></label>
                <div className="color-swatches-list">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`color-chip ${selectedColor === c ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="quick-view-option-group">
                <label className="option-label">Talle Seleccionado: <strong>{selectedSize}</strong></label>
                <div className="size-pills-list">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`size-pill ${selectedSize === s ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quick-view-qty-row">
              <label className="option-label">Cantidad:</label>
              <div className="cart-qty-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="quick-view-actions">
              <button
                type="button"
                className="btn btn-primary btn-block btn-lg"
                onClick={handleAddToCart}
              >
                🛒 Agregar al Carrito • {formatPrice(product.price * quantity)}
              </button>
              <Link
                to={`/producto/${product.id}`}
                className="btn btn-outline btn-block"
                onClick={onClose}
              >
                Ver Página Completa del Producto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

