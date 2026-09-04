import { useState } from 'react'
import { useCart } from '@/shared/hooks/use-cart'
import { useCurrency } from '@/shared/hooks/use-currency'
import { useToast } from '@/shared/hooks/use-toast'
import { CardPaymentForm } from './card-payment-form'
import { OrderSuccessModal } from './order-success-modal'
import { businessInfo } from '@/shared/data/business-info'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Tarjeta de Crédito / Débito', icon: '💳' },
  { id: 'sinpe', label: 'SINPE Móvil / Transferencia', icon: '📱' },
  { id: 'digital', label: 'Mercado Pago / PayPal', icon: '⚡' },
  { id: 'cash', label: 'Efectivo Contra Entrega', icon: '💵' },
]

export function CheckoutModal({ isOpen, onClose }) {
  const { items, total, clearCart } = useCart()
  const { formatPrice, currencyCode } = useCurrency()
  const { addToast } = useToast()

  const [activePaymentMethod, setActivePaymentMethod] = useState('card')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  })

  if (!isOpen && !completedOrder) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    if (items.length === 0) {
      addToast('Tu carrito está vacío.', 'warning')
      return
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      addToast('Por favor completa los datos obligatorios de envío.', 'warning')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const orderId = `UR-${Math.floor(100000 + Math.random() * 900000)}`
      const orderData = {
        id: orderId,
        items: [...items],
        total,
        currency: currencyCode,
        customer: { ...formData },
        paymentMethod: PAYMENT_METHODS.find((m) => m.id === activePaymentMethod)?.label || 'Tarjeta',
        date: new Date().toISOString(),
      }

      setCompletedOrder(orderData)
      clearCart()
      setIsSubmitting(false)
      addToast(`¡Tu pedido #${orderId} se registró exitosamente!`, 'success', {
        title: '¡Compra Exitosa!',
      })
    }, 1000)
  }

  if (completedOrder) {
    return (
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => {
          setCompletedOrder(null)
          onClose()
        }}
      />
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container checkout-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="modal-header">
          <h3>Checkout & Pasarela de Pago</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="checkout-form">
          <section className="checkout-section">
            <h4>1. Datos de Contacto y Envío</h4>
            <div className="form-grid-2">
              <div className="input-group">
                <label className="input-label">Nombre Completo *</label>
                <input
                  type="text"
                  name="name"
                  className="input-control"
                  placeholder="Ej: Sofía Ramírez"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  className="input-control"
                  placeholder="Ej: +54 9 11 9876-5432"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="input-group">
                <label className="input-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="input-control"
                  placeholder="sofia@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Ciudad / Provincia *</label>
                <input
                  type="text"
                  name="city"
                  className="input-control"
                  placeholder="Ej: San José / Buenos Aires"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Dirección Exacta de Entrega *</label>
              <input
                type="text"
                name="address"
                className="input-control"
                placeholder="Calle, número, departamento, código postal"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          <section className="checkout-section">
            <h4>2. Selecciona Método de Pago</h4>
            <div className="payment-method-selector-tabs">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-tab-btn ${activePaymentMethod === method.id ? 'active' : ''}`}
                  onClick={() => setActivePaymentMethod(method.id)}
                >
                  <span className="payment-tab-icon">{method.icon}</span>
                  <span className="payment-tab-label">{method.label}</span>
                </button>
              ))}
            </div>

            <div className="payment-method-panel">
              {activePaymentMethod === 'card' && (
                <CardPaymentForm totalFormatted={formatPrice(total)} />
              )}

              {activePaymentMethod === 'sinpe' && (
                <div className="transfer-instructions-box">
                  <h5>Instrucciones para Transferencia / SINPE Móvil</h5>
                  <p>Realiza la transferencia por <strong>{formatPrice(total)}</strong> a la siguiente cuenta:</p>
                  <div className="bank-details-card">
                    <p><strong>SINPE Móvil:</strong> {businessInfo.phone}</p>
                    <p><strong>Titular:</strong> {businessInfo.name} S.A.</p>
                    <p><strong>IBAN:</strong> CR05015202001026284061</p>
                    <p><strong>Detalle:</strong> Compra Urban-Rack</p>
                  </div>
                  <p className="sinpe-note">
                    📌 Al confirmar tu pedido se generará el ticket para enviar el comprobante directamente a nuestro WhatsApp oficial.
                  </p>
                </div>
              )}

              {activePaymentMethod === 'digital' && (
                <div className="digital-wallet-box">
                  <h5>Pago Rápido Mercado Pago / PayPal</h5>
                  <p>Podrás pagar de forma segura con tu saldo en cuenta o tarjetas asociadas en un clic.</p>
                  <div className="digital-wallet-badges">
                    <span className="wallet-pill">🟦 Mercado Pago Express</span>
                    <span className="wallet-pill">💳 PayPal Checkout</span>
                  </div>
                </div>
              )}

              {activePaymentMethod === 'cash' && (
                <div className="cash-payment-box">
                  <h5>Efectivo Contra Entrega</h5>
                  <p>Pagas en efectivo al momento de recibir tu paquete en tu domicilio.</p>
                  <p className="cash-alert">💡 Ten a mano el monto exacto de <strong>{formatPrice(total)}</strong> para facilitar el cambio al repartidor.</p>
                </div>
              )}
            </div>
          </section>

          <footer className="checkout-modal-footer">
            <div className="checkout-total-indicator">
              <span>Total a Pagar:</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div className="checkout-modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando Pago...' : `Confirmar y Pagar (${formatPrice(total)})`}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  )
}

