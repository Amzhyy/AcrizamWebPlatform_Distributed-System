import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efknzbekfvhykekukiui.supabase.co';
const supabaseKey = 'sb_publishable_9WM8NCcNiWIdpRIS21YAMA_1mXcN_9s';

const supabase = createClient(supabaseUrl, supabaseKey);

async function register() {
  const { data, error } = await supabase.auth.signUp({
    email: 'amzhyycyr@gmail.com',
    password: '123moy',
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success:', data.user?.email);
  }
}

register();
