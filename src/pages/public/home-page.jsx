import { HeroBanner } from '@/features/home/components/hero-banner'
import { CategoryShortcuts } from '@/features/home/components/category-shortcuts'
import { NewArrivals } from '@/features/home/components/new-arrivals'
import { BusinessInfoSection } from '@/features/home/components/business-info-section'
import { PaymentMethods } from '@/features/home/components/payment-methods'

export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <CategoryShortcuts />
      <NewArrivals />
      <BusinessInfoSection />
      <PaymentMethods />
    </div>
  )
}
