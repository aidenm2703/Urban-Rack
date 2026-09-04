import { api } from '@/shared/services/api-client'

export const authService = {
  login: async (email, password) => {
    // Consulta a usuarios en json-server o fallback
    const users = await api.get(`/users?email=${encodeURIComponent(email)}`).catch(() => [])
    if (Array.isArray(users) && users.length > 0) {
      return users[0]
    }
    return {
      id: 'usr-default',
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'vendedor',
    }
  },
}
