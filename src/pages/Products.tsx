import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { products, categories } from '@/data/products';
import { Product, STORE_CONFIG } from '@/lib/index';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'featured';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  tiers: string[];
}

const ITEMS_PER_PAGE = 8;

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('featured');

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, Math.max(...products.map(p => p.price))],
    brands: [],
    tiers: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortOrder]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.specs.model.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          filters.categories.length === 0 || filters.categories.includes(product.category);

        const matchesPrice =
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

        const matchesBrand =
          filters.brands.length === 0 || filters.brands.includes(product.specs.brand);

        const matchesTier =
          filters.tiers.length === 0 || filters.tiers.includes(product.specs.performance_tier);

        return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesTier;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'newest':
            return a.newArrival === b.newArrival ? 0 : a.newArrival ? -1 : 1;
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'featured':
          default:
            return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
        }
      });
  }, [searchQuery, filters, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Section */}
      <div className="relative pt-20 pb-12 mb-8 overflow-hidden border-b border-white/5 bg-[#050505]">
        {/* Patrón de Grid de fondo (Estilo Home) */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <span className="text-[10px] font-mono tracking-[0.5em] text-primary uppercase mb-3 block">
              // SYSTEM_RESOURCES / UNIT_INDEX_V2
            </span>

            <h1 className="text-5xl text-primary/40 font-black tracking-tighter uppercase italic mb-4">
              Catálogo de <span className="text-primary text-glow">Performance</span>
            </h1>

            <p className="text-white/40 font-mono text-[11px] max-w-xl leading-relaxed uppercase tracking-tight">
              ACCEDIENDO A BASE DE DATOS DE COMPONENTES... FILTRADO POR ESPECIFICACIONES TÉCNICAS
              PARA DESPLIEGUE DE ALTO RENDIMIENTO.
            </p>

          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <ProductFilters onFiltersChange={handleFiltersChange} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-200">
            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#0a0a0a] border border-white/5 p-2 rounded-none relative">
              {/* El Buscador con estilo de Terminal */}
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-3.5 h-3.5 text-primary group-focus-within:animate-pulse" />
                </div>
                <Input
                  placeholder="BUSCAR_UNIDAD_EN_SISTEMA..."
                  className="pl-10 bg-transparent border-none font-mono text-[11px] tracking-wider uppercase focus-visible:ring-0 placeholder:text-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-px bg-primary/30 w-full scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              <div className="flex items-center gap-2 px-2">
                {/* Selector de Ordenamiento con estilo minimalista */}
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
                  <SelectTrigger className="w-48 bg-white/5 border-white/10 font-mono text-[10px] tracking-widest uppercase h-9 rounded-none">
                    <SelectValue placeholder="ORDENAR_POR" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/10 rounded-none">
                    <SelectItem value="featured" className="text-[10px] font-mono uppercase tracking-widest">ORD_DESTACADOS</SelectItem>
                    <SelectItem value="price-asc" className="text-[10px] font-mono uppercase tracking-widest">ORD_PRECIO_MIN</SelectItem>
                    <SelectItem value="price-desc" className="text-[10px] font-mono uppercase tracking-widest">ORD_PRECIO_MAX</SelectItem>
                  </SelectContent>
                </Select>

                {/* Botones de Vista (Grid/List) */}
                <div className="flex border border-white/10 p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none ${viewMode === 'grid' ? 'bg-primary text-black' : 'text-white/40'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none ${viewMode === 'list' ? 'bg-primary text-black' : 'text-white/40'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters / Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground font-mono">
                MOSTRANDO <span className="text-foreground font-bold">{paginatedProducts.length}</span> DE <span className="text-foreground font-bold">{filteredProducts.length}</span> PRODUCTOS
              </p>
              {(filters.categories.length > 0 || searchQuery) && (
                <Button
                  variant="link"
                  className="text-primary text-xs h-auto p-0"
                  onClick={() => {
                    setFilters({ categories: [], priceRange: [0, 5000], brands: [], tiers: [] });
                    setSearchQuery('');
                  }}
                >
                  Limpiar todo
                </Button>
              )}
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <motion.div
                layout
                className={viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
                }
              >
                <AnimatePresence mode='popLayout'>
                  {paginatedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-2xl bg-secondary/10">
                <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold">No se encontraron productos</h3>
                <p className="text-muted-foreground mt-2">Intenta ajustar los filtros o la búsqueda para obtener más resultados.</p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setFilters({ categories: [], priceRange: [0, 5000], brands: [], tiers: [] });
                    setSearchQuery('');
                  }}
                >
                  Restablecer Catálogo
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full font-mono ${currentPage === page ? 'shadow-lg shadow-primary/20' : ''
                        }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Bottom Comparison CTA (Industrial Feel) */}
      <div className="container mx-auto px-4 mt-24">
        <div className="bg-foreground text-background p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">¿Necesitas asesoramiento técnico?</h2>
            <p className="text-background/70">
              Nuestros especialistas en hardware pueden ayudarte a configurar el setup perfecto para tu flujo de trabajo.
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 relative z-10"
            size="lg"
          >
            Contactar Experto
          </Button>
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        </div>
      </div>
    </div>
  );
}
