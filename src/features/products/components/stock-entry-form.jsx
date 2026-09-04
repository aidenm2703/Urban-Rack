import { useState } from 'react'
import { Modal } from '@/shared/components/ui/modal'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { productsAdminService } from '../products-service'

export function StockEntryForm({ onClose }) {
  const [formData, setFormData] = useState({
    productId: 'prod-1',
    variantId: 'var-1',
    quantity: '',
    reason: 'Ingreso de nuevo lote proveedor',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await productsAdminService.addStockEntry({
      ...formData,
      quantity: Number(formData.quantity),
    })
    alert('Entrada de mercadería registrada con éxito')
    onClose()
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Entrada de Mercadería">
      <form onSubmit={handleSubmit} className="stock-entry-form">
        <Input
          label="Cantidad a Ingresar"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
        <Input
          label="Motivo u Observación"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Confirmar Ingreso</Button>
        </div>
      </form>
    </Modal>
  )
}
