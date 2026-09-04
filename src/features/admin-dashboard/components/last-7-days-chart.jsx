export function Last7DaysChart({ data = [] }) {
  const maxSales = Math.max(...data.map((d) => d.sales), 1)

  return (
    <div className="dashboard-chart-card">
      <h3>Ventas de los Últimos 7 Días</h3>
      <div className="bar-chart-container">
        {data.map((item) => {
          const heightPct = Math.round((item.sales / maxSales) * 100)
          return (
            <div key={item.day} className="bar-col">
              <div className="bar-wrapper">
                <div
                  className="bar-fill"
                  style={{ height: `${heightPct}%` }}
                  title={`$${item.sales}`}
                ></div>
              </div>
              <span className="bar-label">{item.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
