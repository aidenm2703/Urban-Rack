import { Button } from '@/shared/components/ui/button'

export function SaleSummary({ total = 0, onCompleteSale }) {
  const handleCheckout = () => {
    if (total <= 0) return
    alert(`¡Venta realizada con éxito! Total cobrado: $${total}`)
    onCompleteSale?.()
  }

  return (
    <div className="sale-summary">
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>${total}</span>
      </div>
      <div className="summary-row total-row">
        <strong>Total a Pagar:</strong>
        <strong>${total}</strong>
      </div>
      <Button
        disabled={total <= 0}
        onClick={handleCheckout}
        className="btn-block btn-lg"
      >
        Completar Venta e Imprimir Ticket
      </Button>
    </div>
  )
}
