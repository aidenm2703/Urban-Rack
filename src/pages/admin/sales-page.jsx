import { useFetch } from '@/shared/hooks/use-fetch'

export function SalesPage() {
  const { data: sales, loading } = useFetch('/sales')

  return (
    <div className="admin-sales-page">
      <h1>Registro Histórico de Ventas</h1>
      {loading ? (
        <p>Cargando ventas...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Método de Pago</th>
              <th>Vendedor</th>
            </tr>
          </thead>
          <tbody>
            {sales && sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{new Date(sale.date).toLocaleString()}</td>
                  <td>${sale.total}</td>
                  <td>{sale.paymentMethod}</td>
                  <td>{sale.sellerId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay ventas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
