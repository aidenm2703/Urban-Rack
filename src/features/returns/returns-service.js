import { api } from '@/shared/services/api-client'

export const returnsService = {
  getAll: () => api.get('/returns'),
  create: (data) => api.post('/returns', data),
}
