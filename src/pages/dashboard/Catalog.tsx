import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { useProductStore } from '../../stores/useProductStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const { products, categories } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Catálogo de Productos</h1>
          <p className="text-slate-500">Explora nuestras soluciones en acrílico premium para tu negocio u hogar.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto">
          <Search className="text-slate-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Card glass className="group h-full flex flex-col overflow-hidden border-slate-100 hover:border-primary-200 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/10">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-800 shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                    <Star size={18} />
                  </button>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div className="text-lg font-display font-bold text-slate-900">
                      ${product.price}
                    </div>
                    <Link to={`/quote?product=${product.id}`}>
                      <Button size="sm" variant="secondary" className="group/btn">
                        Cotizar <ChevronRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
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
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-900">No encontramos productos</h3>
          <p className="text-slate-500">Intenta con otros filtros o términos de búsqueda.</p>
          <Button 
            variant="outline" 
            className="mt-6"
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('Todos');
            }}
          >
            Ver todo el catálogo
          </Button>
        </div>
      )}
    </div>
  );
};
