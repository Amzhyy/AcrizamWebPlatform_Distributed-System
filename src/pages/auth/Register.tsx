import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Building2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company_name: formData.companyName,
          }
        }
      });

      if (authError) throw authError;
      
      // 2. Crear el perfil manualmente si no hay trigger en DB
      if (data.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            full_name: formData.fullName,
            company_name: formData.companyName,
            role: 'client'
          }
        ]);
      }

      if (!data.session) {
        setError('¡Casi listo! Por favor verifica tu correo electrónico para activar tu cuenta.');
        setLoading(false);
        return;
      }

      // Navegar inmediatamente si hay sesión
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-accent-violet/20 to-accent-cyan/20 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Acrizam Team"
        />
        <div className="relative z-20 p-20 flex flex-col justify-between h-full w-full">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logoacrizam.png" alt="Acrizam" className="h-10 w-auto" />
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight">
              Únete a la nueva era del acrílico.
            </h2>
            <p className="text-slate-300 text-lg">
              Crea tu cuenta corporativa para acceder a precios exclusivos y gestión de proyectos a gran escala.
            </p>
          </div>
          
          <p className="text-slate-400 text-sm">© 2026 Acrizam Web Platform. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logoacrizam.png" alt="Acrizam" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-display font-bold text-slate-900">Crea tu cuenta</h1>
            <p className="text-slate-500">Empieza a materializar tus proyectos hoy mismo.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" 
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" 
                    placeholder="Acrizam S.A."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Correo Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" 
                  placeholder="juan@empresa.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" 
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full" glow disabled={loading}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Crear Cuenta <ArrowRight size={18} className="ml-2" /></>
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500">
            ¿Ya tienes una cuenta? {' '}
            <Link to="/login" className="font-bold text-primary-600 hover:underline">Inicia sesión</Link>
          </p>

          <p className="text-center text-[10px] text-slate-400 max-w-xs mx-auto uppercase tracking-tighter">
            Al registrarte, aceptas nuestros términos de servicio y políticas de privacidad de datos corporativos.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
