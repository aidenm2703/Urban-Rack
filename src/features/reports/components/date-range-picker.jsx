import { Input } from '@/shared/components/ui/input'

export function DateRangePicker({ range, onChange }) {
  return (
    <div className="date-range-picker">
      <Input
        label="Desde"
        type="date"
        value={range.startDate}
        onChange={(e) => onChange({ ...range, startDate: e.target.value })}
      />
      <Input
        label="Hasta"
        type="date"
        value={range.endDate}
        onChange={(e) => onChange({ ...range, endDate: e.target.value })}
      />
    </div>
  )
}
