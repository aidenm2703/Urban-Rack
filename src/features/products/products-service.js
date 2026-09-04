import { api } from '@/shared/services/api-client'

export const productsAdminService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  patch: (id, data) => api.patch(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  addStockEntry: async ({ productId, variantId, quantity, reason }) => {
    // Registra movimiento
    await api.post('/inventory_movements', {
      productId,
      variantId,
      quantity,
      type: 'ENTRADA',
      reason,
      date: new Date().toISOString(),
    })
  },
}
