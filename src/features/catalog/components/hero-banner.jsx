import styles from './hero-banner.module.css'

export function HeroBanner({ totalProducts = 0 }) {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.badgeTag}>
          <span>●</span> Street Essentials 2026
        </div>
        <h1 className={styles.heroTitle}>
          BACK TO THE <span>STREETS</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Siluetas oversize, calzado con legado y prendas de alta densidad diseñadas para dominar el asfalto.
        </p>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{totalProducts}+</span>
            <span className={styles.statLabel}>Prendas Exclusivas</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Original Quality</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>WhatsApp</span>
            <span className={styles.statLabel}>Atención Inmediata</span>
          </div>
        </div>
      </div>
    </section>
  )
}
