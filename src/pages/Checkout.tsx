import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Package, 
  Lock,
  Wallet,
  Zap,
  Activity,
  Box
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ROUTE_PATHS, STORE_CONFIG } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

/**
 * @file src/pages/Checkout.tsx
 * @description Interfaz de autorización y despliegue de logística NEXUS PC.
 */

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0 && step !== 'success') {
      navigate(ROUTE_PATHS.PRODUCTS);
    }
  }, [items, step, navigate]);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-6 py-32 min-h-screen flex flex-col items-center justify-center text-center font-mono">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="mb-12 relative"
        >
          <div className="w-32 h-32 border-2 border-primary/20 rounded-none flex items-center justify-center mx-auto mb-8 relative">
             <div className="absolute inset-0 border border-primary animate-ping opacity-20" />
             <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
            Despliegue <span className="text-primary text-glow">Exitoso</span>
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto uppercase tracking-widest leading-relaxed">
            Orden #{Math.random().toString(36).substr(2, 9).toUpperCase()} // Procesada por el núcleo central.
            Tu hardware está siendo preparado para el transporte.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="rounded-none border-white/10 uppercase tracking-widest text-[10px]">
            <Link to={ROUTE_PATHS.HOME}>Retornar_Base</Link>
          </Button>
          <Button asChild className="rounded-none bg-primary text-black font-black uppercase tracking-widest text-[10px]">
            <Link to={ROUTE_PATHS.PRODUCTS}>Nuevo_Pedido</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 text-white font-mono">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header con look de terminal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-l-4 border-primary pl-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Protocol_Secure_Checkout</span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">
              Autorizar <span className="text-primary">Envío</span>
            </h1>
          </div>

          <nav className="flex items-center gap-4 bg-white/5 p-2 border border-white/10">
            <StepIndicator currentStep={step} targetStep="shipping" label="LOGISTICA" icon={<Truck size={14} />} />
            <ChevronRight className="w-3 h-3 text-white/20" />
            <StepIndicator currentStep={step} targetStep="payment" label="TRANSACCION" icon={<CreditCard size={14} />} />
            <ChevronRight className="w-3 h-3 text-white/20" />
            <StepIndicator currentStep={step} targetStep="review" label="VERIFICACION" icon={<ShieldCheck size={14} />} />
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-[#080808] border border-white/10 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Truck size={60}/></div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary italic flex items-center gap-2">
                      // DATOS_DE_LOGISTICA
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase text-white/40">Nombre_Operador</Label>
                        <Input placeholder="JUAN" className="rounded-none border-white/10 bg-black/50 focus:border-primary transition-all uppercase placeholder:opacity-20" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase text-white/40">Apellido_Operador</Label>
                        <Input placeholder="PEREZ" className="rounded-none border-white/10 bg-black/50 focus:border-primary transition-all uppercase placeholder:opacity-20" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] uppercase text-white/40">Dirección_De_Entrega</Label>
                        <Input placeholder="CALLE FALSA 123" className="rounded-none border-white/10 bg-black/50 focus:border-primary transition-all uppercase placeholder:opacity-20" />
                      </div>
                    </div>

                    <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/5">
                      <Link to={ROUTE_PATHS.CART} className="text-[10px] text-white/20 hover:text-white flex items-center gap-2 uppercase tracking-widest">
                        <ArrowLeft size={12} /> Abortar_Operacion
                      </Link>
                      <Button onClick={() => setStep('payment')} className="rounded-none bg-primary text-black font-black uppercase text-[10px] tracking-[0.2em] px-8 h-12">
                        Siguiente_Fase
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ... Los otros pasos (Payment/Review) seguirían este mismo patrón de inputs y cards ... */}
            </AnimatePresence>
          </div>

          {/* Sidebar: MANIFIESTO_RESUMEN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#080808] border border-primary/20 p-6 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 italic text-white/60">
                Manifiesto_De_Carga
              </h2>
              
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase leading-tight line-clamp-1 italic">{item.product.name}</p>
                      <p className="text-[9px] text-white/20 uppercase font-mono">ID_{item.product.id.substring(0,8)} // x{item.quantity}</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/60">
                      ${((item.product.discountPrice ?? item.product.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3 text-[10px] uppercase">
                <div className="flex justify-between text-white/40">
                  <span>Subtotal_Neto</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>Logistica_Drop</span>
                  <span className={shipping === 0 ? "text-primary font-black" : "text-white"}>
                    {shipping === 0 ? "CREDITO_FREE" : `$${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-primary font-black tracking-widest">TOTAL_FINAL_USD</span>
                  <span className="text-3xl font-black italic tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 p-3 bg-white/5 border border-white/10 grayscale opacity-40">
                <Lock size={12} className="text-primary" />
                <span className="text-[8px] uppercase tracking-widest">Encriptación_AES_256_Activa</span>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Garantía_Nexus_Core</p>
                <p className="text-[9px] text-white/40 leading-relaxed uppercase">
                  Soporte técnico prioritario y 24 meses de cobertura integral incluidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-componente del indicador de pasos con el nuevo look
function StepIndicator({ currentStep, targetStep, label, icon }: { currentStep: CheckoutStep, targetStep: CheckoutStep, label: string, icon: any }) {
  const steps: CheckoutStep[] = ['shipping', 'payment', 'review', 'success'];
  const isActive = currentStep === targetStep;
  const isCompleted = steps.indexOf(currentStep) > steps.indexOf(targetStep);

  return (
    <div className={`flex items-center gap-2 transition-all ${isActive ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`p-1.5 border ${isActive ? 'border-primary bg-primary/20 text-primary' : isCompleted ? 'border-primary/50 text-primary/50' : 'border-white/20'}`}>
        {icon}
      </div>
      <span className="text-[8px] font-black tracking-[0.2em] hidden sm:block italic">{label}</span>
    </div>
  );
}