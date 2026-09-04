import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '../services/api-client'

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiClient(endpoint, options)
      setData(result)
    } catch (err) {
      setError(err.message || 'Error al obtener datos')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    if (endpoint) {
      fetchData()
    }
  }, [fetchData, endpoint])

  return { data, loading, error, refetch: fetchData }
}
