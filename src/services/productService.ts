import { supabase } from '../lib/supabase';

export interface DBProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_name?: string;
}

export const productService = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};
