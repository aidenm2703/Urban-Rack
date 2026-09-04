import { businessInfo } from '@/shared/data/business-info'

export function WhatsappOrderButton({ product, variant }) {
  if (!product) return null

  const variantText = variant ? ` (Talle: ${variant.size}, Color: ${variant.color})` : ''
  const message = encodeURIComponent(
    `¡Hola! Estoy interesado en comprar: ${product.name}${variantText} por $${product.price}. ¿Tienen stock disponible para entrega?`
  )
  const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="btn btn-whatsapp"
    >
      📱 Pedir por WhatsApp
    </a>
  )
}
