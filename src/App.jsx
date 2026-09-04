import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/shared/context/auth-context'
import { AppRouter } from '@/shared/routing/app-router'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}
