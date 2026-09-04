import { api } from '@/shared/services/api-client'

export const layawaysService = {
  getAll: () => api.get('/layaways'),
  getById: (id) => api.get(`/layaways/${id}`),
  create: (data) => api.post('/layaways', data),
  update: (id, data) => api.put(`/layaways/${id}`, data),
  patch: (id, data) => api.patch(`/layaways/${id}`, data),
}
