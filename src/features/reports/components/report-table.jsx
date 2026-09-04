export function ReportTable({ data = [] }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Artículos</th>
            <th>Método</th>
            <th>Monto Total</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No hay registros en el rango de fechas seleccionado</td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>{row.itemsCount}</td>
                <td>{row.method}</td>
                <td>
                  <strong>${row.total}</strong>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
