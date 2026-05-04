import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  CreditCard, 
  History, 
  MapPin, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Booking, getBookingHistory } from '@/src/services/hotelService';
import { Skeleton } from '../ui/Skeleton';

interface ProfileSectionProps {
  user: { name: string; email: string };
  onBack: () => void;
}

import { useLanguage } from '@/src/lib/LanguageContext';

export const ProfileSection: React.FC<ProfileSectionProps> = ({ user, onBack }) => {
    const { t } = useLanguage();
    const [bookings, setBookings] = useState<Booking[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getBookingHistory();
            setBookings(data);
            setIsLoading(false);
        };
        fetchHistory();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <button 
                onClick={onBack}
                className="text-brand-600 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] mb-10 hover:translate-x-[-4px] transition-transform"
            >
                <ChevronRight className="rotate-180" size={14} />
                <span>{t.profile.return}</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Info */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 -z-10 group-hover:scale-110 transition-transform duration-700" />
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-200 mb-6 shadow-inner">
                                <User size={48} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-1">{user.name}</h2>
                            <p className="text-sm font-medium text-slate-400 mb-6 font-sans">{user.email}</p>
                            
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 mb-8">
                                <ShieldCheck size={12} />
                                {t.profile.verified}
                            </div>

                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.profile.stays}</span>
                                    <span className="text-xl font-black text-slate-900">42</span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.profile.points}</span>
                                    <span className="text-xl font-black text-brand-600">8.2k</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
                        {[
                            { icon: History, label: t.profile.history, active: true },
                            { icon: CreditCard, label: t.profile.payment },
                            { icon: Star, label: t.profile.reviews },
                            { icon: Settings, label: t.profile.settings }
                        ].map((item, idx) => (
                            <button 
                                key={idx}
                                className={`w-full flex items-center justify-between p-5 text-sm font-bold transition-all group ${item.active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon size={18} className={item.active ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'} />
                                    <span className="uppercase tracking-widest text-[10px] font-black">{item.label}</span>
                                </div>
                                <ChevronRight size={16} className={item.active ? 'text-brand-400' : 'text-slate-300'} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{t.profile.history}</h3>
                            <p className="text-slate-400 font-sans text-sm">{t.profile.manage}</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button className="px-4 py-2 bg-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">{t.profile.all}</button>
                            <button className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">{t.profile.upcoming}</button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-6">
                                    <Skeleton width={200} height={140} borderRadius="1.5rem" className="shrink-0" />
                                    <div className="flex-grow py-2">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-2">
                                                <Skeleton width={180} height={24} />
                                                <Skeleton width={120} height={16} />
                                            </div>
                                            <Skeleton width={80} height={20} borderRadius="full" />
                                        </div>
                                        <div className="space-y-3 pt-4 border-t border-slate-50">
                                            <Skeleton width="100%" height={12} />
                                            <div className="flex gap-4">
                                                <Skeleton width={80} height={32} borderRadius="0.75rem" />
                                                <Skeleton width={120} height={32} borderRadius="0.75rem" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <motion.div 
                                    key={booking.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="group bg-white p-4 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                                >
                                    <div className="relative w-full md:w-[200px] h-[140px] shrink-0 overflow-hidden rounded-[1.5rem] shadow-lg">
                                        <img src={booking.hotelImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-900 border border-white">
                                            {booking.id}
                                        </div>
                                    </div>

                                    <div className="flex-grow flex flex-col py-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{booking.hotelName}</h4>
                                                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold font-sans">
                                                    <MapPin size={12} className="text-brand-500" />
                                                    {booking.location}
                                                </div>
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                booking.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                'bg-slate-50 text-slate-700 border-slate-100'
                                            }`}>
                                                {booking.status}
                                            </div>
                                        </div>

                                        <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                                                    <Calendar size={10} />
                                                    Stay Period
                                                </span>
                                                <span className="text-xs font-black text-slate-900">{booking.dateRange}</span>
                                            </div>
                                            <div className="flex flex-col gap-1 items-end">
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t.profile.amountPaid}</span>
                                                <span className="text-sm font-black text-emerald-600">Rp {booking.totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <History size={32} />
                                </div>
                                <h4 className="font-black text-slate-900 mb-2">{t.profile.noBookings}</h4>
                                <p className="text-slate-400 text-sm font-sans">{t.profile.startAdventure}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
