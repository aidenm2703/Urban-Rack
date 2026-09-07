import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/use-auth'

export function RoleGuard({ allowedRoles = [] }) {
  const { role } = useAuth()

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/pos" replace />
  }

  return <Outlet />
}
