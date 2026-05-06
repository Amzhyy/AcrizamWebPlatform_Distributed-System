import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Package, DollarSign } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useQuoteStore } from '../../stores/useQuoteStore';
import { useOrderStore } from '../../stores/useOrderStore';

export const AdminOverview = () => {
  const { quotes, fetchQuotes } = useQuoteStore();
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchQuotes();
    fetchOrders();
  }, [fetchQuotes, fetchOrders]);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.total_amount || 0), 0);
  const activeQuotes = quotes.filter(q => q.status === 'pending').length;
  const activeOrders = orders.filter(o => o.status !== 'entregado').length;

  const stats = [
    { name: 'Ingresos Totales', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Cotizaciones Pendientes', value: activeQuotes.toString(), icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Pedidos Activos', value: activeOrders.toString(), icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Usuarios', value: '---', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }, // Placeholder for users
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Panel de Control</h1>
        <p className="text-slate-500">Resumen general de la actividad en la plataforma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.name}</p>
                <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Módulo de Administración</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Este es el panel principal de administración. Por solicitud, se mantiene con funciones esenciales 
          y diseño simple para la finalización del proyecto.
        </p>
      </div>
    </div>
  );
};
