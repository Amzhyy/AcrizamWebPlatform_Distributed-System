import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Share2, Heart } from 'lucide-react';
import { useProductStore } from '../../stores/useProductStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductStore();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link to="/catalog" className="text-primary-600 hover:underline mt-4 inline-block">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumbs / Back */}
        <Link 
          to="/catalog" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-32">
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-square group shadow-xl shadow-slate-200/50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <button 
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors"
                    aria-label="Añadir a favoritos"
                  >
                    <Heart size={20} />
                  </button>
                  <button 
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-600 hover:text-primary-600 transition-colors"
                    aria-label="Compartir producto"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-4 self-start">
              {product.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              {product.name}
            </h1>
            
            <div className="text-3xl font-display font-bold text-slate-900 mb-8">
              ${product.price} <span className="text-sm text-slate-400 font-sans font-normal italic">Desde 50 unidades</span>
            </div>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 mb-12">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                Especificaciones Premium
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 size={20} className="text-accent-cyan flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card glass className="p-8 mb-10 border-primary-100 bg-primary-50/30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">¿Necesitas personalización?</h4>
                  <p className="text-sm text-slate-600">Configura colores, logo y empaque en nuestro wizard.</p>
                </div>
                <Link to={`/quote?product=${product.id}`}>
                  <Button size="lg" glow className="whitespace-nowrap">
                    Cotizar Ahora <ChevronRight size={18} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
            
            <div className="mt-auto grid grid-cols-3 gap-4 border-t border-slate-100 pt-8">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Producción</p>
                <p className="text-sm font-bold text-slate-700">5-7 Días</p>
              </div>
              <div className="text-center border-x border-slate-100 px-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Mínimo</p>
                <p className="text-sm font-bold text-slate-700">25 Piezas</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Calidad</p>
                <p className="text-sm font-bold text-slate-700">Premium</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
