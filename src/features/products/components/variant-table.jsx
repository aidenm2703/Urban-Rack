export function VariantTable({ products = [] }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Talle</th>
            <th>Color</th>
            <th>Stock Actual</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {products.flatMap((prod) =>
            (prod.variants || []).map((variant) => (
              <tr key={variant.id}>
                <td>{prod.name}</td>
                <td>{variant.size}</td>
                <td>{variant.color}</td>
                <td>
                  <strong>{variant.stock}</strong>
                </td>
                <td>
                  {variant.stock <= 0 ? (
                    <span className="badge badge-danger">Sin Stock</span>
                  ) : variant.stock < 5 ? (
                    <span className="badge badge-warning">Crítico</span>
                  ) : (
                    <span className="badge badge-success">Normal</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
