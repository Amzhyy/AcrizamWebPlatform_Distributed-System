import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Resumen', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Catálogo', path: '/dashboard/catalog', icon: ShoppingBag },
    { name: 'Mis Pedidos', path: '/dashboard/orders', icon: Package },
    { name: 'Cotizaciones', path: '/dashboard/quotes', icon: FileText },
    { name: 'Ajustes', path: '/dashboard/settings', icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-20"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">A</div>
              <span className="text-slate-900 font-display font-bold tracking-tight">Acrizam</span>
            </Link>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            aria-label={sidebarOpen ? "Cerrar menú lateral" : "Abrir menú lateral"}
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary-600' : 'text-slate-400'} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <h1 className="text-xl font-semibold text-slate-800">
            {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 font-medium text-xs">
              {profile?.full_name ? getInitials(profile.full_name) : '??'}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
