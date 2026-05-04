import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Info, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Hotel } from '@/src/services/hotelService';
import { Button } from '../ui/Button';

interface BookingSuccessProps {
  hotel: Hotel;
  dateRange: { start: Date | null; end: Date | null };
  onReset: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ hotel, dateRange, onReset }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto px-4 py-24 md:py-32 text-center"
        >
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-28 h-28 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-200/50"
            >
                <ShieldCheck size={56} />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">Booking Secured!</h1>
            <p className="text-lg text-slate-600 mb-12 font-sans max-w-md mx-auto">
                Your luxury stay at <span className="font-black text-slate-900">{hotel.name}</span> is officially confirmed. 
                Check your inbox for the welcome pack.
            </p>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-left mb-12 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 -z-10" />
                
                <h3 className="font-black text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                    <div className="w-1.5 h-4 bg-brand-600 rounded-full" />
                    Reservation Summary
                </h3>
                
                <div className="space-y-6">
                    <div className="flex justify-between items-end pb-4 border-b border-slate-50">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Resort</span>
                        <span className="text-slate-900 text-sm font-black">{hotel.name}</span>
                    </div>
                    <div className="flex justify-between items-end pb-4 border-b border-slate-50">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Check-in / Out</span>
                        <span className="text-slate-900 text-sm font-black">
                            {dateRange.start && dateRange.end && `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-end pb-4 border-b border-slate-50">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Location</span>
                        <span className="text-slate-900 text-sm font-black">{hotel.location}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Booking Status</span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest ring-4 ring-emerald-50">Verified Confirmed</span>
                    </div>
                </div>
            </div>

            <Button 
                onClick={onReset}
                variant="dark"
                size="lg"
                className="px-16"
            >
                Back to Home
            </Button>
        </motion.div>
    );
};
