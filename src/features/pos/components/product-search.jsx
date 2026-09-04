import { useState } from 'react'
import { Input } from '@/shared/components/ui/input'
import { useFetch } from '@/shared/hooks/use-fetch'

export function ProductSearch({ onSelectProduct }) {
  const [query, setQuery] = useState('')
  const { data: products } = useFetch('/products')

  const filtered = (products || []).filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="pos-search-box">
      <Input
        placeholder="Escanear código de barras o escribir producto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="pos-search-results">
          {filtered.map((prod) => (
            <li
              key={prod.id}
              onClick={() => {
                onSelectProduct(prod)
                setQuery('')
              }}
            >
              <span>{prod.name}</span>
              <strong>${prod.price}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
