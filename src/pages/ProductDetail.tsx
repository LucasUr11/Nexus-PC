import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cpu, ShoppingCart, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products'; // Tu archivo de datos
import { ROUTE_PATHS } from '@/lib/index';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();

  // Buscamos el producto en tu base de datos por ID
  const product = products.find((p) => p.id === id);

  // Si el producto no existe (error de carga o ID incorrecto)
  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono">
        <div className="text-center">
          <p className="text-primary animate-pulse mb-4">// ERROR_404: UNIT_NOT_FOUND</p>
          <Link to={ROUTE_PATHS.PRODUCTS} className="text-white border border-white/10 px-4 py-2 hover:bg-white/5 transition-all">
            RETURN_TO_BASE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12">
      <div className="container mx-auto px-6">

        {/* Breadcrumbs Estilo Terminal */}
        <nav className="flex gap-2 mb-8 font-mono text-[10px] uppercase text-white/30">
          <Link to={ROUTE_PATHS.HOME} className="hover:text-primary transition-colors text-glow">ROOT</Link>
          <span>/</span>
          <Link to={ROUTE_PATHS.PRODUCTS} className="hover:text-primary transition-colors">UNITS</Link>
          <span>/</span>
          <span className="text-primary tracking-widest">{product.id}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* COLUMNA IZQUIERDA: Visual Scan (6/12) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square bg-[#080808] border border-white/5 overflow-hidden group">
              {/* Grid de Fondo con la corrección de backgroundSize */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              />

              <img
                src={product.images[0]}
                alt={product.name}
                className="relative z-10 w-full h-full object-contain p-12 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Corner Decorations (Esquinas industriales) */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
            </div>
          </div>

          {/* COLUMNA DERECHA: Data Panel (5/12) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase mb-2 block">
                // {product.category.toUpperCase()}_MODULE
              </span>
              <h1 className="text-4xl font-black text-white/90 italic uppercase tracking-tighter mb-4 leading-none">
                {product.name}
              </h1>
              <p className="text-white/50 text-[11px] leading-relaxed uppercase font-mono tracking-tight border-l-2 border-primary/30 pl-4">
                {product.description}
              </p>
            </div>

            {/* Technical Specs Grid (Ficha de datos) */}
            <div className="grid grid-cols-2 gap-2 border-y border-white/5 py-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col p-3 bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{key}</span>
                  <span className="text-xs font-mono text-white uppercase group-hover:text-primary transition-colors font-bold">{String(value)}</span>
                </div>
              ))}
            </div>

            {/* CTA Section (Acciones de compra) */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white tracking-tighter">$ {product.price.toLocaleString()}</span>
                  <span className="text-[9px] font-mono text-primary animate-pulse tracking-widest">// READY_FOR_DEPLOYMENT</span>
                </div>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter italic">
                  * Precio final sujeto a disponibilidad de stock del proveedor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 h-14 bg-primary text-black font-black uppercase tracking-widest rounded-none hover:bg-primary/90 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] group cursor-pointer">
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  AÑADIR_AL_INVENTARIO
                </Button>
                <Button variant="outline" className="h-14 border-white/10 rounded-none font-mono text-[10px] text-white/90 hover:text-primary/90 hover:border-primary/90 cursor-pointer tracking-widest uppercase hover:bg-white/5 px-8">
                  <Zap className="mr-2 h-3 w-3" />
                  CONFIG_BUILD
                </Button>
              </div>
            </div>
          </div>

        </div>

        <section className="mt-24 border-t border-white/5 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-primary" />
              <h2 className="text-xl font-black text-primary/90 italic uppercase tracking-tighter">
                Sistemas_Compatibles <span className="text-primary">/</span> Depuración
              </h2>
            </div>
            <Link to={ROUTE_PATHS.PRODUCTS} className="font-mono text-[10px] text-white/40 hover:text-primary transition-colors uppercase tracking-[0.2em]">
              Ver_Todo_el_Inventario +
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products
              .filter(p => p.id !== product.id && (
                p.category === 'processors' && p.specs.socket === product.specs.socket ||
                p.category === 'motherboards' && p.specs.socket === product.specs.socket ||
                p.category === 'graphics-cards' // Las GPUs suelen ser compatibles con todo
              ))
              .slice(0, 4)
              .map(compatibleProduct => (
                <ProductCard key={compatibleProduct.id} product={compatibleProduct} />
              ))}
          </div>
        </section>

      </div>
    </div>
  );
}