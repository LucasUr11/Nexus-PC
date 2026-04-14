import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CategoryId, STORE_CONFIG } from '@/lib/index';
import { categories, products } from '@/data/products';

interface FilterState {
  search: string;
  categories: CategoryId[];
  priceRange: [number, number];
  tiers: string[];
  brands: string[];
  specs: Record<string, string[]>;
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const maxPriceInCatalog = useMemo(() =>
    Math.ceil(Math.max(...products.map(p => p.price))),
    []
  );

  const uniqueBrands = useMemo(() =>
    Array.from(new Set(products.map(p => p.specs.brand))).sort(),
    []
  );

  const performanceTiers = ['Entry', 'Mid-Range', 'High-End', 'Enthusiast'];

  const initialFilters: FilterState = {
    search: '',
    categories: [],
    priceRange: [0, maxPriceInCatalog],
    tiers: [],
    brands: [],
    specs: {},
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleSpecToggle = (specLabel: string, value: string) => {
    setFilters(prev => {
      const currentSpecs = prev.specs[specLabel] || [];
      return {
        ...prev,
        specs: {
          ...prev.specs,
          [specLabel]: currentSpecs.includes(value)
            ? currentSpecs.filter(v => v !== value)
            : [...currentSpecs, value]
        }
      };
    });
  };

  const EXTRA_FILTERS: Record<string, { label: string; options: string[] }[]> = {
    'processors': [
      { label: 'SOCKET', options: ['AM4', 'AM5', 'LGA1700', 'LGA1200'] },
      { label: 'CORES', options: ['4_CORES', '6_CORES', '8_CORES', '12+_CORES'] }
    ],
    'graphics-cards': [
      { label: 'VRAM_CAPACITY', options: ['8GB', '12GB', '16GB', '24GB'] },
      { label: 'MEMORY_TYPE', options: ['GDDR6', 'GDDR6X'] }
    ],
    'motherboards': [
      { label: 'CHIPSET', options: ['X670', 'B650', 'Z790', 'B760'] },
      { label: 'FORM_FACTOR', options: ['ATX', 'MICRO-ATX', 'ITX'] }
    ]
  };

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFiltersChange(filters);
    }, 300); // Solo filtra 300ms después de que el usuario deja de mover el slider

    return () => clearTimeout(handler);
  }, [filters, onFiltersChange]);

  const handleToggle = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: (prev[key] as any[]).includes(value)
        ? (prev[key] as any[]).filter(item => item !== value)
        : [...(prev[key] as any[]), value]
    }));
  };

  return (
    <div className="w-full bg-[#080808] border border-white/5 p-6 sticky top-24 rounded-none max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
      {/* Header del Panel */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-primary animate-pulse" />
          <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-white/80">Filter_Engine</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilters(initialFilters)}
          className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors h-7 px-2 uppercase"
        >
          <RotateCcw className="w-3 h-3 mr-1" /> Reset
        </Button>
      </div>

      {/* Input de Búsqueda Estilo Terminal */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="SEARCH_COMPONENT..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="pl-9 bg-white/5 border-white/10 rounded-none font-mono text-[10px] tracking-widest uppercase focus-visible:ring-1 focus-visible:ring-primary/50"
        />
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price']} className="space-y-2">
        {[
          { id: 'categories', label: 'CATEGORIES', items: categories, type: 'category' },
          { id: 'brands', label: 'MANUFACTURERS', items: uniqueBrands, type: 'brand' },
          { id: 'tier', label: 'PERFORMANCE_TIER', items: performanceTiers, type: 'tier' }
        ].map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border-white/5">
            <AccordionTrigger className="py-3 hover:no-underline group">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 group-hover:text-primary transition-colors uppercase">
                // {section.label}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-4 space-y-3">
              {section.items.map((item: any) => {
                const id = typeof item === 'string' ? item : item.id;
                const label = typeof item === 'string' ? item : item.name;
                const isChecked = (filters as any)[section.id === 'tier' ? 'tiers' : section.id].includes(id);

                return (
                  <div key={id} className="flex items-center space-x-3 group cursor-pointer"
                    onClick={() => handleToggle(section.id === 'tier' ? 'tiers' : (section.id as any), id)}>
                    <Checkbox
                      checked={isChecked}
                      className="rounded-none border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label className={`text-[11px] font-mono uppercase tracking-tight cursor-pointer transition-colors ${isChecked ? 'text-primary' : 'text-white/60 group-hover:text-white'}`}>
                      {label}
                    </Label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}

        {filters.categories.map(catId => (
          <React.Fragment key={`dynamic-${catId}`}>
            {EXTRA_FILTERS[catId]?.map((spec) => (
              <AccordionItem key={spec.label} value={spec.label} className="border-white/5 bg-primary/5">
                <AccordionTrigger className="py-3 hover:no-underline group">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-primary group-hover:brightness-125 transition-all uppercase">
            // DETECTED_{spec.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-4 space-y-3">
                  {spec.options.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-3 group cursor-pointer"
                      onClick={() => handleSpecToggle(spec.label.toLowerCase(), option)}
                    >
                      <Checkbox
                        checked={filters.specs[spec.label.toLowerCase()]?.includes(option)}
                        className="rounded-none border-primary/40 data-[state=checked]:bg-primary"
                      />
                      <Label className="text-[10px] font-mono uppercase tracking-tight cursor-pointer text-white/70 group-hover:text-primary">
                        {option}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </React.Fragment>
        ))}

        {/* Módulo de Precio con Slider Técnico */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline group">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 group-hover:text-primary uppercase">
              // PRICE_RANGE
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-6 px-1">
            <Slider
              min={0}
              max={maxPriceInCatalog}
              step={100}
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
              className="mb-6"
            />
            <div className="flex items-center justify-between font-mono text-[10px]">
              <div className="bg-white/5 px-3 py-1 border border-white/10 text-primary">
                {STORE_CONFIG.CURRENCY_SYMBOL}{filters.priceRange[0].toLocaleString()}
              </div>
              <div className="h-px w-4 bg-white/10" />
              <div className="bg-white/5 px-3 py-1 border border-white/10 text-white">
                {STORE_CONFIG.CURRENCY_SYMBOL}{filters.priceRange[1].toLocaleString()}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="w-full bg-primary text-black hover:bg-primary/90 font-black tracking-[0.2em] uppercase rounded-none h-12 transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
        onClick={() => onFiltersChange(filters)}
      >
        Execute_Filter
      </Button>
    </div>
  );
}