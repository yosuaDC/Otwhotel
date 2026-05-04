import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { Hotel as HotelIcon, User, LogOut } from 'lucide-react';

import { Hotel, searchHotels, Booking } from '@/src/services/hotelService';
import { Button } from '@/src/components/ui/Button';
import { HeroSection } from '@/src/components/home/HeroSection';
import { ResultsSection } from '@/src/components/search/ResultsSection';
import { HotelDetail } from '@/src/components/hotel/HotelDetail';
import { BookingSuccess } from '@/src/components/hotel/BookingSuccess';
import { AuthModal } from '@/src/components/auth/AuthModal';
import { ProfileSection } from '@/src/components/profile/ProfileSection';
import { PromotedStaySection } from '@/src/components/home/PromotedStaySection';

type AppStep = 'home' | 'results' | 'detail' | 'booking-success' | 'profile';

interface UserState {
  name: string;
  email: string;
}

import { LanguageProvider, useLanguage } from '@/src/lib/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { locale, setLocale, t } = useLanguage();
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({
    start: null,
    end: null
  });
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Hotel[] | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [step, setStep] = useState<AppStep>('home');
  
  // Auth State
  const [user, setUser] = useState<UserState | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange.start || !dateRange.end) return;
    
    setStep('results');
    setIsSearching(true);
    const dateStr = `From ${format(dateRange.start, 'MMM d')} to ${format(dateRange.end, 'MMM d')}`;
    const hotels = await searchHotels(destination, dateStr);
    setResults(hotels);
    setIsSearching(false);
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setStep('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToResults = () => {
    setStep('results');
    setSelectedHotel(null);
  };

  const resetAll = () => {
    setStep('home');
    setResults(null);
    setSelectedHotel(null);
    setDestination('');
    setDateRange({ start: null, end: null });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetAll}>
            <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
              <HotelIcon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              otw<span className="text-brand-600">hotel</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
              <button 
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${locale === 'en' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLocale('id')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${locale === 'id' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                ID
              </button>
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStep('profile')}
                  className="flex items-center gap-4 group"
                >
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-600 transition-colors">{user.name}</span>
                    <span className="text-xs font-bold text-emerald-600">{t.nav.proMember}</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                      <User size={20} />
                  </div>
                </button>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button 
                  size="md" 
                  variant="primary"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 rounded-xl font-black uppercase tracking-widest text-[11px]"
                >
                  {t.nav.login}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeroSection 
                destination={destination} 
                setDestination={setDestination}
                dateRange={dateRange}
                setDateRange={setDateRange}
                handleSearch={handleSearch} 
                isSearching={isSearching} 
              />
              <PromotedStaySection />
            </motion.div>
          )}

          {step === 'results' && (
            <ResultsSection 
              key="results"
              isLoading={isSearching}
              results={results || []} 
              dateRange={dateRange}
              onBack={() => setStep('home')} 
              onSelectHotel={handleSelectHotel}
            />
          )}

          {step === 'detail' && selectedHotel && (
            <HotelDetail 
              key="detail"
              hotel={selectedHotel} 
              dateRange={dateRange}
              onBack={handleBackToResults} 
              onBook={async () => {
                if (!user) {
                  setIsAuthModalOpen(true);
                  return;
                }
                
                // Transition to success step
                setStep('booking-success');

                // Send confirmation email in background
                try {
                  await fetch('/api/send-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: user.email,
                      name: user.name,
                      hotelName: selectedHotel.name,
                      checkIn: dateRange.start ? format(dateRange.start, 'PPP') : 'Not set',
                      checkOut: dateRange.end ? format(dateRange.end, 'PPP') : 'Not set',
                      bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
                      totalPrice: selectedHotel.price * 3 // Mock 3 nights
                    })
                  });
                } catch (error) {
                  console.error('Failed to send email:', error);
                }
              }}
            />
          )}

          {step === 'booking-success' && selectedHotel && (
            <BookingSuccess 
              key="success"
              hotel={selectedHotel}
              dateRange={dateRange}
              onReset={resetAll}
            />
          )}

          {step === 'profile' && user && (
            <ProfileSection 
              key="profile"
              user={user}
              onBack={() => setStep('home')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                  <HotelIcon className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white">
                  otw<span className="text-brand-600">hotel</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-8 font-sans leading-relaxed">
                The intelligent hotel search engine that filters through thousands of options to deliver only the best quality stays with true value.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-sans">
                <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-sans">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-500 font-sans">© 2026 otwhotel. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-slate-500 hover:text-white transition-colors text-xs font-black tracking-widest uppercase">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={setUser}
      />
    </div>
  );
}
