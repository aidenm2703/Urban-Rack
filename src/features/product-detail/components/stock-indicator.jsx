import { Badge } from '@/shared/components/ui/badge'

export function StockIndicator({ stock = 0 }) {
  if (stock <= 0) {
    return <Badge variant="danger">Sin Stock disponible</Badge>
  }

  if (stock < 5) {
    return <Badge variant="warning">¡Apresúrate! Quedan sólo {stock} unidades</Badge>
  }

  return <Badge variant="success">En stock ({stock} disponibles)</Badge>
}
