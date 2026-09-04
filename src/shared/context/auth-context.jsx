import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

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

  const login = async (email, _password) => {
    setLoading(true)
    try {
      const mockUser = {
        id: 'usr-1',
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'vendedor',
      }
      setUser(mockUser)
      return mockUser
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
