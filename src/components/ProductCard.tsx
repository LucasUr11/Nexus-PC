import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Cpu, ShieldCheck, Eye } from 'lucide-react';
import { Product, STORE_CONFIG, ROUTE_PATHS } from '@/lib/index';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

/**
 * @file src/components/ProductCard.tsx
 * @description Tarjeta de producto elegante con diseño industrial sofisticado.
 * Enfocada en destacar el rendimiento y las especificaciones técnicas.
 */
export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCart();
  const detailPath = ROUTE_PATHS.PRODUCT_DETAIL.replace(':id', product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name}`, {
      description: 'UNIDAD AÑADIDA AL SISTEMA DE CARGA.',
      icon: <ShoppingCart className="h-4 w-4" />,
    });
  };

  const isFeatured = variant === 'featured' || product.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className={`group relative h-full overflow-hidden rounded-sm border-white/5 bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] ${isFeatured ? 'ring-1 ring-primary/30' : ''}`}>

        {/* 1. Header de "Status" Técnico */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Etiquetas de estado Estilo Industrial */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.newArrival && (
            <span className="bg-primary text-black text-[9px] font-black px-2 py-0.5 uppercase tracking-tighter">
              NEW_CORE
            </span>
          )}
          {isFeatured && (
            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-mono px-2 py-0.5 border border-white/10 uppercase flex items-center gap-1">
              <Zap className="h-2 w-2 text-primary fill-primary" /> RECOMMENDED
            </span>
          )}
        </div>

        {/* 2. Área de Imagen con Overlay Tech (ACTUALIZADO PARA RECUPERAR EL BLUR) */}
        <Link to={detailPath} className="relative block aspect-square overflow-hidden bg-[#080808]">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
          />

          {/* Gradiente de profundidad base (siempre visible) */}
          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-60 z-0" />

          {/* --- ESTE ES EL ELEMENTO CLAVE QUE RECUPERA EL DESENFOQUE --- */}
          {/* Usamos backdrop-blur-sm y z-10 para que esté por encima de la imagen */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm bg-background/20">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Button size="sm" variant="secondary" className="rounded-none font-mono text-[10px] tracking-widest uppercase border border-white/20">
                <Eye className="mr-2 h-3 w-3" /> Inspect_Unit
              </Button>
            </div>
          </div>
        </Link>

        <CardContent className="p-5">
          {/* Categoría y Rating Estilo Mono */}
          <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase">
              {product.specs.brand} // {product.category.substring(0, 3)}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <span className="text-white font-bold">{product.rating}</span>
              <span className="opacity-40">REV_{product.reviewsCount}</span>
            </div>
          </div>

          {/* Nombre con tipografía pesada */}
          <Link to={detailPath}>
            <h3 className="line-clamp-2 text-md font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
              {product.name}
            </h3>
          </Link>

          {/* Specs rápidas */}
          <div className="mt-4 flex gap-3">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-xs">
              <Cpu className="h-3 w-3 text-primary/60" />
              {product.specs.performance_tier}
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-xs">
              <ShieldCheck className="h-3 w-3 text-primary/60" />
              WARRANTY_PRO
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-5 pt-0">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <span className="text-[10px] font-mono text-muted-foreground/50 line-through tracking-tighter">
                  {STORE_CONFIG.CURRENCY_SYMBOL}{product.price.toLocaleString()}
                </span>
                <span className="text-xl font-mono font-bold text-white tracking-tighter">
                  {STORE_CONFIG.CURRENCY_SYMBOL}{product.discountPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-mono font-bold text-white tracking-tighter">
                {STORE_CONFIG.CURRENCY_SYMBOL}{product.price.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="group/btn relative h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary transition-all hover:bg-primary hover:text-black disabled:opacity-20 disabled:grayscale"
          >
            <ShoppingCart className="h-5 w-5 relative z-10" />
            <div className="absolute inset-0 bg-primary scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </CardFooter>

        {/* Stock Status Bar */}
        {product.stock > 0 && product.stock <= 5 ? (
          <div className="bg-amber-500/10 py-1 text-center text-[8px] font-mono font-bold text-amber-500 uppercase tracking-[0.2em] border-t border-amber-500/20">
            Stock_Crítico: Últimas_{product.stock}_Unidades
          </div>
        ) : product.stock === 0 ? (
          <div className="bg-destructive/10 py-1 text-center text-[8px] font-mono font-bold text-destructive uppercase tracking-[0.2em] border-t border-destructive/20">
            Out_of_Service // Stock_Empty
          </div>
        ) : (
          <div className="h-1 w-full bg-white/5 overflow-hidden">
            <div className="h-full bg-primary/20 w-full group-hover:animate-shimmer" />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
