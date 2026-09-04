export function MovementsTable({ movements = [] }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Producto / Variante</th>
            <th>Cantidad</th>
            <th>Motivo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td colSpan="6">No se registran movimientos</td>
            </tr>
          ) : (
            movements.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>
                  <span
                    className={`badge badge-${
                      mov.type === 'ENTRADA' ? 'success' : 'danger'
                    }`}
                  >
                    {mov.type}
                  </span>
                </td>
                <td>{mov.productId} ({mov.variantId})</td>
                <td>{mov.quantity}</td>
                <td>{mov.reason}</td>
                <td>{new Date(mov.date).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
