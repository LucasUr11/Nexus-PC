import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Search,
  Cpu,
  Menu,
  X,
  ChevronDown,
  Monitor,
  Laptop,
  MousePointer2,
  Github,
  Twitter,
  Instagram,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTE_PATHS, STORE_CONFIG } from '@/lib/index';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartDrawer } from '@/components/CartDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: ROUTE_PATHS.HOME },
    { name: 'Catálogo', path: ROUTE_PATHS.PRODUCTS },
    { name: 'Laptops', path: `${ROUTE_PATHS.PRODUCTS}?category=laptops` },
    { name: 'Componentes', path: ROUTE_PATHS.PRODUCTS, hasDropdown: true },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Banner */}
      <div className="bg-foreground text-background py-2 px-4 text-center text-xs font-medium tracking-wider">
        ENVÍO GRATIS EN ÓRDENES SUPERIORES A {STORE_CONFIG.CURRENCY_SYMBOL}{STORE_CONFIG.FREE_SHIPPING_THRESHOLD}
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${isScrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 h-16'
          : 'bg-transparent h-24'
          }`}
      >
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo con efecto Glow */}
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-3 group">

            {/* El Icono.- */}
            <div className="w-10 h-10 ">
              <img
                src="././public/Nexus_PC.png"
                alt="Nexus PC Logo"
                className="w-10 h-10 object-cover rounded-xl"
              />
            </div>

            {/* El Nombre de la Marca.- */}
            <span
              className={`text-xl font-black tracking-tighter uppercase italic transition-colors duration-300 ${isScrolled
                ? 'text-white'
                : 'text-zinc-900 drop-shadow-sm'
                }`}
            >
              NEXUS PC<span className="text-primary not-italic">.</span>
            </span>
          </Link>

          {/* Navegación con Hover animado */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all duration-300 ${isActive
                    ? 'text-primary'
                    : isScrolled
                      ? 'text-white hover:text-primary' // Color cuando hay scroll (oscuro/definido)
                      : 'text-zinc-900 hover:text-primary drop-shadow-md' // Color inicial (blanco con sombra para legibilidad)
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Acciones Minimalistas */}
          <div className="flex items-center gap-6">
            {/* Ejemplo para el icono de búsqueda */}
            <Search
              className={`w-5 h-5 transition-all duration-300 cursor-pointer ${isScrolled
                ? 'text-white hover:text-primary'
                : 'text-zinc-900 hover:text-primary drop-shadow-md'
                }`}
            />

            {/* Ejemplo para el botón del carrito */}
            <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart
                className={`w-5 h-5 transition-all duration-300 ${isScrolled
                  ? 'text-white group-hover:text-primary'
                  : 'text-zinc-900 group-hover:text-primary drop-shadow-md'
                  }`}
              />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white text-[10px] border-black">
                  {itemCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

            {/* Brand Block */}
            <div className="md:col-span-4 space-y-8">
              <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-none shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                  <Cpu className="text-black w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  {STORE_CONFIG.NAME}<span className="text-primary">.</span>
                </span>
              </Link>
              <p className="text-white/40 font-mono text-xs leading-relaxed uppercase tracking-tighter border-l border-primary/20 pl-4">
                Expertos en hardware de alta gama. <br />
                Core Status: // STABLE_2026
              </p>
            </div>

            {/* Links con estética Mono */}
            <div className="md:col-span-2">
              <h4 className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-8">// HARDWARE</h4>
              <ul className="space-y-4 font-mono text-[11px] tracking-tight text-white/50">
                <li><Link to="#" className="hover:text-primary transition-colors">GPU_UNITS</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">CORE_PROCESSORS</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">NVME_STORAGE</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-2">
              <h4 className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-8">// PROTOCOLS</h4>
              <ul className="space-y-4 font-mono text-[11px] tracking-tight text-white/50">
                <li><Link to="#" className="hover:text-primary transition-colors">WARRANTY_INFO</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">SYSTEM_SUPPORT</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">FAQ_DATA</Link></li>
              </ul>
            </div>

            {/* Newsletter Tech */}
            <div className="md:col-span-4">
              <h4 className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-8">// ENCRYPTED_NEWS</h4>
              <div className="relative">
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 font-mono text-[10px] outline-none focus:border-primary/50"
                  placeholder="ENTER_EMAIL_ADDR"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] text-white/20 tracking-widest">
            <p>© 2026 {STORE_CONFIG.NAME}. ALL_RIGHTS_RESERVED.</p>
            <div className="flex gap-8 uppercase">
              <Link to="#" className="hover:text-white transition-colors">Privacy_Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms_of_Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
}
