import { LoginForm } from '@/features/auth/components/login-form'

export function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p>Accede al panel de administración o punto de venta</p>
        <LoginForm />
      </div>
    </div>
  )
}
