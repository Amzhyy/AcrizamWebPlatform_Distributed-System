import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { Landing } from './pages/public/Landing';
import { Catalog } from './pages/public/Catalog';
import { ProductDetail } from './pages/public/ProductDetail';
import { QuoteWizard } from './pages/public/QuoteWizard';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { FAQ } from './pages/public/FAQ';
import { HowItWorks } from './pages/public/HowItWorks';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Catalog as DashboardCatalog } from './pages/dashboard/Catalog';
import { Orders as DashboardOrders } from './pages/dashboard/Orders';
import { Quotes as DashboardQuotes } from './pages/dashboard/Quotes';
import { Settings as DashboardSettings } from './pages/dashboard/Settings';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<ProductDetail />} />
          <Route path="quote" element={<QuoteWizard />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="how-it-works" element={<HowItWorks />} />
        </Route>

        {/* Auth Routes (Full Screen) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Client Dashboard Routes (Protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="catalog" element={<DashboardCatalog />} />
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="quotes" element={<DashboardQuotes />} />
            <Route path="settings" element={<DashboardSettings />} />
            {/* Add more dashboard routes here later */}
          </Route>
        </Route>

        {/* Admin Dashboard Routes (Protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
