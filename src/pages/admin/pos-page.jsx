import { useState, useEffect } from 'react'
import { productsService } from '@/services/products-service'
import { salesService } from '@/services/sales-service'

export function PosPage() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Efectivo')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await productsService.getAll()
      setProducts(data)
    }
    load()
  }, [])

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setProcessing(true)
    await salesService.createSale({
      items: cart,
      total,
      paymentMethod
    })
    alert(`¡Venta completada con éxito por $${total.toFixed(2)} (${paymentMethod})!`)
    setCart([])
    setProcessing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Punto de Venta (POS)</h1>
        <p className="text-sm text-text-muted">Registro rápido de ventas en mostrador</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catálogo de Selección */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Buscar producto para agregar al carrito..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 border border-border rounded text-sm bg-surface"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-surface p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-text-main">{p.name}</h4>
                  <span className="text-xs text-text-muted">{p.category}</span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold text-primary">${p.price}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                    + Agregar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del Carrito y Cobro */}
        <div className="bg-surface p-5 rounded-lg border border-border flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-bold text-text-main mb-4">Orden Actual</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-8">
                El carrito está vacío. Haz clic en un producto para agregarlo.
              </p>
            ) : (
              <div className="divide-y divide-border space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold text-text-main">{item.name}</p>
                      <p className="text-xs text-text-muted">${item.price} c/u</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-secondary text-text-main font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-secondary text-text-main font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="block text-xs font-semibold uppercase text-text-muted mb-2">
                Método de Pago
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Efectivo', 'Tarjeta', 'Transferencia'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                      paymentMethod === m
                        ? 'bg-primary text-text-inverted border-primary'
                        : 'bg-surface-subtle border-border text-text-main'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xl font-bold pt-2">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              disabled={cart.length === 0 || processing}
              onClick={handleCheckout}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-text-inverted font-bold rounded shadow transition-colors disabled:opacity-50"
            >
              {processing ? 'Procesando Venta...' : 'Completar y Cobrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
