import { ProfileForm } from '@/features/profile/components/profile-form'

export function ProfilePage() {
  return (
    <div className="admin-profile-page">
      <h1>Mi Perfil</h1>
      <p>Actualiza tus datos personales y credenciales de acceso</p>
      <ProfileForm />
    </div>
  )
}
