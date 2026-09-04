import { useDashboardStats } from '@/features/admin-dashboard/use-dashboard-stats'
import { StatCard } from '@/features/admin-dashboard/components/stat-card'
import { AlertCard } from '@/features/admin-dashboard/components/alert-card'
import { SalesByPaymentChart } from '@/features/admin-dashboard/components/sales-by-payment-chart'
import { Last7DaysChart } from '@/features/admin-dashboard/components/last-7-days-chart'
import { TopProductsChart } from '@/features/admin-dashboard/components/top-products-chart'
import { LowMovementProducts } from '@/features/admin-dashboard/components/low-movement-products'

export function DashboardPage() {
  const { stats, alerts, loading } = useDashboardStats()

  if (loading) return <div>Cargando estadísticas...</div>

  return (
    <div className="dashboard-page">
      <h1>Panel General de Control</h1>
      <div className="dashboard-stats-grid">
        <StatCard title="Ventas del Día" value={`$${stats?.todaySales || 0}`} trend="+12%" />
        <StatCard title="Apartados Activos" value={stats?.activeLayaways || 0} />
        <StatCard title="Stock Crítico" value={stats?.criticalStockCount || 0} alert />
        <StatCard title="Caja Actual" value={`$${stats?.cashboxBalance || 0}`} />
      </div>

      <div className="dashboard-alerts">
        {alerts?.map((alert, i) => (
          <AlertCard key={i} message={alert.message} type={alert.type} />
        ))}
      </div>

      <div className="dashboard-charts-grid">
        <Last7DaysChart data={stats?.last7Days || []} />
        <SalesByPaymentChart data={stats?.salesByPayment || []} />
        <TopProductsChart products={stats?.topProducts || []} />
        <LowMovementProducts products={stats?.lowMovement || []} />
      </div>
    </div>
  )
}
