import { useMovements } from '@/features/inventory-movements/use-movements'
import { MovementsTable } from '@/features/inventory-movements/components/movements-table'

export function MovementsPage() {
  const { movements, loading } = useMovements()

  return (
    <div className="admin-movements-page">
      <h1>Movimientos de Inventario</h1>
      <p>Historial de ingresos, egresos y ajustes de stock</p>
      {loading ? (
        <p>Cargando movimientos...</p>
      ) : (
        <MovementsTable movements={movements} />
      )}
    </div>
  )
}
