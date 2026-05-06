import { Mail, Phone, MapPin, Globe, Camera, User, Send } from "lucide-react";

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const Contact = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Estamos aquí para ayudarte</h1>
          <p className="text-slate-600">¿Tienes un proyecto especial o dudas sobre el proceso? Escríbenos y nuestro equipo te asesorará personalmente.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-8 border-none shadow-none bg-primary-50">
              <h3 className="text-xl font-bold mb-6">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                    <p className="font-medium text-slate-700">contacto@acrizam.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono</p>
                    <p className="font-medium text-slate-700">+52 (55) 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ubicación</p>
                    <p className="font-medium text-slate-700">CDMX, México</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-primary-100 flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all" aria-label="Instagram" title="Instagram">
                  <Camera size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all" aria-label="LinkedIn" title="LinkedIn">
                  <User size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all" aria-label="Globe" title="Globe">
                  <Globe size={20} />
                </button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card glass className="p-8 md:p-12">
              <form className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nombre completo</label>
                  <input type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" placeholder="Ej. Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Correo electrónico</label>
                  <input type="email" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" placeholder="juan@empresa.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Asunto</label>
                  <input type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none" placeholder="Cotización masiva / Duda técnica" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Mensaje</label>
                  <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" placeholder="Cuéntanos más sobre tu proyecto..." />
                </div>
                <div className="sm:col-span-2 pt-4">
                  <Button size="lg" glow className="w-full sm:w-auto">
                    Enviar Mensaje <Send size={18} className="ml-2" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};
