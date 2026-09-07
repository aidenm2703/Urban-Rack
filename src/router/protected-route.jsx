import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/use-auth'

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div className="p-4 text-center">Cargando...</div>

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
