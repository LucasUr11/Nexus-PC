import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronLeft,
  Zap,
  Activity,
  Box,
  Database
} from 'lucide-react';
import { ROUTE_PATHS, STORE_CONFIG } from '@/lib/index';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

/**
 * @file src/pages/Cart.tsx
 * @description Panel de Auditoría de Inventario - NEXUS PC.
 */

export default function Cart() {
  const navigate = useNavigate();
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

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-white font-mono bg-[#050505]">
        <div className="w-20 h-20 border border-white/10 flex items-center justify-center mb-6 bg-white/5 relative">
          <div className="absolute inset-0 animate-pulse border border-primary/30" />
          <Database className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-[0.3em] mb-4 italic">// NO_DATA_DETECTED</h2>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8">El buffer de inventario está vacío.</p>
        <Button asChild className="rounded-none bg-primary text-black font-black uppercase tracking-widest px-8 h-12">
          <Link to={ROUTE_PATHS.PRODUCTS}>INICIAR_ESCANEADO</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 text-white font-mono">
      <div className="container mx-auto px-6">
        
        {/* Header de Auditoría */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-l-4 border-primary pl-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Inventory_Audit_System_v2.0</span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">
              Revisión de <span className="text-primary text-glow">Carga</span>
            </h1>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2">
             <span className="text-[10px] uppercase tracking-widest text-white/40 italic">Estado:</span>
             <span className="text-[10px] uppercase tracking-widest text-primary font-black ml-2">Listo_Para_Despliegue</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LISTA DE COMPONENTES (Auditoría Detallada) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold border-b border-white/5">
              <div className="col-span-6">Módulo_Hardware</div>
              <div className="col-span-3 text-center">Cantidad</div>
              <div className="col-span-3 text-right">Valor_Neto</div>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group relative bg-[#080808] border border-white/5 p-4 hover:border-primary/30 transition-all overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Info del Producto */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="w-20 h-20 bg-black border border-white/10 p-2 shrink-0 relative overflow-hidden">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[11px] font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                        <p className="text-[9px] text-white/30 uppercase mt-1 tracking-widest font-bold">
                          SKU: {item.product.id.substring(0, 10)} // CAT: {item.product.category}
                        </p>
                      </div>
                    </div>

                    {/* Controles de Cantidad */}
                    <div className="md:col-span-3 flex justify-center">
                      <div className="flex items-center border border-white/10 bg-black h-10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 hover:text-primary transition-colors border-r border-white/10"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-4 text-[11px] font-black text-primary">
                          {item.quantity.toString().padStart(2, '0')}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 hover:text-primary transition-colors border-l border-white/10"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Precio y Acción */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6">
                      <span className="text-sm font-black tracking-tighter italic">
                        {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-white/20 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button
              variant="link"
              onClick={() => navigate(ROUTE_PATHS.PRODUCTS)}
              className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-primary p-0 h-auto"
            >
              <ChevronLeft size={12} className="mr-2" /> Seguir_Añadiendo_Unidades
            </Button>
          </div>

          {/* SIDEBAR: MANIFIESTO_FINAL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#080808] border border-primary/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none">
                 <Box size={120} />
              </div>
              
              <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-white italic">
                Cálculo_De_Suministros
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-white/30 italic">Carga_Bruta</span>
                  <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-white/30 italic">Logística_Nacional</span>
                  <span className="font-bold">
                    {shipping === 0 ? <span className="text-primary tracking-widest font-black">CREDITO_OK</span> : formatCurrency(shipping)}
                  </span>
                </div>
                
                <Separator className="bg-white/5 my-6" />
                
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-primary italic font-black">Total_A_Liquidar</span>
                  <span className="text-4xl font-black italic tracking-tighter text-glow">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate(ROUTE_PATHS.CHECKOUT)}
                  className="w-full h-14 bg-primary text-black font-black uppercase tracking-[0.3em] rounded-none shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] hover:scale-[1.02] transition-all group text-xs"
                >
                  AUTORIZAR_DESPLIEGUE
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-2 opacity-30">
                <div className="border border-white/10 p-2 flex flex-col items-center">
                  <ShieldCheck size={14} className="mb-1" />
                  <span className="text-[7px] uppercase tracking-widest text-center">Secure_Core</span>
                </div>
                <div className="border border-white/10 p-2 flex flex-col items-center">
                  <Truck size={14} className="mb-1" />
                  <span className="text-[7px] uppercase tracking-widest text-center">Express_Log</span>
                </div>
              </div>
            </div>

            {/* Banner de Garantía Nexus */}
            <div className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-primary shrink-0 animate-pulse" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white mb-1">Certificación_Nexus_Pro</p>
                  <p className="text-[8px] text-white/40 uppercase leading-relaxed tracking-tight">
                    Cada componente en este manifiesto ha sido verificado para compatibilidad de sistema v.1.04.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}