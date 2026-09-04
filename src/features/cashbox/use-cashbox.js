import { useState, useEffect } from 'react'
import { api } from '@/shared/services/api-client'

export function useCashbox() {
  const [cashbox, setCashbox] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    api
      .get('/cashbox')
      .then((data) => {
        if (isMounted) setCashbox(data)
      })
      .catch(() => {
        if (isMounted) {
          setCashbox({
            status: 'OPEN',
            initialBalance: 100,
            currentBalance: 125,
            totalCashSales: 25,
            totalCardSales: 0,
          })
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const openCashbox = async (initialAmount) => {
    const updated = {
      status: 'OPEN',
      openedAt: new Date().toISOString(),
      initialBalance: initialAmount,
      currentBalance: initialAmount,
      totalCashSales: 0,
      totalCardSales: 0,
    }
    await api.put('/cashbox', updated).catch(() => {})
    setCashbox(updated)
  }

  const closeCashbox = async () => {
    const updated = {
      ...cashbox,
      status: 'CLOSED',
      closedAt: new Date().toISOString(),
    }
    await api.put('/cashbox', updated).catch(() => {})
    setCashbox(updated)
  }

  return { cashbox, loading, openCashbox, closeCashbox }
}
