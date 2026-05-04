import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Users, Search, Zap, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { DateRangePicker } from '../DateRangePicker';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  destination: string;
  setDestination: (d: string) => void;
  dateRange: { start: Date | null; end: Date | null };
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
}

import { useLanguage } from '@/src/lib/LanguageContext';

export const HeroSection: React.FC<HeroSectionProps> = ({
  destination,
  setDestination,
  dateRange,
  setDateRange,
  handleSearch,
  isSearching,
}) => {
  const { t } = useLanguage();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative pt-12 md:pt-20 pb-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-100/50 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/50 text-brand-700 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-brand-200"
        >
          <Zap size={14} className="fill-brand-600 text-brand-600" />
          <span>{t.hero.badge}</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
          {t.hero.titleTop} <br />
          <span className="gradient-text">{t.hero.titleBottom}</span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-sans">
          {t.hero.subtext}
        </p>

        <div className="max-w-4xl mx-auto relative z-20">
          <form onSubmit={handleSearch} className="glass p-2 rounded-2xl flex flex-col lg:flex-row items-center gap-2 group ring-1 ring-slate-200 transition-all focus-within:ring-brand-500 duration-300">
            <div className="flex-grow flex items-center px-4 py-3 w-full lg:border-r border-slate-200">
              <MapPin size={20} className="text-brand-500 mr-3 shrink-0" />
              <input 
                type="text" 
                placeholder={t.hero.destinationPlaceholder} 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 w-full font-bold"
                required
              />
            </div>
            
            <div className="flex-grow relative flex items-center px-4 py-3 w-full lg:border-r border-slate-200 cursor-pointer hover:bg-slate-50/20 transition-colors" onClick={() => setShowPicker(!showPicker)}>
              <Calendar size={20} className="text-brand-500 mr-3 shrink-0" />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{t.hero.datesLabel}</span>
                <span className="text-sm font-bold text-slate-800 truncate">
                  {dateRange.start && dateRange.end 
                    ? `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}` 
                    : t.hero.datesPlaceholder}
                </span>
              </div>
              <AnimatePresence>
                {showPicker && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none pointer-events-auto transition-all" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPicker(false);
                      }} 
                    />
                    <div className="fixed inset-0 lg:absolute lg:inset-auto lg:top-full lg:left-0 lg:translate-x-0 z-50 mt-2 flex items-center justify-center lg:block p-4 lg:p-0 pointer-events-none" onClick={(e) => e.stopPropagation()}>
                      <div className="pointer-events-auto">
                        <DateRangePicker 
                          startDate={dateRange.start} 
                          endDate={dateRange.end} 
                          onChange={(start, end) => setDateRange({ start, end })}
                          onClose={() => setShowPicker(false)}
                          confirmLabel={t.hero.confirmStay}
                          selectLabel={t.hero.selectDates}
                        />
                      </div>
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-grow flex items-center px-4 py-3 w-full lg:border-r border-slate-200">
              <Users size={20} className="text-brand-500 mr-3 shrink-0" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Guests</span>
                <span className="text-sm font-bold text-slate-800">2 Guests, 1 Room</span>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isSearching || !dateRange.start || !dateRange.end}
              isLoading={isSearching}
              size="lg"
              className="lg:w-auto w-full"
              leftIcon={!isSearching && <Search size={20} />}
            >
              {isSearching ? t.hero.searching : t.hero.searchButton}
            </Button>
          </form>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] md:text-sm text-slate-400 font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Real-time Pricing</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Best Value Guarantee</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
};
