import { Button } from '@/shared/components/ui/button'

export function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Variantes / Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5">No hay productos disponibles</td>
            </tr>
          ) : (
            products.map((p) => {
              const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0
              return (
                <tr key={p.id}>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>
                    {p.variants?.length || 0} variantes ({totalStock} en total)
                  </td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => onEdit(p)}>
                      Editar
                    </Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => onDelete(p.id)}>
                      Eliminar
                    </Button>
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
