import styles from './filters.module.css'
import { SearchBar } from './search-bar'

const ALL_CATEGORIES = ['Todos', 'Sneakers', 'Hoodies', 'Oversize', 'Cargos', 'Jackets', 'Accesorios']
const ALL_SIZES = ['S', 'M', 'L', 'XL', '40', '41', '42', '43']
const ALL_COLORS = [
  { name: 'Negro', hex: '#111827' },
  { name: 'Blanco', hex: '#ffffff', border: true },
  { name: 'Gris', hex: '#9ca3af' },
  { name: 'Rojo', hex: '#ea1919' },
  { name: 'Verde Militar', hex: '#4b5320' },
  { name: 'Beige', hex: '#d4b996' },
]

export function Filters({
  filters,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
}) {
  const { category, size, color, onlyInStock } = filters

  return (
    <aside className={styles.filtersWrapper}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>Filtrar Prendas</h3>
        {(category || size || color || onlyInStock || searchTerm) && (
          <button type="button" onClick={onClearFilters} className={styles.clearBtn}>
            Limpiar Todo
          </button>
        )}
      </div>

      {/* Búsqueda Reactiva */}
      <div className={styles.filterGroup}>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
      </div>

      {/* Categorías */}
      <div className={styles.filterGroup}>
        <h4 className={styles.groupTitle}>Categorías</h4>
        <div className={styles.categoryList}>
          {ALL_CATEGORIES.map((cat) => {
            const isAll = cat === 'Todos'
            const isActive = isAll ? !category : category === cat
            return (
              <button
                key={cat}
                type="button"
                className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                onClick={() => onFilterChange({ ...filters, category: isAll ? '' : cat })}
              >
                <span>{cat}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Talles (Grid estilo Foot Locker) */}
      <div className={styles.filterGroup}>
        <h4 className={styles.groupTitle}>Talle / Numeración</h4>
        <div className={styles.sizeGrid}>
          {ALL_SIZES.map((s) => {
            const isActive = size === s
            return (
              <button
                key={s}
                type="button"
                className={`${styles.sizeBox} ${isActive ? styles.sizeBoxActive : ''}`}
                onClick={() => onFilterChange({ ...filters, size: isActive ? '' : s })}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* Colores */}
      <div className={styles.filterGroup}>
        <h4 className={styles.groupTitle}>Colores</h4>
        <div className={styles.colorList}>
          {ALL_COLORS.map((c) => {
            const isActive = color === c.name
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                className={`${styles.colorCircle} ${isActive ? styles.colorCircleActive : ''}`}
                style={{
                  backgroundColor: c.hex,
                  borderColor: c.border ? '#cbd5e1' : 'transparent',
                }}
                onClick={() => onFilterChange({ ...filters, color: isActive ? '' : c.name })}
              />
            )
          })}
        </div>
      </div>

      {/* Toggle Solo en Stock */}
      <label className={styles.toggleRow}>
        <span className={styles.toggleLabel}>Solo stock disponible</span>
        <div className={styles.switch}>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => onFilterChange({ ...filters, onlyInStock: e.target.checked })}
          />
          <span className={styles.slider}></span>
        </div>
      </label>
    </aside>
  )
}
