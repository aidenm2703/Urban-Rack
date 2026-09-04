import { api } from '@/shared/services/api-client'

export const productsService = {
  getAll: (params = '') => api.get(`/products${params}`),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/categories'),
}
