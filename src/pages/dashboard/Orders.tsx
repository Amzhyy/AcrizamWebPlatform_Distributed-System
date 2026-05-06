import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Clock, 
  CheckCircle2, 
  Scissors, 
  Sparkles,
  Truck,
  Loader2
} from 'lucide-react';
import type { OrderStatus } from '../../stores/useOrderStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const statusConfig: Record<OrderStatus, { label: string, icon: any, color: string, bg: string }> = {
  'diseño': { label: 'En Diseño', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  'corte': { label: 'Corte Láser', icon: Scissors, color: 'text-orange-600', bg: 'bg-orange-50' },
  'pulido': { label: 'Detallado / Pulido', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
  'terminado': { label: 'Listo p/ Entrega', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  'entregado': { label: 'Entregado', icon: Truck, color: 'text-slate-600', bg: 'bg-slate-50' },
};

const steps: OrderStatus[] = ['diseño', 'corte', 'pulido', 'terminado', 'entregado'];

export const Orders = () => {
  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Mis Pedidos</h1>
          <p className="text-slate-500">Sigue el progreso de tus piezas de acrílico en tiempo real.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto">
          <Search className="text-slate-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por ID o producto..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full md:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => {
            const currentStatus = statusConfig[order.status];
            const currentStepIdx = steps.indexOf(order.status);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card glass className="overflow-hidden border-slate-100 hover:border-primary-100 transition-all duration-300">
                  <div className="p-6 md:p-8">
                    {/* Order Top Info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                          <img src={order.image_url} alt={order.product_name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">{order.order_number}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-400">{new Date(order.created_at).toLocaleDateString()}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{order.product_name}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${currentStatus.bg} ${currentStatus.color}`}>
                          <currentStatus.icon size={18} />
                          <span className="text-sm font-bold uppercase tracking-wider">{currentStatus.label}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Total</p>
                          <p className="text-lg font-display font-bold text-slate-900">${order.total_amount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                  {/* Status Progress Bar */}
                  <div className="relative mb-10 mt-4 px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-1000"
                      style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                    />
                    
                    <div className="flex justify-between relative z-10">
                      {steps.map((step, i) => {
                        const isCompleted = i <= currentStepIdx;
                        const config = statusConfig[step];
                        
                        return (
                          <div key={step} className="flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isCompleted 
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 ring-4 ring-white' 
                                : 'bg-white text-slate-300 border-2 border-slate-100'
                            }`}>
                              {isCompleted ? <CheckCircle2 size={20} /> : <config.icon size={20} />}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest hidden md:block ${
                              isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                              {config.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>


                </div>
              </Card>
            </motion.div>
          );
        })}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No tienes pedidos aún</h3>
            <p className="text-slate-500">¿Tienes un proyecto en mente? Empieza hoy mismo.</p>
            <Button variant="primary" glow className="mt-6">
              Nueva Cotización
            </Button>
          </div>
        )}
        </div>
      )}
    </div>
  );
};
