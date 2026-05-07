import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { useQuoteStore } from '../../stores/useQuoteStore';

export const Overview = () => {
  const { profile } = useAuthStore();
  const { orders, fetchOrders, loading: loadingOrders } = useOrderStore();
  const { quotes, fetchQuotes, loading: loadingQuotes } = useQuoteStore();

  useEffect(() => {
    fetchOrders();
    fetchQuotes();
  }, [fetchOrders, fetchQuotes]);

  const activeOrdersCount = orders.filter(o => o.status !== 'entregado').length;
  const pendingQuotesCount = quotes.filter(q => q.status === 'pending').length;

  const stats = [
    { label: 'Pedidos Activos', value: activeOrdersCount, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'En Producción', value: orders.filter(o => ['diseño', 'corte', 'pulido'].includes(o.status)).length, icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Cotizaciones Pendientes', value: pendingQuotesCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const loading = loadingOrders || loadingQuotes;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-100 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
            ¡Hola de nuevo, {profile?.full_name?.split(' ')[0] || 'Cliente'}! 👋
          </h2>
          <p className="text-slate-600">Aquí tienes un resumen de tu actividad reciente en Acrizam.</p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Pedidos Recientes</h3>
                <Link to="/dashboard/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  Ver todos <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                      <th className="py-4 px-6 font-medium">ID Pedido</th>
                      <th className="py-4 px-6 font-medium">Fecha</th>
                      <th className="py-4 px-6 font-medium">Estado</th>
                      <th className="py-4 px-6 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-medium text-slate-900">{order.order_number}</p>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'entregado' ? 'bg-slate-100 text-slate-700' : 'bg-primary-100 text-primary-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-slate-900">
                          ${(order.total_amount || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-500">No hay pedidos recientes.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Panel */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Acciones Rápidas</h3>
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
                <Link to="/dashboard/catalog" className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Nuevo Pedido</h4>
                    <p className="text-sm text-slate-500">Explora nuestro catálogo</p>
                  </div>
                </Link>
                <div className="h-px bg-slate-100 mx-4" />
                <Link to="/contact" className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Soporte Técnico</h4>
                    <p className="text-sm text-slate-500">Abre un ticket de ayuda</p>
                  </div>
                </Link>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2">¿Necesitas una cotización especial?</h4>
                  <p className="text-slate-400 text-sm mb-4">Nuestro equipo de ventas está listo para ayudarte con pedidos de alto volumen.</p>
                  <Link to="/quote" className="inline-block bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                    Solicitar Cotización
                  </Link>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-500 rounded-full opacity-20 blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
