import { useReports } from '@/features/reports/use-reports'
import { DateRangePicker } from '@/features/reports/components/date-range-picker'
import { ReportTable } from '@/features/reports/components/report-table'
import { ExportButtons } from '@/features/reports/components/export-buttons'

export function ReportsPage() {
  const { dateRange, setDateRange, reportsData, loading } = useReports()

  return (
    <div className="admin-reports-page">
      <div className="page-header">
        <h1>Reportes y Estadísticas</h1>
        <ExportButtons data={reportsData} />
      </div>
      <DateRangePicker range={dateRange} onChange={setDateRange} />
      {loading ? (
        <p>Generando reporte...</p>
      ) : (
        <ReportTable data={reportsData} />
      )}
    </div>
  )
}
