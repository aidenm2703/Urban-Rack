import { useState, useEffect } from 'react'
import { usersService } from '@/services/users-service'

export function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('vendedor')

  const reloadUsers = () => {
    usersService.getAll().then((list) => setUsers(list))
  }

  useEffect(() => {
    let isMounted = true
    usersService.getAll().then((list) => {
      if (isMounted) {
        setUsers(list)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const handleOpenForm = (user = null) => {
    if (user) {
      setEditingUser(user)
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    } else {
      setEditingUser({})
      setName('')
      setEmail('')
      setRole('vendedor')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (editingUser?.id) {
      await usersService.update(editingUser.id, { name, email, role })
    } else {
      await usersService.create({ name, email, role })
    }
    setEditingUser(null)
    reloadUsers()
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      await usersService.delete(id)
      reloadUsers()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Gestión de Usuarios y Roles</h1>
          <p className="text-sm text-text-muted">Administra los permisos de acceso al sistema</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenForm(null)}
          className="px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-text-inverted rounded transition-colors"
        >
          + Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando usuarios...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm text-text-main">
            <thead className="bg-surface-subtle border-b border-border text-xs uppercase font-semibold text-text-muted">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Correo Electrónico</th>
                <th className="p-3">Rol asignado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="p-3 font-semibold">{u.name}</td>
                  <td className="p-3 text-text-muted">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleOpenForm(u)}
                      className="px-2.5 py-1 text-xs font-medium bg-secondary text-text-main rounded"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(u.id)}
                      className="px-2.5 py-1 text-xs font-medium bg-danger/10 text-danger rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Usuario */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-text-main">
              {editingUser.id ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rol</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                >
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-sm bg-secondary text-text-main rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary text-text-inverted rounded font-semibold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
