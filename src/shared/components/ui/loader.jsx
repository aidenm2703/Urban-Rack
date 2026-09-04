export function Loader({ text = 'Cargando...', size = 'md', className = '' }) {
  return (
    <div className={`loader-container loader-${size} ${className}`}>
      <div className="loader-spinner"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  )
}
