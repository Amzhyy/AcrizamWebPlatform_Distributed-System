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
      image: '/images/Producto 1.jpg',
      features: ['Corte láser preciso', 'Alta transparencia', 'Resistente a rayaduras', 'Base reforzada'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0852',
      name: 'Letrero Neón Led Personalizado',
      description: 'Base de acrílico sólido con tecnología Neón Flex. Ideal para logotipos corporativos y decoración social.',
      price: 3400,
      category: 'Social',
      image: '/images/Producto 2.jpg',
      features: ['Bajo consumo', 'Larga duración', 'Control remoto', 'Fácil instalación'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0853',
      name: 'Mesa Lateral de Acrílico',
      description: 'Pieza única termoformada en acrílico de 12mm. Resistencia estructural con ligereza visual absoluta.',
      price: 5800,
      category: 'Hogar',
      image: '/images/Producto 3.jpg',
      features: ['Una sola pieza', 'Soporta hasta 20kg', 'Antiamarilleo', 'Fácil limpieza'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0854',
      name: 'Reconocimiento Corporativo "Elite"',
      description: 'Combinación de acrílico negro y cristal con grabado profundo. El estándar de oro para premiaciones.',
      price: 850,
      category: 'Comercial',
      image: '/images/Producto 4.jpg',
      features: ['Estuche incluido', 'Grabado láser', 'Doble espesor', 'Envío express'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0855',
      name: 'Tómbola de Acrílico Cristal',
      description: 'Ideal para sorteos y eventos. Diseño giratorio con cerradura de seguridad.',
      price: 2100,
      category: 'Social',
      image: '/images/Producto 5.jpg',
      features: ['Cerradura de seguridad', 'Giro suave', 'Acrílico 6mm', 'Capacidad 500 boletos'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0856',
      name: 'Podio / Atril de Acrílico',
      description: 'Atril elegante para conferencias. Completamente transparente con base pesada anticaídas.',
      price: 7500,
      category: 'Comercial',
      image: '/images/Producto 6.jpg',
      features: ['Ergonómico', 'Acrílico de 12mm', 'Espacio para logo', 'Fácil armado'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0857',
      name: 'Señalética Corporativa 3D',
      description: 'Letras individuales en acrílico de color montadas sobre base cristal. Alta visibilidad.',
      price: 1800,
      category: 'Comercial',
      image: '/images/Producto 7.jpg',
      features: ['Corte preciso CNC', 'Colores institucionales', 'Incluye chapetones', 'Larga vida en interior'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0858',
      name: 'Caja Organizadora Multifuncional',
      description: 'Caja con separadores removibles, perfecta para maquillaje, dulces o papelería.',
      price: 450,
      category: 'Hogar',
      image: '/images/Producto 8.jpg',
      features: ['Separadores ajustables', 'Tapa con bisagra', 'Fácil limpieza', 'Diseño compacto'],
    },
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0859',
      name: 'Base para Pasteles (Tiered Stand)',
      description: 'Base de 3 niveles de acrílico cristal grueso. El centro de atención para eventos.',
      price: 1100,
      category: 'Social',
      image: '/images/Producto 9.jpg',
      features: ['Desmontable', 'Fácil de transportar', 'Bordes pulidos', 'Soporta 15kg'],
    },
  ],
  categories: ['Todos', 'Comercial', 'Social', 'Hogar'],
  selectedCategory: 'Todos',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
