import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  ArrowRight,
  Info,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { Hotel } from '@/src/services/hotelService';
import { Button } from '../ui/Button';

interface ResultsSectionProps {
  results: Hotel[];
  isLoading: boolean;
  dateRange: { start: Date | null; end: Date | null };
  onBack: () => void;
  onSelectHotel: (hotel: Hotel) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  isLoading, 
  dateRange,
  onBack, 
  onSelectHotel 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <button 
            onClick={onBack}
            className="text-brand-600 flex items-center gap-1 text-xs font-black uppercase tracking-widest mb-4 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronRight className="rotate-180" size={16} />
            <span>Change Search</span>
          </button>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            {isLoading ? 'Scanning Best Options...' : 'Recommended for You'}
          </h2>
          <p className="text-slate-500 mt-2 font-sans max-w-xl">
            {isLoading 
                ? 'Our smart engine is comparing thousands of data points to find the absolute top value for your stay.' 
                : (
                  <span className="flex flex-wrap items-center gap-x-2">
                    Finding the best stays for 
                    <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-2 py-0.5 rounded-lg border border-brand-100 font-bold">
                       <Calendar size={12} />
                       {dateRange.start && dateRange.end && `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}`}
                    </span>
                  </span>
                )}
          </p>
        </div>
        {!isLoading && (
            <div className="flex items-center gap-3 p-4 bg-brand-50 border border-brand-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
                    <Info size={20} />
                </div>
                <div>
                    <p className="text-xs text-brand-800 font-bold uppercase tracking-widest">Smart Algorithm</p>
                    <p className="text-sm text-brand-700 font-medium">Scoring by Price, Quality & Sentiment</p>
                </div>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading ? (
            <>
                <ResultSkeleton />
                <ResultSkeleton />
                <ResultSkeleton />
            </>
        ) : (
            results.map((hotel, index) => (
            <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-500"
            >
                <div className="relative h-72 overflow-hidden">
                    <img 
                        src={hotel.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={hotel.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl ${
                        hotel.label === 'Best Value' ? 'bg-brand-600 text-white' : 
                        hotel.label === 'Top Pick' ? 'bg-amber-500 text-white' : 
                        'bg-slate-900 text-white'
                    }`}>
                        {hotel.label}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="flex items-center gap-1.5 mb-2">
                            <MapPin size={14} className="text-brand-400" />
                            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">{hotel.location}</span>
                        </div>
                        <h3 className="text-2xl font-black leading-tight drop-shadow-md">{hotel.name}</h3>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-slate-800 border-none shadow-lg flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Score: {hotel.score}</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <Star size={18} className="text-amber-400 fill-amber-400" />
                                <span className="text-lg font-black text-slate-900">{hotel.rating}</span>
                            </div>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">({hotel.reviews} reviews)</span>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">Rp {hotel.price.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Per night total</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {hotel.features.slice(0, 3).map(feature => (
                        <span key={feature} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-100">
                            {feature}
                        </span>
                        ))}
                    </div>

                    <Button 
                        onClick={() => onSelectHotel(hotel)}
                        variant="dark"
                        className="w-full h-14 rounded-2xl group-hover:bg-brand-600 transition-colors"
                        rightIcon={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    >
                        View Details
                    </Button>
                </div>
            </motion.div>
            ))
        )}
      </div>

      {!isLoading && (
        <div className="mt-20 pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-sans mb-6">Didn't find what you were looking for? We focus on the top 1% value options.</p>
            <Button variant="outline" size="sm" className="rounded-full px-10">
                Load More Smart Choices
            </Button>
        </div>
      )}
    </motion.div>
  );
};

function ResultSkeleton() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="h-72 bg-slate-100 animate-pulse relative">
                <div className="absolute bottom-6 left-6 space-y-3">
                    <div className="h-3 w-24 bg-slate-200 rounded-full" />
                    <div className="h-8 w-56 bg-slate-200 rounded-full" />
                </div>
            </div>
            <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-2 text-right">
                        <div className="h-8 w-32 bg-slate-100 rounded-full animate-pulse ml-auto" />
                        <div className="h-3 w-20 bg-slate-100 rounded-full animate-pulse ml-auto" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="h-7 w-20 bg-slate-50 rounded-xl animate-pulse" />
                    <div className="h-7 w-20 bg-slate-50 rounded-xl animate-pulse" />
                    <div className="h-7 w-20 bg-slate-50 rounded-xl animate-pulse" />
                </div>
                <div className="h-14 w-full bg-slate-100 rounded-2xl animate-pulse" />
            </div>
        </div>
    );
}
