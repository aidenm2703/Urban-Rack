import { businessInfo } from '@/shared/data/business-info'

export function PaymentMethods() {
  return (
    <section className="payment-methods-section">
      <h3>Métodos de Pago Aceptados</h3>
      <div className="payment-list">
        {businessInfo.paymentMethods.map((method, idx) => (
          <span key={idx} className="payment-badge">
            💳 {method}
          </span>
        ))}
      </div>
    </section>
  )
}
