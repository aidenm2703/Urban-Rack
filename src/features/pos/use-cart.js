import { useState } from 'react'

export function useCart() {
  const [cartItems, setCartItems] = useState([])

  const addItem = (productOrVariant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productOrVariant.id)
      if (existing) {
        return prev.map((item) =>
          item.id === productOrVariant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...productOrVariant, quantity: 1 }]
    })
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setCartItems([])

  const total = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  )

  return { cartItems, addItem, removeItem, updateQuantity, clearCart, total }
}
