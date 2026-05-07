import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efknzbekfvhykekukiui.supabase.co';
const supabaseKey = 'sb_publishable_9WM8NCcNiWIdpRIS21YAMA_1mXcN_9s';

const supabase = createClient(supabaseUrl, supabaseKey);

async function register() {
  console.log('--- Intentando dar de alta al Administrador ---');
  const email = 'amzhyycyr@gmail.com';
  const password = '123moy';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error en Auth:', error.message);
  } else {
    console.log('Usuario creado en Auth con éxito.');
    
    // Intentar crear el perfil
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name: 'Administrador Acrizam',
          role: 'admin'
        });
      
      if (profileError) {
        console.warn('Nota: No se pudo crear el perfil automáticamente, pero el usuario ya existe.');
      } else {
        console.log('Perfil de administrador vinculado correctamente.');
      }
    }
  }
  console.log('\nProceso terminado. Ya puedes intentar loguear en la web.');
}

register();
