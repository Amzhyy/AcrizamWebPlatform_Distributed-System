import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Quote {
  id: string;
  user_id: string;
  product_id: string;
  configuration: any;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  created_at: string;
  product?: {
    name: string;
    image_url: string;
  };
}

interface QuoteStore {
  quotes: Quote[];
  loading: boolean;
  fetchQuotes: () => Promise<void>;
  updateQuoteStatus: (quoteId: string, status: Quote['status']) => Promise<void>;
  approveAndCreateOrder: (quote: Quote) => Promise<void>;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  quotes: [],
  loading: false,

  fetchQuotes: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*, products(name, image_url)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ quotes: data || [] });
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      set({ loading: false });
    }
  },

  updateQuoteStatus: async (quoteId: string, status: Quote['status']) => {
    const { error } = await supabase
      .from('quotes')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', quoteId);

    if (error) throw error;

    // Update local state immediately
    set((state) => ({
      quotes: state.quotes.map((q) =>
        q.id === quoteId ? { ...q, status } : q
      ),
    }));
  },

  approveAndCreateOrder: async (quote: Quote) => {
    // 1. Update the quote status to approved
    const { error: quoteError } = await supabase
      .from('quotes')
      .update({ status: 'approved', updated_at: new Date().toISOString() })
      .eq('id', quote.id);

    if (quoteError) throw quoteError;

    // 2. Generate a human-readable order number
    const orderNumber = `ACR-${Date.now().toString().slice(-6)}`;

    // 3. Create a real order linked to this quote
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        quote_id: quote.id,
        user_id: quote.user_id,
        order_number: orderNumber,
        status: 'diseño',
        total_amount: quote.total_amount,
      });

    if (orderError) throw orderError;

    // 4. Update local state
    set((state) => ({
      quotes: state.quotes.map((q) =>
        q.id === quote.id ? { ...q, status: 'approved' } : q
      ),
    }));
  },
}));
