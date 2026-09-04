import { useState } from 'react'

export function Filters({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    onFilterChange?.({ category: cat, size: selectedSize })
  }

  return (
    <div className="catalog-filters">
      <h3>Filtros</h3>
      <div className="filter-group">
        <h4>Categoría</h4>
        {['Todos', 'Buzos', 'Remeras', 'Pantalones', 'Accesorios'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat === 'Todos' ? '' : cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="filter-group">
        <h4>Talle</h4>
        {['S', 'M', 'L', 'XL'].map((size) => (
          <button
            key={size}
            type="button"
            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
            onClick={() => {
              const newSize = selectedSize === size ? '' : size
              setSelectedSize(newSize)
              onFilterChange?.({ category: selectedCategory, size: newSize })
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
