import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { ContactInfo, ContactInquiry } from '../types';

interface LetCollaborateProps {
  contact: ContactInfo;
  onNewInquiry: (inquiry: ContactInquiry) => void;
}

export default function LetCollaborate({ contact, onNewInquiry }: LetCollaborateProps) {
  // Input fields state
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  
  // Submission flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !projectType || !message) return;

    setIsSubmitting(true);

    // Simulate API round-trip delay
    setTimeout(() => {
      const newInquiry: ContactInquiry = {
        name,
        projectType,
        message,
        dateSubmitted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString(),
        status: 'success'
      };

      // Call parent handle callback
      onNewInquiry(newInquiry);

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form fields
      setName('');
      setProjectType('');
      setMessage('');

      // Fade out success notification badge
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 850);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-neutral-100 bg-[#FAF9F9]">
      <div className="grid grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column: Coordinates details */}
        <div className="col-span-12 md:col-span-6 text-left flex flex-col justify-between">
          <div className="space-y-12">
            <div>
              <span className="text-[12px] font-bold text-[#FF5C00] tracking-[0.25em] uppercase block mb-4">
                INQUIRIES
              </span>
              <h2 className="text-5xl sm:text-6xl font-black text-[#121212] tracking-tighter leading-none mb-4">
                Let's <br className="hidden lg:inline" />Collaborate.
              </h2>
              <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mt-4">
                Have a vision or technical roadmap to execute? Our team remains ready to architectural scale in Bandung.
              </p>
            </div>

            {/* Coordinates boxes with responsive links */}
            <div className="space-y-8">
              {/* Email */}
              <div className="group">
                <span className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase block mb-1">
                  EMAIL
                </span>
                <a 
                  href={`mailto:${contact.email}`} 
                  className="text-xl sm:text-2xl font-black text-[#121212] hover:text-[#FF5C00] transition-colors inline-flex items-center gap-2 group"
                >
                  <span>{contact.email}</span>
                  <Mail className="w-5 h-5 text-neutral-300 group-hover:text-[#FF5C00] transition-colors" />
                </a>
              </div>

              {/* Phone */}
              <div>
                <span className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase block mb-1">
                  PHONE
                </span>
                <a 
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                  className="text-xl sm:text-2xl font-black text-[#121212] hover:text-[#0057FF] transition-colors inline-flex items-center gap-2"
                >
                  <span>{contact.phone}</span>
                  <Phone className="w-5 h-5 text-neutral-300" />
                </a>
              </div>

              {/* Address */}
              <div>
                <span className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase block mb-1">
                  ADDRESS
                </span>
                <div className="text-xl font-black text-[#121212] flex items-start gap-2 max-w-sm leading-tight">
                  <MapPin className="w-5 h-5 text-[#FF5C00] mt-1 flex-shrink-0" />
                  <span>{contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-neutral-200/50 hidden md:block">
            <p className="text-[10px] font-mono text-neutral-400">
              Response SLA: &lt; 24 Working Hours across Bandung timezones
            </p>
          </div>
        </div>

        {/* Right Column: High contrast input forms with focus effects */}
        <div className="col-span-12 md:col-span-6 bg-white border border-neutral-200/60 p-8 sm:p-12 rounded-sm shadow-2xs text-left relative overflow-hidden">
          
          {/* Faint side visual strip */}
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[#0057FF]" />

          {/* Contact Inquiry form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-500 mb-2">Simulated Inquiry Payload</h3>

            {/* Name */}
            <div className="border-b border-neutral-200 py-3 focus-within:border-[#0057FF] transition-colors relative group">
              <label className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] block mb-1 uppercase">
                NAME
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg sm:text-xl font-semibold text-[#121212] placeholder-neutral-300 focus:outline-none"
              />
            </div>

            {/* Project Type */}
            <div className="border-b border-neutral-200 py-3 focus-within:border-[#0057FF] transition-colors relative group">
              <label className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] block mb-1 uppercase">
                PROJECT TYPE
              </label>
              <input 
                type="text" 
                required
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="e.g. Cloud Infrastructure"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg sm:text-xl font-semibold text-[#121212] placeholder-neutral-300 focus:outline-none"
              />
            </div>

            {/* Message Body */}
            <div className="border-b border-neutral-200 py-3 focus-within:border-[#0057FF] transition-colors relative group">
              <label className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] block mb-1 uppercase">
                MESSAGE
              </label>
              <textarea 
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your architectural vision"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm sm:text-md text-neutral-700 placeholder-neutral-300 focus:outline-none resize-none"
              />
            </div>

            {/* Submit Actions */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#121212] hover:bg-[#FF5C00] disabled:bg-neutral-300 text-white py-5 px-8 font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 group active:scale-95 text-center"
              >
                <span>{isSubmitting ? 'Transmitting Inbound...' : 'Send Inquiry'}</span>
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Status indicators */}
            {isSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded text-xs text-emerald-800 flex items-start gap-2.5 animate-slide-up">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="font-bold">Inquiry Transmitted Successfully!</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">Payload captured in the local Sandbox log. Open the "CMS Integration Lab" (bottom right indicator) to read the inbound structures live!</p>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}
