import { api } from '@/shared/services/api-client'

export const posService = {
  createSale: (saleData) => api.post('/sales', saleData),
}
