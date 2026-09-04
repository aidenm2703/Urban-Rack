import { businessInfo } from '@/shared/data/business-info'

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-section">
          <h3>{businessInfo.name}</h3>
          <p>{businessInfo.slogan}</p>
          <p>{businessInfo.address}</p>
        </div>
        <div className="footer-section">
          <h4>Atención al Cliente</h4>
          <p>Horarios: {businessInfo.schedule}</p>
          <p>WhatsApp: {businessInfo.phone}</p>
        </div>
        <div className="footer-section">
          <h4>Políticas</h4>
          <p>{businessInfo.policies.returns}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {businessInfo.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
