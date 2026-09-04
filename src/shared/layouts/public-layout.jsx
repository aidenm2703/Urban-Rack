import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/layout/navbar'
import { Footer } from '@/shared/components/layout/footer'
import { CartDrawer } from '@/features/cart/components/cart-drawer'
import { CheckoutModal } from '@/features/cart/components/checkout-modal'

export function PublicLayout() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="public-layout-root">
      <Navbar />
      <main className="public-layout-content">
        <Outlet />
      </main>
      <Footer />

      {/* Carrito Interactivo Lateral */}
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />

      {/* Modal de Pago / Pasarela Interactiva */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  )
}
