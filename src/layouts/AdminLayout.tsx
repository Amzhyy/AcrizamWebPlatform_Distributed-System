import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
];

export const AdminLayout = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Restrict access to admin only
  if (user.email !== 'amzhyycyr@gmail.com') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white">
            <img src="/images/logoacrizam.png" alt="Acrizam" className="h-8 w-auto" />
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-500/20 text-primary-400">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {adminNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary-500 text-white font-bold' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.email}</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-center border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            onClick={() => signOut()}
          >
            <LogOut size={16} className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <span className="font-display font-black text-xl tracking-tight text-slate-900">
            ACRIZAM <span className="text-primary-600">ADMIN</span>
          </span>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut size={16} />
          </Button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
