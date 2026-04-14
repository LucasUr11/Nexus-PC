import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Zap,
  Package,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { ROUTE_PATHS, STORE_CONFIG } from '@/lib/index';

/**
 * @file src/components/CartDrawer.tsx
 * @description Previsualización del carrito con estética de Terminal Nexus PC.
 */

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    itemCount
  } = useCart();

  const formatCurrency = (amount: number) => {
    return `${STORE_CONFIG.CURRENCY_SYMBOL}${amount.toLocaleString()}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md border-l border-white/10 bg-[#050505] p-0 text-white font-mono">

        {/* HEADER: STATUS_REPORT */}
        <SheetHeader className="px-6 py-5 border-b border-white/5 bg-[#080808]">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-sm font-black tracking-[0.2em] flex items-center gap-2 text-primary uppercase italic">
              <Zap className="w-4 h-4 fill-primary animate-pulse" />
              Manifest_De_Carga
              <span className="ml-2 text-[10px] bg-primary text-black px-2 py-0.5 font-black">
                {itemCount}_UNIDADES
              </span>
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* BODY: SCANNING_ITEMS */}
        <div className="flex-1 overflow-hidden relative">
          {/* Grid de fondo sutil */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-4 bg-white/5">
                <ShoppingBag className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">// INVENTARIO_VACIO</h3>
              <p className="text-[10px] text-white/40 mb-6 uppercase tracking-tighter">
                Sistema esperando carga de componentes de alto rendimiento.
              </p>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-none border-primary/40 text-primary text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
              >
                Volver al Catálogo
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <div className="space-y-6 py-8">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 p-3 border border-white/5 bg-white/2 group hover:border-primary/30 transition-colors"
                    >
                      
                      <div className="flex justify-between items-start">
                        <h4 className="text-[11px] font-black uppercase tracking-tight line-clamp-2 leading-none italic">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-white/20 hover:text-red-500 transition-colors ml-2"
                          aria-label="Eliminar módulo"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {/* Thumbnail con look de laboratorio */}
                      <div className="relative h-20 w-20 shrink-0 border border-white/10 bg-black overflow-hidden p-2">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="h-full w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-[11px] font-black uppercase tracking-tight line-clamp-2 leading-none">
                              <Link
                                to={ROUTE_PATHS.PRODUCT_DETAIL.replace(':id', item.product.id)}
                                onClick={() => onOpenChange(false)}
                                className="hover:text-primary transition-colors italic"
                              >
                                {item.product.name}
                              </Link>
                            </h4>
                          </div>
                          <p className="mt-1 text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">
                            {item.product.specs.brand} // {item.product.category.substring(0, 3)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Controles de cantidad estilo industrial */}
                          <div className="flex items-center border border-white/10 bg-black">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.product.id, item.quantity - 1);
                                } else {
                                  // Si es 1 y presiona menos, se elimina el producto
                                  removeItem(item.product.id);
                                }
                              }}
                              className="p-1 hover:text-red-500 transition-colors border-r border-white/10"
                              title={item.quantity === 1 ? "Eliminar unidad" : "Reducir cantidad"}
                            >
                              {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                            </button>

                            <span className="px-3 text-[10px] font-black min-w-8 text-center text-primary">
                              {item.quantity.toString().padStart(2, '0')}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:text-primary transition-colors border-l border-white/10"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="text-xs font-black tracking-tighter">
                            {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          )}
        </div>

        {/* FOOTER: TOTAL_ANALYSIS */}
        {items.length > 0 && (
          <SheetFooter className="flex-col border-t border-primary/20 bg-[#080808] p-6 sm:flex-col">
            <div className="space-y-2 mb-6 w-full">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.2em]">
                <span className="text-white/40 italic">SUBTOTAL_PROC</span>
                <span className="font-black">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-[0.2em]">
                <span className="text-white/40 italic">LOGISTICA_ENTREGA</span>
                <span className="font-black">
                  {shipping === 0 ? <span className="text-primary tracking-widest font-black">GRATIS_FREE</span> : formatCurrency(shipping)}
                </span>
              </div>
              <Separator className="my-4 bg-primary/20" />
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em] italic">TOTAL_FINAL_NET</span>
                <span className="text-2xl font-black italic tracking-tighter text-white">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button
                asChild
                className="w-full rounded-none h-14 text-xs font-black uppercase tracking-[0.3em] bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] group"
                onClick={() => onOpenChange(false)}
              >
                <Link to={ROUTE_PATHS.CHECKOUT}>
                  Iniciar_Despliegue
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full rounded-none h-10 text-[9px] uppercase tracking-widest text-white/40 hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                <Link to={ROUTE_PATHS.CART}>
                  Ver_Detalle_Inventario
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[8px] text-white/20 uppercase tracking-[0.4em] font-mono">
              <Package className="w-3 h-3" />
              Nexus_Secure_Packing // 2026
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}