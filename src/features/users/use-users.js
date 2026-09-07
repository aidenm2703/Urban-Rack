import { useState, useEffect } from 'react'
import { usersService } from './users-service'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    usersService
      .getAll()
      .then((data) => {
        if (isMounted) {
          setUsers(Array.isArray(data) ? data : [])
          setError(null)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

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

  return { users, loading, error, createUser, updateUser, deleteUser }
}
