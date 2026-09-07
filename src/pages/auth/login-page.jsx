import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/use-auth'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export function LoginPage() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await login(username, password)
      if (user) {
        if (user.role === 'admin') navigate('/dashboard')
        else navigate('/pos')
      } else {
        setError('Credenciales incorrectas (Usa: admin / 1234 o vendedor / 1234)')
      }
    } catch {
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle p-4">
      <div className="w-full max-w-md bg-surface rounded-lg shadow-md border border-border p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-text-main mb-2">URBAN RACK</h1>
          <p className="text-text-muted">Ingresa al panel administrativo</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-md text-danger text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Usuario</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-text-muted" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-md text-text-main bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="ej: admin o vendedor"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-text-muted" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-border rounded-md text-text-main bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="1234"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-main transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text-inverted bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
