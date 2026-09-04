import { businessInfo } from '@/shared/data/business-info'

export function BusinessInfoSection() {
  return (
    <section className="business-info-section">
      <div className="info-card">
        <h3>📍 Nuestro Local</h3>
        <p>{businessInfo.address}</p>
        <p>Horario: {businessInfo.schedule}</p>
      </div>
      <div className="info-card">
        <h3>💬 Atención por WhatsApp</h3>
        <p>Escribinos ante cualquier duda sobre talles o stock.</p>
        <a
          href={`https://wa.me/${businessInfo.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="wa-link"
        >
          Contactar por WhatsApp
        </a>
      </div>
      <div className="info-card">
        <h3>📦 Envíos Seguros</h3>
        <p>{businessInfo.policies.shipping}</p>
      </div>
    </section>
  )
}
