import { useCurrency } from '@/shared/hooks/use-currency'

export function CurrencySelector({ className = '' }) {
  const { currencyCode, setCurrency, currencies } = useCurrency()

  const handleChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <div className={`currency-selector-wrapper ${className}`}>
      <select
        value={currencyCode}
        onChange={handleChange}
        className="currency-select"
        aria-label="Seleccionar moneda"
      >
        {Object.values(currencies).map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.flag} {curr.code} ({curr.symbol})
          </option>
        ))}
      </select>
    </div>
  )
}

