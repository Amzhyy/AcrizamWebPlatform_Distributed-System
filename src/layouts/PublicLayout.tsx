import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-200 selection:text-primary-900">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {/* Footer can be added here later */}
    </div>
  );
};
