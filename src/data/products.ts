import { Product, Category } from '@/lib/index';
import { IMAGES } from '@/assets/images';

export const categories: Category[] = [
  {
    id: 'processors',
    name: 'Procesadores',
    description: 'Núcleos de alta frecuencia para procesamiento crítico y gaming.',
  },
  {
    id: 'graphics-cards',
    name: 'Tarjetas Gráficas',
    description: 'Aceleración visual de última generación para renderizado y trazado de rayos.',
  },
  {
    id: 'motherboards',
    name: 'Placas Madre',
    description: 'Cimientos lógicos con arquitectura de energía robusta.',
  },
  {
    id: 'peripherals',
    name: 'Periféricos',
    description: 'Herramientas de precisión para interacción humana de alto nivel.',
  },
];

export const products: Product[] = [
  // --- PROCESADORES (FOCO HIGH-END) ---
  {
    id: 'p1',
    name: 'Intel Core i9-14900K Processor',
    slug: 'intel-core-i9-14900k',
    description: 'Arquitectura híbrida de 24 núcleos. La cima del rendimiento térmico y de procesamiento para estaciones de trabajo.',
    price: 890000,
    category: 'processors',
    images: [IMAGES.PC_COMPONENTS_1],
    thumbnail: IMAGES.PC_COMPONENTS_1,
    stock: 5,
    rating: 4.9,
    reviewsCount: 12,
    featured: true,
    newArrival: true,
    tags: ['LGA1700', '6.0GHz', 'Unlocked'],
    specs: {
      brand: 'Intel',
      model: 'i9-14900K',
      performance_tier: 'Enthusiast',
      cores: 24,
      threads: 32,
      socket: 'LGA1700' // Importante para tu PC Builder
    },
  },

  // --- MOTHERBOARDS (COMPATIBILIDAD) ---
  {
    id: 'p4',
    name: 'ASUS ROG Maximus Z790 Dark Hero',
    slug: 'asus-rog-maximus-z790-dark-hero',
    description: 'Placa base de grado laboratorio con soporte nativo para DDR5 y PCIe 5.0.',
    price: 720000,
    category: 'motherboards',
    images: [IMAGES.PC_COMPONENTS_2],
    thumbnail: IMAGES.PC_COMPONENTS_2,
    stock: 3,
    rating: 4.9,
    reviewsCount: 8,
    featured: true,
    newArrival: false,
    tags: ['WiFi 7', 'Z790', 'DDR5'],
    specs: {
      brand: 'ASUS',
      model: 'Maximus Z790 Dark Hero',
      performance_tier: 'High-End',
      socket: 'LGA1700', // Match con el CPU
      chipset: 'Z790',
      pcie_version: 'Gen 5.0',
    },
  },

  // --- GPUS (PESO PESADO) ---
  {
    id: 'p9',
    name: 'MSI GeForce RTX 4080 Super Suprim X',
    slug: 'msi-rtx-4080-super-suprim-x',
    description: 'Diseño en metal cepillado con sistema Tri Frozr 3S. El equilibrio perfecto entre estética y potencia bruta.',
    price: 1850000,
    category: 'graphics-cards',
    images: [IMAGES.GRAPHICS_CARD_4],
    thumbnail: IMAGES.GRAPHICS_CARD_4,
    stock: 2,
    rating: 5.0,
    reviewsCount: 15,
    featured: true,
    newArrival: false,
    tags: ['NVIDIA', 'Suprim', '16GB VRAM'],
    specs: {
      brand: 'MSI',
      model: 'RTX 4080 Super',
      performance_tier: 'High-End',
      vram: '16GB GDDR6X',
      cooling: 'Tri Frozr 3S',
    },
  },

  // --- PERIFÉRICOS (EL NUEVO NICHO) ---
  {
    id: 'p7',
    name: 'Logitech G Pro X Superlight 2',
    slug: 'logitech-g-pro-x-superlight-2',
    description: 'El mouse inalámbrico más ligero y preciso del mundo, diseñado para eSports profesionales.',
    price: 195000,
    category: 'peripherals',
    images: [IMAGES.GAMING_SETUP_2],
    thumbnail: IMAGES.GAMING_SETUP_2,
    stock: 15,
    rating: 4.9,
    reviewsCount: 45,
    featured: true,
    newArrival: true,
    tags: ['Wireless', '60g', 'Lightspeed'],
    specs: {
      brand: 'Logitech G',
      model: 'Pro X Superlight 2',
      performance_tier: 'High-End',
      sensor: 'HERO 2',
      weight: '60g',
    },
  },
  {
    id: 'p11',
    name: 'Keychron Q1 Pro Custom Keyboard',
    slug: 'keychron-q1-pro-mechanical',
    description: 'Cuerpo de aluminio CNC con switches lubricados. La experiencia de escritura definitiva.',
    price: 280000,
    category: 'peripherals',
    images: [IMAGES.GAMING_SETUP_1],
    thumbnail: IMAGES.GAMING_SETUP_1,
    stock: 5,
    rating: 5.0,
    reviewsCount: 22,
    featured: true,
    newArrival: true,
    tags: ['Mechanical', 'Hotswap', 'Aluminium'],
    specs: {
      brand: 'Keychron',
      model: 'Q1 Pro',
      performance_tier: 'Enthusiast',
      switches: 'K Pro Red',
      layout: '75%',
    },
  },
];

export const featuredProducts = products.filter(product => product.featured);