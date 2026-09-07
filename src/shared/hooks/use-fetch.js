import { useState, useEffect } from 'react'
import { apiClient } from '../services/api-client'

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    if (endpoint) {
      apiClient(endpoint, options)
        .then((result) => {
          if (isMounted) {
            setData(result)
            setError(null)
            setLoading(false)
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message || 'Error al obtener datos')
            setLoading(false)
          }
        })
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  return { data, loading, error }
}
