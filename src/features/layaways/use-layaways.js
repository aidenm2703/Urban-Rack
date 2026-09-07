import { useState, useEffect } from 'react'
import { layawaysService } from './layaways-service'

export function useLayaways() {
  const [layaways, setLayaways] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    layawaysService
      .getAll()
      .then((data) => {
        if (isMounted) {
          setLayaways(Array.isArray(data) ? data : [])
          setError(null)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  const addInstallment = async (layawayId, amount, method = 'Efectivo') => {
    const layaway = layaways.find((l) => l.id === layawayId)
    if (!layaway) return

    const newBalance = Math.max(0, layaway.balance - amount)
    const newStatus = newBalance === 0 ? 'LIQUIDADO' : 'ACTIVO'
    const newInstallment = {
      id: `inst-${Date.now()}`,
      amount,
      date: new Date().toISOString(),
      method,
    }

    const updated = await layawaysService.patch(layawayId, {
      balance: newBalance,
      status: newStatus,
      installments: [...(layaway.installments || []), newInstallment],
    })

    setLayaways((prev) => prev.map((l) => (l.id === layawayId ? updated : l)))
    return updated
  }

  const settleLayaway = async (layawayId) => {
    const updated = await layawaysService.patch(layawayId, {
      status: 'LIQUIDADO',
      balance: 0,
    })
    setLayaways((prev) => prev.map((l) => (l.id === layawayId ? updated : l)))
  }

  const cancelLayaway = async (layawayId) => {
    const updated = await layawaysService.patch(layawayId, {
      status: 'CANCELADO',
    })
    setLayaways((prev) => prev.map((l) => (l.id === layawayId ? updated : l)))
  }

  return {
    layaways,
    loading,
    error,
    addInstallment,
    settleLayaway,
    cancelLayaway,
  }
}
