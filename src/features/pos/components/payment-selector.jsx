import { useState } from 'react'

export function PaymentSelector({ total = 0, onMethodChange }) {
  const methods = ['Efectivo', 'Tarjeta Débito', 'Tarjeta Crédito', 'Transferencia']
  const [selectedMethod, setSelectedMethod] = useState('Efectivo')

  const handleChange = (m) => {
    setSelectedMethod(m)
    onMethodChange?.(m)
  }

  return (
    <div className="payment-selector">
      <h4>Método de Cobro</h4>
      <div className="payment-buttons">
        {methods.map((m) => (
          <button
            key={m}
            type="button"
            className={`payment-method-btn ${selectedMethod === m ? 'active' : ''}`}
            onClick={() => handleChange(m)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  )
}
