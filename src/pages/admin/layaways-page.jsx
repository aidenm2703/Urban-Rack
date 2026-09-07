import { useState, useEffect } from 'react'
import { layawaysService } from '@/services/layaways-service'

export function LayawaysPage() {
  const [layaways, setLayaways] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedLayaway, setSelectedLayaway] = useState(null)
  const [abonoAmount, setAbonoAmount] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const [newTotal, setNewTotal] = useState('')
  const [newInitialPayment, setNewInitialPayment] = useState('')

  const reloadLayaways = () => {
    layawaysService.getAll().then((list) => setLayaways(list))
  }

  useEffect(() => {
    let isMounted = true
    layawaysService.getAll().then((list) => {
      if (isMounted) {
        setLayaways(list)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const filteredLayaways = layaways.filter(
    (item) =>
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerPhone?.includes(searchTerm)
  )

  const handleAddAbono = async (e) => {
    e.preventDefault()
    if (!selectedLayaway || !abonoAmount) return

    await layawaysService.addInstallment(selectedLayaway.id, abonoAmount)
    alert(`Abono de $${abonoAmount} registrado con éxito`)
    setAbonoAmount('')
    setSelectedLayaway(null)
    reloadLayaways()
  }

  const handleCreateLayaway = async (e) => {
    e.preventDefault()
    const totalVal = Number(newTotal)
    const initialVal = Number(newInitialPayment)
    await layawaysService.create({
      customerName: newCustomerName,
      customerPhone: newCustomerPhone,
      total: totalVal,
      balance: totalVal - initialVal,
      initialPayment: initialVal
    })
    alert('Nuevo apartado creado con éxito')
    setShowNewModal(false)
    setNewCustomerName('')
    setNewCustomerPhone('')
    setNewTotal('')
    setNewInitialPayment('')
    reloadLayaways()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Gestión de Apartados</h1>
          <p className="text-sm text-text-muted">Control de reservas y pagos en cuotas de clientes</p>
        </div>
        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-text-inverted rounded transition-colors"
        >
          + Nuevo Apartado
        </button>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-border">
        <input
          type="text"
          placeholder="Buscar por cliente o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2.5 border border-border rounded text-sm bg-surface"
        />
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando apartados...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm text-text-main">
            <thead className="bg-surface-subtle border-b border-border text-xs uppercase font-semibold text-text-muted">
              <tr>
                <th className="p-3">Cliente</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Total</th>
                <th className="p-3">Saldo Pendiente</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLayaways.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-text-muted">
                    No se encontraron apartados
                  </td>
                </tr>
              ) : (
                filteredLayaways.map((layaway) => (
                  <tr key={layaway.id} className="hover:bg-surface-subtle/50 transition-colors">
                    <td className="p-3 font-semibold">{layaway.customerName}</td>
                    <td className="p-3 text-text-muted">{layaway.customerPhone}</td>
                    <td className="p-3 font-bold">${layaway.total}</td>
                    <td className="p-3 font-bold text-amber-600">${layaway.balance}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                        {layaway.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLayaway(layaway)}
                        className="px-3 py-1 bg-secondary text-text-main text-xs rounded hover:bg-secondary/80"
                      >
                        Ver / Abonar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Registrar Abono */}
      {selectedLayaway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-text-main">
              Abonar a Apartado: {selectedLayaway.customerName}
            </h2>
            <p className="text-sm text-text-muted">
              Saldo Pendiente Actual: <strong className="text-amber-600">${selectedLayaway.balance}</strong>
            </p>
            <form onSubmit={handleAddAbono} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Monto a Abonar ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max={selectedLayaway.balance}
                  value={abonoAmount}
                  onChange={(e) => setAbonoAmount(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedLayaway(null)}
                  className="px-4 py-2 text-sm bg-secondary text-text-main rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary text-text-inverted rounded font-semibold"
                >
                  Registrar Abono
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nuevo Apartado */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-text-main">Nuevo Apartado</h2>
            <form onSubmit={handleCreateLayaway} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre Cliente</label>
                <input
                  type="text"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="text"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  className="w-full p-2 border border-border rounded text-sm bg-surface"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monto Total ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTotal}
                    onChange={(e) => setNewTotal(e.target.value)}
                    className="w-full p-2 border border-border rounded text-sm bg-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pago Inicial ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInitialPayment}
                    onChange={(e) => setNewInitialPayment(e.target.value)}
                    className="w-full p-2 border border-border rounded text-sm bg-surface"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-sm bg-secondary text-text-main rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary text-text-inverted rounded font-semibold"
                >
                  Crear Apartado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
