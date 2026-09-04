
import { useCashbox } from '@/features/cashbox/use-cashbox'
import { CashboxSummary } from '@/features/cashbox/components/cashbox-summary'

export function CashboxPage() {
  const { cashbox, loading, openCashbox, closeCashbox } = useCashbox()

  return (
    <div className="admin-cashbox-page">
      <h1>Control de Caja</h1>
      <p>Apertura, arqueo y cierre diario de caja</p>
      {loading ? (
        <p>Cargando información de caja...</p>
      ) : (
        <CashboxSummary
          cashbox={cashbox}
          onOpen={openCashbox}
          onClose={closeCashbox}
        />
      )}
    </div>
  )
}
