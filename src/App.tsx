/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Globe, 
  ChevronRight, 
  Hammer, 
  Zap, 
  HardHat, 
  Wind, 
  Layers, 
  DoorOpen, 
  Construction,
  SquareArrowOutUpRight,
  Share2,
  Table,
  MapPin
} from 'lucide-react';


const ObfuscatedLink = ({ 
  encodedText, 
  type,
  className = ""
}: { 
  encodedText: string; 
  type: 'tel' | 'mailto';
  className?: string;
}) => {
  const [decoded, setDecoded] = useState('');
  
  useEffect(() => {
    setDecoded(atob(encodedText));
  }, [encodedText]);

  return (
    <a 
      href={decoded ? `${type}:${decoded.replace(/\s/g, '')}` : "javascript:void(0)"}
      className={className}
    >
      {decoded || "..."}
    </a>
  );
};

const Counter = ({ value, suffix = "", duration = 4000 }: { value: number; suffix?: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutExpo
        const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        const currentCount = Math.floor(easeOutExpo(progress) * end);
        
        setDisplayValue(currentCount);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString('hu-HU')}{suffix}</span>;
};

const BRAND_RED = "#c8102e";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-xs font-michroma uppercase tracking-[0.2em] text-gray-400 hover:text-brand-red transition-colors"
  >
    {children}
  </a>
);

const ServiceCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div 
    whileHover={{ backgroundColor: BRAND_RED, borderColor: BRAND_RED }}
    transition={{ duration: 0 }}
    className="p-8 border border-brand-grey bg-brand-black group cursor-pointer"
  >
    <div className="mb-6">
      <Icon className="w-8 h-8 text-brand-red group-hover:text-white overflow-visible" strokeWidth={1.5} />
    </div>
    <h3 className="font-orbitron text-lg uppercase mb-4 tracking-wider group-hover:text-white">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white">
      {description}
    </p>
  </motion.div>
);

interface ProjectCardProps {
  key?: React.Key;
  title: string;
  status: string;
  year: string;
  image: string;
  index: number;
  heightClass?: string;
}

const ProjectCard = ({ title, status, year, image, index, heightClass = "aspect-[16/9]" }: ProjectCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 1.8, 
      delay: (7 - index) * 0.15, 
      ease: [0.22, 1, 0.36, 1] 
    }}
    className="group cursor-pointer relative overflow-hidden"
  >
    <div className={`relative ${heightClass} overflow-hidden border border-brand-grey/20`}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
      {/* Overlay appearing on hover */}
      <div className="absolute inset-0 bg-brand-red/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center text-center p-4 z-10">
        <h4 className="text-white font-orbitron text-xs uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-bold">{title}</h4>
        <div className="w-8 h-px bg-white mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
        <p className="text-white/80 font-michroma text-[8px] uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">{status} | {year}</p>
      </div>
    </div>
  </motion.div>
);

const MASONRY_PROJECTS = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    title: "Budapest Tech Center",
    status: "Befejezett",
    year: "2025",
    heightClass: "aspect-[4/5]"
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
    title: "Modern Villa",
    status: "Folyamatban",
    year: "2026",
    heightClass: "aspect-[1/1]"
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592dee582a1b?q=80&w=2670&auto=format&fit=crop",
    title: "Industrial Győr",
    status: "Befejezett",
    year: "2024",
    heightClass: "aspect-[1/1]"
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop",
    title: "Office Park",
    status: "Befejezett",
    year: "2023",
    heightClass: "aspect-[4/3]"
  },
  {
    image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2670&auto=format&fit=crop",
    title: "Luxury Apt",
    status: "Folyamatban",
    year: "2026",
    heightClass: "aspect-[1/1]"
  },
  {
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop",
    title: "Innovation Hub",
    status: "Átadva",
    year: "2026",
    heightClass: "aspect-[16/10]"
  },
  {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2670&auto=format&fit=crop",
    title: "City Center Reno",
    status: "Befejezett",
    year: "2024",
    heightClass: "aspect-[4/5]"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2670&auto=format&fit=crop",
    title: "Premium Estate",
    status: "Folyamatban",
    year: "2025",
    heightClass: "aspect-[1/1]"
  }
];

