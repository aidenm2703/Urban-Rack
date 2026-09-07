import { useState, useEffect } from 'react'
import { adminService } from '@/services/admin-service'
import { StatCard } from '@/components/admin/dashboard/stat-card'
import { AlertCard } from '@/components/admin/dashboard/alert-card'

export function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const data = await adminService.getDashboardStats()
      if (isMounted) {
        setStats(data)
        setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="p-6 text-center text-text-muted">Cargando estadísticas del panel...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Panel General de Control</h1>
        <p className="text-sm text-text-muted">Resumen en tiempo real del estado de Urban-Rack</p>
      </div>

      {/* Tarjetas de Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Ventas del Día" value={`$${stats?.todaySales || 0}`} trend="+12%" />
        <StatCard title="Apartados Activos" value={stats?.activeLayaways || 0} />
        <StatCard title="Stock Crítico" value={stats?.criticalStockCount || 0} alert />
        <StatCard title="Balance en Caja" value={`$${stats?.cashboxBalance || 0}`} />
      </div>

      {/* Notificaciones y Alertas */}
      <div className="bg-surface p-4 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-text-main mb-3">Alertas del Sistema</h2>
        {stats?.alerts?.map((alert, idx) => (
          <AlertCard key={idx} message={alert.message} type={alert.type} />
        ))}
      </div>

      {/* Productos con Mayor y Menor Venta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-text-main mb-3 font-display">Más Vendidos</h2>
          <ul className="divide-y divide-border">
            {stats?.topProducts?.map((prod, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center text-sm">
                <span className="font-medium text-text-main">{prod.name}</span>
                <span className="text-primary font-bold">{prod.sales} ventas</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface p-4 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-text-main mb-3 font-display">Bajo Movimiento</h2>
          <ul className="divide-y divide-border">
            {stats?.lowMovement?.map((prod, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center text-sm">
                <span className="font-medium text-text-main">{prod.name}</span>
                <span className="text-amber-600 font-semibold">{prod.daysWithoutSale} días sin venta</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
