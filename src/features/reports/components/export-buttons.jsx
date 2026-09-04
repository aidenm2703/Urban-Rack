import { Button } from '@/shared/components/ui/button'

export function ExportButtons({ data = [] }) {
  const exportCSV = () => {
    if (data.length === 0) {
      alert('No hay datos para exportar')
      return
    }

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map((d) => Object.values(d).join(',')).join('\n')
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `reporte_ventas_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="export-buttons-group">
      <Button variant="secondary" size="sm" onClick={exportCSV}>
        Exportar CSV / Excel
      </Button>
    </div>
  )
}
