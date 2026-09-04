import { createContext, useState, useEffect, useMemo } from 'react'

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)', flag: '🇺🇸', name: 'Dólar USA' },
  CRC: { code: 'CRC', symbol: '₡', rate: 515.0, label: 'CRC (₡)', flag: '🇨🇷', name: 'Colón CR' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)', flag: '🇪🇺', name: 'Euro' },
  ARS: { code: 'ARS', symbol: '$', rate: 1050.0, label: 'ARS ($)', flag: '🇦🇷', name: 'Peso Arg' },
  MXN: { code: 'MXN', symbol: '$', rate: 18.5, label: 'MXN ($)', flag: '🇲🇽', name: 'Peso Mex' },
}

const STORAGE_KEY = 'urban_rack_currency'

export const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved && CURRENCIES[saved] ? saved : 'USD'
    } catch {
      return 'USD'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currencyCode)
    } catch (e) {
      console.warn('Error saving currency to localStorage', e)
    }
  }, [currencyCode])

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD

  const formatPrice = useMemo(() => {
    return (amountInUSD) => {
      if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) return `${currency.symbol}0`
      const converted = amountInUSD * currency.rate
      
      // Monedas de gran denominación como CRC y ARS se redondean sin centavos para mejor estética
      if (currency.code === 'CRC' || currency.code === 'ARS') {
        return `${currency.symbol} ${Math.round(converted).toLocaleString('es-CR')}`
      }
      return `${currency.symbol}${converted.toFixed(2)}`
    }
  }, [currency])

  const convertPrice = useMemo(() => {
    return (amountInUSD) => {
      if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) return 0
      return Number((amountInUSD * currency.rate).toFixed(2))
    }
  }, [currency])

  const value = {
    currencyCode,
    currency,
    currencies: CURRENCIES,
    setCurrency: setCurrencyCode,
    formatPrice,
    convertPrice,
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

