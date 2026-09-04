import { Link } from 'react-router-dom'
import { Badge } from '@/shared/components/ui/badge'

export function ProductCard({ product }) {
  const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image || '/assets/hero.png'}
          alt={product.name}
          className="product-card-img"
        />
        {totalStock <= 0 ? (
          <Badge variant="danger" className="stock-badge">Agotado</Badge>
        ) : totalStock < 5 ? (
          <Badge variant="warning" className="stock-badge">¡Últimas unidades!</Badge>
        ) : null}
      </div>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <Link to={`/producto/${product.id}`} className="btn btn-outline btn-sm">
          Ver Detalle
        </Link>
      </div>
    </div>
  )
}
