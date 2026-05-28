import React from 'react';
import { Share2, GitBranch, Terminal, Globe } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface FooterProps {
  siteName: string;
}

export default function Footer({ siteName }: FooterProps) {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-white w-full py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 grid grid-cols-12 gap-y-12 gap-x-8">
        
        {/* Left Side: Brand and short description */}
        <div className="col-span-12 md:col-span-5 space-y-6 text-left">
          <div className="flex items-center gap-2 select-none">
            <CompanyLogo size={36} />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white hover:text-[#0057FF] transition-colors">
              IDEATE TECHNOLOGY
            </span>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm leading-relaxed font-sans font-light">
            Precision Engineering for Modern Architecture. High-performance software engineering, cybersecurity threat isolation, and cloud architecture built to serve global enterprises securely.
          </p>
        </div>

        {/* Column 1: Services */}
        <div className="col-span-6 md:col-span-2 md:col-start-7 text-left space-y-6">
          <h4 className="text-[11px] font-bold tracking-[0.25em] text-neutral-500 uppercase">
            SERVICES
          </h4>
          <ul className="space-y-4">
            <li>
              <a href="#services" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                Software Development
              </a>
            </li>
            <li>
              <a href="#services" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                Cloud Infrastructure
              </a>
            </li>
            <li>
              <a href="#services" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                Cybersecurity
              </a>
            </li>
            <li>
              <a href="#services" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                Data Analytics
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div className="col-span-6 md:col-span-2 text-left space-y-6">
          <h4 className="text-[11px] font-bold tracking-[0.25em] text-neutral-500 uppercase">
            COMPANY
          </h4>
          <ul className="space-y-4">
            <li>
              <a href="#about" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#about" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                Process Flow
              </a>
            </li>
            <li>
              <a href="#contact" className="text-xs text-neutral-400 hover:text-[#FF5C00] font-medium transition-colors">
                Support Line
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social & Tech Channels */}
        <div className="col-span-12 md:col-span-2 text-left space-y-6">
          <h4 className="text-[11px] font-bold tracking-[0.25em] text-neutral-500 uppercase">
            SOCIAL
          </h4>
          <div className="flex gap-4 items-center">
            <a 
              className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#FF5C00] hover:border-neutral-700 rounded-sm transition-all" 
              href="#"
              title="Share Page Link"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a 
              className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#0057FF] hover:border-neutral-700 rounded-sm transition-all" 
              href="#"
              title="Git Hub Codebase"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <a 
              className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#0057FF] hover:border-neutral-700 rounded-sm transition-all" 
              href="#"
              title="Tech Stack Specs"
            >
              <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Under Line credits and Copyrights */}
        <div className="col-span-12 pt-12 mt-12 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 tracking-wider">
            © 2026 Ideate Technology. Precision Architectures in Bandung. All rights reserved.
          </div>
          
          <div className="flex gap-8 items-center text-[10px] font-mono text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#home" onClick={handleScrollTop} className="text-[#FF5C00] hover:underline font-bold">Back to Top ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
