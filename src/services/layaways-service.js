import { api } from './api-client'

export const layawaysService = {
  async getAll() {
    try {
      return await api.get('/layaways')
    } catch {
      return [
        {
          id: 'lay-1',
          customerName: 'Juan Pérez',
          customerPhone: '+5491100001111',
          items: [{ productId: 'prod-1', quantity: 1, price: 58.0 }],
          total: 58.0,
          balance: 28.0,
          status: 'ACTIVO',
          createdAt: new Date().toISOString(),
          installments: [
            { id: 'inst-1', amount: 30.0, date: new Date().toISOString(), method: 'Efectivo' }
          ]
        }
      ]
    }
  },

  async create(layawayData) {
    const newLayaway = {
      ...layawayData,
      id: `lay-${Date.now()}`,
      status: 'ACTIVO',
      createdAt: new Date().toISOString(),
      installments: layawayData.initialPayment ? [
        {
          id: `inst-${Date.now()}`,
          amount: Number(layawayData.initialPayment),
          date: new Date().toISOString(),
          method: layawayData.paymentMethod || 'Efectivo'
        }
      ] : []
    }
    try {
      return await api.post('/layaways', newLayaway)
    } catch {
      return newLayaway
    }
  },

  async addInstallment(layawayId, amount, method = 'Efectivo') {
    const installment = {
      id: `inst-${Date.now()}`,
      amount: Number(amount),
      date: new Date().toISOString(),
      method
    }
    return installment
  },

  async cancel(id) {
    try {
      return await api.patch(`/layaways/${id}`, { status: 'CANCELADO' })
    } catch {
      return { id, status: 'CANCELADO' }
    }
  }
}
