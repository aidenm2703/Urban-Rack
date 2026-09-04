import { useState } from 'react'

export function CardPaymentForm({ onChange, totalFormatted }) {
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [installments, setInstallments] = useState('1')

  const handleNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16)
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(val)
    onChange?.({ cardNumber: val, cardHolder, expiry, cvv, installments })
  }

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`
    }
    setExpiry(val)
    onChange?.({ cardNumber, cardHolder, expiry: val, cvv, installments })
  }

  return (
    <div className="card-payment-container">
      {/* Vista previa de tarjeta interactiva */}
      <div className="virtual-card-preview">
        <div className="virtual-card-chip">💳</div>
        <div className="virtual-card-number">
          {cardNumber || '•••• •••• •••• ••••'}
        </div>
        <div className="virtual-card-footer">
          <div>
            <span className="card-label">TITULAR</span>
            <p className="card-val">{cardHolder || 'NOMBRE Y APELLIDO'}</p>
          </div>
          <div>
            <span className="card-label">VENCE</span>
            <p className="card-val">{expiry || 'MM/AA'}</p>
          </div>
        </div>
      </div>

      <div className="card-form-grid">
        <div className="input-group">
          <label className="input-label">Número de Tarjeta</label>
          <input
            type="text"
            className="input-control"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleNumberChange}
            maxLength={19}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Nombre del Titular</label>
          <input
            type="text"
            className="input-control"
            placeholder="Como figura en la tarjeta"
            value={cardHolder}
            onChange={(e) => {
              setCardHolder(e.target.value.toUpperCase())
              onChange?.({ cardNumber, cardHolder: e.target.value.toUpperCase(), expiry, cvv, installments })
            }}
            required
          />
        </div>
        <div className="card-form-row">
          <div className="input-group">
            <label className="input-label">Expiración</label>
            <input
              type="text"
              className="input-control"
              placeholder="MM/AA"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">CVV</label>
            <input
              type="password"
              className="input-control"
              placeholder="123"
              value={cvv}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                setCvv(val)
                onChange?.({ cardNumber, cardHolder, expiry, cvv: val, installments })
              }}
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Plan de Cuotas</label>
          <select
            className="input-control"
            value={installments}
            onChange={(e) => {
              setInstallments(e.target.value)
              onChange?.({ cardNumber, cardHolder, expiry, cvv, installments: e.target.value })
            }}
          >
            <option value="1">1 pago de {totalFormatted}</option>
            <option value="3">3 cuotas sin interés con todas las tarjetas</option>
            <option value="6">6 cuotas fijas</option>
          </select>
        </div>
      </div>
    </div>
  )
}

