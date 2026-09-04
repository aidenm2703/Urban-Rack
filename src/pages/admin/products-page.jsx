import { useState } from 'react'
import { useProductsAdmin } from '@/features/products/use-products-admin'
import { ProductTable } from '@/features/products/components/product-table'
import { ProductForm } from '@/features/products/components/product-form'
import { StockEntryForm } from '@/features/products/components/stock-entry-form'
import { Button } from '@/shared/components/ui/button'

export function ProductsPage() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProductsAdmin()
  const [editingProduct, setEditingProduct] = useState(null)
  const [showStockModal, setShowStockModal] = useState(false)

  return (
    <div className="admin-products-page">
      <div className="page-header">
        <h1>Gestión de Productos</h1>
        <div className="page-actions">
          <Button onClick={() => setEditingProduct({})}>+ Nuevo Producto</Button>
          <Button variant="secondary" onClick={() => setShowStockModal(true)}>
            + Entrada Mercadería
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={(prod) => setEditingProduct(prod)}
          onDelete={deleteProduct}
        />
      )}

      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSave={editingProduct.id ? updateProduct : createProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {showStockModal && (
        <StockEntryForm onClose={() => setShowStockModal(false)} />
      )}
    </div>
  )
}
