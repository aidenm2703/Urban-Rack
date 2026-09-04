import { useCart } from '@/features/pos/use-cart'
import { ProductSearch } from '@/features/pos/components/product-search'
import { VariantPicker } from '@/features/pos/components/variant-picker'
import { Cart } from '@/features/pos/components/cart'
import { PaymentSelector } from '@/features/pos/components/payment-selector'
import { SaleSummary } from '@/features/pos/components/sale-summary'

export function PosPage() {
  const { cartItems, addItem, removeItem, updateQuantity, total, clearCart } = useCart()

  return (
    <div className="pos-page">
      <h1>Punto de Venta (POS)</h1>
      <div className="pos-layout">
        <div className="pos-products-area">
          <ProductSearch onSelectProduct={(prod) => addItem(prod)} />
          <VariantPicker onAddVariant={(variant) => addItem(variant)} />
        </div>
        <div className="pos-cart-area">
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
          <PaymentSelector total={total} />
          <SaleSummary total={total} onCompleteSale={clearCart} />
        </div>
      </div>
    </div>
  )
}
