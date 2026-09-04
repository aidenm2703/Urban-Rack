import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/components/layout/navbar'
import { Footer } from '@/shared/components/layout/footer'

export function PublicLayout() {
  return (
    <div className="public-layout-root">
      <Navbar />
      <main className="public-layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
