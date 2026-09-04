import { useState, useEffect, useCallback } from 'react'
import { usersService } from './users-service'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await usersService.getAll()
      setUsers(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const createUser = async (userData) => {
    const created = await usersService.create(userData)
    setUsers((prev) => [...prev, created])
    return created
  }

  const updateUser = async (userData) => {
    const updated = await usersService.update(userData.id, userData)
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    return updated
  }

  const deleteUser = async (id) => {
    await usersService.delete(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return { users, loading, error, refetch: fetchUsers, createUser, updateUser, deleteUser }
}
