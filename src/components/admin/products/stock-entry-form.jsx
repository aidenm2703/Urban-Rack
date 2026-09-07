import { useState } from 'react'
import { productsService } from '@/services/products-service'

export function StockEntryForm({ products = [], onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    productId: products[0]?.id || 'prod-1',
    variantId: products[0]?.variants?.[0]?.id || 'var-1',
    quantity: '',
    reason: 'Ingreso de nuevo lote proveedor'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await productsService.addStock(
      formData.productId,
      formData.variantId,
      formData.quantity,
      formData.reason
    )
    alert('Entrada de mercadería registrada con éxito')
    onSuccess?.()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-text-main">Entrada de Mercadería</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Cantidad a Ingresar</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Motivo u Observación</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
              required
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
              Confirmar Ingreso
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
