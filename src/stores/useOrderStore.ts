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
      // Joining with quotes to get the product_id
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          quotes (
            product_id,
            products (
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedOrders = (data || []).map(order => {
        const quote = order.quotes as any;
        const productId = quote?.product_id;
        
        // Manual mapping for local images if the DB still has Unsplash or is missing
        const localImages: Record<string, string> = {
          'prod-001': '/images/Producto 1.jpg',
          'prod-002': '/images/Producto 2.jpg',
          'prod-003': '/images/Producto 3.jpg',
          'prod-004': '/images/Producto 4.jpg',
          'prod-005': '/images/Producto 5.jpg',
          'prod-006': '/images/Producto 6.jpg',
          'prod-007': '/images/Producto 7.jpg',
          'prod-008': '/images/Producto 8.jpg',
          'prod-009': '/images/Producto 9.jpg',
        };

        return {
          ...order,
          product_name: quote?.products?.name || 'Pedido Personalizado',
          image_url: localImages[productId] || quote?.products?.image_url || 'https://images.unsplash.com/photo-1594913785162-e6785b4cd3d0?q=80&w=200'
        };
      });

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
