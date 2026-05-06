import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../stores/useAuthStore';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session } = useAuthStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Cómo funciona', path: '/how-it-works' },
    { name: 'Nosotros', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'glass-panel border-slate-200/50 py-3' : 'bg-transparent py-5'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Acrizam" className="h-12 w-auto object-contain drop-shadow-sm hover:drop-shadow-md transition-all duration-300" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
              Iniciar sesión
            </Link>
          ) : (
            <Link to="/dashboard" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
              Mi Panel <ChevronRight size={16} />
            </Link>
          )}
          <Link to="/quote">
            <Button size="sm" glow className="gap-1">
              Cotizar <ChevronRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu logic would go here, omitting for brevity */}
    </motion.header>
  );
};
