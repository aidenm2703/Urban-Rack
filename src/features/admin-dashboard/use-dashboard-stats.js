import { useState, useEffect } from 'react'
import { api } from '@/services/api-client'

export function useDashboardStats() {
  const [stats, setStats] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    Promise.all([
      api.get('/sales').catch(() => []),
      api.get('/layaways').catch(() => []),
      api.get('/products').catch(() => []),
      api.get('/cashbox').catch(() => ({ currentBalance: 0 })),
    ])
      .then(([sales, layaways, products, cashbox]) => {
        if (!isMounted) return

        const todaySales = sales.reduce((acc, s) => acc + (s.total || 0), 0)
        const activeLayaways = layaways.filter((l) => l.status === 'ACTIVO').length
        const criticalStock = products.filter((p) =>
          p.variants?.some((v) => (v.stock || 0) < 5)
        )

        setStats({
          todaySales,
          activeLayaways,
          criticalStockCount: criticalStock.length,
          cashboxBalance: cashbox.currentBalance || 0,
          last7Days: [
            { day: 'Lun', sales: 120 },
            { day: 'Mar', sales: 150 },
            { day: 'Mie', sales: 180 },
            { day: 'Jue', sales: 220 },
            { day: 'Vie', sales: 310 },
            { day: 'Sab', sales: 450 },
            { day: 'Dom', sales: 290 },
          ],
          salesByPayment: [
            { method: 'Efectivo', count: 45 },
            { method: 'Transferencia', count: 35 },
            { method: 'Tarjeta', count: 20 },
          ],
          topProducts: products.slice(0, 5),
          lowMovement: products.slice(0, 3),
        })

        const generatedAlerts = []
        if (criticalStock.length > 0) {
          generatedAlerts.push({
            type: 'warning',
            message: `Hay ${criticalStock.length} producto(s) con stock crítico por debajo de 5 unidades.`,
          })
        }
        setAlerts(generatedAlerts)
        setLoading(false)
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return { stats, alerts, loading }
}
