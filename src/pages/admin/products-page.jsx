import { useState, useEffect } from 'react'
import { productsService } from '@/services/products-service'
import { ProductTable } from '@/components/admin/products/product-table'
import { ProductForm } from '@/components/admin/products/product-form'
import { StockEntryForm } from '@/components/admin/products/stock-entry-form'

export function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showStockModal, setShowStockModal] = useState(false)

  const reloadProducts = () => {
    productsService.getAll().then((list) => setProducts(list))
  }

  useEffect(() => {
    let isMounted = true
    productsService.getAll().then((list) => {
      if (isMounted) {
        setProducts(list)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const handleSaveProduct = async (productData) => {
    if (productData.id) {
      await productsService.update(productData.id, productData)
    } else {
      await productsService.create(productData)
    }
    reloadProducts()
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      await productsService.delete(id)
      reloadProducts()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Gestión de Productos</h1>
          <p className="text-sm text-text-muted">Administra el catálogo de ropa y accesorios</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setEditingProduct({})}
            className="px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-text-inverted rounded transition-colors"
          >
            + Nuevo Producto
          </button>
          <button
            type="button"
            onClick={() => setShowStockModal(true)}
            className="px-4 py-2 text-sm font-semibold bg-secondary hover:bg-secondary/80 text-text-main rounded transition-colors"
          >
            + Entrada Mercadería
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-text-muted">Cargando productos...</div>
      ) : (
        <ProductTable
          products={products}
          onEdit={(prod) => setEditingProduct(prod)}
          onDelete={handleDeleteProduct}
        />
      )}

      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {showStockModal && (
        <StockEntryForm
          products={products}
          onClose={() => setShowStockModal(false)}
          onSuccess={reloadProducts}
        />
      )}
    </div>
  )
}
