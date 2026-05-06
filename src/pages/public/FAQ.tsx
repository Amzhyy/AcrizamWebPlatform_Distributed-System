import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Materiales y Calidad',
    questions: [
      {
        q: '¿Qué tipo de acrílico utilizan?',
        a: 'Trabajamos exclusivamente con acrílico de grado virgen (MMA) de las mejores marcas internacionales. Esto asegura que tus piezas no se amarillen con el tiempo y mantengan una transparencia superior al vidrio.'
      },
      {
        q: '¿Cuál es la diferencia entre acrílico cristal y extrusionado?',
        a: 'El acrílico cristal (cast) es más resistente a químicos y tiene mejores propiedades ópticas, ideal para grabado láser y mobiliario. El extrusionado es más económico para aplicaciones simples como señalética básica.'
      },
      {
        q: '¿Qué espesores manejan?',
        a: 'Contamos con stock desde 2mm hasta 50mm. Para proyectos especiales podemos fabricar bloques de mayor espesor bajo pedido.'
      }
    ]
  },
  {
    category: 'Pedidos y Cotizaciones',
    questions: [
      {
        q: '¿Tienen un mínimo de compra?',
        a: 'No tenemos un mínimo estricto, pero los precios son mucho más competitivos a partir de 25-50 unidades. Para piezas únicas de mobiliario o diseños especiales, atendemos desde una pieza.'
      },
      {
        q: '¿Cuánto tiempo tarda mi pedido?',
        a: 'Nuestro tiempo estándar de producción es de 5 a 7 días hábiles una vez aprobado el diseño y realizado el pago. Pedidos de gran volumen pueden requerir de 10 a 15 días.'
      },
      {
        q: '¿Puedo enviar mis propios archivos de diseño?',
        a: 'Sí, aceptamos archivos vectoriales en formato .AI, .SVG, .DXF y .PDF. Si no tienes el diseño, nuestro equipo puede crearlo por ti.'
      }
    ]
  },
  {
    category: 'Envío y Logística',
    questions: [
      {
        q: '¿Realizan envíos a todo México?',
        a: 'Sí, enviamos a toda la República Mexicana mediante paqueterías especializadas en manejo de materiales frágiles.'
      },
      {
        q: '¿Cómo aseguran que las piezas no lleguen rayadas o rotas?',
        a: 'Cada pieza de acrílico viaja con su película protectora original. Además, usamos empaque multicapa con burbuja reforzada y, en casos de piezas grandes, huacales de madera.'
      }
    ]
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle size={14} /> Centro de Ayuda
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">Preguntas Frecuentes</h1>
          <p className="text-lg text-slate-600">Todo lo que necesitas saber sobre el mundo del acrílico y nuestro proceso de trabajo.</p>
        </div>

        {/* FAQ Content */}
        <div className="space-y-12">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 pl-4 border-l-2 border-primary-500">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.questions.map((item, qIdx) => {
                  const id = `${groupIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div 
                      key={id}
                      className={`rounded-3xl border transition-all duration-300 ${
                        isOpen ? 'bg-white border-primary-100 shadow-xl shadow-primary-500/5' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <button 
                        onClick={() => toggle(id)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className={`font-bold text-lg ${isOpen ? 'text-primary-600' : 'text-slate-900'}`}>
                          {item.q}
                        </span>
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isOpen ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-20 p-10 bg-primary-50 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">¿Aún tienes dudas técnicas?</h3>
            <p className="text-slate-600 text-sm">Nuestro equipo de soporte está listo para asesorarte en tu proyecto especial.</p>
          </div>
          <Link to="/contact">
            <Button glow>
              Contáctanos <ChevronRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};
