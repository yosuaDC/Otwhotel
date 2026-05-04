/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Hotel as HotelIcon,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { Hotel, mockHotels, searchHotels } from '@/src/services/hotelService';

export default function App() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Hotel[] | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [step, setStep] = useState<'home' | 'results' | 'detail'>('home');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const hotels = await searchHotels(destination, `From ${checkIn} to ${checkOut}`);
    setResults(hotels);
    setIsSearching(false);
    setStep('results');
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setStep('detail');
  };

  const handleBackToResults = () => {
    setStep('results');
    setSelectedHotel(null);
  };

  const resetAll = () => {
    setStep('home');
    setResults(null);
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetAll}>
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
              <HotelIcon className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              otw<span className="text-brand-600">hotel</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-brand-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Partners</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Support</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-brand-600 px-4 py-2 hover:bg-brand-50 rounded-full transition-all">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <HeroSection 
              key="home"
              destination={destination} 
              setDestination={setDestination}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut} 
              handleSearch={handleSearch} 
              isSearching={isSearching} 
            />
          )}

          {step === 'results' && (
            <ResultsSection 
              key="results"
              results={results || []} 
              onBack={() => setStep('home')} 
              onSelectHotel={handleSelectHotel}
            />
          )}

          {step === 'detail' && selectedHotel && (
            <HotelDetailSection 
              key="detail"
              hotel={selectedHotel} 
              onBack={handleBackToResults} 
            />
          )}
        </AnimatePresence>

        {step === 'home' && <FeaturesSection />}
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <HotelIcon className="text-brand-400 w-6 h-6" />
                <span className="text-xl font-bold tracking-tight">otwhotel</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Smart recommendation engine that does the heavy lifting so you don't have to compare hundreds of hotels manually.
              </p>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Newsletter</h4>
                <p className="text-sm text-slate-400 mb-4">Get the best deals and travel tips.</p>
                <div className="flex gap-2">
                    <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-brand-500" />
                    <button className="bg-brand-600 hover:bg-brand-500 p-2 rounded-lg transition-all">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © 2026 otwhotel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroSection({ destination, setDestination, checkIn, setCheckIn, checkOut, setCheckOut, handleSearch, isSearching }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative pt-20 pb-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-100/50 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-6 border border-brand-200"
        >
          <Zap size={14} className="fill-brand-600 text-brand-600" />
          <span>Stop Comparing. Start Booking.</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          The Smartest Way to <br />
          <span className="gradient-text">Find Your Stay</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
          We analyze thousands of hotels and filter them by value, quality, and real guest sentiment. You don't need to check 5 tabs anymore.
        </p>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="glass p-2 rounded-2xl flex flex-col lg:flex-row items-center gap-2 group ring-1 ring-slate-200 transition-all focus-within:ring-brand-500 duration-300">
            <div className="flex-grow flex items-center px-4 py-3 w-full lg:border-r border-slate-200">
              <MapPin size={20} className="text-brand-500 mr-3" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 w-full font-medium"
                required
              />
            </div>
            
            <div className="flex-grow flex items-center px-4 py-3 w-full lg:border-r border-slate-200">
              <Calendar size={20} className="text-brand-500 mr-3" />
              <div className="flex gap-2 w-full">
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-slate-800 text-sm font-medium w-full"
                  required 
                />
                <span className="text-slate-300">|</span>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-slate-800 text-sm font-medium w-full"
                  required 
                />
              </div>
            </div>

            <div className="flex-grow flex items-center px-4 py-3 w-full lg:border-r border-slate-200">
              <Users size={20} className="text-brand-500 mr-3" />
              <button type="button" className="text-slate-400 text-sm font-medium w-full text-left">2 Guests, 1 Room</button>
            </div>

            <button 
              type="submit"
              disabled={isSearching}
              className="w-full lg:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg shadow-brand-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={20} />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium">
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
}

function FeaturesSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use otwhotel?</h2>
                    <p className="text-slate-600">We built the engine you deserve for your travels.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-600">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Smart Scoring</h3>
                        <p className="text-slate-600 leading-relaxed">Our proprietary algorithm balances price, ratings, and location to give you the objective "best value".</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent-600">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">No Markup Scams</h3>
                        <p className="text-slate-600 leading-relaxed">Transparency is our core. We show hidden fees upfront so you know exactly what you are paying for.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Comparison</h3>
                        <p className="text-slate-600 leading-relaxed">We aggregate data from Traveloka, Agoda, and more, giving you the curated results in seconds.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ResultsSection({ results, onBack, onSelectHotel }: { results: Hotel[], onBack: () => void, onSelectHotel: (hotel: Hotel) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="text-brand-600 flex items-center gap-1 text-sm font-bold mb-2 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronRight className="rotate-180" size={18} />
            <span>Change Search</span>
          </button>
          <h2 className="text-3xl font-bold text-slate-900">Recommended for You</h2>
          <p className="text-slate-500 mt-1">We've selected the 3 best options based on your criteria.</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-brand-50 border border-brand-100 rounded-xl">
           <Info size={18} className="text-brand-600" />
           <p className="text-sm text-brand-800 font-medium font-sans">Scoring based on <span className="font-bold">Price, Quality & Sentiment</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {results.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="recommendation-card group rounded-2xl border border-slate-200 bg-white"
          >
            <div className="relative h-64">
              <img 
                src={hotel.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={hotel.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className={`badge-label ${
                hotel.label === 'Best Value' ? 'bg-brand-600 text-white' : 
                hotel.label === 'Top Pick' ? 'bg-amber-500 text-white' : 
                'bg-accent-600 text-white'
              }`}>
                {hotel.label}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1 mb-1 font-sans">
                  <MapPin size={14} className="text-slate-300" />
                  <span className="text-xs font-medium text-slate-200">{hotel.location}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight">{hotel.name}</h3>
              </div>

              <div className="absolute top-4 right-4 glass px-2 py-1 rounded-lg text-slate-800 border-none shadow-sm flex items-center gap-1">
                <span className="text-xs font-bold font-sans">Score:</span>
                <span className="text-sm font-bold text-brand-600">{hotel.score}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-700">{hotel.rating}</span>
                  <span className="text-slate-400 text-sm">({hotel.reviews} reviews)</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">Rp {hotel.price.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Per night total</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {hotel.features.map(feature => (
                  <span key={feature} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    {feature}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => onSelectHotel(hotel)}
                className="w-full py-3 bg-slate-900 group-hover:bg-brand-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>View Details</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
         <p className="text-slate-500 text-sm mb-6">Didn't find what you were looking for? We focus on the top 1% value.</p>
         <button className="text-brand-600 font-bold text-sm hover:underline">
            Load next 5 smart choices
         </button>
      </div>
    </motion.div>
  );
}

function HotelDetailSection({ hotel, onBack }: { hotel: Hotel, onBack: () => void }) {
    const [activeImage, setActiveImage] = useState(hotel.image);

    return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <button 
            onClick={onBack}
            className="text-brand-600 flex items-center gap-1 text-sm font-bold mb-8 hover:translate-x-[-4px] transition-transform font-sans"
          >
            <ChevronRight className="rotate-180" size={18} />
            <span>Back to results</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <div className="space-y-4">
               <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <img src={activeImage} className="w-full h-full object-cover transition-opacity duration-300" alt={hotel.name} />
               </div>
               <div className="grid grid-cols-4 gap-4">
                  <button onClick={() => setActiveImage(hotel.image)} className={`rounded-xl overflow-hidden border-2 transition-all h-24 ${activeImage === hotel.image ? 'border-brand-600 scale-95' : 'border-transparent opacity-70'}`}>
                    <img src={hotel.image} className="w-full h-full object-cover" alt="" />
                  </button>
                  {hotel.gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(img)} className={`rounded-xl overflow-hidden border-2 transition-all h-24 ${activeImage === img ? 'border-brand-600 scale-95' : 'border-transparent opacity-70'}`}>
                        <img src={img} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
               </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold uppercase tracking-widest">{hotel.label}</span>
                    <div className="flex items-center gap-1 text-slate-500 text-sm font-sans">
                        <MapPin size={14} />
                        <span>{hotel.location}</span>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 mb-4">{hotel.name}</h1>
                
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-lg font-bold text-xl">{hotel.rating}</div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">Excellent</span>
                            <span className="text-xs text-slate-500 font-sans">{hotel.reviews} Verified Reviews</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <Award className="text-brand-600" size={24} />
                        <span className="text-sm font-bold text-slate-800">Top 1% Value</span>
                    </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-8 font-sans">
                    {hotel.description}
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">Why our engine picked this:</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col text-slate-600">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-tight font-sans">Cleanliness</span>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${hotel.reviews_breakdown.cleanliness * 10}%` }} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{hotel.reviews_breakdown.cleanliness}</span>
                            </div>
                        </div>
                        <div className="flex flex-col text-slate-600">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-tight font-sans">Service</span>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${hotel.reviews_breakdown.service * 10}%` }} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{hotel.reviews_breakdown.service}</span>
                            </div>
                        </div>
                        <div className="flex flex-col text-slate-600">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-tight font-sans">Location</span>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${hotel.reviews_breakdown.location * 10}%` }} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{hotel.reviews_breakdown.location}</span>
                            </div>
                        </div>
                        <div className="flex flex-col text-slate-600">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-tight font-sans">Value</span>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${hotel.reviews_breakdown.value * 10}%` }} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{hotel.reviews_breakdown.value}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-sans">Total per night</span>
                        <div className="text-4xl font-black text-slate-900">Rp {hotel.price.toLocaleString()}</div>
                    </div>
                    <button className="flex-grow lg:flex-grow-0 px-12 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-500/30 transition-all active:scale-95">
                        Book Now
                    </button>
                </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-bold mb-8">Amenities & Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {hotel.features.map(f => (
                    <div key={f} className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-2xl text-center hover:border-brand-200 hover:bg-brand-50 transition-colors group">
                        <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:text-brand-600 transition-colors">
                            <CheckCircle2 size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-700 font-sans">{f}</span>
                    </div>
                ))}
            </div>
          </div>
        </motion.div>
    );
}
