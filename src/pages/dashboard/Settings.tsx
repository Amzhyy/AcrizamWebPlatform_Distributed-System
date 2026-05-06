import { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  Save,
  Loader2,
  Camera,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';

// ─── Delete Account Modal ─────────────────────────────────────────────────────
const DeleteAccountModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => Promise<void> }) => {
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'ELIMINAR') return;
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900">Eliminar Cuenta</h3>
            <p className="text-sm text-slate-500">Esta acción es permanente e irreversible.</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Se eliminarán todas tus cotizaciones, pedidos y datos de perfil. 
          Para confirmar, escribe <strong className="text-red-600">ELIMINAR</strong> en el campo de abajo.
        </p>

        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Escribe ELIMINAR para confirmar"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500/20 outline-none mb-6 font-mono"
        />

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={deleting}>
            Cancelar
          </Button>
          <button
            onClick={handleDelete}
            disabled={confirmText !== 'ELIMINAR' || deleting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl 
                       hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {deleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const Settings = () => {
  const navigate = useNavigate();
  const { profile, user, setProfile, signOut } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    companyName: profile?.company_name || '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || '',
        companyName: profile.company_name || '',
      });
      // Load avatar from Supabase Storage
      if (user) {
        loadAvatar();
      }
    }
  }, [profile, user]);

  const loadAvatar = async () => {
    if (!user) return;
    try {
      const { data } = supabase.storage.from('avatars').getPublicUrl(`${user.id}/avatar`);
      // Check if file actually exists by doing a HEAD request concept - just set the URL optimistically
      setAvatarUrl(data.publicUrl);
    } catch {
      setAvatarUrl(null);
    }
  };

  // ── Upload Photo ────────────────────────────────────────────────────────────
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate type and size
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten imágenes (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no puede superar 2 MB.');
      return;
    }

    setUploadingPhoto(true);
    try {
      const filePath = `${user.id}/avatar`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarWithTimestamp = `${data.publicUrl}?t=${Date.now()}`;

      // Save URL to profile
      await supabase.from('profiles').update({ avatar_url: avatarWithTimestamp }).eq('id', user.id);

      setAvatarUrl(avatarWithTimestamp);
      setProfile({ ...profile!, full_name: formData.fullName, company_name: formData.companyName, avatar_url: avatarWithTimestamp } as any);
    } catch (err: any) {
      console.error('Upload error:', err);
      alert(`Error al subir la imagen: ${err.message}`);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // ── Remove Photo ────────────────────────────────────────────────────────────
  const handleRemovePhoto = async () => {
    if (!user) return;
    if (!window.confirm('¿Eliminar tu foto de perfil?')) return;

    setUploadingPhoto(true);
    try {
      await supabase.storage.from('avatars').remove([`${user.id}/avatar`]);
      await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id);
      setAvatarUrl(null);
      setProfile({ ...profile!, full_name: formData.fullName, company_name: formData.companyName, avatar_url: null } as any);
    } catch (err: any) {
      alert(`Error al eliminar la foto: ${err.message}`);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // ── Save Profile ────────────────────────────────────────────────────────────
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          company_name: formData.companyName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile({ ...profile!, full_name: formData.fullName, company_name: formData.companyName } as any);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      alert(`Error al actualizar el perfil: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ── Delete Account ──────────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    if (!user) return;
    try {
      // Delete storage files
      await supabase.storage.from('avatars').remove([`${user.id}/avatar`]);

      // Call the delete user function (requires a Supabase Edge Function or admin API)
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;

      await signOut();
      navigate('/');
    } catch (err: any) {
      alert(`Error al eliminar la cuenta: ${err.message || 'Contacta a soporte.'}`);
    }
  };

  const initials = formData.fullName
    ? formData.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Ajustes</h1>
          <p className="text-slate-500">Gestiona tu perfil y preferencias de la cuenta.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-primary-50 text-primary-600">
                <User size={18} /> Perfil
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card glass className="p-8">
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-100">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          onError={() => setAvatarUrl(null)}
                        />
                      ) : (
                        <span className="text-3xl font-display font-bold text-slate-400">{initials}</span>
                      )}
                    </div>
                    {uploadingPhoto && (
                      <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center">
                        <Loader2 className="animate-spin text-primary-600" size={24} />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-primary-600 transition-colors"
                    >
                      <Camera size={16} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-slate-900">Foto de Perfil</h3>
                    <p className="text-sm text-slate-500 mb-3">JPG, PNG o WEBP · Máx. 2 MB</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingPhoto}
                      >
                        <Upload size={14} className="mr-1" /> Cambiar
                      </Button>
                      {avatarUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={handleRemovePhoto}
                          disabled={uploadingPhoto}
                          className="text-red-500 hover:text-red-600 border-red-100 hover:bg-red-50"
                        >
                          <Trash2 size={14} className="mr-1" /> Eliminar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Empresa</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Email (No editable)</label>
                    <div className="relative opacity-60">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-100 rounded-2xl cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  {success ? (
                    <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                      <CheckCircle2 size={16} /> ¡Cambios guardados con éxito!
                    </p>
                  ) : <div />}
                  <Button type="submit" glow disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>Guardar Cambios <Save size={18} className="ml-2" /></>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Danger Zone */}
            <Card glass className="p-8 border border-red-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">Zona de Peligro</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Una vez eliminada la cuenta, todos tus datos, cotizaciones y pedidos se borrarán permanentemente.
                  </p>
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Trash2 size={16} className="mr-2" /> Eliminar mi cuenta
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
