import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/use-auth'

export function RoleGuard({ allowedRoles = [], fallbackTo = '/dashboard' }) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to={fallbackTo} replace />
  }

  return <Outlet />
}
