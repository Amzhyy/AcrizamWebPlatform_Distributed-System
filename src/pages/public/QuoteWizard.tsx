import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Upload, 
  Layers, 
  Palette, 
  Calendar, 
  Send,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useProductStore } from '../../stores/useProductStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { supabase } from '../../lib/supabase';

const steps = [
  { id: 'product', title: 'Producto', icon: Layers },
  { id: 'design', title: 'Diseño', icon: Palette },
  { id: 'details', title: 'Detalles', icon: Calendar },
  { id: 'finish', title: 'Finalizar', icon: Send },
];

export const QuoteWizard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { user } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: searchParams.get('product') || '',
    color: '#3b82f6',
    logo: null as File | null,
    quantity: 50,
    deadline: '',
    name: '',
    email: '',
    company: '',
  });

  const selectedProduct = products.find(p => p.id === formData.productId);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      // If not logged in, redirect to login with return path
      navigate('/login?redirect=quote');
      return;
    }

    setLoading(true);
    try {
      // 1. Asegurar que el perfil existe (por si no se creó al registrarse)
      const { data: profileExists } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!profileExists) {
        console.log('[QuoteWizard] Creando perfil faltante...');
        await supabase.from('profiles').insert([
          {
            id: user.id,
            full_name: user.user_metadata?.full_name || 'Usuario',
            company_name: formData.company || user.user_metadata?.company_name || 'Empresa',
            role: 'client'
          }
        ]);
      }

      // 2. Intentar guardar la cotización
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            user_id: user.id,
            product_id: formData.productId,
            quantity: formData.quantity,
            total_amount: formData.quantity * (selectedProduct?.price || 0),
            configuration: {
              color: formData.color,
              deadline: formData.deadline,
              company: formData.company || user.user_metadata?.company_name
            }
          }
        ]);

      if (error) {
        if (error.code === '23503' && error.message.includes('product_id')) {
          throw new Error('El producto seleccionado no existe en la base de datos. Por favor, asegúrate de haber cargado el catálogo en Supabase.');
        }
        throw error;
      }
      navigate('/dashboard/quotes');
    } catch (err: any) {
      console.error('Error saving quote:', err);
      alert(`Error al guardar tu cotización: ${err.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2 flex-1 relative">
              {idx < steps.length - 1 && (
                <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 z-0 ${
                  idx < currentStep ? 'bg-primary-500' : 'bg-slate-200'
                }`} />
              )}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 ${
                idx <= currentStep ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'
              }`}>
                {idx < currentStep ? <Check size={20} /> : <step.icon size={20} />}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                idx <= currentStep ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Content */}
        <Card glass className="p-8 md:p-12 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              {currentStep === 0 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Selecciona el producto base</h2>
                    <p className="text-slate-500">¿Qué artículo deseas personalizar hoy?</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setFormData({ ...formData, productId: p.id })}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                          formData.productId === p.id 
                            ? 'border-primary-500 bg-primary-50/50' 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <img src={p.image} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-500">${p.price} c/u</p>
                        </div>
                        {formData.productId === p.id && <div className="ml-auto text-primary-500"><Check size={20} /></div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Personaliza el diseño</h2>
                    <p className="text-slate-500">Elige el color del producto y sube tu logo.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Color del producto</label>
                      <div className="flex gap-4">
                        {['#3b82f6', '#8b5cf6', '#06b6d4', '#1e293b', '#ef4444'].map(c => (
                          <button
                            key={c}
                            onClick={() => setFormData({ ...formData, color: c })}
                            className={`w-10 h-10 rounded-full border-4 transition-all ${
                              formData.color === c ? 'border-white ring-2 ring-primary-500' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center hover:border-primary-400 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Upload size={32} />
                      </div>
                      <p className="font-bold text-slate-900 mb-1">Subir Logo (SVG/PNG/AI)</p>
                      <p className="text-sm text-slate-500">O arrastra el archivo aquí</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Detalles del pedido</h2>
                    <p className="text-slate-500">Indícanos la cantidad y la fecha ideal de entrega.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="quantity" className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Cantidad de piezas</label>
                      <input 
                        id="quantity"
                        type="range" min="25" max="1000" step="25"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                      />
                      <div className="flex justify-between text-xl font-bold">
                        <span>{formData.quantity} pzas</span>
                        <span className="text-primary-600">${formData.quantity * (selectedProduct?.price || 0)} MXN</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <label htmlFor="deadline" className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Fecha estimada</label>
                      <input 
                        id="deadline"
                        type="date" 
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Empresa</label>
                      <input
                        type="text"
                        id="company"
                        placeholder="Nombre de tu empresa"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">¡Todo listo!</h2>
                    <p className="text-slate-500">
                      {user 
                        ? `Hola ${user.user_metadata?.full_name || 'usuario'}, tu cotización se guardará en tu perfil.`
                        : 'Para guardar tu cotización y recibir seguimiento, por favor inicia sesión.'
                      }
                    </p>
                  </div>
                  
                  <Card glass className="max-w-md mx-auto p-6 bg-primary-50/30 border-primary-100">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Producto:</span>
                        <span className="font-bold">{selectedProduct?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Cantidad:</span>
                        <span className="font-bold">{formData.quantity} piezas</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Color:</span>
                        <div className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: formData.color }} />
                      </div>
                      <div className="pt-3 border-t border-primary-100 flex justify-between items-end">
                        <span className="text-slate-500">Inversión Total:</span>
                        <span className="text-xl font-display font-bold text-primary-700">
                          ${(formData.quantity * (selectedProduct?.price || 0)).toLocaleString()} MXN
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
            <Button variant="secondary" onClick={handleBack} className={currentStep === 0 ? 'invisible' : ''} aria-label="Anterior">
              <ChevronLeft size={18} className="mr-1" /> Anterior
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={handleNext} 
                disabled={currentStep === 0 && !formData.productId}
                glow
              >
                Continuar <ChevronRight size={18} className="ml-1" />
              </Button>
            ) : (
              <Button glow size="lg" onClick={handleSubmit} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>{user ? 'Confirmar Cotización' : 'Iniciar Sesión para Guardar'} <Send size={18} className="ml-2" /></>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
