import { useState, useEffect } from 'react'
import { productsService } from '@/features/catalog/products-service'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let isMounted = true

    productsService
      .getById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data)
          if (data?.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0])
          }
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
  }, [id])

  return { product, selectedVariant, setSelectedVariant, loading, error }
}
