import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  isAfter,
  eachDayOfInterval,
  isWithinInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  startDate, 
  endDate, 
  onChange, 
  onClose 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      onChange(day, null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        onChange(day, null);
      } else {
        onChange(startDate, day);
      }
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={18} className="text-slate-600" />
          </button>
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest min-w-[100px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronRight size={18} className="text-slate-600" />
          </button>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors ml-2">
          <X size={18} className="text-slate-400" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <div className="grid grid-cols-7 mb-1 border-b border-slate-50">
        {days.map((day, idx) => (
          <div key={idx} className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateView = startOfWeek(monthStart);
    const endDateView = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDateView;

    while (day <= endDateView) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isStart = startDate && isSameDay(day, startDate);
        const isEnd = endDate && isSameDay(day, endDate);
        const isSelected = isStart || isEnd;
        const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isPast = isBefore(day, startOfDay(new Date()));

        days.push(
          <div
            key={day.toString()}
            className={`relative h-9 flex items-center justify-center cursor-pointer group transition-all ${
              !isCurrentMonth ? 'opacity-10 pointer-events-none' : ''
            } ${isPast ? 'opacity-20 pointer-events-none' : ''}`}
            onClick={() => onDateClick(cloneDay)}
          >
            {isInRange && (
              <div className={`absolute inset-y-1 bg-brand-50 z-0 ${
                isStart ? 'left-1/2 rounded-l-full' : 
                isEnd ? 'right-1/2 rounded-r-full' : 
                'inset-x-0'
              }`} />
            )}
            <div className={`relative z-10 w-7.5 h-7.5 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
              isSelected ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 scale-105' : 
              isInRange ? 'text-brand-700 font-black' : 'text-slate-600 group-hover:bg-slate-100 group-hover:scale-110'
            }`}>
              {format(day, 'd')}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="px-1">{rows}</div>;
  };

  const startOfDay = (d: Date) => {
    const newDate = new Date(d);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 w-[calc(100vw-32px)] sm:w-[320px] overflow-hidden"
    >
      {renderHeader()}
      <div className="p-2 sm:p-3">
        {renderDays()}
        {renderCells()}
      </div>
      
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none font-sans">Period</span>
              <div className="text-[11px] font-bold text-slate-800">
                {startDate ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-700 bg-white border border-brand-100 px-2 py-0.5 rounded-lg text-[10px] leading-none shrink-0 shadow-sm">{format(startDate, 'MMM d')}</span>
                    {endDate ? (
                      <>
                        <span className="text-slate-300 text-[10px] font-normal">→</span>
                        <span className="text-brand-700 bg-white border border-brand-100 px-2 py-0.5 rounded-lg text-[10px] leading-none shrink-0 shadow-sm">{format(endDate, 'MMM d')}</span>
                      </>
                    ) : (
                      <span className="text-slate-400 animate-pulse text-[9px] font-black uppercase tracking-tight ml-1 whitespace-nowrap">Select end</span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400 font-bold font-sans text-xs">Pick your stay</span>
                )}
              </div>
          </div>
          <div className="shrink-0">
              <Button 
                onClick={onClose}
                disabled={!startDate || !endDate}
                size="md"
                className="h-11 px-6 rounded-2xl whitespace-nowrap text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand-500/25"
              >
                Confirm Stay
              </Button>
          </div>
      </div>
    </motion.div>
  );
};
