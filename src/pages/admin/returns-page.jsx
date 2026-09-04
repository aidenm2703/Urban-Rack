import { ReturnExchangeForm } from '@/features/returns/components/return-exchange-form'

export function ReturnsPage() {
  return (
    <div className="admin-returns-page">
      <h1>Devoluciones y Cambios</h1>
      <p>Gestión de notas de crédito y cambio de prendas con reintegro al stock</p>
      <ReturnExchangeForm />
    </div>
  )
}
