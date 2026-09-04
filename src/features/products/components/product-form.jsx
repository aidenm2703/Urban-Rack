import { useState } from 'react'
import { Modal } from '@/shared/components/ui/modal'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

export function ProductForm({ initialData = {}, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || 'Buzos',
    price: initialData.price || '',
    description: initialData.description || '',
    variants: initialData.variants || [
      { id: 'var-new-1', size: 'M', color: 'Negro', stock: 10 },
    ],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave({
      ...initialData,
      ...formData,
      price: Number(formData.price),
    })
    onClose()
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={initialData.id ? 'Editar Producto' : 'Crear Nuevo Producto'}
    >
      <form onSubmit={handleSubmit} className="product-form">
        <Input
          label="Nombre del Producto"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Precio ($)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <div className="input-group">
          <label className="input-label">Descripción</label>
          <textarea
            className="input-control"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Producto</Button>
        </div>
      </form>
    </Modal>
  )
}
