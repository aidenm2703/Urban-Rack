export function Input({
  label,
  error,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder = '',
  className = '',
  ...props
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id || name} className="input-label">{label}</label>}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-control ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  )
}
