export function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full text-left text-sm text-text-main">
        <thead className="bg-surface-subtle border-b border-border text-xs uppercase font-semibold text-text-muted">
          <tr>
            <th className="p-3">Producto</th>
            <th className="p-3">Categoría</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Stock Total</th>
            <th className="p-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-text-muted">
                No hay productos cargados en el sistema
              </td>
            </tr>
          ) : (
            products.map((p) => {
              const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0
              return (
                <tr key={p.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="p-3 font-semibold text-text-main">{p.name}</td>
                  <td className="p-3 text-text-muted">{p.category}</td>
                  <td className="p-3 font-bold">${p.price}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${totalStock <= 3 ? 'bg-danger/10 text-danger' : 'bg-emerald-500/10 text-emerald-600'}`}>
                      {totalStock} unidades
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => onEdit(p)}
                      className="px-2.5 py-1 text-xs font-medium bg-secondary hover:bg-secondary/80 text-text-main rounded transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      className="px-2.5 py-1 text-xs font-medium bg-danger/10 hover:bg-danger/20 text-danger rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
