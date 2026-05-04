import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, Star, MapPin, ChevronRight } from 'lucide-react';
import { PromotedStay, getPromotedStays } from '@/src/services/hotelService';
import { Button } from '../ui/Button';

import { useLanguage } from '@/src/lib/LanguageContext';

export const PromotedStaySection: React.FC = () => {
    const { t } = useLanguage();
    const [stays, setStays] = useState<PromotedStay[]>([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 48, seconds: 16 });

    useEffect(() => {
        const fetchStays = async () => {
            const data = await getPromotedStays();
            setStays(data);
        };
        fetchStays();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNum = (num: number) => num.toString().padStart(2, '0');

    return (
        <section className="py-12 bg-orange-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                             <Timer size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">{t.promoted.title}</h2>
                            <p className="text-sm font-bold text-orange-500 font-sans">{t.promoted.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.promoted.endingIn}</span>
                        <div className="flex items-center gap-1">
                            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="w-9 h-9 bg-brand-600 text-white rounded-lg flex items-center justify-center font-black text-sm shadow-md">
                                        {formatNum(val)}
                                    </div>
                                    {idx < 2 && <span className="text-brand-600 font-black">:</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                    {['Bali', 'Jakarta', 'Bandung', 'Sukabumi', 'Ubud'].map((city, idx) => (
                        <button 
                            key={idx}
                            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                                idx === 0 
                                    ? 'bg-white text-brand-600 border-2 border-brand-200 shadow-sm' 
                                    : 'bg-orange-100/50 text-orange-700/60 hover:bg-white border-2 border-transparent'
                            }`}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stays.map((stay) => (
                        <motion.div 
                            key={stay.id}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[2rem] border border-orange-100 overflow-hidden shadow-xl shadow-orange-900/5 group"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img src={stay.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className="px-3 py-1 bg-brand-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">{t.promoted.save} {stay.discount}%</span>
                                    <div className="flex gap-2">
                                       {stay.remainingRooms && (
                                           <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-red-600 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ring-1 ring-red-100">
                                              {stay.remainingRooms} {t.promoted.left}
                                           </span>
                                       )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-tight">{stay.name}</h3>
                                </div>

                                <div className="flex items-center gap-1 text-orange-400 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={12} fill={i < Math.floor(stay.rating) ? 'currentColor' : 'none'} className={i < Math.floor(stay.rating) ? 'text-orange-400' : 'text-slate-200'} />
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-4 font-sans">
                                    <MapPin size={12} className="shrink-0" />
                                    <span className="truncate">{stay.location}</span>
                                </div>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-6 h-6 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                                        <Star size={12} fill="currentColor" />
                                    </div>
                                    <span className="text-xs font-black text-slate-900">{stay.rating}/5</span>
                                    <span className="text-xs font-bold text-slate-400 font-sans">({stay.reviews})</span>
                                </div>

                                <div className="flex items-end justify-between pt-4 border-t border-slate-50">
                                    <div>
                                        {stay.originalPrice && (
                                            <span className="block text-xs text-red-500 line-through font-black mb-0.5">IDR {stay.originalPrice.toLocaleString()}</span>
                                        )}
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xl font-black text-brand-600">IDR {stay.price.toLocaleString()}</span>
                                            <div className="w-4 h-4 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-[10px] font-black">?</div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold mt-1">{t.promoted.taxNote}</p>
                                    </div>
                                    <button className="w-10 h-10 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all shadow-sm">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="grid grid-cols-2 gap-4 lg:col-span-1">
                        {[
                            { label: t.promoted.topPicks, icon: '🔥' },
                            { label: t.promoted.nginepHemat, icon: '💰' },
                            { label: t.promoted.hotelMewah, icon: '🏨' },
                            { label: t.promoted.partner, icon: '🤝' },
                            { label: t.promoted.gems, icon: '💎' },
                            { label: t.promoted.kids, icon: '👶' }
                        ].slice(0, 4).map((item, idx) => (
                            <button key={idx} className="bg-white p-4 rounded-3xl border border-orange-50 flex flex-col items-center justify-center text-center group hover:shadow-lg transition-all">
                                <span className="text-2xl mb-2 group-hover:scale-125 transition-transform">{item.icon}</span>
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
