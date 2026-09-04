import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export function InstallmentsHistory({ layaway, onAddAbono }) {
  const [amount, setAmount] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return
    onAddAbono(layaway.id, Number(amount))
    setAmount('')
  }

  return (
    <div className="installments-history">
      <h3>Historial de Abonos - {layaway.customerName}</h3>
      <p>
        Total: <strong>${layaway.total}</strong> | Saldo Restante:{' '}
        <strong className="text-danger">${layaway.balance}</strong>
      </p>

      <ul className="installments-list">
        {layaway.installments?.map((inst) => (
          <li key={inst.id} className="installment-item">
            <span>{new Date(inst.date).toLocaleDateString()}</span>
            <span>{inst.method}</span>
            <strong>+${inst.amount}</strong>
          </li>
        ))}
      </ul>

      {layaway.status === 'ACTIVO' && (
        <form onSubmit={handleAdd} className="add-abono-form">
          <Input
            type="number"
            placeholder="Monto del abono"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={layaway.balance}
            required
          />
          <Button type="submit" size="sm">
            Registrar Abono
          </Button>
        </form>
      )}
    </div>
  )
}
