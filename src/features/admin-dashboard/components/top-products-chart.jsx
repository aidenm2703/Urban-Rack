export function TopProductsChart({ products = [] }) {
  return (
    <div className="dashboard-chart-card">
      <h3>Productos Más Vendidos</h3>
      <ul className="top-products-list">
        {products.map((prod, idx) => (
          <li key={prod.id || idx} className="top-product-item">
            <span className="rank-num">#{idx + 1}</span>
            <span className="product-name">{prod.name}</span>
            <span className="product-price">${prod.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
