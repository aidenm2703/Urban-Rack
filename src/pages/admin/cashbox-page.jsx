import { useState, useEffect } from 'react'
import { cashboxService } from '@/services/cashbox-service'

export function CashboxPage() {
  const [cashbox, setCashbox] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialAmount, setInitialAmount] = useState('100')

  const reloadCashbox = () => {
    cashboxService.getStatus().then((data) => setCashbox(data))
  }

  useEffect(() => {
    let isMounted = true
    cashboxService.getStatus().then((data) => {
      if (isMounted) {
        setCashbox(data)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const handleOpen = async (e) => {
    e.preventDefault()
    await cashboxService.openBox(initialAmount)
    alert('Caja abierta con éxito')
    reloadCashbox()
  }

  const handleClose = async () => {
    if (window.confirm('¿Seguro que deseas realizar el cierre de caja?')) {
      await cashboxService.closeBox()
      alert('Cierre de caja realizado con éxito')
      reloadCashbox()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Control de Caja</h1>
        <p className="text-sm text-text-muted">Apertura, arqueo y cierre diario de caja</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando estado de la caja...</div>
      ) : (
        <div className="bg-surface p-6 rounded-lg border border-border space-y-6 max-w-xl">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <span className="text-sm font-semibold text-text-muted">Estado Actual:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                cashbox?.status === 'OPEN'
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : 'bg-danger/10 text-danger border border-danger/20'
              }`}
            >
              {cashbox?.status === 'OPEN' ? '🟢 CAJA ABIERTA' : '🔴 CAJA CERRADA'}
            </span>
          </div>

          {cashbox?.status === 'OPEN' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded bg-surface-subtle border border-border">
                  <span className="text-xs text-text-muted block">Monto Inicial</span>
                  <span className="text-xl font-bold text-text-main">${cashbox.initialBalance}</span>
                </div>
                <div className="p-4 rounded bg-surface-subtle border border-border">
                  <span className="text-xs text-text-muted block">Balance Actual</span>
                  <span className="text-xl font-bold text-primary">${cashbox.currentBalance}</span>
                </div>
              </div>

              <div className="p-4 rounded bg-surface-subtle border border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Ventas en Efectivo:</span>
                  <span className="font-semibold text-text-main">${cashbox.totalCashSales}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Ventas en Tarjeta:</span>
                  <span className="font-semibold text-text-main">${cashbox.totalCardSales}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 bg-danger/10 hover:bg-danger/20 text-danger font-bold rounded transition-colors"
              >
                Realizar Cierre de Caja
              </button>
            </div>
          ) : (
            <form onSubmit={handleOpen} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Monto de Apertura ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-inverted font-bold rounded transition-colors"
              >
                Abrir Caja
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
