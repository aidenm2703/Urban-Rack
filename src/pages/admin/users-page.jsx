import { useState } from 'react'
import { useUsers } from '@/features/users/use-users'
import { UsersTable } from '@/features/users/components/users-table'
import { UserForm } from '@/features/users/components/user-form'
import { Button } from '@/shared/components/ui/button'

export function UsersPage() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers()
  const [editingUser, setEditingUser] = useState(null)

  return (
    <div className="admin-users-page">
      <div className="page-header">
        <h1>Gestión de Usuarios y Roles</h1>
        <Button onClick={() => setEditingUser({})}>+ Nuevo Usuario</Button>
      </div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <UsersTable
          users={users}
          onEdit={(user) => setEditingUser(user)}
          onDelete={deleteUser}
        />
      )}

      {editingUser && (
        <UserForm
          initialData={editingUser}
          onSave={editingUser.id ? updateUser : createUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  )
}
