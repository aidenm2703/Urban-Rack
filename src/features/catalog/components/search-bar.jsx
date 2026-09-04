import { Input } from '@/shared/components/ui/input'

export function SearchBar({ value, onChange, placeholder = 'Buscar por nombre, talle o color...' }) {
  return (
    <div className="catalog-search-bar">
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
