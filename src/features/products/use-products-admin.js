import { useState, useEffect } from 'react'
import { productsAdminService } from './products-service'

export function useProductsAdmin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    productsAdminService
      .getAll()
      .then((data) => {
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : [])
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

  const createProduct = async (productData) => {
    const created = await productsAdminService.create(productData)
    setProducts((prev) => [...prev, created])
    return created
  }

  const updateProduct = async (productData) => {
    const updated = await productsAdminService.update(productData.id, productData)
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    return updated
  }

  const deleteProduct = async (id) => {
    await productsAdminService.delete(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
