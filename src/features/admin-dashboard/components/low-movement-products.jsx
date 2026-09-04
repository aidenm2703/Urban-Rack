export function LowMovementProducts({ products = [] }) {
  return (
    <div className="dashboard-chart-card">
      <h3>Productos de Bajo Movimiento</h3>
      <p className="chart-sub">Sugerencia: Aplicar liquidación o promociones especiales</p>
      <ul className="low-movement-list">
        {products.map((prod) => (
          <li key={prod.id} className="low-movement-item">
            <span className="product-name">{prod.name}</span>
            <span className="product-category">({prod.category})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
