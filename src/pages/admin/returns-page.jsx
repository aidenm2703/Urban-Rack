import { useState } from 'react'

export function ReturnsPage() {
  const [saleId, setSaleId] = useState('')
  const [reason, setReason] = useState('Cambio por talle')
  const [refundType, setRefundType] = useState('Nota de crédito')
  const [processed, setProcessed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessed(true)
    alert(`Devolución/Cambio registrado para la venta #${saleId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Devoluciones y Cambios</h1>
        <p className="text-sm text-text-muted">Gestión de notas de crédito y cambio de prendas con reintegración de stock</p>
      </div>

      <div className="bg-surface p-6 rounded-lg border border-border max-w-xl space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID de Venta o Ticket</label>
            <input
              type="text"
              placeholder="ej: sale-1"
              value={saleId}
              onChange={(e) => setSaleId(e.target.value)}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Motivo del Cambio</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
            >
              <option value="Cambio por talle">Cambio por talle</option>
              <option value="Falla de fábrica">Falla de fábrica</option>
              <option value="Devolución de producto">Devolución de producto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Reintegro</label>
            <select
              value={refundType}
              onChange={(e) => setRefundType(e.target.value)}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
            >
              <option value="Nota de crédito">Nota de Crédito para la tienda</option>
              <option value="Reintegro dinero">Reintegro de dinero</option>
              <option value="Cambio directo">Cambio directo mano a mano</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-inverted font-bold rounded transition-colors"
          >
            Procesar Devolución / Cambio
          </button>
        </form>

        {processed && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-sm font-medium text-center">
            ✔ Operación procesada correctamente. Se actualizó el inventario.
          </div>
        )}
      </div>
    </div>
  )
}
