import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Star, 
  ArrowRight,
  Info,
  ChevronRight,
  Calendar,
  SlidersHorizontal,
  X,
  ChevronDown
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

type SortOption = 'score' | 'price-low' | 'price-high' | 'rating';

export const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  isLoading, 
  dateRange,
  onBack, 
  onSelectHotel 
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract all unique amenities from results
  const allAmenities = useMemo(() => {
    const amenities = new Set<string>();
    results.forEach(hotel => {
      hotel.features.forEach(f => amenities.add(f));
    });
    return Array.from(amenities).sort();
  }, [results]);

  // Apply filtering and sorting
  const filteredAndSortedResults = useMemo(() => {
    let list = [...results];

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      list = list.filter(hotel => 
        selectedAmenities.every(amenity => hotel.features.includes(amenity))
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [results, sortBy, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedAmenities([]);
    setSortBy('score');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
        <div className="flex-grow">
          <button 
            onClick={onBack}
            className="text-brand-600 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] mb-4 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronRight className="rotate-180" size={14} />
            <span>Change Search</span>
          </button>
          <h2 className="text-4xl font-black text-slate-900 leading-tight mb-3">
            {isLoading ? 'Scanning Best Options...' : 'Recommended Stays'}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 font-sans text-sm">
                Showing top value options for
            </span>
            <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-xl border border-brand-100 font-bold text-xs">
                <Calendar size={12} />
                {dateRange.start && dateRange.end ? `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}` : 'Dates not set'}
            </span>
            {!isLoading && filteredAndSortedResults.length !== results.length && (
              <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded-md">
                {filteredAndSortedResults.length} Matched
              </span>
            )}
          </div>
        </div>

        {!isLoading && (
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            {/* Sort Toggle */}
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-slate-200 pl-5 pr-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
              >
                <option value="score">Sort by: Smart Score</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>

            {/* Filter Trigger */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedAmenities.length > 0 || isFilterOpen
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-brand-300 shadow-sm'
              }`}
            >
              <SlidersHorizontal size={18} />
              <span>Filters {selectedAmenities.length > 0 && `(${selectedAmenities.length})`}</span>
            </button>
          </div>
        )}
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isFilterOpen && !isLoading && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Refine your experience</h4>
                <button 
                  onClick={clearFilters}
                  className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 underline"
                >
                  Reset All
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {allAmenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedAmenities.includes(amenity)
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20 scale-105'
                        : 'bg-white border border-slate-200 text-slate-400 hover:border-brand-200'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading ? (
            <>
                <ResultSkeleton />
                <ResultSkeleton />
                <ResultSkeleton />
            </>
        ) : filteredAndSortedResults.length > 0 ? (
            filteredAndSortedResults.map((hotel, index) => (
            <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative rounded-[2.5rem] border border-slate-200 bg-white overflow-hidden hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500"
            >
                <div className="relative h-72 overflow-hidden">
                    <img 
                        src={hotel.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={hotel.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent pointer-events-none" />
                    
                    <div className={`absolute top-5 left-5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-sm ${
                        hotel.label === 'Best Value' ? 'bg-brand-600 text-white' : 
                        hotel.label === 'Top Pick' ? 'bg-amber-500 text-white' : 
                        'bg-slate-900/80 text-white border border-white/20'
                    }`}>
                        {hotel.label}
                    </div>

                    <div className="absolute bottom-6 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin size={14} className="text-brand-400" />
                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest drop-shadow-sm">{hotel.location}</span>
                        </div>
                        <h3 className="text-2xl font-black leading-tight drop-shadow-lg">{hotel.name}</h3>
                    </div>

                    <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl text-slate-800 border-none shadow-lg flex items-center gap-2 border border-white/50">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Score: {hotel.score}</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <Star size={18} className="text-amber-400 fill-amber-400" />
                                <span className="text-xl font-black text-slate-900">{hotel.rating}</span>
                            </div>
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">({hotel.reviews} reviews)</span>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-brand-600 tracking-tighter">IDR {hotel.price.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Starting from</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-10 min-h-[68px]">
                        {hotel.features.slice(0, 3).map(feature => (
                        <span key={feature} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest transition-all group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-100">
                            {feature}
                        </span>
                        ))}
                        {hotel.features.length > 3 && (
                          <span className="px-4 py-2 bg-slate-50 text-[9px] font-black text-slate-300 uppercase tracking-widest rounded-xl">
                            +{hotel.features.length - 3} More
                          </span>
                        )}
                    </div>

                    <Button 
                        onClick={() => onSelectHotel(hotel)}
                        variant="dark"
                        className="w-full h-14 rounded-2xl group-hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/5 group-hover:shadow-brand-500/20"
                        rightIcon={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    >
                        View Experience
                    </Button>
                </div>
            </motion.div>
            ))
        ) : (
          <div className="lg:col-span-3 py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                <X size={32} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No matches found</h3>
              <p className="text-slate-500 font-sans mb-8">Try adjusting your filters to see more results.</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full px-8">
                Clear all filters
              </Button>
          </div>
        )}
      </div>

      {!isLoading && filteredAndSortedResults.length > 0 && (
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center">
            <div className="w-12 h-1 bg-slate-100 rounded-full mb-10" />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">End of smart recommendations</p>
            <Button variant="outline" size="sm" className="rounded-full px-12 h-12 text-[10px] font-black uppercase tracking-widest border-2">
                Discover More Stays
            </Button>
        </div>
      )}
    </motion.div>
  );
};

function ResultSkeleton() {
    return (
        <div className="rounded-[2.5rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="h-72 bg-slate-100 animate-pulse relative">
                <div className="absolute bottom-6 left-8 space-y-3">
                    <div className="h-3 w-24 bg-slate-200 rounded-full" />
                    <div className="h-8 w-56 bg-slate-200 rounded-full" />
                </div>
            </div>
            <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-3 w-32 bg-slate-100 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-3 text-right">
                        <div className="h-8 w-40 bg-slate-100 rounded-full animate-pulse ml-auto" />
                        <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse ml-auto" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="h-8 w-24 bg-slate-50 rounded-xl animate-pulse" />
                    <div className="h-8 w-24 bg-slate-50 rounded-xl animate-pulse" />
                    <div className="h-8 w-24 bg-slate-50 rounded-xl animate-pulse" />
                </div>
                <div className="h-14 w-full bg-slate-100 rounded-2xl animate-pulse" />
            </div>
        </div>
    );
}
