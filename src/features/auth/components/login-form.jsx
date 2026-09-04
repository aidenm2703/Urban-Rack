import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/use-auth'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Completa todos los campos')
      return
    }

    try {
      const user = await login(email, password)
      if (user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/pos')
      }
    } catch (err) {
      setError(err.message || 'Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-banner">{error}</div>}
      <Input
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ej: admin@urbanrack.com"
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />
      <Button type="submit" disabled={loading} className="btn-block">
        {loading ? 'Ingresando...' : 'Acceder'}
      </Button>
    </form>
  )
}
