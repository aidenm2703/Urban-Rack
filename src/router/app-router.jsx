import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/public-layout'
import { AdminLayout } from '@/components/layout/admin-layout'
import { ProtectedRoute } from './protected-route'
import { RoleGuard } from './role-guard'

// Páginas Públicas y Auth
import { HomePage } from '@/pages/public/home-page'
import { CatalogPage } from '@/pages/public/catalog-page'
import { ProductDetailPage } from '@/pages/public/product-detail-page'
import { LoginPage } from '@/pages/auth/login-page'

// Páginas Administrativas y Operativas
import { DashboardPage } from '@/pages/admin/dashboard-page'
import { ProductsPage } from '@/pages/admin/products-page'
import { InventoryPage } from '@/pages/admin/inventory-page'
import { MovementsPage } from '@/pages/admin/movements-page'
import { LayawaysPage } from '@/pages/admin/layaways-page'
import { PosPage } from '@/pages/admin/pos-page'
import { SalesPage } from '@/pages/admin/sales-page'
import { CashboxPage } from '@/pages/admin/cashbox-page'
import { ReturnsPage } from '@/pages/admin/returns-page'
import { ReportsPage } from '@/pages/admin/reports-page'
import { UsersPage } from '@/pages/admin/users-page'
import { ProfilePage } from '@/pages/admin/profile-page'

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas Protegidas (Panel Operativo y Administrativo) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/pos" element={<PosPage />} />
          <Route path="/apartados" element={<LayawaysPage />} />
          <Route path="/caja" element={<CashboxPage />} />
          <Route path="/devoluciones" element={<ReturnsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />

          {/* Rutas exclusivas para rol Admin */}
          <Route element={<RoleGuard allowedRoles={['admin']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/inventario" element={<InventoryPage />} />
            <Route path="/movimientos" element={<MovementsPage />} />
            <Route path="/ventas" element={<SalesPage />} />
            <Route path="/reportes" element={<ReportsPage />} />
            <Route path="/usuarios" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
