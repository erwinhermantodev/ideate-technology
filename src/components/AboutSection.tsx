import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhilosophyContent } from '../types';
import { Settings, Shield, Zap, Sparkles, Sliders } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface AboutSectionProps {
  philosophy: PhilosophyContent;
}

const processes = [
  {
    phase: "01",
    label: "Grid Architecture",
    tagline: "ANALYSIS & PLANNING",
    desc: "Every system is laid out on a strict digital blueprint. We map database indexes, API schemas, and component bounds prior to writing any production code.",
    icon: Sliders
  },
  {
    phase: "02",
    label: "Type-Safe Orchestration",
    tagline: "CORE ENGINGEERING",
    desc: "Implementing modular packages with strict typing. Eliminates runtime crashes, guarantees immutable states, and supports robust high-concurrency loops.",
    icon: Settings
  },
  {
    phase: "03",
    label: "Defensive Auditing",
    tagline: "CYBER HYGIENE",
    desc: "Rigorous unit testing, memory-leak audits, and firewalled token handshakes. Our engineers build secure fences before introducing public data ingress.",
    icon: Shield
  },
  {
    phase: "04",
    label: "Edge Content Webhooks",
    tagline: "CMS COUPLING",
    desc: "Connecting decoupled headless APIs (Strapi, Sanity, Contentful) to light React frontends, allowing instant re-validation on editor updates.",
    icon: Sparkles
  }
];

export default function AboutSection({ philosophy }: AboutSectionProps) {
  const [showProcess, setShowProcess] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  const CurrentIcon = processes[activePhase].icon;

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        
        {/* Core Layout of image offset and philosophy details */}
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Office Photo Image Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7 aspect-[4/3] bg-neutral-100 border border-neutral-200 overflow-hidden relative group rounded-sm shadow-xs"
          >
            {/* Soft geometric mask representing glass focus */}
            <div className="absolute inset-0 bg-neutral-900/5 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0 z-10" />
            
            <img 
              src={philosophy.officeImageUrl} 
              alt="Ideate Technology Bandung Headquarters" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />

            {/* Floating Corporate Stamp/Emblem Seal */}
            <div className="absolute -top-4 -right-4 z-20 scale-[0.45] md:scale-[0.55] origin-top-right transition-transform duration-300 group-hover:scale-[0.48] md:group-hover:scale-[0.58]">
              <CompanyLogo mode="emblem" />
            </div>

            {/* Float Badge */}
            <div className="absolute bottom-6 left-6 z-20 bg-[#121212] text-white py-2 px-4 rounded-sm text-[10px] font-mono tracking-widest uppercase">
              Bandung Lab Location
            </div>
          </motion.div>

          {/* Philosophy text and actions */}
          <div className="col-span-12 lg:col-span-5 space-y-8 text-left">
            <span className="text-[12px] font-bold text-[#FF5C00] tracking-[0.25em] uppercase block">
              {philosophy.tagline}
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#121212] tracking-tight leading-tight">
              {philosophy.title}
            </h2>

            <p className="text-sm sm:text-md text-neutral-500 leading-relaxed font-sans font-normal">
              {philosophy.bodyText}
            </p>

            {/* Toggle Process Interaction */}
            <div className="pt-4">
              <button 
                onClick={() => setShowProcess(!showProcess)}
                className={`border text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all duration-300 rounded-sm inline-flex items-center gap-2 ${
                  showProcess 
                    ? 'bg-[#FF5C00] border-transparent text-white' 
                    : 'bg-transparent border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white'
                }`}
              >
                <span>{showProcess ? 'Close Playbook' : philosophy.ctaText}</span>
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Process Playbook (Displays below when toggled) */}
        <AnimatePresence>
          {showProcess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16 bg-neutral-50 border border-neutral-200/60 p-8 sm:p-12 rounded-sm overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-8 items-start">
                
                {/* Visual phases buttons index */}
                <div className="col-span-12 md:col-span-4 space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-4">
                    ENGINEERING CYCLE
                  </span>
                  {processes.map((p, idx) => (
                    <button
                      key={p.phase}
                      onClick={() => setActivePhase(idx)}
                      className={`w-full text-left p-4 rounded-sm flex items-center justify-between border transition-all ${
                        activePhase === idx 
                          ? 'bg-white border-[#0057FF] shadow-xs translate-x-2' 
                          : 'bg-transparent border-transparent hover:bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-mono font-black ${
                          activePhase === idx ? 'text-[#FF5C00]' : 'text-neutral-300'
                        }`}>
                          {p.phase}
                        </span>
                        <span className="text-xs font-bold tracking-tight text-[#121212]">
                          {p.label}
                        </span>
                      </div>
                      <Zap className={`w-3.5 h-3.5 transition-opacity ${
                        activePhase === idx ? 'opacity-100 text-[#0057FF]' : 'opacity-0'
                      }`} />
                    </button>
                  ))}
                </div>

                {/* Animated active stage info */}
                <div className="col-span-12 md:col-span-8 bg-white border border-neutral-200/50 p-8 sm:p-12 rounded-sm flex flex-col justify-between min-h-[220px] shadow-2xs relative">
                  
                  {/* Decorative faint background code index */}
                  <div className="absolute right-6 top-6 text-7xl font-mono font-black text-neutral-50 select-none pointer-events-none">
                    {processes[activePhase].phase}
                  </div>

                  <div className="space-y-4 relative z-10">
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#FF5C00] uppercase block">
                      {processes[activePhase].tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#121212]">
                      {processes[activePhase].label}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
                      {processes[activePhase].desc}
                    </p>
                  </div>

                  <div className="pt-8 flex items-center gap-3 border-t border-neutral-50 mt-6 md:mt-2">
                    <div className="p-2.5 bg-neutral-50 rounded text-[#0057FF]">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Standardized under Ideat Tech Precision Blueprint
                    </span>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
