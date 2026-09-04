import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Badge } from '@/shared/components/ui/badge'

export function CashboxSummary({ cashbox, onOpen, onClose }) {
  const [initialAmount, setInitialAmount] = useState('')

  if (!cashbox) return null

  return (
    <div className="cashbox-card">
      <div className="cashbox-status-header">
        <h3>Estado de la Caja</h3>
        <Badge variant={cashbox.status === 'OPEN' ? 'success' : 'danger'}>
          {cashbox.status === 'OPEN' ? 'ABIERTA' : 'CERRADA'}
        </Badge>
      </div>

      <div className="cashbox-metrics">
        <div className="metric-item">
          <span>Fondo Inicial:</span>
          <strong>${cashbox.initialBalance}</strong>
        </div>
        <div className="metric-item">
          <span>Ventas Efectivo:</span>
          <strong>${cashbox.totalCashSales}</strong>
        </div>
        <div className="metric-item">
          <span>Saldo Actual en Caja:</span>
          <strong className="text-success">${cashbox.currentBalance}</strong>
        </div>
      </div>

      <div className="cashbox-actions">
        {cashbox.status === 'OPEN' ? (
          <Button variant="danger" onClick={onClose}>
            Realizar Cierre de Caja
          </Button>
        ) : (
          <div className="open-cashbox-form">
            <Input
              type="number"
              placeholder="Monto inicial de apertura"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
            />
            <Button
              onClick={() => {
                if (Number(initialAmount) > 0) onOpen(Number(initialAmount))
              }}
            >
              Abrir Caja
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
