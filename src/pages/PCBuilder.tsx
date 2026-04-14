import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Layout, 
  Monitor, 
  HardDrive, 
  Zap, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';

// 1. Definición de los pasos y sus iconos
const BUILD_STEPS = [
  { id: 'processors', label: 'Procesador', icon: Cpu, required: true },
  { id: 'motherboards', label: 'Placa Base', icon: Layout, required: true },
  { id: 'graphics-cards', label: 'Gráfica', icon: Monitor, required: false },
  { id: 'storage', label: 'Almacenamiento', icon: HardDrive, required: true },
] as const;

type StepId = typeof BUILD_STEPS[number]['id'];

export default function PCBuilder() {
  const [selectedParts, setSelectedParts] = useState<Partial<Record<StepId, any>>>({});
  const [activeStep, setActiveStep] = useState<StepId>('processors');

  // 2. Lógica de Filtrado por Compatibilidad
  const compatibleProducts = useMemo(() => {
    let filtered = products.filter(p => p.category === activeStep);

    // Regla: Socket (CPU <-> Motherboard)
    if (activeStep === 'motherboards' && selectedParts.processors) {
      filtered = filtered.filter(m => m.specs.socket === selectedParts.processors.specs.socket);
    }
    if (activeStep === 'processors' && selectedParts.motherboards) {
      filtered = filtered.filter(cpu => cpu.specs.socket === selectedParts.motherboards.specs.socket);
    }

    // Regla: RAM (Opcional si agregas RAM después)
    // if (activeStep === 'ram' && selectedParts.motherboards) ...

    return filtered;
  }, [activeStep, selectedParts]);

  // 3. Cálculos de Interfaz
  const totalPrice = Object.values(selectedParts).reduce((acc, curr) => acc + (curr?.price || 0), 0);
  
  const handleRemovePart = (stepId: StepId) => {
    const newParts = { ...selectedParts };
    delete newParts[stepId];
    setSelectedParts(newParts);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-12 text-white">
      <div className="container mx-auto px-6">
        
        {/* Header de la Terminal */}
        <header className="mb-12 border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-primary animate-pulse font-mono text-xs">// SYSTEM_BUILDER_ACTIVE</span>
            <span className="text-white/20 font-mono text-xs">V.1.0.42</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Configurador de <span className="text-primary text-glow">Alto Rendimiento</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: Selección de Componentes (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs de Categorías */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
              {BUILD_STEPS.map((step) => {
                const isSelected = selectedParts[step.id];
                const isActive = activeStep === step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center gap-3 px-6 py-4 border transition-all relative min-w-45 ${
                      isActive 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-white/5 text-white/40 hover:border-white/20'
                    }`}
                  >
                    <step.icon size={16} className={isActive ? 'animate-pulse' : ''} />
                    <div className="text-left">
                      <p className="text-[8px] font-mono uppercase opacity-50">Step_{step.id}</p>
                      <p className="text-[10px] font-bold tracking-widest uppercase">{step.label}</p>
                    </div>
                    {isSelected && <CheckCircle2 size={14} className="absolute top-2 right-2 text-primary" />}
                  </button>
                );
              })}
            </div>

            {/* Grid de Productos Filtrados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {compatibleProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`relative cursor-pointer transition-all hover:scale-[1.01] ${
                    selectedParts[activeStep]?.id === product.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedParts(prev => ({ ...prev, [activeStep]: product }))}
                >
                  <ProductCard product={product} />
                  {selectedParts[activeStep]?.id === product.id && (
                    <div className="absolute top-4 right-4 z-50 bg-primary text-black px-2 py-1 text-[8px] font-black uppercase">
                      Seleccionado
                    </div>
                  )}
                </div>
              ))}

              {compatibleProducts.length === 0 && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/2">
                  <AlertTriangle className="text-primary mb-4" size={32} />
                  <p className="font-mono text-xs text-white/40 uppercase tracking-[0.3em] text-center max-w-md">
                    // ERROR: Incompatibilidad Detectada o Inventario Vacío para este módulo.
                  </p>
                  <Button 
                    variant="link" 
                    className="mt-4 text-primary text-[10px] uppercase font-mono"
                    onClick={() => setSelectedParts({})}
                  >
                    Reiniciar Análisis de Sistema
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: Resumen de Construcción (4/12) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <div className="bg-[#080808] border border-white/10 p-6 relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <Zap size={80} />
                </div>

                <h2 className="font-black italic uppercase tracking-tighter text-xl mb-6 flex items-center gap-2">
                  Build_Manifest <span className="h-px flex-1 bg-white/10" />
                </h2>

                <div className="space-y-4 mb-8">
                  {BUILD_STEPS.map(step => {
                    const part = selectedParts[step.id];
                    return (
                      <div key={step.id} className="group relative">
                        <div className={`p-3 border transition-colors ${part ? 'border-primary/30 bg-primary/5' : 'border-white/5 bg-transparent'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{step.label}</span>
                            {part && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleRemovePart(step.id); }}
                                className="text-white/20 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                          <p className={`text-[10px] font-mono uppercase truncate ${part ? 'text-white' : 'text-white/10'}`}>
                            {part ? part.name : 'Awaiting_Selection...'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-tighter">Subtotal_Estimate</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                      $ {totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Button 
                    disabled={!selectedParts.processors || !selectedParts.motherboards}
                    className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:scale-[1.02] disabled:opacity-20 disabled:grayscale transition-all"
                  >
                    Confirmar_Configuración <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-[8px] font-mono text-white/20 text-center uppercase tracking-tight">
                    * El ensamblado técnico y stress-test se incluyen en el despliegue final.
                  </p>
                </div>
              </div>

              {/* Tips de Compatibilidad dinámicos */}
              {selectedParts.processors && (
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 text-[9px] font-mono uppercase tracking-tight leading-relaxed">
                  <p className="text-blue-400 mb-1 flex items-center gap-2">
                    <Zap size={10} /> Tip_Técnico:
                  </p>
                  <span className="text-white/40">
                    Has seleccionado un socket {selectedParts.processors.specs.socket}. 
                    Solo se muestran placas base compatibles para evitar errores de montaje.
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}