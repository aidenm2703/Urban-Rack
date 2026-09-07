import { useState, useEffect, useMemo } from 'react'
import { productsService } from './products-service'
import { useDebounce } from '@/shared/hooks/use-debounce'

const INITIAL_FILTERS = {
  category: '',
  size: '',
  color: '',
  onlyInStock: false,
  sortBy: 'featured',
}

export function useProducts() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const debouncedSearch = useDebounce(searchTerm, 250)

  useEffect(() => {
    let isMounted = true

    productsService
      .getAll()
      .then((data) => {
        if (isMounted) {
          setAllProducts(Array.isArray(data) ? data : [])
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

  // Filtrado y Ordenamiento Reactivo
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        if (debouncedSearch) {
          const term = debouncedSearch.toLowerCase()
          const matchName = product.name?.toLowerCase().includes(term)
          const matchCategory = product.category?.toLowerCase().includes(term)
          const matchBrand = product.brand?.toLowerCase().includes(term)
          if (!matchName && !matchCategory && !matchBrand) return false
        }

        if (filters.category && product.category?.toLowerCase() !== filters.category.toLowerCase()) {
          return false
        }

        if (filters.size) {
          const hasSize = product.variants?.some(
            (v) => v.size?.toLowerCase() === filters.size.toLowerCase() && (v.stock || 0) > 0
          )
          if (!hasSize) return false
        }

        if (filters.color) {
          const hasColor = product.variants?.some(
            (v) => v.color?.toLowerCase().includes(filters.color.toLowerCase())
          )
          if (!hasColor) return false
        }

        if (filters.onlyInStock) {
          const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0
          if (totalStock <= 0) return false
        }

        return true
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price
        if (filters.sortBy === 'price-high') return b.price - a.price
        if (filters.sortBy === 'name') return a.name.localeCompare(b.name)
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      })
  }, [allProducts, debouncedSearch, filters])

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS)
    setSearchTerm('')
  }

  return {
    products: filteredProducts,
    totalProductsCount: allProducts.length,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearFilters,
  }
}
