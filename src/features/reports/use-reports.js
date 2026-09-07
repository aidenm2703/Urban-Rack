import { useState, useEffect } from 'react'
import { api } from '@/services/api-client'

export function useReports() {
  const [dateRange, setDateRange] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 7)
    return {
      startDate: d.toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    }
  })
  const [reportsData, setReportsData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

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
        setLoading(false)
      })
      .catch(() => {
        if (isMounted) {
          setReportsData([])
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [dateRange])

  return { dateRange, setDateRange, reportsData, loading }
}
