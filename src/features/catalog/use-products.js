import { useState, useEffect } from 'react'
import { productsService } from './products-service'
import { useDebounce } from '@/shared/hooks/use-debounce'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const query = debouncedSearch ? `?q=${encodeURIComponent(debouncedSearch)}` : ''
    productsService
      .getAll(query)
      .then((data) => {
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : [])
          setError(null)
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [debouncedSearch])

  return {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
  }
}
