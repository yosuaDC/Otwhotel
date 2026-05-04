import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  Award,
  CheckCircle2,
  ChevronRight,
  Calendar,
  User,
  LogOut
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-slate-100 pt-20">
            {/* Map Detail */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <MapPin className="text-brand-600" size={24} />
                  Hotel Location
                </h2>
                <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-inner ring-1 ring-slate-200 bg-slate-100 relative group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${hotel.lat},${hotel.lng}&z=15&output=embed`}
                    className="filter contrast-125 saturate-150 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-xl flex items-center justify-between scale-95 group-hover:scale-100 transition-transform">
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Exact Location</span>
                      <span className="text-sm font-bold text-slate-900">{hotel.location}</span>
                    </div>
                    <button className="px-4 py-2 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-500/20">
                       Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Guest Reviews */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Star className="text-emerald-500" size={24} />
                    Guest Reviews
                  </h2>
                  <div className="flex gap-2">
                    {['Recent', 'Media', 'Top'].map((filter, i) => (
                      <button key={i} className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${i === 0 ? 'bg-white border-slate-300 shadow-sm' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {hotel.reviews_list.map((review) => (
                    <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-200">
                             <User size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-900 mb-0.5">{review.userName}</h4>
                            <span className="text-[10px] font-bold text-slate-400 font-sans">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-500">
                           {Array.from({ length: 5 }).map((_, i) => (
                             <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? 'text-emerald-500' : 'text-slate-200'} />
                           ))}
                        </div>
                      </div>
                      <p className="text-base text-slate-600 font-sans mb-6 leading-relaxed italic">"{review.comment}"</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-4">
                          {review.images.map((img, i) => (
                            <div key={i} className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:scale-110 transition-transform">
                               <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms & Schedule */}
            <div className="space-y-8">
               <div className="bg-brand-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-10">Accommodation Schedule</h3>
                  
                  <div className="space-y-10 relative z-10">
                    <div className="flex items-start gap-6">
                       <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                          <Calendar size={24} className="text-brand-300" />
                       </div>
                       <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-brand-500 mb-1">Check-in Time</span>
                          <span className="text-2xl font-black text-brand-400">{hotel.terms.checkIn}</span>
                          <p className="text-[10px] text-brand-300/50 mt-1 font-bold">Standard procedure</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-6">
                       <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                          <LogOut size={24} className="text-brand-300 rotate-180" />
                       </div>
                       <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-brand-500 mb-1">Check-out Time</span>
                          <span className="text-2xl font-black text-brand-400">{hotel.terms.checkOut}</span>
                          <p className="text-[10px] text-brand-300/50 mt-1 font-bold">Express checkout</p>
                       </div>
                    </div>
                  </div>

                  <div className="mt-16 space-y-4">
                     <span className="block text-[9px] font-black uppercase tracking-widest text-brand-600 mb-6">Stay Policies</span>
                     {hotel.terms.policies.map((p, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                           <div className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                           <span className="text-xs font-bold text-brand-100/90 font-sans leading-none">{p}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200/60 shadow-inner">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Concierge Support</h3>
                  <div className="space-y-4">
                    <button className="w-full py-5 px-8 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-between hover:border-brand-600 hover:shadow-xl transition-all group">
                       <span className="text-slate-700">Message Property</span>
                       <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </button>
                    <button className="w-full py-5 px-8 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-between hover:border-brand-600 hover:shadow-xl transition-all group">
                       <span className="text-slate-700">Special Request</span>
                       <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
    );
};
