import { useContext } from 'react'
import { CurrencyContext } from '@/shared/context/currency-context'

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency debe ser utilizado dentro de un CurrencyProvider')
  }
  return context
}

