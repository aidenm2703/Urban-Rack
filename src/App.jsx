import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/shared/context/auth-context'
import { CurrencyProvider } from '@/shared/context/currency-context'
import { ToastProvider } from '@/shared/context/toast-context'
import { CartProvider } from '@/shared/context/cart-context'
import { AppRouter } from '@/shared/routing/app-router'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <AppRouter />
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
