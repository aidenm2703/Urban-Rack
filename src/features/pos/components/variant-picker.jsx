import { Button } from '@/shared/components/ui/button'

export function VariantPicker({ product, onAddVariant }) {
  if (!product || !product.variants) return null

  return (
    <div className="pos-variant-picker">
      <h4>Seleccionar Variante de {product.name}</h4>
      <div className="variant-buttons">
        {product.variants.map((v) => (
          <Button
            key={v.id}
            size="sm"
            variant="secondary"
            disabled={v.stock <= 0}
            onClick={() =>
              onAddVariant({
                id: `${product.id}-${v.id}`,
                productId: product.id,
                variantId: v.id,
                name: `${product.name} (${v.size} - ${v.color})`,
                price: product.price,
                stock: v.stock,
              })
            }
          >
            {v.size} - {v.color} ({v.stock} disp.)
          </Button>
        ))}
      </div>
    </div>
  )
}
