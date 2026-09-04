import { useState } from 'react'
import { useCart } from '@/shared/hooks/use-cart'
import { useCurrency } from '@/shared/hooks/use-currency'

export function CartDrawer({ onCheckout }) {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    totalItems,
    subtotal,
    discount,
    shippingCost,
    total,
    isFreeShipping,
    freeShippingProgress,
    remainingForFreeShipping,
  } = useCart()

  const { formatPrice } = useCurrency()
  const [couponInput, setCouponInput] = useState('')

  if (!isOpen) return null

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (couponInput.trim()) {
      applyCoupon(couponInput)
      setCouponInput('')
    }
  }

  const handleStartCheckout = () => {
    closeCart()
    onCheckout?.()
  }

  return (
    <div className="cart-drawer-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Carrito de compras"
        role="dialog"
      >
        <header className="cart-drawer-header">
          <div className="cart-drawer-title-wrap">
            <span className="cart-drawer-icon">🛍️</span>
            <h2>Tu Carrito</h2>
            <span className="cart-badge-count">{totalItems}</span>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            &times;
          </button>
        </header>

        {items.length > 0 && (
          <div className="cart-shipping-banner">
            <div className="shipping-progress-text">
              {remainingForFreeShipping === 0 ? (
                <span>🎉 <strong>¡Envío GRATIS activado!</strong></span>
              ) : (
                <span>
                  Faltan <strong>{formatPrice(remainingForFreeShipping)}</strong> para <strong>Envío GRATIS</strong>
                </span>
              )}
            </div>
            <div className="shipping-progress-bar">
              <div
                className="shipping-progress-fill"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-cart-icon">🛒</span>
              <h3>Tu carrito está vacío</h3>
              <p>Explora nuestras colecciones urbanas y encuentra tu estilo.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={closeCart}
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map((item) => (
                <li key={item.itemId} className="cart-item">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80'}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-meta">
                      <span className="cart-meta-tag">Talle: {item.selectedSize}</span>
                      <span className="cart-meta-tag">Color: {item.selectedColor}</span>
                    </div>
                    <div className="cart-item-price">
                      {formatPrice(item.price)}
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-qty-selector">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                          className="qty-btn"
                          aria-label="Disminuir cantidad"
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="qty-btn"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.itemId)}
                        className="cart-remove-btn"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-subtotal">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="cart-drawer-footer">
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                placeholder="Código de cupón (ej: URBAN10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="btn btn-outline btn-sm">
                Aplicar
              </button>
            </form>

            {coupon && (
              <div className="applied-coupon-pill">
                <span>🏷️ <strong>{coupon.code}</strong> (-{coupon.discountPercent}%)</span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="remove-coupon-btn"
                  aria-label="Quitar cupón"
                >
                  &times;
                </button>
              </div>
            )}

            <div className="cart-financial-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Descuento ({coupon?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Envío</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="free-shipping-text">¡GRATIS!</strong>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="total-amount">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="cart-footer-buttons">
              <button
                type="button"
                className="btn btn-primary btn-block btn-checkout"
                onClick={handleStartCheckout}
              >
                Finalizar Compra ({formatPrice(total)})
              </button>
              <button
                type="button"
                className="btn-clear-cart"
                onClick={clearCart}
              >
                Vaciar Carrito
              </button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  )
}

