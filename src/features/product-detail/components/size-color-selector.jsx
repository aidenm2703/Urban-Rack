export function SizeColorSelector({ variants = [], selectedVariant, onSelect }) {
  return (
    <div className="size-color-selector">
      <h4>Seleccionar Variante (Talle / Color)</h4>
      <div className="variants-list">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`variant-option-btn ${selectedVariant?.id === v.id ? 'active' : ''}`}
            onClick={() => onSelect(v)}
          >
            <span className="variant-tag">{v.size} - {v.color}</span>
            <span className="variant-stock">({v.stock} disp.)</span>
          </button>
        ))}
      </div>
    </div>
  )
}
