import { useSyncExternalStore } from 'react';
import { Product, CartItem, STORE_CONFIG } from '@/lib/index';

/**
 * @file src/hooks/useCart.ts
 * @description Hook personalizado para la gestión global del carrito de compras.
 * Implementado utilizando el patrón de 'External Store' para asegurar sincronización entre componentes
 * sin dependencias externas adicionales, manteniendo persistencia en localStorage.
 * © 2026 PC Premium Systems. Todos los derechos reservados.
 */

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = 'nexus_pc_cart_v1';

// Estado inicial recuperado de localStorage
let currentState: CartState = {
  items: (() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })(),
};

// Conjunto de suscriptores para notificar cambios de estado
const listeners = new Set<() => void>();

const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot() {
    return currentState;
  },

  setState(nextItems: CartItem[]) {
    currentState = { items: nextItems };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    } catch (error) {
      console.error('Error al persistir el carrito:', error);
    }
    listeners.forEach((listener) => listener());
  },
};

/**
 * Hook useCart
 * Proporciona acceso al estado del carrito y métodos para su manipulación.
 */
export const useCart = () => {
  const { items } = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot
  );

  /**
   * Agrega un producto al carrito o incrementa su cantidad si ya existe.
   */
  const addItem = (product: Product, quantity: number = 1) => {
    const existingItemIndex = items.findIndex((item) => item.product.id === product.id);
    const newItems = [...items];

    if (existingItemIndex > -1) {
      const newQuantity = newItems[existingItemIndex].quantity + quantity;
      // Validamos contra el stock disponible
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: Math.min(newQuantity, product.stock),
      };
    } else {
      newItems.push({
        product,
        quantity: Math.min(quantity, product.stock),
      });
    }

    cartStore.setState(newItems);
  };

  /**
   * Elimina un producto específico del carrito.
   */
  const removeItem = (productId: string) => {
    const newItems = items.filter((item) => item.product.id !== productId);
    cartStore.setState(newItems);
  };

  /**
   * Actualiza la cantidad de un producto existente.
   */
  const updateQuantity = (productId: string, quantity: number) => {
    const newItems = items.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity: Math.max(1, Math.min(quantity, item.product.stock)),
        };
      }
      return item;
    });
    cartStore.setState(newItems);
  };

  /**
   * Vacía completamente el carrito.
   */
  const clearCart = () => {
    cartStore.setState([]);
  };

  /**
   * Cálculos financieros del carrito
   */
  const getTotals = () => {
    const subtotal = items.reduce((acc, item) => {
      const activePrice = item.product.discountPrice ?? item.product.price;
      return acc + activePrice * item.quantity;
    }, 0);

    // Envío gratuito si supera el umbral definido en STORE_CONFIG
    const shipping = subtotal >= STORE_CONFIG.FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25.0;
    const tax = subtotal * STORE_CONFIG.TAX_RATE;
    const total = subtotal + shipping + tax;
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount,
    };
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    ...getTotals(),
  };
};
