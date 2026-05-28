import React, { useState } from 'react';
import { 
  Database, 
  X, 
  Terminal, 
  FileJson, 
  Layers, 
  Globe, 
  Save, 
  RotateCcw, 
  Check, 
  FileCode, 
  ExternalLink 
} from 'lucide-react';
import { CmsContentSchema, CmsConfig, ContactInquiry } from '../types';

interface CmsDeveloperPanelProps {
  content: CmsContentSchema;
  config: CmsConfig;
  onUpdateContent: (updated: CmsContentSchema) => void;
  onUpdateConfig: (updated: CmsConfig) => void;
  onReset: () => void;
  inquiries: ContactInquiry[];
  onClearInquiries: () => void;
}

export default function CmsDeveloperPanel({
  content,
  config,
  onUpdateContent,
  onUpdateConfig,
  onReset,
  inquiries,
  onClearInquiries
}: CmsDeveloperPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'api' | 'inquiries'>('editor');
  
  // Local state for interactive schema editing
  const [siteName, setSiteName] = useState(content.siteName);
  const [heroTagline, setHeroTagline] = useState(content.hero.tagline);
  const [heroTitlePlain, setHeroTitlePlain] = useState(content.hero.titlePlain);
  const [philosophyTitle, setPhilosophyTitle] = useState(content.philosophy.title);
  
  // API settings
  const [apiUrl, setApiUrl] = useState(config.apiUrl);
  const [useExternal, setUseExternal] = useState(config.useExternalApi);
  const [isSaved, setIsSaved] = useState(false);

  // Apply edits to live state
  const handleApplyEdits = () => {
    const updated = {
      ...content,
      siteName,
      hero: {
        ...content.hero,
        tagline: heroTagline,
        titleHtml: heroTitlePlain.replace("Digital Solutions", "<span class=\"text-[#0057FF] font-extrabold\">Digital Solutions</span>"),
        titlePlain: heroTitlePlain
      },
      philosophy: {
        ...content.philosophy,
        title: philosophyTitle
      }
    };
    onUpdateContent(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    onReset();
    setSiteName(content.siteName);
    setHeroTagline(content.hero.tagline);
    setHeroTitlePlain(content.hero.titlePlain);
    setPhilosophyTitle(content.philosophy.title);
  };

  const handleApiToggle = (val: boolean) => {
    setUseExternal(val);
    onUpdateConfig({
      ...config,
      useExternalApi: val,
      apiUrl
    });
  };

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setApiUrl(url);
    onUpdateConfig({
      ...config,
      apiUrl: url
    });
  };

  return (
    <>
      {/* Drawer Toggle Trigger */}
      <button
        id="cms-trigger-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#121212] text-white hover:bg-[#FF5C00] transition-colors px-5 py-3 rounded-full shadow-lg border border-neutral-700/50 text-sm font-semibold tracking-wide"
      >
        <Database className="w-4 h-4 text-[#FF5C00] animate-pulse" />
        <span>CMS Integration Lab</span>
      </button>

      {/* Slide-out Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity"
        />
      )}

      {/* Slide-out Drawer container */}
      <div
        id="cms-panel-drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#ffffff] text-[#121212] shadow-2xl z-50 border-l border-neutral-200 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-[#121212] text-white">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF5C00]" />
            <div>
              <h2 className="font-bold tracking-tight text-md">CMS API & Schema Lab</h2>
              <p className="text-[10px] text-neutral-400 font-mono tracking-wider">STRUCTURE INTEGRATION BRIDGE</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-neutral-800 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-3 px-4 text-center border-b-2 hover:bg-neutral-100 transition-colors uppercase tracking-wider ${
              activeTab === 'editor' ? 'border-[#FF5C00] text-[#FF5C00] font-bold' : 'border-transparent text-neutral-500'
            }`}
          >
            Live JSON Editor
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 py-3 px-4 text-center border-b-2 hover:bg-neutral-100 transition-colors uppercase tracking-wider ${
              activeTab === 'api' ? 'border-[#FF5C00] text-[#FF5C00] font-bold' : 'border-transparent text-neutral-500'
            }`}
          >
            CMS API Setup
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex-1 py-3 px-4 text-center border-b-2 hover:bg-neutral-100 transition-colors uppercase tracking-wider ${
              activeTab === 'inquiries' ? 'border-[#FF5C00] text-[#FF5C00] font-bold' : 'border-transparent text-neutral-500'
            }`}
          >
            Form Logs ({inquiries.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: LIVE SIMULATOR EDITOR */}
          {activeTab === 'editor' && (
            <div className="space-y-5">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded text-xs text-orange-900 leading-relaxed">
                <strong>Swiss Minimalist Override:</strong> Any edits saved here simulate dynamic updates triggered by a headless CMS administrator dashboard. The UI re-renders on the fly.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Company Site Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full text-sm border border-neutral-200 p-2.5 rounded focus:outline-none focus:border-[#0057FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Hero Section Tagline</label>
                  <input
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    className="w-full text-sm border border-neutral-200 p-2.5 rounded focus:outline-none focus:border-[#0057FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Hero Heading Text (Plain)</label>
                  <textarea
                    rows={2}
                    value={heroTitlePlain}
                    onChange={(e) => setHeroTitlePlain(e.target.value)}
                    className="w-full text-sm border border-neutral-200 p-2.5 rounded focus:outline-none focus:border-[#0057FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Philosophy Heading</label>
                  <input
                    type="text"
                    value={philosophyTitle}
                    onChange={(e) => setPhilosophyTitle(e.target.value)}
                    className="w-full text-sm border border-neutral-200 p-2.5 rounded focus:outline-none focus:border-[#0057FF]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={handleApplyEdits}
                  className="flex-1 bg-[#121212] hover:bg-[#0057FF] text-white py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                  <span>{isSaved ? 'Applied Content!' : 'Save CMS Data'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                  title="Reset to pure defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-bold mb-2 uppercase">
                  <FileJson className="w-3.5 h-3.5" />
                  <span>Content Interface Structure (TypeScript)</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded p-4 text-[11px] font-mono overflow-x-auto space-y-1 my-1 leading-relaxed max-h-48 overflow-y-auto">
{`interface CmsContentSchema {
  siteName: string;
  navItems: Array<{ label: string, href: string }>;
  hero: {
    tagline: string;
    titleHtml: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    sculptureUrl: string;
  };
  stats: Array<{ id: string, label: string, value: string }>;
  services: Array<{
    id: string;
    index: string;
    title: string;
    description: string;
    iconName: string;
  }>;
  products: Array<{
    id: string;
    name: string;
    tagline: string;
    description: string;
    techStack: string[];
    metric: { label: string; value: string };
  }>;
}`}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL CMS INTEGRATION INSTRUCTIONS */}
          {activeTab === 'api' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#121212]">Headless CMS Connection Settings</h3>
                  <p className="text-xs text-neutral-500 mt-1">Configure your real endpoint to replace local mockup content.</p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">Dynamic Content Fetching</span>
                    <button
                      onClick={() => handleApiToggle(!useExternal)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        useExternal ? 'bg-[#0057FF]' : 'bg-neutral-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        useExternal ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {useExternal && (
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono font-bold text-neutral-500">CMS API URL (GET)</label>
                      <input
                        type="url"
                        value={apiUrl}
                        onChange={handleApiUrlChange}
                        className="w-full text-xs font-mono border border-neutral-200 p-2 rounded focus:outline-none focus:border-[#0057FF]"
                        placeholder="https://api.yourcms.com/v1/content"
                      />
                    </div>
                  )}

                  <div className="text-[11px] text-neutral-500 leading-normal font-mono flex items-center gap-1.5 bg-[#121212] text-neutral-300 p-2.5 rounded">
                    <Terminal className="w-3.5 h-3.5 text-[#FF5C00]" />
                    <span>Mode: {useExternal ? 'Real CMS fetch active ✓' : 'Direct Mock simulation'}</span>
                  </div>
                </div>
              </div>

              {/* Step By Step Guide */}
              <div className="space-y-4 border-t border-neutral-200 pt-6">
                <h3 className="font-bold text-[#121212] flex items-center gap-1.5">
                  <FileCode className="w-4.5 h-4.5 text-[#FF5C00]" />
                  <span>3-Step Integration Playbook</span>
                </h3>

                {/* Step 1 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#121212] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <p className="font-bold text-xs">Set Environment Variable</p>
                  </div>
                  <p className="text-neutral-500 text-xs pl-7 leading-normal">
                    Insert the target endpoint in your <code className="bg-neutral-100 text-rose-600 px-1 py-0.5 rounded text-[10px] font-mono">.env</code> file:
                  </p>
                  <pre className="ml-7 bg-neutral-900 text-emerald-400 p-2.5 rounded text-[10px] font-mono">
                    VITE_CMS_API_URL="https://api.strato.com/v1"
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#121212] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    <p className="font-bold text-xs">Strapi or Contentful Payload Parser (React Hooks)</p>
                  </div>
                  <p className="text-neutral-500 text-xs pl-7 leading-normal">
                    Call your service on mount inside your parent component:
                  </p>
                  <div className="ml-7 bg-neutral-900 text-neutral-300 p-2.5 rounded text-[10px] font-mono overflow-x-auto max-h-36">
{`useEffect(() => {
  async function load() {
    try {
      const response = await fetch(import.meta.env.VITE_CMS_API_URL + '/home');
      const data = await response.json();
      setContent(data);
    } catch (err) {
      console.log("Using cached fallback data");
    }
  }
  load();
}, []);`}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#121212] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <p className="font-bold text-xs">Bind Webhooks for Instant Re-renders</p>
                  </div>
                  <p className="text-neutral-500 text-xs pl-7 leading-relaxed">
                    Set up a webhook in Contentful, Strapi, or Sanity. Map it to trigger an auto-deploy or hit an edge caching revalidation API on edits, keeping the Swiss layout evergreen in milliseconds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT FORM SUBMISSIONS LOGGER */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#121212]">Simulated Contact Inquiries</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  When visitors submit the form on the landing page, requests are captured here in real-time. This simulates webhook logs hitting Slack, database nodes, or your CRM API.
                </p>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 border border-dashed border-neutral-200 rounded text-center text-neutral-400 text-xs space-y-2">
                  <Database className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p>No simulated inquiries logged yet.</p>
                  <p className="text-[10px]">Scroll down to the "Let's Collaborate" form and hit submit!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500 font-bold uppercase">Submissions ({inquiries.length})</span>
                    <button
                      onClick={onClearInquiries}
                      className="text-[10px] uppercase font-bold text-red-600 hover:underline"
                    >
                      Clear Logs
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.map((inq, idx) => (
                      <div 
                        key={idx} 
                        className="bg-neutral-50 border border-neutral-200 p-4 rounded text-xs space-y-2 divide-y divide-neutral-100"
                      >
                        <div className="flex justify-between items-center pb-1 font-mono">
                          <span className="font-bold text-[#121212]">{inq.name}</span>
                          <span className="text-[10px] text-neutral-400">{inq.dateSubmitted}</span>
                        </div>
                        <div className="pt-2 space-y-1">
                          <p><strong className="text-neutral-500 uppercase text-[9px] tracking-wider">Project Type:</strong> <span className="font-medium">{inq.projectType}</span></p>
                          <p className="text-neutral-600 italic py-1 bg-white border border-neutral-100/60 p-2 rounded leading-snug">
                            "{inq.message}"
                          </p>
                        </div>
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-amber-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                            <span>Inbound Hook Sent</span>
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">Status: 202 Accepted</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer info lockup */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1.5">
          <span>Ideat Tech. Workspace Dev Mode</span>
          <Globe className="w-3 h-3 text-[#0057FF]" />
        </div>
      </div>
    </>
  );
}
