import { createContext, useState, useCallback } from 'react'

export const ToastContext = createContext(null)

const TOAST_ICONS = {
  success: '✓',
  error: '✕',
  warning: '⚠️',
  info: 'ℹ️',
}

function ToastItem({ toast, onDismiss }) {
  const icon = TOAST_ICONS[toast.type] || '•'

  return (
    <div className={`toast-item toast-${toast.type}`} role="alert">
      <div className="toast-icon-wrapper">{icon}</div>
      <div className="toast-content">
        {toast.title && <strong className="toast-title">{toast.title}</strong>}
        <p className="toast-message">{toast.message}</p>
      </div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={() => onDismiss(toast.id)}
        aria-label="Cerrar notificación"
      >
        &times;
      </button>
    </div>
  )
}

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message, type = 'success', options = {}) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7)
    const duration = options.duration ?? 3500
    const newToast = {
      id,
      message,
      type,
      title: options.title || null,
    }

    setToasts((prev) => [...prev, newToast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

