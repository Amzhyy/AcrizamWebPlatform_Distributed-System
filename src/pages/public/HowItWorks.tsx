import { motion } from 'framer-motion';
import { 
  Search, 
  MessageSquare, 
  Settings, 
  Scissors, 
  Sparkles, 
  Truck,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Search,
    title: 'Explora y Elige',
    description: 'Navega por nuestro catálogo de soluciones en acrílico o solicita un diseño totalmente a medida.',
    color: 'bg-blue-500',
  },
  {
    icon: MessageSquare,
    title: 'Cotización Digital',
    description: 'Usa nuestro wizard para configurar medidas, espesores y acabados. Recibe un presupuesto formal al instante.',
    color: 'bg-purple-500',
  },
  {
    icon: Settings,
    title: 'Validación Pro',
    description: 'Nuestros ingenieros revisan tus archivos y requerimientos técnicos para asegurar la viabilidad del proyecto.',
    color: 'bg-cyan-500',
  },
  {
    icon: Scissors,
    title: 'Corte y Transformación',
    description: 'Usamos tecnología láser de última generación para cortes precisos y termoformado de alta calidad.',
    color: 'bg-orange-500',
  },
  {
    icon: Sparkles,
    title: 'Pulido Diamante',
    description: 'El toque final de Acrizam. Cada borde es pulido para lograr una transparencia y brillo inigualables.',
    color: 'bg-indigo-500',
  },
  {
    icon: Truck,
    title: 'Envío Seguro',
    description: 'Empaque reforzado y logística dedicada para que tus piezas lleguen impecables a todo México.',
    color: 'bg-green-500',
  }
];

export const HowItWorks = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Proceso de <span className="text-gradient">Precisión Acrizam</span></h1>
            <p className="text-xl text-slate-600">Desde una idea en papel hasta una pieza de acrílico impecable en tus manos. Así es como trabajamos.</p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-primary-200 transition-all group"
            >
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
                <step.icon size={32} />
              </div>
              <div className="absolute top-8 right-8 text-4xl font-display font-bold text-slate-50 opacity-50 group-hover:text-primary-50 transition-colors">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-slate-900 rounded-[40px] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/20 via-transparent to-accent-cyan/20 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 relative z-10">¿Listo para materializar tu proyecto?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Nuestros asesores técnicos están listos para ayudarte con cualquier requerimiento especial de acrílico.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/quote">
              <Button size="lg" glow>
                Iniciar Cotización <ChevronRight size={20} className="ml-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-slate-700 hover:bg-slate-800">
                Hablar con un Experto
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
