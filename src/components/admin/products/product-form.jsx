import { useState } from 'react'

export function ProductForm({ initialData = {}, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || 'Hoodies',
    price: initialData.price || '',
    description: initialData.description || '',
    variants: initialData.variants || [
      { id: 'var-1', size: 'M', color: 'Negro', stock: 10 }
    ]
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave({
      ...initialData,
      ...formData,
      price: Number(formData.price)
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg bg-surface border border-border rounded-lg p-6 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-text-main">
          {initialData.id ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border border-border rounded text-sm bg-surface"
              >
                <option value="Hoodies">Hoodies</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Oversize">Oversize</option>
                <option value="Cargos">Cargos</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Precio ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-border rounded text-sm bg-surface"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Descripción</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-secondary text-text-main rounded hover:bg-secondary/80"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-primary text-text-inverted rounded hover:bg-primary-hover font-semibold"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
