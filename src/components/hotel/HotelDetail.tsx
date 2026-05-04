import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  Award,
  CheckCircle2,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { Hotel } from '@/src/services/hotelService';
import { Button } from '../ui/Button';

interface HotelDetailProps {
  hotel: Hotel;
  dateRange: { start: Date | null; end: Date | null };
  onBack: () => void;
  onBook: () => void;
}

export const HotelDetail: React.FC<HotelDetailProps> = ({ hotel, dateRange, onBack, onBook }) => {
    const [activeImage, setActiveImage] = useState(hotel.image);
    const [isBooking, setIsBooking] = useState(false);

    const handleBook = () => {
        setIsBooking(true);
        setTimeout(() => {
            onBook();
        }, 1500);
    };

    return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <button 
            onClick={onBack}
            className="text-brand-600 flex items-center gap-1 text-xs font-black uppercase tracking-widest mb-10 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronRight className="rotate-180" size={16} />
            <span>Back to results</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Gallery */}
            <div className="space-y-6">
               <motion.div 
                 layoutId={`hotel-img-${hotel.id}`}
                 className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100"
               >
                    <img src={activeImage} className="w-full h-full object-cover transition-opacity duration-500" alt={hotel.name} />
               </motion.div>
               <div className="grid grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveImage(hotel.image)} 
                    className={`rounded-2xl overflow-hidden border-2 transition-all aspect-square outline-none ${activeImage === hotel.image ? 'border-brand-600 scale-95 ring-4 ring-brand-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={hotel.image} className="w-full h-full object-cover" alt="" />
                  </button>
                  {hotel.gallery.slice(0, 3).map((img, i) => (
                    <button 
                        key={i} 
                        onClick={() => setActiveImage(img)} 
                        className={`rounded-2xl overflow-hidden border-2 transition-all aspect-square outline-none ${activeImage === img ? 'border-brand-600 scale-95 ring-4 ring-brand-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
               </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-200">{hotel.label}</span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-black uppercase tracking-widest">
                        <Calendar size={14} className="text-brand-500" />
                        <span>{dateRange.start && dateRange.end && `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}`}</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">{hotel.name}</h1>
                
                <div className="flex flex-wrap items-center gap-8 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-500/20">{hotel.rating}</div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Excellent</span>
                            <span className="text-xs font-bold text-slate-400 font-sans">{hotel.reviews} Verified Reviews</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-200 hidden sm:block" />
                    <div className="flex items-center gap-3 bg-brand-50 px-4 py-2 rounded-2xl border border-brand-100">
                        <Award className="text-brand-600" size={24} />
                        <span className="text-xs font-black text-brand-800 uppercase tracking-widest">Top 1% Global Value</span>
                    </div>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-10 font-sans italic border-l-4 border-brand-200 pl-6 py-2">
                    "{hotel.description}"
                </p>

                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-10">
                    <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-brand-600 rounded-full" />
                        Performance Metrics
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            { label: 'Cleanliness', val: hotel.reviews_breakdown.cleanliness },
                            { label: 'Service', val: hotel.reviews_breakdown.service },
                            { label: 'Location', val: hotel.reviews_breakdown.location },
                            { label: 'Value', val: hotel.reviews_breakdown.value },
                        ].map(metric => (
                            <div key={metric.label} className="flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{metric.label}</span>
                                    <span className="text-xs font-black text-slate-700">{metric.val}</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.val * 10}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-emerald-500 rounded-full" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-2 lg:p-4 bg-white ring-1 ring-slate-100 rounded-3xl shadow-xl shadow-slate-200/40">
                    <div className="flex flex-col pl-4">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total per night</span>
                        <div className="text-4xl font-black text-slate-900 tracking-tighter">Rp {hotel.price.toLocaleString()}</div>
                    </div>
                    <Button 
                        onClick={handleBook}
                        isLoading={isBooking}
                        size="xl"
                        className="w-full sm:w-auto"
                    >
                        Secure Booking
                    </Button>
                </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-20">
            <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight uppercase tracking-widest text-sm text-center">Included Luxuries</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {hotel.features.map(f => (
                    <div key={f} className="flex flex-col items-center p-8 bg-white border border-slate-100 rounded-3xl text-center hover:border-brand-300 hover:bg-brand-50/30 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-10 transition-opacity">
                            <CheckCircle2 size={40} className="text-brand-600" />
                        </div>
                        <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:text-brand-600 group-hover:bg-brand-100 group-hover:scale-110 transition-all duration-300">
                            <CheckCircle2 size={28} />
                        </div>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{f}</span>
                    </div>
                ))}
            </div>
          </div>
        </motion.div>
    );
};
