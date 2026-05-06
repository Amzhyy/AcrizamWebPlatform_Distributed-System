import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  full_name: string;
  company_name: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session, loading: false }),
  setProfile: (profile) => set({ profile }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null });
  },
}));

// Initialize auth listener
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('[Auth Store] onAuthStateChange event:', event, 'session:', session?.user?.email);
  const store = useAuthStore.getState();
  
  // Si la sesión es la misma y ya tenemos perfil, no hacemos nada
  if (store.session?.user.id === session?.user?.id && store.profile) {
    console.log('[Auth Store] Sesión idéntica, ignorando update.');
    return;
  }

  store.setSession(session);
  store.setUser(session?.user ?? null);
  
  if (session?.user) {
    console.log('[Auth Store] Usuario detectado, buscando perfil...');
    try {
      // Timeout para la consulta del perfil
      const profilePromise = supabase
        .from('profiles')
        .select('full_name, company_name')
        .eq('id', session.user.id)
        .single();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout buscando perfil')), 5000)
      );

      const { data, error } = await Promise.race([profilePromise, timeoutPromise]) as any;
      
      if (error) {
        console.warn('[Auth Store] Error al obtener perfil:', error.message);
        store.setProfile(null);
      } else {
        console.log('[Auth Store] Perfil cargado:', data);
        store.setProfile(data);
      }
    } catch (err) {
      console.warn('[Auth Store] Error inesperado u omitido en perfil:', err);
      store.setProfile(null);
    }
  } else {
    console.log('[Auth Store] No hay sesión, limpiando perfil.');
    store.setProfile(null);
  }
});

// Initial session check
supabase.auth.getSession().then(({ data: { session } }) => {
  const store = useAuthStore.getState();
  store.setSession(session);
  store.setUser(session?.user ?? null);
  if (!session) {
    useAuthStore.setState({ loading: false });
  }
});
