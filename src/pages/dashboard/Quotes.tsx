import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  CreditCard,
  X,
  Loader2,
  ShoppingBag,
  Package
} from 'lucide-react';
import { useQuoteStore } from '../../stores/useQuoteStore';
import type { Quote } from '../../stores/useQuoteStore';
import { useProductStore } from '../../stores/useProductStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// ─── Status config ────────────────────────────────────────────────────────────
const statusConfig = {
  pending:  { label: 'Pendiente', icon: Clock,        color: 'text-orange-600', bg: 'bg-orange-50',  border: 'border-orange-200' },
  approved: { label: 'Aprobada',  icon: CheckCircle2, color: 'text-green-600',  bg: 'bg-green-50',   border: 'border-green-200'  },
  rejected: { label: 'Rechazada', icon: XCircle,      color: 'text-red-600',    bg: 'bg-red-50',     border: 'border-red-200'    },
  expired:  { label: 'Expirada',  icon: AlertCircle,  color: 'text-slate-500',  bg: 'bg-slate-50',   border: 'border-slate-200'  },
};

// ─── Payment Modal ────────────────────────────────────────────────────────────
const PaymentModal = ({ quote, onClose, onConfirm }: { quote: Quote; onClose: () => void; onConfirm: () => Promise<void> }) => {
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    try {
      await onConfirm();
      setDone(true);
    } catch {
      alert('Error al procesar el pago. Intenta de nuevo.');
      setPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
      >
        {done ? (
          // ── Success state ──────────────────────────────────────────────────
          <div className="p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">¡Pago Aprobado!</h3>
            <p className="text-slate-500 mb-2">Tu cotización ha sido aprobada y se ha generado un pedido de producción.</p>
            <p className="text-sm text-primary-600 font-bold mb-8">Puedes ver el progreso en <strong>Mis Pedidos</strong>.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>Cerrar</Button>
              <Link to="/dashboard/orders" className="flex-1">
                <Button glow className="w-full">
                  <Package size={16} className="mr-2" /> Ver Pedidos
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // ── Payment form ────────────────────────────────────────────────────
          <>
            <div className="bg-slate-900 px-8 pt-8 pb-6 relative">
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Resumen de Pago</p>
              <h3 className="text-white font-display font-bold text-xl mb-1">{quote.product?.name || 'Producto Personalizado'}</h3>
              <p className="text-slate-400 text-sm">{quote.quantity} piezas · #{quote.id.slice(0, 8)}</p>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-slate-400">Total a Pagar</span>
                <span className="text-3xl font-display font-bold text-white">${quote.total_amount?.toLocaleString()} MXN</span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Simulated card fields */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Número de Tarjeta</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-mono text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Vencimiento</label>
                  <input type="text" placeholder="MM/AA" defaultValue="12/27" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">CVV</label>
                  <input type="text" placeholder="123" defaultValue="123" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-mono" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={onClose} disabled={paying}>Cancelar</Button>
                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl 
                             hover:bg-slate-800 transition-colors disabled:opacity-60"
                >
                  {paying ? <Loader2 className="animate-spin" size={18} /> : <CreditCard size={18} />}
                  {paying ? 'Procesando...' : `Pagar $${quote.total_amount?.toLocaleString()}`}
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400">Pago simulado · Sin cargos reales</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const Quotes = () => {
  const { quotes, loading, fetchQuotes, approveAndCreateOrder } = useQuoteStore();
  const { products } = useProductStore();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return (
    <>
      {/* Payment Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <PaymentModal
            quote={selectedQuote}
            onClose={() => setSelectedQuote(null)}
            onConfirm={async () => {
              await approveAndCreateOrder(selectedQuote);
              setSelectedQuote(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Mis Cotizaciones</h1>
            <p className="text-slate-500">Administra y aprueba tus presupuestos de acrílico.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
              <Search className="text-slate-400 ml-2" size={20} />
              <input type="text" placeholder="Buscar..." className="bg-transparent border-none focus:ring-0 text-sm w-full md:w-64" />
            </div>
            <Button variant="outline" className="hidden md:flex">
              <Filter size={18} className="mr-2" /> Filtros
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {quotes.map((quote, idx) => {
              const config = statusConfig[quote.status] ?? statusConfig.pending;
              const Icon = config.icon;

              // Find the local product image by ID or Name
              const localProduct = products.find(p => p.id === quote.product_id || p.name === quote.product?.name);
              const productImage = localProduct?.image || quote.product?.image_url || 'https://images.unsplash.com/photo-1594913785162-e6785b4cd3d0?q=80&w=100';

              return (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card glass className={`group relative overflow-hidden border hover:shadow-lg transition-all duration-300 ${quote.status === 'approved' ? 'border-green-100' : 'border-transparent hover:border-primary-100'}`}>
                    <div className="p-6">
                      {/* Header row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                            <img
                              src={productImage}
                              alt={quote.product?.name || localProduct?.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594913785162-e6785b4cd3d0?q=80&w=100'; }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                              {quote.product?.name || 'Producto Personalizado'}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">#{quote.id.slice(0, 8)}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-[10px] text-slate-400">{new Date(quote.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        {/* Status badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border ${config.bg} ${config.color} ${config.border}`}>
                          <Icon size={10} />
                          {config.label}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-50 mb-6">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cantidad</p>
                          <p className="text-sm font-bold text-slate-900">{quote.quantity} pzs</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Est.</p>
                          <p className="text-sm font-bold text-slate-900">${quote.total_amount?.toLocaleString()} MXN</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Piezas</p>
                          <p className="text-sm font-bold text-slate-900">{quote.quantity}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        {quote.status === 'pending' && (
                          <Button
                            size="sm"
                            glow
                            className="h-9 text-xs ml-auto"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <CreditCard size={14} className="mr-1" /> Aprobar y Pagar
                            <ChevronRight size={14} className="ml-1" />
                          </Button>
                        )}

                        {quote.status === 'approved' && (
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle2 size={16} />
                              <span className="text-sm font-bold">Pedido en producción</span>
                            </div>
                            <Link to="/dashboard/orders">
                              <Button variant="outline" size="sm" className="text-xs">
                                <ShoppingBag size={14} className="mr-1" /> Ver Pedido
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {quotes.length === 0 && (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No hay cotizaciones activas</h3>
                <p className="text-slate-500">Inicia una nueva configuración desde el catálogo.</p>
                <Link to="/dashboard/catalog" className="inline-block mt-6">
                  <Button variant="primary" glow>Ir al Catálogo</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
