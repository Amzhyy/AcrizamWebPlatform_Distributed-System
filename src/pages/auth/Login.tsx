import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Globe, Code, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('[Login] Intentando iniciar sesión con:', email);

    // Promise wrapper with timeout
    const loginPromise = supabase.auth.signInWithPassword({
      email,
      password,
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('La conexión con Supabase ha tardado demasiado. Por favor verifica tu internet o las credenciales.')), 10000)
    );

    try {
      console.log('[Login] Llamando a supabase.auth.signInWithPassword...');
      const { error: authError } = await Promise.race([loginPromise, timeoutPromise]) as any;

      if (authError) {
        console.error('[Login] Error de Supabase:', authError);
        throw authError;
      }
      
      console.log('[Login] Inicio de sesión exitoso, navegando...');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('[Login] Error capturado:', err);
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
      console.log('[Login] Proceso finalizado, loading: false');
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* Left Side: Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 via-accent-violet/20 to-accent-cyan/20 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Acrizam Workspace"
        />
        <div className="relative z-20 p-20 flex flex-col justify-between h-full w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center font-bold">A</div>
            <span className="text-white font-display font-bold text-2xl tracking-tight">Acrizam</span>
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight">
              Gestiona tu marca <br/> desde un solo lugar.
            </h2>
            <p className="text-slate-300 text-lg">
              Accede a tu portal de cliente para seguir tus pedidos, ver cotizaciones y descargar tus facturas.
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
          <div className="lg:hidden flex justify-center mb-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">A</div>
              <span className="text-slate-900 font-display font-bold text-2xl tracking-tight">Acrizam</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-slate-900">Bienvenido de nuevo</h1>
            <p className="text-slate-500">Ingresa tus credenciales para acceder a tu portal.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
                <Globe size={20} />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
                <Code size={20} />
                <span className="text-sm font-medium">Github</span>
              </button>
            </div>

            <div className="relative py-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">O con email</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" 
                    placeholder="nombre@empresa.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Contraseña</label>
                  <button type="button" className="text-xs font-bold text-primary-600 hover:underline">¿Olvidaste tu contraseña?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" 
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" glow disabled={loading}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Entrar al Portal <ArrowRight size={18} className="ml-2" /></>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500">
            ¿No tienes una cuenta? {' '}
            <Link to="/register" className="font-bold text-primary-600 hover:underline">Regístrate ahora</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
