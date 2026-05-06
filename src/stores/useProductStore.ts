import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  features: string[];
}

interface ProductStore {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      name: 'Exhibidor de Joyería Premium',
      description: 'Acrílico cristal de 6mm con bordes pulidos a diamante. Diseño minimalista para resaltar piezas exclusivas.',
      price: 1250,
      category: 'Comercial',
      image: 'https://images.unsplash.com/photo-1594913785162-e6785b4cd3d0?q=80&w=800&auto=format&fit=crop',
      features: ['Corte láser preciso', 'Alta transparencia', 'Resistente a rayaduras', 'Base reforzada'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0852',
      name: 'Letrero Neón Led Personalizado',
      description: 'Base de acrílico sólido con tecnología Neón Flex. Ideal para logotipos corporativos y decoración social.',
      price: 3400,
      category: 'Social',
      image: 'https://images.unsplash.com/photo-1563245332-692739e746e7?q=80&w=800&auto=format&fit=crop',
      features: ['Bajo consumo', 'Larga duración', 'Control remoto', 'Fácil instalación'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0853',
      name: 'Mesa Lateral de Acrílico',
      description: 'Pieza única termoformada en acrílico de 12mm. Resistencia estructural con ligereza visual absoluta.',
      price: 5800,
      category: 'Hogar',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
      features: ['Una sola pieza', 'Soporta hasta 20kg', 'Antiamarilleo', 'Fácil limpieza'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0854',
      name: 'Reconocimiento Corporativo "Elite"',
      description: 'Combinación de acrílico negro y cristal con grabado profundo. El estándar de oro para premiaciones.',
      price: 850,
      category: 'Comercial',
      image: 'https://images.unsplash.com/photo-1578353121590-2914a2a06326?q=80&w=800&auto=format&fit=crop',
      features: ['Estuche incluido', 'Grabado láser', 'Doble espesor', 'Envío express'],
    },
  ],
  categories: ['Todos', 'Comercial', 'Social', 'Hogar'],
  selectedCategory: 'Todos',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
