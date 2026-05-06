import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = () => {
  const { session, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
