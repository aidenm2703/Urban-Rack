import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar'
import { Footer } from './footer'

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
