import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useProductStore } from '../../stores/useProductStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const { products, categories, selectedCategory, setSelectedCategory } = useProductStore();

  const filteredProducts = selectedCategory === 'Todos' || !selectedCategory
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Nuestro Catálogo</h1>
            <p className="text-slate-600 max-w-xl">
              Explora nuestra selección de productos premium diseñados para ser personalizados con la identidad de tu marca.
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-full md:w-64"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-200 mr-2">
            <SlidersHorizontal size={18} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filtros:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full group">
                  <div className="aspect-square overflow-hidden bg-slate-100 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-display font-bold text-slate-900">
                        ${product.price} <span className="text-xs text-slate-400 font-sans">MXN</span>
                      </span>
                      <Link to={`/catalog/${product.id}`}>
                        <Button variant="ghost" size="sm" className="px-3 group/btn">
                          Detalles <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};
