import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export type OrderStatus = 'diseño' | 'corte' | 'pulido' | 'terminado' | 'entregado';

export interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: OrderStatus;
  total_amount: number;
  product_name?: string;
  image_url?: string;
}

interface OrderStore {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,
  fetchOrders: async () => {
    set({ loading: true });
    try {
      // Joining with quotes and products to get names and images
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          quotes (
            products (
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedOrders = (data || []).map(order => ({
        ...order,
        product_name: (order.quotes as any)?.products?.name || 'Pedido Personalizado',
        image_url: (order.quotes as any)?.products?.image_url || 'https://images.unsplash.com/photo-1594913785162-e6785b4cd3d0?q=80&w=200'
      }));

      set({ orders: formattedOrders });
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      set({ loading: false });
    }
  },
  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;

    // Update local state immediately
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
    }));
  },
}));
