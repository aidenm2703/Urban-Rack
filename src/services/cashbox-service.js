import { api } from './api-client'

export const cashboxService = {
  async getStatus() {
    try {
      return await api.get('/cashbox')
    } catch {
      return {
        status: 'OPEN',
        openedAt: new Date().toISOString(),
        initialBalance: 100.0,
        currentBalance: 235.0,
        totalCashSales: 135.0,
        totalCardSales: 0.0
      }
    }
  },

  async openBox(initialBalance) {
    const data = {
      status: 'OPEN',
      openedAt: new Date().toISOString(),
      initialBalance: Number(initialBalance),
      currentBalance: Number(initialBalance),
      totalCashSales: 0,
      totalCardSales: 0
    }
    try {
      return await api.put('/cashbox', data)
    } catch {
      return data
    }
  },

  async closeBox() {
    const data = {
      status: 'CLOSED',
      closedAt: new Date().toISOString()
    }
    try {
      return await api.patch('/cashbox', data)
    } catch {
      return data
    }
  }
}
