import { api } from './api-client'

export const salesService = {
  async getAll() {
    try {
      return await api.get('/sales')
    } catch {
      return [
        {
          id: 'sale-1',
          date: new Date().toISOString(),
          items: [{ productId: 'prod-2', quantity: 1, price: 135.0 }],
          total: 135.0,
          paymentMethod: 'Efectivo',
          sellerId: 'user-2'
        }
      ]
    }
  },

  async createSale(saleData) {
    const newSale = {
      ...saleData,
      id: `sale-${Date.now()}`,
      date: new Date().toISOString()
    }
    try {
      return await api.post('/sales', newSale)
    } catch {
      return newSale
    }
  }
}
