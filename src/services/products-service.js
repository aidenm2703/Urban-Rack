import { api } from './api-client'

export const productsService = {
  // Obtener todos los productos
  async getAll() {
    try {
      return await api.get('/products')
    } catch {
      // Fallback a productos de demostración si la API no responde
      return [
        {
          id: 'prod-1',
          name: 'Hoodie Heavyweight Boxy Fit',
          brand: 'URBAN RACK LAB',
          price: 58.0,
          category: 'Hoodies',
          variants: [
            { id: 'var-1', size: 'M', color: 'Negro', stock: 12 },
            { id: 'var-2', size: 'L', color: 'Negro', stock: 8 }
          ]
        },
        {
          id: 'prod-2',
          name: "Sneakers Retro High 'Acid Shadow'",
          brand: 'KICKS DIVISION',
          price: 135.0,
          category: 'Sneakers',
          variants: [
            { id: 'var-5', size: '40', color: 'Negro/Rojo', stock: 6 }
          ]
        }
      ]
    }
  },

  // Obtener un producto por ID
  async getById(id) {
    return await api.get(`/products/${id}`)
  },

  // Crear un nuevo producto
  async create(productData) {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      variants: productData.variants || []
    }
    try {
      return await api.post('/products', newProduct)
    } catch {
      return newProduct
    }
  },

  // Actualizar un producto existente
  async update(id, productData) {
    try {
      return await api.put(`/products/${id}`, productData)
    } catch {
      return { id, ...productData }
    }
  },

  // Eliminar un producto
  async delete(id) {
    try {
      return await api.delete(`/products/${id}`)
    } catch {
      return true
    }
  },

  // Agregar entrada de stock (mercadería)
  async addStock(productId, variantId, quantity, reason = 'Entrada de mercadería') {
    const movement = {
      id: `mov-${Date.now()}`,
      productId,
      variantId,
      type: 'ENTRADA',
      quantity: Number(quantity),
      date: new Date().toISOString(),
      reason
    }
    try {
      await api.post('/inventory_movements', movement)
    } catch {
      // Manejo silencioso en modo demostración
    }
    return movement
  }
}