const ContactItem = ({ icon: Icon, label, value, type }: { 
  icon: any; 
  label: string; 
  value: string; 
  type: string;
}) => (
  <div className="flex items-center gap-6 p-8 border border-brand-grey bg-brand-black hover:border-brand-red transition-colors group">
    <div className="w-14 h-14 bg-brand-red flex items-center justify-center text-white shrink-0">
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </div>
    <div>
      <p className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-lg font-orbitron uppercase tracking-normal">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled ? 'bg-brand-black py-4 border-brand-grey' : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="inline-block transition-transform hover:scale-105 active:scale-95">
            <div className="bg-brand-red px-4 py-2 flex items-center justify-center shadow-[0_0_20px_rgba(200,16,46,0.3)]">
              <img src="logo2.svg" alt="RDI HOME Logo" className="h-8 md:h-10 w-auto" />
            </div>
          </a>
          
          <nav className="hidden md:flex gap-10">
            <NavLink href="#home">Kezdőlap</NavLink>
            <NavLink href="#about">Rólunk</NavLink>
            <NavLink href="#services">Szolgáltatások</NavLink>
            <NavLink href="#projects">Referenciák</NavLink>
            <NavLink href="#contact">Kapcsolat</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact"
              className="bg-brand-red hover:bg-brand-red/90 text-white px-4 md:px-6 py-2 text-[10px] md:text-xs font-michroma uppercase tracking-widest active:scale-95 transition-all text-center"
            >
              Ajánlatkérés
            </a>
            <button 
              className="md:hidden text-white p-2 hover:bg-brand-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-10">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-xl font-orbitron font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Kezdőlap</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-xl font-orbitron font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Rólunk</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xl font-orbitron font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Szolgáltatások</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-xl font-orbitron font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Referenciák</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-xl font-orbitron font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Kapcsolat</a>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-[100vh] flex items-center overflow-hidden border-b border-brand-grey">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop" 
              alt="Industrial background" 
              className="w-full h-full object-cover grayscale opacity-30"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent"></div>
            <div className="absolute inset-0 industrial-grid opacity-10"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-brand-red"></div>
                <span className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.3em]">
                  Alapítva 2026 | Ipari Evolúció
                </span>
              </div>
              <h1 className="font-orbitron text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight">
                RDI <span className="text-brand-red">HOME</span>
              </h1>
              <p className="text-xl text-gray-400 font-light mb-12 max-w-xl leading-relaxed border-l border-brand-grey pl-8 italic">
                Az építőipar jövőjét építjük építészeti precizitással és nagy teljesítményű minőségi munkával. Kiválóságot nyújtunk az elektromos és szerkezeti területeken.
              </p>
              <div className="flex flex-wrap gap-6">
                <a 
                  href="#contact"
                  className="bg-brand-red text-white px-10 py-5 text-sm font-michroma uppercase tracking-widest red-offset-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-4"
                >
                  Kérjen Ajánlatot
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Scroll explorer */}
          <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-6">
            <span className="text-[8px] font-michroma uppercase tracking-[0.5em] vertical-text text-gray-500">Görgessen a felfedezéshez</span>
            <div className="w-px h-24 bg-brand-red overflow-hidden relative">
              <motion.div 
                animate={{ y: [0, 96, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-full h-8 bg-white"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-24 px-6 md:px-12 max-w-7xl mx-auto industrial-grid"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 flex flex-col pt-8">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 md:w-16 h-1 bg-brand-red"></div>
                <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest">Rólunk</h2>
              </div>
              
              <div className="space-y-8 text-gray-400 font-light leading-relaxed text-base italic border-l-2 border-brand-red pl-8">
                <p>
                  Az RDI HOME Kft. egy fiatal és dinamikusan fejlődő építőipari kivitelező cég, amely szakértelmét elsősorban a villanyszerelés terén kínálja ügyfeleinek. Stabil és profi szolgáltatásaink kiválóságot tükröznek, elkötelezettségünk a kiváló minőségű munka iránt pedig az Ön elégedettségét szolgálja.
                </p>
                <p>
                  Vállalkozásunk olyan szakmai értékekkel rendelkezik, melyekre alapozva minden projektet végrehajtunk. A szakma iránti alázat a fő irányelve mind a cégnek, mind a benne dolgozó munkatársaknak. Az ügyfél elégedettsége, a minőség, a megbízhatóság és a precizitás az alapja mindannak, amit képviselünk.
                </p>
                <p>
                  Bár cégünk jelenleg még csak most lépett az építőipari kivitelezés világába, szakértelmünk és elkötelezettségünk biztos alapokon nyugszik. Büszkék vagyunk arra, hogy olyan projekteken dolgozhatunk, amelyek kiváló referenciaként szolgálnak számunkra. Ezek az eredmények ösztönöznek minket arra, hogy továbbra is a legjobbat hozzuk ki minden munkából.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-16 pt-16 border-t border-brand-grey/30">
                <div className="group">
                  <p className="text-4xl lg:text-5xl font-orbitron text-brand-red font-black mb-2 flex items-baseline">
                    <Counter value={250} suffix="+" />
                  </p>
                  <p className="text-[10px] font-michroma uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                    Befejezett projekt
                  </p>
                </div>
                <div className="group">
                  <p className="text-4xl lg:text-5xl font-orbitron text-brand-red font-black mb-2 flex items-baseline">
                    <Counter value={15} suffix="+" />
                  </p>
                  <p className="text-[10px] font-michroma uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                    Szakértő munkatárs
                  </p>
                </div>
                <div className="group">
                  <p className="text-4xl lg:text-5xl font-orbitron text-brand-red font-black mb-2 flex items-baseline">
                    <Counter value={15000} />
                  </p>
                  <p className="text-[10px] font-michroma uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                    méter behúzott kábel
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="relative w-full aspect-[4/5] rounded-[200px_200px_0_0] overflow-hidden border-2 border-brand-grey group">
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop" 
                  alt="RDI Home Hivatalos Munka" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
              
              <div className="bg-brand-red p-10 flex flex-col justify-center text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rotate-45 transition-transform group-hover:rotate-90 duration-700"></div>
                <div className="flex items-center gap-4 mb-6">
                  <HardHat className="w-10 h-10 opacity-60" strokeWidth={1} />
                  <h3 className="font-orbitron text-xl font-black uppercase leading-tight">
                    Minőségi Szemlélet
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed opacity-90">
                  Nem csupán építünk, hanem értéket teremtünk. A legkisebb villanyszerelési munkától a teljes szerkezetépítésig ugyanazt a fegyelmet alkalmazzuk.
                </p>
                <div className="mt-8 h-1 w-12 bg-white group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          id="services" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-24 bg-black/40 border-y border-brand-grey overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
              <div>
                <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter mb-4">Szolgáltatások</h2>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 border border-brand-red"></div>
                  <p className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.2em] md:tracking-[0.4em]">Teljes körű építőipari megoldások</p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-[10px] font-michroma text-gray-600 uppercase tracking-widest whitespace-nowrap">Est 2026 // RDI-04</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-grey border border-brand-grey">
              <ServiceCard 
                icon={Construction}
                title="Földmunka"
                description="Precíz gépi földmunka, alapozás előkésztés és tereprendezés professzionális flottával."
              />
              <ServiceCard 
                icon={Layers}
                title="Szerkezetépítés"
                description="Monolit beton és acélszerkezeti megoldások az alapoktól a tetőig."
              />
              <ServiceCard 
                icon={Zap}
                title="Villanyszerelés"
                description="Ipari és lakossági elektromos hálózatok tervezése és kivitelezése."
              />
              <ServiceCard 
                icon={Wind}
                title="Épületgépészet"
                description="Modern fűtés, hűtés és vízellátó rendszerek integrált automatizálással."
              />
              <ServiceCard 
                icon={DoorOpen}
                title="Nyílászáró csere"
                description="Prémium minőségű ablakok és ajtók beépítése kiemelkedő hőszigeteléssel."
              />
              <ServiceCard 
                icon={Hammer}
                title="Ács munkák"
                description="Tetőszerkezetek építése, felújítása és egyedi faipari szerkezetek kivitelezése."
              />
              <ServiceCard 
                icon={Table}
                title="Hőszigetelés"
                description="Homlokzati és födém szigetelési rendszerek az energiahatékonyságért."
              />
              <ServiceCard 
                icon={HardHat}
                title="Kőműves munkák"
                description="Hagyományos és modern falazási technikák, vakolás és burkolás."
              />
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="flex items-center gap-8 mb-24">
             <div className="w-1 h-12 bg-brand-red"></div>
             <div className="flex flex-col">
               <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest mb-2">Referenciák</h2>
               <p className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.2em] md:tracking-[0.4em]">Kiemelt Projektjeink & Megvalósítások</p>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-brand-grey/20 mt-12">
            {MASONRY_PROJECTS.map((project, index) => (
              <ProjectCard 
                key={index} 
                index={index} 
                title={project.title}
                status={project.status}
                year={project.year}
                image={project.image}
                heightClass={project.heightClass}
              />
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-24 bg-brand-charcoal border-t border-brand-grey relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 skew-x-12 -mr-24 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
              <div className="md:w-1/2">
                <div className="flex items-center gap-8 mb-12">
                   <div className="w-1 h-12 bg-brand-red"></div>
                   <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest">Kapcsolat</h2>
                </div>
                
                <h3 className="font-orbitron text-2xl md:text-3xl font-black uppercase text-brand-red mb-8 leading-tight tracking-tight">
                  ELÉRHETŐSÉG
                </h3>
                
                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-12 max-w-lg">
                  Ha Ön is részese szeretne lenni növekedésünknek és sikereinknek, kérem, keressen minket elérhetőségeinken:
                </p>

                  <div className="space-y-10">
                    <div className="flex items-center gap-4 md:gap-8 group">
                      <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-brand-red flex items-center justify-center text-white ring-4 md:ring-8 ring-brand-red/10 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.1em] md:tracking-[0.3em] mb-1 md:mb-2">Telefon</p>
                        <ObfuscatedLink 
                          encodedText="KzM2IDMwIDcxOCAxODI5" 
                          type="tel" 
                          className="text-lg sm:text-xl md:text-2xl font-orbitron font-bold hover:text-brand-red transition-colors whitespace-nowrap block"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 group">
                      <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-brand-red flex items-center justify-center text-white ring-4 md:ring-8 ring-brand-red/10 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.1em] md:tracking-[0.3em] mb-1 md:mb-2">Email</p>
                        <ObfuscatedLink 
                          encodedText="aW5mb0ByZGlob21la2Z0LmNvbQ==" 
                          type="mailto" 
                          className="text-lg sm:text-xl md:text-2xl font-orbitron font-bold lowercase hover:text-brand-red transition-colors truncate block"
                        />
                      </div>
                    </div>
                  </div>
              </div>

              <div className="md:w-1/2 border border-brand-grey bg-brand-black p-12 relative overflow-hidden group">
                <div className="absolute inset-0 industrial-grid opacity-20"></div>
                <div className="relative z-10">
                  <h4 className="font-orbitron text-xl uppercase mb-10 tracking-widest flex items-center gap-4">
                    <span className="w-8 h-px bg-brand-red"></span>
                    Működési Területünk
                  </h4>
                  <p className="text-gray-400 font-light mb-12 leading-relaxed">
                    Székhelyünk <span className="text-white font-bold">Győrben</span> található, de szakértői csapatunk <span className="text-brand-red font-bold">Magyarország teljes területén</span> vállal ipari és lakossági kivitelezéseket, biztosítva a legmagasabb minőségi színvonalat.
                  </p>
                  
                   <div className="aspect-[4/3] bg-brand-charcoal border border-brand-grey overflow-hidden relative group/map flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.1)_0%,transparent_70%)]">
                    <div className="relative w-full h-full p-2 md:p-4 transition-transform duration-700 group-hover/map:scale-[1.02]">
                      <img 
                        src="hu.svg" 
                        alt="Magyarország Térkép" 
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(200,16,46,0.3)] group-hover/map:drop-shadow-[0_0_25px_rgba(200,16,46,0.5)] transition-all duration-700" 
                      />
                      
                      {/* Technical Grid Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(200,16,46,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(200,16,46,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_80%)]"></div>

                      {/* Radar positioned exactly over Győr from SVG coordinates (roughly 25.6% x, 20.8% of 1000x613) */}
                      <svg 
                        viewBox="0 0 1000 613" 
                        className="absolute inset-0 w-full h-full p-2 md:p-4 pointer-events-none"
                      >
                        {/* Animated Radar for Győr */}
                        <g transform="translate(256, 208)">
                          <circle r="35" className="stroke-brand-red/30 fill-brand-red/5 animate-ping" />
                          <circle r="20" className="stroke-brand-red/50 fill-brand-red/20 animate-pulse" />
                          <circle r="6" className="fill-white shadow-lg" />
                          
                          <foreignObject x="15" y="-15" width="120" height="40">
                            <div className="flex items-center">
                              <div className="h-[1px] w-8 bg-brand-red"></div>
                              <div className="bg-brand-red text-white text-[8px] font-michroma px-2 py-1 skew-x-[-10deg] shadow-xl">
                                HQ GYŐR
                              </div>
                            </div>
                          </foreignObject>
                        </g>

                        {/* Connection lines to other regions */}
                        <path d="M256,208 L450,300" className="stroke-brand-red/20 stroke-1 stroke-dasharray-[4,4] animate-[dash_10s_linear_infinite]" />
                        <path d="M256,208 L650,220" className="stroke-brand-red/20 stroke-1 stroke-dasharray-[4,4] animate-[dash_12s_linear_infinite]" />
                        <path d="M256,208 L350,450" className="stroke-brand-red/20 stroke-1 stroke-dasharray-[4,4] animate-[dash_8s_linear_infinite]" />
                      </svg>
                    </div>

                    <div className="absolute inset-0 bg-brand-red/5 mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute bottom-6 left-6 bg-brand-black/90 backdrop-blur-md px-6 py-4 border-l-2 border-brand-red z-10 transition-transform group-hover/map:-translate-y-2">
                      <p className="text-[10px] font-michroma uppercase tracking-widest text-brand-red mb-1">SZÉKHELY</p>
                      <p className="text-sm font-orbitron font-bold">GYŐR, MAGYARORSZÁG</p>
                      <p className="text-[9px] text-gray-500 font-light mt-1">ORSZÁGOS SZOLGÁLTATÁS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black border-t-2 border-brand-red pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <div className="mb-10 inline-block">
              <div className="bg-brand-red p-6 shadow-[0_0_40px_rgba(200,16,46,0.2)] border-b-4 border-brand-black/20">
                <img src="logo2.svg" alt="RDI HOME Logo" className="h-16 md:h-20 w-auto" />
              </div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-12">
              Ipari színvonalú felújítási és építési szolgáltatások. Szerkezeti integritás és villamos precizitás Magyarország egész területén.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 border border-brand-grey flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group">
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 border border-brand-grey flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group">
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.3em] mb-10">Jogi nyilatkozat</h4>
            <ul className="flex flex-col gap-6 text-[10px] font-michroma uppercase tracking-widest text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Adatvédelmi irányelvek</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Általános szerződési feltételek</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impresszum</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-michroma text-brand-red uppercase tracking-[0.3em] mb-10">Biztonság</h4>
            <ul className="flex flex-col gap-6 text-[10px] font-michroma uppercase tracking-widest text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Biztonsági szabványok</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Villamossági engedélyek</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col items-center md:items-end justify-between">
            <div className="text-right">
              <span className="font-orbitron text-5xl md:text-7xl font-black text-brand-red opacity-10">2026</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-brand-grey flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-michroma uppercase tracking-[0.2em] text-gray-600">
              © 2026 RDI HOME KFT. IPARI PRECIZITÁS GARANTÁLVA.
            </p>
            <p className="text-[9px] font-michroma uppercase tracking-[0.2em] text-gray-700">
              Designed by <a href="https://www.ycreative.art" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-white transition-colors">Y CREATIVE</a>
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-michroma uppercase tracking-widest text-gray-600">
            <span>Budapest, Magyarország</span>
            <span>Minden jog fenntartva</span>
          </div>
        </div>
      </footer>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
