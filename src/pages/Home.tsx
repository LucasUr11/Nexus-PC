import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, ShieldCheck, Zap, Truck, Monitor, Database, Settings, Eye } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS, STORE_CONFIG } from '@/lib/index';
import { categories, featuredProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#030303] text-white selection:bg-primary selection:text-black">

      {/* 1. HERO SECTION (Mantenido y Pulido) */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid-dot.svg')] bg-[length:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-primary/50" />
                <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">System Status: Online // Core 2026</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 italic uppercase">
                BEYOND <br />
                <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">PERFORMANCE.</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10 font-light border-l border-primary/30 pl-6">
                Ingeniería de vanguardia para la élite digital. No solo vendemos hardware, ensamblamos el futuro del procesamiento.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/pc-builder">
                  <Button className="group relative px-8 py-8 bg-primary text-black font-mono text-xs tracking-widest font-bold rounded-none overflow-hidden transition-all hover:scale-105 cursor-pointer">
                    <span className="relative z-10 flex items-center gap-2">CONSTRUIR_SETUP <ArrowRight size={14} /></span>
                    <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Button>
                </Link>
                <Link to="/productos" className="flex items-center px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors rounded-none font-mono text-xs tracking-widest uppercase cursor-pointer">
                  [ VER_CATÁLOGO ]
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <img src={IMAGES.PC_COMPONENTS_2} className="relative z-10 drop-shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] opacity-90" alt="Next Gen" />
              <div className="absolute -top-4 -right-4 p-4 border border-white/10 bg-black/60 backdrop-blur-xl rounded-none font-mono">
                <p className="text-[10px] text-primary mb-1 tracking-tighter">// THERMAL_CONTROL</p>
                <p className="text-xl font-bold italic">32°C <span className="text-[10px] text-green-400 not-italic tracking-widest uppercase ml-2">Stable</span></p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/40 backdrop-blur-md py-4">
          <div className="container mx-auto px-6 flex justify-between items-center opacity-50 text-[10px] font-mono tracking-widest uppercase">
            <div className="flex gap-8">
              <span>Latencia: 0.002ms</span>
              <span>Stock_Status: SYNCED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
              Servidores Globales Activos
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SHOWCASE */}
      <section className="py-32 relative overflow-hidden bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-mono tracking-[0.4em] text-primary uppercase mb-3 block">// COMPONENT_MODULES</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Categorías Destacadas</h2>
              <div className="h-0.5 w-16 bg-primary mt-2" />
            </motion.div>
            <Link to={ROUTE_PATHS.PRODUCTS} className="group font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              VIEW_ALL_UNITS <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {categories.slice(0, 4).map((category, index) => (
              <motion.div key={category.id} className="group relative aspect-4/5 overflow-hidden border border-white/5 bg-[#080808]">
                <div className="absolute top-4 left-4 z-30 font-mono text-[8px] text-white/20 tracking-[0.3em] uppercase">ID_{category.id.substring(0, 6)}</div>
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <h3 className="text-xl font-bold text-white tracking-tighter uppercase group-hover:text-primary transition-colors italic">{category.name}</h3>
                  <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                    <p className="text-white/40 text-[10px] font-mono leading-tight mt-2 uppercase tracking-tight">{category.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <Link to={`${ROUTE_PATHS.PRODUCTS}?category=${category.id}`} className="text-[9px] font-mono tracking-widest uppercase py-1.5 px-4 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all">ENTER_MODULE</Link>
                    <span className="text-[10px] font-mono text-white/10 italic">0{index + 1}</span>
                  </div>
                </div>

                <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#080808]">
                  <div className="opacity-5 group-hover:opacity-15 transition-all duration-700 text-white scale-90 group-hover:scale-110">
                    {category.id === 'graphics-cards' && <Monitor size={140} strokeWidth={0.5} />}
                    {category.id === 'processors' && <Cpu size={140} strokeWidth={0.5} />}
                    {category.id === 'motherboards' && <Database size={140} strokeWidth={0.5} />}
                    {category.id === 'laptops' && <Settings size={140} strokeWidth={0.5} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Fondo Oscuro y Grids Técnicos) */}
      <section className="py-32 bg-[#030303] relative border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono tracking-[0.4em] text-primary uppercase mb-3 block">// ELITE_UNITS_ONLY</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Selección Elite</h2>
              <p className="text-gray-400 mt-6 font-light border-l-2 border-primary/30 pl-6 text-sm">Hardware de grado entusiasta validado para cargas extremas y gaming competitivo.</p>
            </div>
            <div className="font-mono text-[10px] text-white/30 tracking-widest">MODULE_COUNT: {featuredProducts.length}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <Button asChild variant="outline" className="rounded-none border-primary/20 bg-primary/5 hover:bg-primary hover:text-black px-16 py-8 transition-all duration-500">
              <Link to={ROUTE_PATHS.PRODUCTS} className="font-mono text-xs tracking-[0.3em] uppercase font-black italic">
                [ ACCEDER_AL_CATÁLOGO_FULL ]
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. TECH HIGHLIGHT (Sección de Ingeniería) */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-4 border border-primary/10 rounded-none pointer-events-none group-hover:border-primary/30 transition-colors duration-700" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40" />

              <motion.div className="relative z-10 rounded-none overflow-hidden border border-white/5 bg-card/50 backdrop-blur-3xl shadow-2xl shadow-black">
                <img src={IMAGES.PC_COMPONENTS_1} alt="Tech" className="w-full opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
              </motion.div>
              <div className="absolute -bottom-6 -right-2 font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] bg-[#030303] px-4 py-2 border border-white/10">UNIT_REF: CORE_VALIDATION_08</div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-[10px] font-mono tracking-[0.4em] text-primary uppercase mb-6 block">// TECHNICAL_PHILOSOPHY</span>
              <h2 className="text-5xl font-black mb-10 tracking-tighter uppercase italic leading-[0.9]">Ingeniería de <span className="text-primary/90 text-6xl">Precisión</span></h2>
              <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed border-l border-primary/20 pl-8">
                En <span className="text-white font-medium italic">{STORE_CONFIG.NAME}</span>, curamos hardware. Cada componente es sometido a un riguroso <span className="font-mono text-primary/80 uppercase tracking-tighter underline underline-offset-4">stress-test</span> para garantizar estabilidad total.
              </p>

              <ul className="space-y-8 mb-16">
                {["Overclocking estable validado.", "Garantía premium express.", "Soporte técnico de por vida."].map((text, i) => (
                  <li key={i} className="flex items-center gap-6 group">
                    <div className="w-6 h-6 border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase group-hover:text-primary transition-colors">{text}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="rounded-none bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-black font-mono text-[10px] tracking-[0.4em] uppercase px-12 transition-all duration-500 italic font-black">[ EJECUTAR_FILOSOFÍA ]</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST BADGES (Industrial / Minimalista) */}
      <section className="py-20 border-y border-white/5 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Truck, title: "Logística Segura", desc: "Embalaje anti-estático reforzado." },
              { icon: ShieldCheck, title: "Garantía Elite", desc: "Cobertura total grado industrial." },
              { icon: Cpu, title: "Build Precisión", desc: "Ensamblado con estándar militar." },
              { icon: Settings, title: "Soporte 2026", desc: "Optimización de firmware activa." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-5 group">
                <item.icon className="w-8 h-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2 italic">{item.title}</h4>
                  <p className="text-[10px] font-mono text-white/30 uppercase leading-relaxed tracking-tighter">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER (Vanguardia Digital) */}
      <section className="py-40 relative overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 opacity-5">
          <img src={IMAGES.TECH_WORKSPACE_3} alt="BG" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
          <span className="text-[10px] font-mono tracking-[0.5em] text-primary uppercase mb-6 block">// NETWORK_JOIN</span>
          <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase italic">Únete a la Vanguardia</h2>
          <p className="text-gray-400 font-light mb-12 text-sm uppercase tracking-wide leading-relaxed">
            Acceso prioritario a hardware limitado y protocolos exclusivos para miembros registrados de <span className="text-white font-bold">{STORE_CONFIG.NAME}</span>.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-white/10 p-1 bg-white/5 backdrop-blur-sm">
            <input
              type="email"
              placeholder="USER@NETWORK.COM"
              className="grow bg-transparent border-none px-6 py-4 outline-none text-[10px] font-mono tracking-widest text-white placeholder:text-white/20"
            />
            <Button className="rounded-none px-10 bg-primary text-black font-mono text-[10px] font-black tracking-widest uppercase hover:bg-white transition-colors">SUSCRIBIRSE</Button>
          </form>
          <p className="mt-8 text-[9px] font-mono text-white/10 tracking-[0.2em] uppercase">© 2026 NEXUS_CORE_SYSTEMS. ALL RIGHTS RESERVED.</p>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }` }} />
    </div>
  );
};

export default Home;