import { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import { useToast } from '@/shared/hooks/use-toast'

export const CartContext = createContext(null)

const CART_STORAGE_KEY = 'urban_rack_cart'
const COUPON_STORAGE_KEY = 'urban_rack_coupon'
const FREE_SHIPPING_THRESHOLD = 70.0
const STANDARD_SHIPPING_COST = 5.0

const AVAILABLE_COUPONS = {
  URBAN10: { code: 'URBAN10', discountPercent: 10, label: '10% OFF en toda la tienda' },
  STREET20: { code: 'STREET20', discountPercent: 20, label: '20% OFF Streetwear Promo' },
  BIENVENIDO: { code: 'BIENVENIDO', discountPercent: 15, label: '15% OFF de Bienvenida' },
}

export function CartProvider({ children }) {
  const { addToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn('Error saving cart to localStorage', e)
    }
  }, [items])

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon))
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY)
      }
    } catch (e) {
      console.warn('Error saving coupon to localStorage', e)
    }
  }, [coupon])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addToCart = useCallback((product, options = {}) => {
    const size = options.size || (product.sizes && product.sizes[0]) || 'Único'
    const color = options.color || (product.colors && product.colors[0]) || 'Estándar'
    const quantity = Math.max(1, options.quantity || 1)

    // Buscar stock de la variante correspondiente
    const variant = product.variants?.find(
      (v) => (v.size === size || !v.size) && (v.color === color || !v.color)
    )
    const maxStock = variant ? variant.stock : 20

    if (maxStock <= 0) {
      addToast(`El producto ${product.name} en ${size} / ${color} está agotado.`, 'warning')
      return false
    }

    const itemId = `${product.id}-${size}-${color}`

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.itemId === itemId)

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex]
        const newQty = Math.min(existing.quantity + quantity, maxStock)

        if (existing.quantity >= maxStock) {
          addToast(`Has alcanzado el límite de stock (${maxStock} unidades) para este artículo.`, 'warning')
          return prevItems
        }

        const updated = [...prevItems]
        updated[existingIndex] = { ...existing, quantity: newQty }
        return updated
      }

      return [
        ...prevItems,
        {
          itemId,
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          selectedSize: size,
          selectedColor: color,
          quantity: Math.min(quantity, maxStock),
          maxStock,
        },
      ]
    })

    addToast(`"${product.name}" (${size} / ${color}) se agregó al carrito.`, 'success', {
      title: '¡Producto Agregado!',
    })
    setIsOpen(true)
    return true
  }, [addToast])

  const removeFromCart = useCallback((itemId) => {
    setItems((prev) => {
      const item = prev.find((i) => i.itemId === itemId)
      if (item) {
        addToast(`Se eliminó "${item.name}" del carrito.`, 'info')
      }
      return prev.filter((i) => i.itemId !== itemId)
    })
  }, [addToast])

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.itemId !== itemId) return item
        const boundedQty = Math.min(newQuantity, item.maxStock)
        return { ...item, quantity: boundedQty }
      })
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
    setCoupon(null)
  }, [])

  const applyCoupon = useCallback((code) => {
    const trimmed = (code || '').trim().toUpperCase()
    const found = AVAILABLE_COUPONS[trimmed]

    if (found) {
      setCoupon(found)
      addToast(`¡Cupón "${found.code}" aplicado! Obtienes ${found.discountPercent}% de descuento.`, 'success', {
        title: 'Descuento Aplicado',
      })
      return true
    } else {
      addToast('El cupón ingresado no es válido o ha expirado.', 'error', {
        title: 'Cupón Inválido',
      })
      return false
    }
  }, [addToast])

  const removeCoupon = useCallback(() => {
    setCoupon(null)
    addToast('Cupón de descuento removido.', 'info')
  }, [addToast])

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

  const discount = useMemo(() => {
    if (!coupon) return 0
    return (subtotal * coupon.discountPercent) / 100
  }, [subtotal, coupon])

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0
  const shippingCost = isFreeShipping ? 0 : STANDARD_SHIPPING_COST
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const total = useMemo(() => {
    if (items.length === 0) return 0
    return Math.max(0, subtotal - discount + shippingCost)
  }, [items, subtotal, discount, shippingCost])

  const value = {
    items,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    totalItems,
    subtotal,
    discount,
    shippingCost,
    total,
    isFreeShipping,
    freeShippingProgress,
    remainingForFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

