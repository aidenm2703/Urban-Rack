export function SalesByPaymentChart({ data = [] }) {
  return (
    <div className="dashboard-chart-card">
      <h3>Ventas por Método de Pago</h3>
      <div className="chart-list">
        {data.map((item) => (
          <div key={item.method} className="chart-item-row">
            <span className="chart-label">{item.method}</span>
            <div className="chart-bar-container">
              <div
                className="chart-bar-fill"
                style={{ width: `${item.count}%` }}
              ></div>
            </div>
            <span className="chart-value">{item.count}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
