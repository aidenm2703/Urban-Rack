import { useState } from 'react'
import { useLayaways } from '@/features/layaways/use-layaways'
import { LayawaySearch } from '@/features/layaways/components/layaway-search'
import { LayawayTable } from '@/features/layaways/components/layaway-table'
import { LayawayForm } from '@/features/layaways/components/layaway-form'
import { InstallmentsHistory } from '@/features/layaways/components/installments-history'
import { LayawayActions } from '@/features/layaways/components/layaway-actions'
import { Button } from '@/shared/components/ui/button'

export function LayawaysPage() {
  const { layaways, loading, addInstallment, cancelLayaway, settleLayaway } = useLayaways()
  const [selectedLayaway, setSelectedLayaway] = useState(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className="admin-layaways-page">
      <div className="page-header">
        <h1>Gestión de Apartados</h1>
        <Button onClick={() => setShowNewModal(true)}>+ Nuevo Apartado</Button>
      </div>

      <LayawaySearch value={search} onChange={setSearch} />

      {loading ? (
        <p>Cargando apartados...</p>
      ) : (
        <LayawayTable
          layaways={layaways}
          onSelect={(layaway) => setSelectedLayaway(layaway)}
        />
      )}

      {selectedLayaway && (
        <div className="layaway-detail-modal">
          <InstallmentsHistory layaway={selectedLayaway} onAddAbono={addInstallment} />
          <LayawayActions
            layaway={selectedLayaway}
            onSettle={() => settleLayaway(selectedLayaway.id)}
            onCancel={() => cancelLayaway(selectedLayaway.id)}
            onClose={() => setSelectedLayaway(null)}
          />
        </div>
      )}

      {showNewModal && (
        <LayawayForm onClose={() => setShowNewModal(false)} />
      )}
    </div>
  )
}
