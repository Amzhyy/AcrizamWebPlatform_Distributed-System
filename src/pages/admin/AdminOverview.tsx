import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Package, DollarSign, MessageSquare } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useQuoteStore } from '../../stores/useQuoteStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { supabase } from '../../lib/supabase';

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export const AdminOverview = () => {
  const { quotes, fetchQuotes } = useQuoteStore();
  const { orders, fetchOrders } = useOrderStore();
  
  const [usersCount, setUsersCount] = useState<number>(0);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    fetchQuotes();
    fetchOrders();
    
    // Fetch users count
    const fetchUsers = async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      if (count !== null) setUsersCount(count);
    };
    
    // Fetch contact messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setMessages(data);
    };

    fetchUsers();
    fetchMessages();
  }, [fetchQuotes, fetchOrders]);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.total_amount || 0), 0);
  const activeQuotes = quotes.filter(q => q.status === 'pending').length;
  const activeOrders = orders.filter(o => o.status !== 'entregado').length;

  const stats = [
    { name: 'Ingresos Totales', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Cotizaciones Pendientes', value: activeQuotes.toString(), icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Pedidos Activos', value: activeOrders.toString(), icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Usuarios', value: usersCount.toString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Quotes Table */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Cotizaciones Pendientes</h2>
          </div>
          {activeQuotes === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">No hay cotizaciones pendientes.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Producto</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Cantidad</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Fecha</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.filter(q => q.status === 'pending').slice(0, 5).map((quote) => (
                    <tr key={quote.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{quote.product?.name || 'Personalizado'}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{quote.quantity}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{new Date(quote.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-sm font-bold text-primary-600">${quote.total_amount?.toLocaleString() || '0'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Active Orders Table */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Pedidos Activos</h2>
          </div>
          {activeOrders === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">No hay pedidos activos.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">ID</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Producto</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.filter(o => o.status !== 'entregado').slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{order.order_number || order.id.slice(0, 8)}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{order.product_name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg uppercase">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-bold text-slate-900">${order.total_amount?.toLocaleString() || '0'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Contact Messages Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Mensajes de Contacto</h2>
          </div>
        </div>
        
        {messages.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">No hay mensajes nuevos.</p>
        ) : (
          <div className="grid gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 border border-slate-100 rounded-2xl hover:border-primary-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{msg.full_name}</h3>
                    <p className="text-xs text-slate-500">{msg.email}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm font-bold text-primary-600 mb-1">{msg.subject}</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
