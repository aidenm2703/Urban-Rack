import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/auth-provider'
import { AppRouter } from '@/router/app-router'
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
