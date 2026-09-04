import { Button } from '@/shared/components/ui/button'

export function Cart({ items = [], onUpdateQuantity, onRemove }) {
  return (
    <div className="pos-cart">
      <h3>Carrito de Venta</h3>
      {items.length === 0 ? (
        <p className="empty-cart">No hay artículos agregados</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span>${item.price} c/u</span>
              </div>
              <div className="cart-item-actions">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <Button size="sm" variant="danger" onClick={() => onRemove(item.id)}>
                  &times;
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
