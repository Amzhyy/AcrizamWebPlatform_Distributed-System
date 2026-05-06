import { motion } from 'framer-motion';
import { ChevronRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import heroImg from '../../assets/hero_mockup.png';

export const Landing = () => {
  return (
    <div className="flex flex-col w-full relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-accent-cyan/10 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-accent-violet/10 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            <motion.div 
              className="flex-1 space-y-8 text-center lg:text-left relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-700">
                <Sparkles size={16} className="text-accent-violet" />
                <span>Merchandising Premium para Empresas</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-display font-bold text-slate-900">
                Personalización <br className="hidden md:block"/>
                <span className="text-gradient">Elevada al Máximo.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Diseñamos y producimos artículos promocionales con un estándar de calidad superior. Desde regalos corporativos hasta empaques de lujo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Button size="lg" glow className="w-full sm:w-auto">
                  Iniciar Cotización <ChevronRight size={18} className="ml-1"/>
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Ver Catálogo
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative w-full max-w-[600px] lg:max-w-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl shadow-slate-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-glass z-10 pointer-events-none rounded-3xl"/>
                <img 
                  src={heroImg} 
                  alt="Acrizam Premium Products" 
                  className="w-full h-auto object-cover rounded-2xl relative z-0"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 flex items-center gap-4 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Entrega Rápida</p>
                  <p className="font-bold text-slate-900">Envíos en 24h</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surfaceAlt relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">¿Por qué elegir Acrizam?</h2>
            <p className="text-slate-600">Reinventamos el concepto de regalos corporativos combinando tecnología, diseño premium y atención impecable.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card glass className="p-8 text-center md:text-left">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600 mb-6 mx-auto md:mx-0">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Calidad Premium</h3>
              <p className="text-slate-600">Materiales seleccionados y acabados perfectos. Cada producto se inspecciona a detalle.</p>
            </Card>
            <Card glass className="p-8 text-center md:text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 rounded-full blur-[40px]" />
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-accent-cyan mb-6 mx-auto md:mx-0 relative z-10">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Proceso Inteligente</h3>
              <p className="text-slate-600 relative z-10">Cotiza y personaliza tus productos en tiempo real con nuestra plataforma intuitiva.</p>
            </Card>
            <Card glass className="p-8 text-center md:text-left">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-accent-violet mb-6 mx-auto md:mx-0">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Garantía Total</h3>
              <p className="text-slate-600">Si el producto no cumple con tus expectativas, lo rehacemos. Tu satisfacción es prioridad.</p>
            </Card>
          </div>
        </div>
      </section>
      
    </div>
  );
};
