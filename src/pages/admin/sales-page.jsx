import { useState, useEffect } from 'react'
import { salesService } from '@/services/sales-service'

export function SalesPage() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await salesService.getAll()
      setSales(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Registro Histórico de Ventas</h1>
        <p className="text-sm text-text-muted">Listado de transacciones y ventas procesadas</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando registro de ventas...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm text-text-main">
            <thead className="bg-surface-subtle border-b border-border text-xs uppercase font-semibold text-text-muted">
              <tr>
                <th className="p-3">ID Venta</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Total</th>
                <th className="p-3">Método de Pago</th>
                <th className="p-3">Vendedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-text-muted">
                    No se han registrado ventas aún
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-surface-subtle/50 transition-colors">
                    <td className="p-3 font-mono text-xs text-text-muted">{sale.id}</td>
                    <td className="p-3 text-xs text-text-muted">
                      {new Date(sale.date).toLocaleString()}
                    </td>
                    <td className="p-3 font-bold text-primary">${sale.total}</td>
                    <td className="p-3 font-semibold">{sale.paymentMethod}</td>
                    <td className="p-3 text-text-muted">{sale.sellerId || 'Vendedor 1'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
