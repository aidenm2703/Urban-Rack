import { useState, useEffect } from 'react'
import { movementsService } from './movements-service'

export function useMovements() {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    movementsService
      .getAll()
      .then((data) => {
        if (isMounted) {
          setMovements(Array.isArray(data) ? data : [])
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

  return { movements, loading, error }
}
