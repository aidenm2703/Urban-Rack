import { useState, useEffect } from 'react'
import { productsService } from '@/services/products-service'

export function InventoryPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await productsService.getAll()
      setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Matriz de Inventario y Variantes</h1>
        <p className="text-sm text-text-muted">Control detallado de stock por talles y colores</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando inventario...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm text-text-main">
            <thead className="bg-surface-subtle border-b border-border text-xs uppercase font-semibold text-text-muted">
              <tr>
                <th className="p-3">Producto</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Variante (Talle / Color)</th>
                <th className="p-3">Stock Disponible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.flatMap((prod) =>
                (prod.variants || []).map((varItem) => (
                  <tr key={`${prod.id}-${varItem.id}`} className="hover:bg-surface-subtle/50 transition-colors">
                    <td className="p-3 font-semibold">{prod.name}</td>
                    <td className="p-3 text-text-muted">{prod.category}</td>
                    <td className="p-3">
                      {varItem.size} / {varItem.color}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          varItem.stock <= 3
                            ? 'bg-danger/10 text-danger'
                            : 'bg-emerald-500/10 text-emerald-600'
                        }`}
                      >
                        {varItem.stock} en stock
                      </span>
                    </td>
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
