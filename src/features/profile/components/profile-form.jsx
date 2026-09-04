import { useState } from 'react'
import { useAuth } from '@/shared/hooks/use-auth'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

export function ProfileForm() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')

  const handleUpdate = (e) => {
    e.preventDefault()
    alert('Perfil actualizado con éxito')
  }

  return (
    <form onSubmit={handleUpdate} className="profile-form">
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Nueva Contraseña (Opcional)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      <Button type="submit">Actualizar Perfil</Button>
    </form>
  )
}
