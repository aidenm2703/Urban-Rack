import { useState, useEffect } from 'react'
import { api } from '@/shared/services/api-client'

const getDefaultDateRange = () => {
  const now = new Date()
  const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return {
    startDate: past.toISOString().split('T')[0],
    endDate: now.toISOString().split('T')[0],
  }
}

export function useReports() {
  const [dateRange, setDateRange] = useState(getDefaultDateRange)
  const [reportsData, setReportsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    api
      .get('/sales')
      .then((sales) => {
        if (!isMounted) return
        const filtered = (sales || []).filter((sale) => {
          if (!sale.date) return false
          const saleDay = sale.date.split('T')[0]
          if (dateRange.startDate && saleDay < dateRange.startDate) return false
          if (dateRange.endDate && saleDay > dateRange.endDate) return false
          return true
        })
        const rows = filtered.map((s) => ({
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
