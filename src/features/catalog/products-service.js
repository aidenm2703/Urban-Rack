import { api } from '@/shared/services/api-client'
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './products-data'

export const productsService = {
  getAll: (params = '') => api.get(`/products${params}`),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/categories'),
  getAll: async (params = '') => {
    try {
      const data = await api.get(`/products${params}`)
      return Array.isArray(data) && data.length > 0 ? data : INITIAL_PRODUCTS
    } catch {
      // Fallback resiliente si json-server está apagado
      let filtered = [...INITIAL_PRODUCTS]
      const urlParams = new URLSearchParams(params.replace('?', ''))
      const q = urlParams.get('q')?.toLowerCase()
      const category = urlParams.get('category')?.toLowerCase()
      const section = urlParams.get('section')?.toLowerCase()
      const featured = urlParams.get('featured')

      if (q) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.colors?.some((c) => c.toLowerCase().includes(q))
        )
      }

      if (category && category !== 'todos') {
        filtered = filtered.filter((p) => p.category.toLowerCase() === category)
      }

      if (section && section !== 'todos') {
        filtered = filtered.filter(
          (p) => p.section?.toLowerCase() === section || p.category?.toLowerCase() === section
        )
      }

      if (featured === 'true') {
        filtered = filtered.filter((p) => p.featured)
      }

      return filtered
    }
  },

  getById: async (id) => {
    try {
      return await api.get(`/products/${id}`)
    } catch {
      const found = INITIAL_PRODUCTS.find((p) => p.id === id)
      if (!found) throw new Error('Producto no encontrado')
      return found
    }
  },

  getCategories: async () => {
    try {
      const data = await api.get('/categories')
      return Array.isArray(data) && data.length > 0 ? data : INITIAL_CATEGORIES
    } catch {
      return INITIAL_CATEGORIES
    }
  },
}
