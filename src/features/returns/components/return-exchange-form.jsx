import { useState } from 'react'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { returnsService } from '../returns-service'

export function ReturnExchangeForm() {
  const [formData, setFormData] = useState({
    ticketId: '',
    reason: 'Cambio de talle',
    productId: '',
    exchangeProductId: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await returnsService.create({
      ...formData,
      date: new Date().toISOString(),
    })
    alert('Cambio/Devolución procesado correctamente')
    setFormData({
      ticketId: '',
      reason: 'Cambio de talle',
      productId: '',
      exchangeProductId: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="return-exchange-form">
      <Input
        label="Número de Ticket / Venta"
        value={formData.ticketId}
        onChange={(e) => setFormData({ ...formData, ticketId: e.target.value })}
        required
      />
      <Input
        label="ID Prenda Devuelta"
        value={formData.productId}
        onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
        required
      />
      <Input
        label="ID Prenda Nueva de Cambio (Opcional)"
        value={formData.exchangeProductId}
        onChange={(e) => setFormData({ ...formData, exchangeProductId: e.target.value })}
      />
      <div className="input-group">
        <label className="input-label">Motivo de Devolución</label>
        <select
          className="input-control"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        >
          <option value="Cambio de talle">Cambio de talle</option>
          <option value="Falla de fábrica">Falla de fábrica</option>
          <option value="Disconformidad con modelo">Disconformidad con modelo</option>
        </select>
      </div>
      <Button type="submit">Procesar Devolución / Cambio</Button>
    </form>
  )
}
