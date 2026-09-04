import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'

export function UsersTable({ users = [], onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No hay usuarios registrados</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>
                </td>
                <td>{u.email}</td>
                <td>
                  <Badge variant={u.role === 'admin' ? 'success' : 'default'}>
                    {u.role}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" variant="secondary" onClick={() => onEdit(u)}>
                    Editar
                  </Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => onDelete(u.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
