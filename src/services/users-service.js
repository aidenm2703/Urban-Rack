import { api } from './api-client'

export const usersService = {
  async getAll() {
    try {
      return await api.get('/users')
    } catch {
      return [
        { id: 'user-1', name: 'Administrador', email: 'admin@urbanrack.com', role: 'admin' },
        { id: 'user-2', name: 'Vendedor 1', email: 'vendedor@urbanrack.com', role: 'vendedor' }
      ]
    }
  },

  async create(userData) {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`
    }
    try {
      return await api.post('/users', newUser)
    } catch {
      return newUser
    }
  },

  async update(id, userData) {
    try {
      return await api.put(`/users/${id}`, userData)
    } catch {
      return { id, ...userData }
    }
  },

  async delete(id) {
    try {
      return await api.delete(`/users/${id}`)
    } catch {
      return true
    }
  }
}
