import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'

export function LayawayTable({ layaways = [], onSelect }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Total</th>
            <th>Saldo Pendiente</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {layaways.length === 0 ? (
            <tr>
              <td colSpan="7">No hay apartados registrados</td>
            </tr>
          ) : (
            layaways.map((layaway) => (
              <tr key={layaway.id}>
                <td>{layaway.id}</td>
                <td>
                  <strong>{layaway.customerName}</strong>
                </td>
                <td>{layaway.customerPhone}</td>
                <td>${layaway.total}</td>
                <td>
                  <strong className="text-danger">${layaway.balance}</strong>
                </td>
                <td>
                  <Badge
                    variant={
                      layaway.status === 'LIQUIDADO'
                        ? 'success'
                        : layaway.status === 'CANCELADO'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {layaway.status}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" onClick={() => onSelect(layaway)}>
                    Ver / Abonar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
