import { useState, useEffect } from 'react'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('urban_rack_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem('urban_rack_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('urban_rack_user')
    }
  }, [user])

  const login = async (username, password) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      
      if (username === 'admin' && password === '1234') {
        const mockUser = {
          id: 'usr-1',
          name: 'Administrador',
          email: 'admin@urbanrack.com',
          role: 'admin',
        }
        setUser(mockUser)
        return mockUser
      } else if (username === 'vendedor' && password === '1234') {
        const mockUser = {
          id: 'usr-2',
          name: 'Vendedor',
          email: 'vendedor@urbanrack.com',
          role: 'vendedor',
        }
        setUser(mockUser)
        return mockUser
      }
      return null
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('urban_rack_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
