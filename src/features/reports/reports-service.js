import { api } from '@/shared/services/api-client'

export const reportsService = {
  getSalesReport: (from, to) => api.get(`/sales?from=${from || ''}&to=${to || ''}`),
}
