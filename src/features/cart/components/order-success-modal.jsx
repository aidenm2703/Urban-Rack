import { useCurrency } from '@/shared/hooks/use-currency'
import { businessInfo } from '@/shared/data/business-info'

export function OrderSuccessModal({ order, onClose }) {
  const { formatPrice } = useCurrency()

  if (!order) return null

  const whatsappMessage = encodeURIComponent(
    `¡Hola ${businessInfo.name}! Acabo de realizar el pedido *${order.id}* por un total de ${formatPrice(order.total)}. Mi nombre es ${order.customer.name}. ¿Podrían confirmarme el estado del envío? ¡Gracias!`
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container order-success-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="order-success-header">
          <div className="order-success-check">✓</div>
          <h2>¡Pedido Confirmado con Éxito!</h2>
          <p className="order-success-subtitle">
            Gracias por comprar en {businessInfo.name}. Hemos recibido tu orden y estamos preparándola.
          </p>
        </div>

        <div className="order-receipt-card">
          <div className="receipt-row">
            <span>Número de Orden:</span>
            <strong>{order.id}</strong>
          </div>
          <div className="receipt-row">
            <span>Cliente:</span>
            <span>{order.customer.name} ({order.customer.phone})</span>
          </div>
          <div className="receipt-row">
            <span>Dirección de Entrega:</span>
            <span>{order.customer.address}, {order.customer.city}</span>
          </div>
          <div className="receipt-row">
            <span>Método de Pago:</span>
            <span className="receipt-badge">{order.paymentMethod}</span>
          </div>
          <div className="receipt-row">
            <span>Moneda:</span>
            <span>{order.currency}</span>
          </div>
          <hr className="receipt-divider" />
          <div className="receipt-items-summary">
            <h4>Prendas compradas ({order.items.length}):</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.itemId} className="receipt-item-line">
                  <span>{item.quantity}x {item.name} ({item.selectedSize}, {item.selectedColor})</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="receipt-divider" />
          <div className="receipt-row receipt-total-row">
            <strong>Total Pagado:</strong>
            <strong className="receipt-total-price">{formatPrice(order.total)}</strong>
          </div>
        </div>

        <div className="order-success-actions">
          <a
            href={`https://wa.me/${businessInfo.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block"
          >
            📱 Enviar Comprobante por WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={onClose}
          >
            Seguir Comprando en Urban-Rack
          </button>
        </div>
      </div>
    </div>
  )
}

