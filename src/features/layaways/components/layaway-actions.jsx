import { Button } from '@/shared/components/ui/button'

export function LayawayActions({ layaway, onSettle, onCancel, onClose }) {
  return (
    <div className="layaway-actions-bar">
      {layaway.status === 'ACTIVO' && (
        <>
          <Button variant="success" size="sm" onClick={onSettle}>
            Liquidar Totalmente
          </Button>
          <Button variant="danger" size="sm" onClick={onCancel}>
            Cancelar Apartado
          </Button>
        </>
      )}
      <Button variant="secondary" size="sm" onClick={onClose}>
        Cerrar
      </Button>
    </div>
  )
}
