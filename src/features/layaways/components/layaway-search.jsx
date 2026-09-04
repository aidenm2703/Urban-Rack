import { Input } from '@/shared/components/ui/input'

export function LayawaySearch({ value, onChange }) {
  return (
    <div className="layaway-search-container">
      <Input
        placeholder="Buscar apartado por nombre de cliente o teléfono..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
