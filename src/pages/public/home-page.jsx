import {
  HeroBanner,
  CategoryShortcuts,
  NewArrivals,
  BusinessInfoSection,
  PaymentMethods,
} from '@/features/home'
import styles from './home-page.module.css'

export function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <HeroBanner />
      <CategoryShortcuts />
      <NewArrivals />
      <BusinessInfoSection />
      <PaymentMethods />
    </div>
  )
}
