
import { useState } from 'react'

export function useNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Stock bajo en Hoodie Oversize Essential (Talle L)', time: 'Hace 10 min', read: false },
    { id: 2, message: 'Apartado #lay-1 vence en 48 horas', time: 'Hace 1 hora', read: false },
  ])

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return { notifications, markAsRead, clearAll }
}
