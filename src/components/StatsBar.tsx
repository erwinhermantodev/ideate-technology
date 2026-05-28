import { motion } from 'motion/react';
import { StatItem } from '../types';

interface StatsBarProps {
  stats: StatItem[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="py-16 sm:py-20 bg-[#F3F3F4] border-t border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
        
        {/* Modern 4-Column Grid alignment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col text-left group"
            >
              {/* Category Small Caps Label */}
              <span className="text-[10px] sm:text-[11px] font-black text-neutral-400 tracking-[0.2em] uppercase mb-2 select-none group-hover:text-[#FF5C00] transition-colors duration-200">
                {stat.label}
              </span>
              
              {/* Stat Highlight Value */}
              <span className="text-lg sm:text-xl md:text-2xl font-black text-[#121212] tracking-tight">
                {stat.value}
              </span>

              {/* Underlying micro hairgrid anchor */}
              <div className="w-6 h-[2px] bg-neutral-300 mt-3 group-hover:w-16 group-hover:bg-[#0057FF] transition-all duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
