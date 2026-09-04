import { api } from '@/shared/services/api-client'

export const movementsService = {
  getAll: () => api.get('/inventory_movements'),
  create: (movement) => api.post('/inventory_movements', movement),
}
