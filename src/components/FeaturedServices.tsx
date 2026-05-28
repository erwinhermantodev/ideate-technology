import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Cloud, 
  Shield, 
  BarChart3, 
  Brain, 
  ArrowRight, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { ServiceItem } from '../types';

// Safe Lucide icon resolver
const iconMap: { [key: string]: any } = {
  Code: Code,
  Cloud: Cloud,
  Shield: Shield,
  BarChart3: BarChart3,
  Brain: Brain
};

interface FeaturedServicesProps {
  services: ServiceItem[];
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FAF9F9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        
        {/* Header Title Section */}
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <span className="text-[12px] font-bold text-[#0057FF] tracking-[0.25em] uppercase block mb-4">
            EXPERTISE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#121212]">
            Featured Services
          </h2>
          <div className="w-12 h-[3px] bg-[#FF5C00] mt-6" />
        </div>

        {/* Swiss Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Code;
            
            // Software Dev (First item) takes col-span-12 on mobile, md:col-span-8
            // Others take md:col-span-4 to form the perfect modern architectural grid
            const isFirst = service.index === "01";
            const isDark = service.index === "05"; // IT Consulting is dark themed

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: Number(service.index) * 0.1 }}
                onClick={() => setSelectedService(service)}
                className={`col-span-12 ${
                  isFirst ? 'md:col-span-8' : 'md:col-span-4'
                } group cursor-pointer border relative p-8 sm:p-12 transition-all duration-500 flex flex-col justify-between ${
                  isDark 
                    ? 'bg-[#121212] text-white border-transparent' 
                    : 'bg-white text-[#121212] border-neutral-200'
                } hover:border-[#FF5C00]`}
              >
                {/* Accent hover strip (Action Orange line on top) */}
                <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#FF5C00] transition-all duration-500 group-hover:w-full" />

                {/* Top Section with Icon and Number indicator */}
                <div className="flex justify-between items-start mb-16">
                  <div className={`p-3 rounded-md transition-all duration-300 ${
                    isDark 
                      ? 'bg-neutral-800 text-[#FF5C00]' 
                      : 'bg-neutral-50 border border-neutral-100 text-[#0057FF] group-hover:border-[#FF5C00]/20'
                  }`}>
                    <IconComponent className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  <span className={`text-[12px] font-mono font-bold tracking-widest ${
                    isDark ? 'text-neutral-600' : 'text-neutral-300'
                  }`}>
                    {service.index}
                  </span>
                </div>

                {/* Info Text Area */}
                <div>
                  {service.tag && (
                    <span className={`text-[10px] font-bold tracking-widest uppercase mb-2 inline-block ${
                      isDark ? 'text-[#FF5C00]' : 'text-neutral-400'
                    }`}>
                      {service.tag}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 group-hover:text-[#0057FF] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-8 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {service.description}
                  </p>

                  {/* Actions / Interactive Footer */}
                  <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300 inline-flex">
                    <span className={`text-[11px] font-extrabold uppercase tracking-widest border-b pb-1 transition-all ${
                      isDark 
                        ? 'border-neutral-500 text-neutral-300 group-hover:border-[#FF5C00] group-hover:text-[#FF5C00]' 
                        : 'border-[#121212] text-[#121212] group-hover:border-[#FF5C00] group-hover:text-[#0057FF]'
                    }`}>
                      Explore Capability
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-350 ${
                      isDark ? 'text-[#FF5C00]' : 'text-[#0057FF]'
                    }`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Service Overlay Drawer (Built with motion/react) */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
              />

              {/* Drawer Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white text-[#121212] rounded-lg max-w-xl w-full p-8 md:p-12 shadow-2xl overflow-hidden border border-neutral-100 flex flex-col"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="absolute right-6 top-6 p-2 rounded-full hover:bg-neutral-100 transition"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>

                {/* Details Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-black text-[#FF5C00] border-r border-neutral-200 pr-3">
                      SERVICE {selectedService.index}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                      {selectedService.tag || 'Expertise'}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black text-[#121212] tracking-tight">
                    {selectedService.title}
                  </h3>

                  <p className="text-md font-medium text-[#0057FF] leading-relaxed">
                    {selectedService.description}
                  </p>

                  <div className="border-t border-b border-neutral-100 py-6 my-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Service Deep-Dive</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                      {selectedService.longDescription}
                    </p>
                  </div>

                  {/* Highlights section inside popup to make it extremely detailed */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Guaranteed SLAs</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Type-Safe Execution</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>99.99% Node Uptime</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Swiss-Grid Clean Code</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Bandung Local Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer actions inside detail popup */}
                  <div className="pt-6 flex justify-between items-center select-none">
                    <a
                      href="#contact"
                      onClick={() => setSelectedService(null)}
                      className="bg-[#121212] text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#FF5C00] transition-colors"
                    >
                      Inquire About This
                    </a>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="text-xs text-neutral-400 hover:text-[#121212] transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
