import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, Users } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const About = () => {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
              Nuestra Historia
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-[1.1]">
              Expertos en la transformación del <span className="text-gradient">acrílico.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Acrizam nació con una visión clara: brindar soluciones de alta calidad en acrílico, combinando precisión técnica con diseño estético para satisfacer las necesidades de cada proyecto.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nos especializamos en la fabricación de exhibidores, señalética, mobiliario y piezas personalizadas. Trabajamos con los mejores materiales y tecnología de punta para garantizar durabilidad y acabados impecables que resalten la identidad de nuestros clientes.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl glass-panel p-2">
              <img 
                src="/images/logros.png" 
                className="w-full h-full object-cover rounded-[32px]"
                alt="Logros Acrizam"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-3xl max-w-xs shadow-xl hidden md:block">
              <p className="text-3xl font-display font-bold text-primary-600 mb-1">+1,200</p>
              <p className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2">Proyectos Exitosos</p>
              <p className="text-xs text-slate-500">Hemos trabajado con startups y empresas globales en todo México.</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Nuestros Pilares</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Lo que nos diferencia y guía cada decisión en Acrizam.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Calidad Obsesiva', desc: 'No enviamos nada que no pondríamos en nuestro propio escritorio.' },
            { icon: Award, title: 'Diseño Pro', desc: 'Cada artículo es curado por diseñadores para asegurar estética moderna.' },
            { icon: Zap, title: 'Agilidad Digital', desc: 'Plataforma intuitiva para cotizar y seguir pedidos en tiempo real.' },
            { icon: Users, title: 'Enfoque Humano', desc: 'Atención personalizada para asegurar que tu marca brille.' },
          ].map((item, idx) => (
            <Card key={idx} glass className="p-8 text-center">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-slate-200">
                <item.icon size={28} />
              </div>
              <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};
