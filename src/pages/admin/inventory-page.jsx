import { useProductsAdmin } from '@/features/products/use-products-admin'
import { VariantTable } from '@/features/products/components/variant-table'

export function InventoryPage() {
  const { products, loading } = useProductsAdmin()

  return (
    <div className="admin-inventory-page">
      <h1>Matriz de Inventario y Variantes</h1>
      <p>Control detallado de stock por talles y colores</p>
      {loading ? (
        <p>Cargando inventario...</p>
      ) : (
        <VariantTable products={products} />
      )}
    </div>
  )
}
