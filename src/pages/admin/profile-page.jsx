import { useState } from 'react'
import { useAuth } from '@/context/use-auth'

export function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || 'Administrador')
  const [email, setEmail] = useState(user?.email || 'admin@urbanrack.com')
  const [password, setPassword] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Mi Perfil</h1>
        <p className="text-sm text-text-muted">Actualiza tus datos personales y credenciales de acceso</p>
      </div>

      <div className="bg-surface p-6 rounded-lg border border-border max-w-xl space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-sm text-center">
            ✔ Datos de perfil actualizados con éxito
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rol en el Sistema</label>
            <input
              type="text"
              value={user?.role?.toUpperCase() || 'ADMINISTRADOR'}
              disabled
              className="w-full p-2 border border-border rounded text-sm bg-surface-subtle text-text-muted cursor-not-allowed font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nueva Contraseña (Opcional)</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-border rounded text-sm bg-surface"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-inverted font-bold rounded transition-colors"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  )
}
