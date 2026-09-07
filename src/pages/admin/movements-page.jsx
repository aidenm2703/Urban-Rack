import { useState, useEffect } from 'react'
import { api } from '@/services/api-client'

export function MovementsPage() {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get('/inventory_movements')
        setMovements(data || [])
      } catch {
        setMovements([
          {
            id: 'mov-1',
            type: 'ENTRADA',
            quantity: 15,
            reason: 'Ingreso inicial de proveedor',
            date: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Movimientos de Inventario</h1>
        <p className="text-sm text-text-muted">Historial de entradas, salidas y ajustes de stock</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando movimientos...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm text-text-main">
            <thead className="bg-surface-subtle border-b border-border text-xs uppercase font-semibold text-text-muted">
              <tr>
                <th className="p-3">ID Movimiento</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Motivo / Observación</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {movements.map((mov) => (
                <tr key={mov.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="p-3 font-mono text-xs text-text-muted">{mov.id}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        mov.type === 'ENTRADA'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-danger/10 text-danger'
                      }`}
                    >
                      {mov.type}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{mov.quantity} un.</td>
                  <td className="p-3">{mov.reason}</td>
                  <td className="p-3 text-xs text-text-muted">
                    {new Date(mov.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
