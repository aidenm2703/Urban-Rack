import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/use-auth'

export function ProtectedRoute({ redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Verificando sesión...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
