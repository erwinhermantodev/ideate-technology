import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  CheckCircle2, 
  Database,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  RotateCcw,
  Plus,
  BarChart2,
  GitPullRequest,
  Compass
} from 'lucide-react';
import { ProductItem } from '../types';

// Dynamic icon mapper for Lucide icons
const productIcons: { [key: string]: any } = {
  Cpu: Cpu,
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  Compass: Compass
};

interface ProductsSectionProps {
  products: ProductItem[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(products[0]?.id || "prod-syumra");

  // Syumra Screenshots Tab state
  const [activeImageTab, setActiveImageTab] = useState<'mobile' | 'portal' | 'landing'>('mobile');

  // Tokovio Screenshots Tab state
  const [activeTokovioTab, setActiveTokovioTab] = useState<'dashboard' | 'settings' | 'terminal' | 'network'>('dashboard');

  const currentProduct = products.find(p => p.id === activeTab) || products[0];
  const ActiveIcon = productIcons[currentProduct?.featureIcon] || Cpu;

  return (
    <section id="products" className="py-24 sm:py-32 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="text-[12px] font-bold text-[#0057FF] tracking-[0.25em] uppercase block mb-4">
              PRODUCT SHOWCASE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#121212]">
              SaaS & Core Engines
            </h2>
            <div className="w-12 h-[3px] bg-[#FF5C00] mt-6" />
          </div>
          
          <p className="text-sm text-neutral-400 max-w-sm text-left md:text-right leading-relaxed font-light">
            In addition to custom architectural builds, we deploy modular, pre-engineered enterprise software platforms ready to load.
          </p>
        </div>

        {/* Dynamic Swiss Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 mb-12">
          {products.map((prod) => {
            const TabIcon = productIcons[prod.featureIcon] || Cpu;
            const isActive = activeTab === prod.id;

            return (
              <button
                key={prod.id}
                id={`product-tab-${prod.id}`}
                onClick={() => setActiveTab(prod.id)}
                className={`py-4 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-3 transition-all relative border-b-2 -mb-[2px] ${
                  isActive 
                    ? 'border-[#FF5C00] text-[#0057FF] bg-neutral-50/70 font-black' 
                    : 'border-transparent text-neutral-400 hover:text-[#121212]'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#FF5C00]' : 'text-neutral-400'}`} />
                <span>{prod.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Playground Shell */}
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start text-left">
          
          {/* Left Side: Product Specifications & Specifications */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-black text-[#FF5C00] tracking-widest uppercase">
                {currentProduct?.tagline}
              </span>
              <span className="h-1 w-8 bg-neutral-200" />
              <span className="text-[10px] font-mono font-bold uppercase text-[#0057FF] bg-[#0057FF]/5 px-2 py-0.5 rounded-sm">
                Production Ready
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight hover:text-[#0057FF] transition-colors duration-300">
              {currentProduct?.name}
            </h3>

            <p className="text-md text-[#121212] font-semibold leading-relaxed">
              {currentProduct?.description}
            </p>

            <p className="text-sm text-neutral-500 leading-relaxed font-sans">
              {currentProduct?.longDescription}
            </p>

            {/* Benefits checks */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase block">
                ENGINEERING STANDARDS & HIGHLIGHTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {currentProduct?.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech tag highlights */}
            <div className="pt-6">
              <span className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase block mb-3">
                INTEGRATION STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProduct?.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] font-mono font-semibold bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Real-Time Simulator Sandbox */}
          {/* Right Side: Interactive Device Mockups and App Screenshots */}
          <div className="col-span-12 lg:col-span-6 bg-neutral-900 text-white rounded-lg p-6 sm:p-8 border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Visual Technical grid line masks */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.15] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              
              {currentProduct.id === 'prod-syumra' ? (
                <>
                  {/* Showcase Title & Interactive Pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-850">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF5C00]">
                        Syumra Core Modules
                      </span>
                    </div>
                    
                    {/* Visual tabs switcher */}
                    <div className="flex gap-1 bg-neutral-955 p-1 rounded border border-neutral-800 text-[10.5px] font-mono">
                      <button
                        type="button"
                        onClick={() => setActiveImageTab('mobile')}
                        className={`px-3 py-1.5 rounded transition font-bold ${
                          activeImageTab === 'mobile' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Mobile App
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveImageTab('portal')}
                        className={`px-3 py-1.5 rounded transition font-bold ${
                          activeImageTab === 'portal' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Customer Portal
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveImageTab('landing')}
                        className={`px-3 py-1.5 rounded transition font-bold ${
                          activeImageTab === 'landing' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Landing Page
                      </button>
                    </div>
                  </div>

                  {/* Screens content area */}
                  <div className="flex-grow flex items-center justify-center min-h-[460px] relative">
                    
                    {/* 1. MOBILE APPLICATION SCREENS */}
                    {activeImageTab === 'mobile' && (
                      <div className="flex gap-4 sm:gap-6 justify-center items-center py-2 w-full transition-all duration-300">
                        {/* Phone Mockup 1 */}
                        <div className="relative rounded-[32px] border-4 border-neutral-800 bg-[#121212] overflow-hidden shadow-xl max-w-[150px] sm:max-w-[180px] transition-transform duration-300 hover:scale-[1.03]">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-neutral-805 rounded-b-xl z-20 flex items-center justify-center">
                            <div className="w-8 h-0.5 bg-neutral-900 rounded-full" />
                          </div>
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779972479/230x498bb_xi6dnd.webp" 
                            alt="Syumra Mobile Screen 1" 
                            className="w-full h-auto object-cover relative z-10"
                            loading="lazy"
                          />
                        </div>

                        {/* Phone Mockup 2 */}
                        <div className="relative rounded-[32px] border-4 border-neutral-800 bg-[#121212] overflow-hidden shadow-xl max-w-[150px] sm:max-w-[180px] transition-transform duration-300 hover:scale-[1.03] mt-6">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-neutral-805 rounded-b-xl z-20 flex items-center justify-center">
                            <div className="w-8 h-0.5 bg-neutral-900 rounded-full" />
                          </div>
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779972479/230x498bb_1_httaxt.webp" 
                            alt="Syumra Mobile Screen 2" 
                            className="w-full h-auto object-cover relative z-10"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* 2. CUSTOMER PORTAL SCREEN */}
                    {activeImageTab === 'portal' && (
                      <div className="w-full h-full flex flex-col justify-center items-center py-2 transition-all duration-300">
                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 hover:border-neutral-700">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-950 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              portal.syumra.id/home
                            </div>
                          </div>
                          {/* Dashboard Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779972487/Screenshot_2026-05-28_at_19.46.37_bv1clq.png" 
                            alt="Syumra Customer Portal Dashboard" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* 3. LANDING PAGE SCREEN */}
                    {activeImageTab === 'landing' && (
                      <div className="w-full h-full flex flex-col justify-center items-center py-2 transition-all duration-300">
                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 hover:border-neutral-700">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-950 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              www.syumra.id
                            </div>
                          </div>
                          {/* Landing Page Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779972487/Screenshot_2026-05-28_at_19.47.32_gkcmxu.png" 
                            alt="Syumra Marketing Landing Page" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                </>
              ) : (
                <>
                  {/* Showcase Title & Interactive Pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-850">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF5C00]">
                        Tokovio Engine Modules
                      </span>
                    </div>
                    
                    {/* Visual tabs switcher */}
                    <div className="flex flex-wrap gap-1 bg-neutral-955 p-1 rounded border border-neutral-800 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => setActiveTokovioTab('dashboard')}
                        className={`px-2.5 py-1.5 rounded transition font-bold ${
                          activeTokovioTab === 'dashboard' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTokovioTab('settings')}
                        className={`px-2.5 py-1.5 rounded transition font-bold ${
                          activeTokovioTab === 'settings' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Settings
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTokovioTab('terminal')}
                        className={`px-2.5 py-1.5 rounded transition font-bold ${
                          activeTokovioTab === 'terminal' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Terminal
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTokovioTab('network')}
                        className={`px-2.5 py-1.5 rounded transition font-bold ${
                          activeTokovioTab === 'network' 
                            ? 'bg-[#0057FF] text-white' 
                            : 'text-neutral-455 hover:text-white'
                        }`}
                      >
                        Buyer Network
                      </button>
                    </div>
                  </div>

                  {/* Screens content area */}
                  <div className="flex-grow flex items-center justify-center min-h-[460px] relative">
                    
                    {/* 1. MERCHANT DASHBOARD METRICS SCREEN */}
                    {activeTokovioTab === 'dashboard' && (
                      <div className="w-full h-full flex flex-col justify-center items-center py-2 transition-all duration-300">
                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 hover:border-neutral-700">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-955 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              terminal.tokovio.biz.id/dashboard
                            </div>
                          </div>
                          {/* Dashboard Metrics Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779973032/Tokovio-SaaS-Platform-05-28-2026_07_56_PM_1_ol5tol.png" 
                            alt="Tokovio Merchant Dashboard Metrics Overview" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* 2. RONA SETTINGS PANEL SCREEN */}
                    {activeTokovioTab === 'settings' && (
                      <div className="w-full h-full flex flex-col justify-center items-center py-2 transition-all duration-300">
                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 hover:border-neutral-700">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-955 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              terminal.tokovio.biz.id/settings/profile
                            </div>
                          </div>
                          {/* Settings Panel Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779973030/Screenshot_2026-05-28_at_19.55.22_c3wfpr.png" 
                            alt="Tokovio Merchant Settings Panel Overview" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* 3. WELCOME TERMINAL LOGIN SCREEN */}
                    {activeTokovioTab === 'terminal' && (
                      <div className="w-full h-full flex flex-col justify-center items-center py-2 transition-all duration-300">
                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-2xl transition-all duration-300 hover:border-neutral-700">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-955 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              terminal.tokovio.biz.id/login
                            </div>
                          </div>
                          {/* Welcome Terminal Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779973030/Screenshot_2026-05-28_at_19.55.30_ikcxaz.png" 
                            alt="Tokovio Merchant Welcome Terminal Login Screen" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* 4. BUYER NETWORK GRID SCREEN */}
                    {activeTokovioTab === 'network' && (
                      <div className="w-full h-full flex flex-col justify-center items-center py-2 transition-all duration-300 gap-4 overflow-y-auto max-h-[460px]">
                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-955 shadow-2xl transition-all duration-300 hover:border-neutral-700 flex-shrink-0">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-955 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              www.tokovio.biz.id/discover
                            </div>
                          </div>
                          {/* Discover Grid Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779973030/Screenshot_2026-05-28_at_19.55.14_hqiljw.png" 
                            alt="Tokovio Local Buyer Network Grid" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>

                        <div className="w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-955 shadow-2xl transition-all duration-300 hover:border-neutral-700 flex-shrink-0">
                          {/* Browser top-bar chrome */}
                          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            </div>
                            <div className="bg-neutral-955 rounded px-3 py-0.5 text-[8px] font-mono text-neutral-500 w-44 text-center truncate mx-auto select-none border border-neutral-850">
                              www.tokovio.biz.id
                            </div>
                          </div>
                          {/* Landing Page Image */}
                          <img 
                            src="https://res.cloudinary.com/karyalaza-indonesia/image/upload/v1779973032/Tokovio-SaaS-Platform-05-28-2026_07_56_PM_jdf1lu.png" 
                            alt="Tokovio SaaS Landing Page Presentation" 
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                </>
              )}

              {/* SHARED PROJECT FOOTER CALL-UP */}
              <div className="pt-4 border-t border-neutral-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 block">PRODUCTION INTERFACE</span>
                  <span className="text-xs font-extrabold text-white">App Store Approved &nbsp; 
                    <span className="text-emerald-450 font-mono font-bold">
                      {currentProduct?.metric.value}
                    </span>
                  </span>
                </div>

                <a 
                  href={currentProduct.id === 'prod-syumra' 
                    ? "https://play.google.com/store/apps/details?id=com.ideate.syumra" 
                    : "https://www.tokovio.biz.id"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-850 hover:bg-[#FF5C00] text-neutral-300 hover:text-white px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2"
                >
                  <span>{currentProduct?.primaryCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
