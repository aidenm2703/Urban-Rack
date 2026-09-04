import { useState } from 'react'
import { Modal } from '@/shared/components/ui/modal'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { layawaysService } from '../layaways-service'

export function LayawayForm({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    total: '',
    initialDeposit: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const total = Number(formData.total)
    const deposit = Number(formData.initialDeposit)
    const newLayaway = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      total,
      balance: Math.max(0, total - deposit),
      status: 'ACTIVO',
      createdAt: new Date().toISOString(),
      installments: [
        {
          id: `inst-${Date.now()}`,
          amount: deposit,
          date: new Date().toISOString(),
          method: 'Efectivo',
        },
      ],
    }

    await layawaysService.create(newLayaway)
    onCreated?.(newLayaway)
    onClose()
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Nuevo Apartado">
      <form onSubmit={handleSubmit} className="layaway-form">
        <Input
          label="Nombre del Cliente"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          required
        />
        <Input
          label="Teléfono / WhatsApp"
          value={formData.customerPhone}
          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
          required
        />
        <Input
          label="Monto Total ($)"
          type="number"
          value={formData.total}
          onChange={(e) => setFormData({ ...formData, total: e.target.value })}
          required
        />
        <Input
          label="Seña Inicial ($)"
          type="number"
          value={formData.initialDeposit}
          onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
          required
        />
        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Crear Apartado</Button>
        </div>
      </form>
    </Modal>
  )
}
