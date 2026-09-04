import { useState, useEffect } from 'react'
import { api } from '@/shared/services/api-client'

export function useReports() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })
  const [reportsData, setReportsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    api
      .get('/sales')
      .then((sales) => {
        if (!isMounted) return
        const rows = (sales || []).map((s) => ({
          id: s.id,
          date: s.date,
          total: s.total,
          method: s.paymentMethod,
          itemsCount: s.items?.length || 0,
        }))
        setReportsData(rows)
      })
      .catch(() => {
        if (isMounted) setReportsData([])
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [dateRange])

  return { dateRange, setDateRange, reportsData, loading }
}
