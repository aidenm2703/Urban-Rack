import { useState, useEffect, useCallback } from 'react'
import { productsAdminService } from './products-service'

export function useProductsAdmin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await productsAdminService.getAll()
      setProducts(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

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
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
