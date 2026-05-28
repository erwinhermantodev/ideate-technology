import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavItem } from '../types';
import CompanyLogo from './CompanyLogo';

interface HeaderProps {
  siteName: string;
  navItems: NavItem[];
}

export default function Header({ siteName, navItems }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect to apply background glass styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-neutral-100 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 h-14 flex justify-between items-center">
          {/* Logo Name */}
          <a 
            href="#home" 
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity select-none"
          >
            <CompanyLogo size={32} />
            <span className="text-md sm:text-lg font-black tracking-tight text-[#121212]">
              IDEATE TECHNOLOGY
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-12 select-none">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-xs uppercase font-bold tracking-widest text-neutral-500 hover:text-[#FF5C00] transition-colors relative group py-2"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF5C00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Header Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#121212] hover:bg-[#FF5C00] text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded transition-colors active:scale-95"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-[#FF5C00] md:hidden transition rounded-md hover:bg-neutral-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Slide down overlay) */}
      <div
        className={`fixed inset-0 z-35 bg-white flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <nav className="flex flex-col space-y-6 items-center text-center">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-extrabold uppercase tracking-widest text-[#121212] hover:text-[#FF5C00]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 inline-flex items-center gap-1 bg-[#121212] hover:bg-[#FF5C00] text-white text-xs font-bold uppercase tracking-widest py-4 px-8 rounded transition"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </>
  );
}
