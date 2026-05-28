import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import FeaturedServices from './components/FeaturedServices';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import LetCollaborate from './components/LetCollaborate';
import Footer from './components/Footer';
import CmsDeveloperPanel from './components/CmsDeveloperPanel';

import { CmsContentSchema, CmsConfig, ContactInquiry } from './types';
import { defaultCmsData } from './data/cmsData';
import { cmsService } from './services/cmsService';
import { Loader2, ServerCrash, RefreshCw } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState<CmsContentSchema>(defaultCmsData);
  const [config, setConfig] = useState<CmsConfig>(cmsService.getConfig());
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  
  // Loading & error core state
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Sync API configurations
  const handleUpdateConfig = (updated: CmsConfig) => {
    setConfig(updated);
    cmsService.saveConfig(updated);
  };

  // Sync active UI content overrides
  const handleUpdateContent = (updated: CmsContentSchema) => {
    setContent(updated);
    cmsService.saveLocalContent(updated);
  };

  // Reset local adjustments to pure visual layout
  const handleReset = () => {
    const original = cmsService.resetToDefaults();
    setContent(original);
    setErr(null);
  };

  // Trigger outbound API simulations
  const loadCmsPayload = async () => {
    setLoaded(false);
    setErr(null);
    try {
      const data = await cmsService.fetchContent();
      setContent(data);
    } catch (e: any) {
      setErr(e.message || "Failed to parse API schema payload.");
    } finally {
      setLoaded(true);
    }
  };

  // Fetch initial content in mount cycle
  useEffect(() => {
    loadCmsPayload();
    
    // Load local storage inquiries log if any
    try {
      const savedInqs = localStorage.getItem('ideat_tech_inquiries_log');
      if (savedInqs) {
        setInquiries(JSON.parse(savedInqs));
      }
    } catch {
      // Ignore
    }
  }, [config.useExternalApi, config.apiUrl]);

  // Insert a new simulated inbound form inquiry
  const handleNewInquiry = (inquiry: ContactInquiry) => {
    const updated = [inquiry, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('ideat_tech_inquiries_log', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Clear simulated inbox
  const handleClearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem('ideat_tech_inquiries_log');
  };

  // Visual state: Error State Page
  if (err) {
    return (
      <div className="min-h-screen bg-white text-[#121212] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="max-w-md space-y-6">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-full inline-block">
            <ServerCrash className="w-12 h-12" />
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-[#121212]">
            CMS Handshake Failed
          </h2>
          
          <p className="text-sm text-neutral-400 leading-relaxed">
            The app could not connect to your configured headless API at <code className="bg-neutral-100 text-[#FF5C00] p-1.5 rounded text-xs font-mono">{config.apiUrl}</code>. 
            <br />
            Verify server headers, CORS compliance rules, or return to direct simulation mode.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => {
                handleUpdateConfig({ ...config, useExternalApi: false });
                loadCmsPayload();
              }}
              className="bg-[#121212] hover:bg-[#FF5C00] text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm transition"
            >
              Simulate Local Workspace
            </button>
            
            <button
              onClick={loadCmsPayload}
              className="border border-[#121212] text-[#121212] font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm hover:bg-neutral-50 transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Fetch</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Visual state: Skeleton Loading Progress
  if (!loaded) {
    return (
      <div className="min-h-screen bg-white text-[#121212] flex flex-col items-center justify-center font-sans space-y-4">
        <Loader2 className="w-8 h-8 text-[#0057FF] animate-spin" />
        <span className="text-[11px] font-mono tracking-[0.2em] font-bold uppercase text-neutral-400">
          Syncing Decoupled API CMS...
        </span>
      </div>
    );
  }

  // Visual state: Final Active Portfolio Page
  return (
    <div className="min-h-screen bg-white text-[#121212] relative flex flex-col justify-between selection:bg-[#FF5C00] selection:text-white antialiased">
      
      {/* 1. Header Navigation */}
      <Header 
        siteName={content.siteName} 
        navItems={content.navItems} 
      />

      {/* Main Container contents */}
      <main className="flex-grow">
        
        {/* 2. Hero Presentation */}
        <Hero 
          hero={content.hero} 
        />

        {/* 3. Executive Statistics Indicators */}
        <StatsBar 
          stats={content.stats} 
        />

        {/* 4. Service Bento Grid */}
        <FeaturedServices 
          services={content.services} 
        />

        {/* Dynamic Products Showcase Section */}
        <ProductsSection 
          products={content.products} 
        />

        {/* 5. About Philosophy & Timelines */}
        {/* <AboutSection 
          philosophy={content.philosophy} 
        /> */}

        {/* 6. Form Inquiries */}
        <LetCollaborate 
          contact={content.contact} 
          onNewInquiry={handleNewInquiry} 
        />

      </main>

      {/* 7. Footer details */}
      <Footer 
        siteName={content.siteName} 
      />

      {/* Interactive CMS Integration playhouse & webhook drawer */}
      <CmsDeveloperPanel 
        content={content}
        config={config}
        onUpdateContent={handleUpdateContent}
        onUpdateConfig={handleUpdateConfig}
        onReset={handleReset}
        inquiries={inquiries}
        onClearInquiries={handleClearInquiries}
      />

    </div>
  );
}
