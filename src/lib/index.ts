/**
 * @file src/lib/index.ts
 * @description Rutas, tipos, interfaces y constantes para el e-commerce de componentes de PC.
 * © 2026 PC Premium Systems. Todos los derechos reservados.
 */

/**
 * Definición de rutas de navegación de la aplicación
 */
export const ROUTE_PATHS = {
  HOME: '/',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/productos/:id',
  CART: '/carrito',
  CHECKOUT: '/checkout',
} as const;

/**
 * Identificadores únicos de categorías
 */
export type CategoryId = 
  | 'processors' 
  | 'graphics-cards' 
  | 'motherboards' 
  | 'memory' 
  | 'storage' 
  | 'power-supplies' 
  | 'cases' 
  | 'peripherals' 
  | 'laptops';

/**
 * Interfaz para las categorías de productos
 */
export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image?: string;
}

/**
 * Especificaciones técnicas detalladas de un producto
 * Utiliza un formato flexible para adaptarse a diferentes tipos de hardware
 */
export interface ProductSpecs {
  brand: string;
  model: string;
  performance_tier: 'Entry' | 'Mid-Range' | 'High-End' | 'Enthusiast';
  // Campos adicionales dinámicos (ej: clock_speed, vram, wattage, etc.)
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interfaz principal para los productos del catálogo
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: CategoryId;
  images: string[];
  thumbnail: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  specs: ProductSpecs;
  featured?: boolean;
  newArrival?: boolean;
  tags?: string[];
}

/**
 * Interfaz para los elementos dentro del carrito de compras
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Constantes globales del sistema
 */
export const STORE_CONFIG = {
  NAME: 'Nexus PC',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  FREE_SHIPPING_THRESHOLD: 1500,
  TAX_RATE: 0.15,
} as const;