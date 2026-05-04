import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface GuestReview {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  description: string;
  price: number;
  originalPrice?: number; // Added for discounts
  rating: number;
  reviews: number;
  location: string;
  lat: number;
  lng: number;
  label: "Best Value" | "Top Pick" | "Most Worth It";
  score: number;
  features: string[];
  reviews_breakdown: {
    cleanliness: number;
    service: number;
    location: number;
    value: number;
  };
  reviews_list: GuestReview[];
  terms: {
    checkIn: string;
    checkOut: string;
    policies: string[];
  };
}

export const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Aura Resort & Spa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000"
    ],
    description: "Located in the heart of Seminyak, Aura Resort & Spa offers a tranquil escape with modern Indonesian architecture. Enjoy our world-class spa, beachfront dining, and the iconic infinity pool overlooking the sunset.",
    price: 420000,
    rating: 8.8,
    reviews: 3500,
    location: "Seminyak, Bali",
    lat: -8.6913,
    lng: 115.1682,
    label: "Best Value",
    score: 82.8,
    features: ["Infinity Pool", "Free Breakfast", "Beachfront", "Fitness Center", "Airport Transfer"],
    reviews_breakdown: {
      cleanliness: 9.2,
      service: 8.9,
      location: 9.5,
      value: 9.0
    },
    reviews_list: [
      {
        id: "r1",
        userName: "Alex Johnson",
        rating: 5,
        comment: "Absolutely stunning views and the service was impeccable. Will definitely return!",
        date: "2024-04-15",
        images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=500"]
      },
      {
        id: "r2",
        userName: "Sarah M.",
        rating: 4,
        comment: "Great location near the beach. The spa was the highlight of my trip.",
        date: "2024-03-20"
      }
    ],
    terms: {
      checkIn: "14:00",
      checkOut: "12:00",
      policies: ["No smoking in rooms", "Pets not allowed", "Quiet hours after 10 PM"]
    }
  },
  {
    id: "2",
    name: "Skyline Grand Hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff43c63faf7c?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1517840901100-8179e982ad91?auto=format&fit=crop&q=80&w=1000"
    ],
    description: "Experience luxury at its peak. Skyline Grand Hotel in Kuta combines urban sophistication with tropical charm. Our rooftop bar is voted #1 in the region for cocktails and panoramic views.",
    price: 500000,
    originalPrice: 750000,
    rating: 9.2,
    reviews: 5000,
    location: "Kuta, Bali",
    lat: -8.7233,
    lng: 115.1723,
    label: "Top Pick",
    score: 79.4,
    features: ["Rooftop Bar", "High-speed Wi-Fi", "Close to Beach", "24/7 Room Service", "Private Parking"],
    reviews_breakdown: {
      cleanliness: 9.5,
      service: 9.4,
      location: 9.0,
      value: 8.5
    },
    reviews_list: [
      {
        id: "r3",
        userName: "Michael Chen",
        rating: 5,
        comment: "The rooftop bar is simply the best in Bali. Highly recommend for the sunset.",
        date: "2024-05-01"
      }
    ],
    terms: {
      checkIn: "15:00",
      checkOut: "11:00",
      policies: ["Deposit required", "Late check-out subject to availability"]
    }
  },
  {
    id: "3",
    name: "Blue Horizon Inn",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000"
    ],
    description: "Tucked away in the cliffs of Uluwatu, Blue Horizon Inn is for those who seek peace and authentic charm. Perfect for surfers and nature lovers alike.",
    price: 350000,
    rating: 8.1,
    reviews: 1200,
    location: "Uluwatu, Bali",
    lat: -8.8451,
    lng: 115.0934,
    label: "Most Worth It",
    score: 82.1,
    features: ["Garden View", "Quiet Area", "Bike Rental", "Organic Kitchen", "Yoga Shala"],
    reviews_breakdown: {
      cleanliness: 8.5,
      service: 8.8,
      location: 8.2,
      value: 9.2
    },
    reviews_list: [
      {
        id: "r4",
        userName: "Emma Watson",
        rating: 4,
        comment: "Beautiful and peaceful. If you want to escape the crowds, this is the place.",
        date: "2024-02-14"
      }
    ],
    terms: {
      checkIn: "14:00",
      checkOut: "12:00",
      policies: ["No noisy parties", "Eco-friendly policy"]
    }
  }
];

export interface PromotedStay extends Hotel {
  discount: number;
  remainingRooms?: number;
}

export const getPromotedStays = async (): Promise<PromotedStay[]> => {
  return [
    {
      ...mockHotels[1],
      id: "p1",
      name: "Quest Vibe Dewi Sri Bali",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000",
      price: 383590,
      originalPrice: 640846,
      discount: 40,
      location: "Kuta, Badung",
      rating: 4.7
    },
    {
      ...mockHotels[0],
      id: "p2",
      name: "Hiliwatu Bali Ubud Resort",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
      price: 4725000,
      discount: 15,
      location: "Ubud, Gianyar",
      rating: 5,
      remainingRooms: 5
    }
  ];
};

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  location: string;
  dateRange: string;
  totalPrice: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookedAt: string;
}

export const getBookingHistory = async (): Promise<Booking[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
  
  return [
    {
      id: 'BK-7721',
      hotelId: '2',
      hotelName: 'Seminyak Sands Resort',
      hotelImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80',
      location: 'Seminyak, Bali',
      dateRange: 'May 12 - May 15, 2026',
      totalPrice: 13500000,
      status: 'confirmed',
      bookedAt: '2026-04-20'
    },
    {
      id: 'BK-6554',
      hotelId: '1',
      hotelName: 'The Uluwatu Cliff',
      hotelImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
      location: 'Uluwatu, Bali',
      dateRange: 'Apr 02 - Apr 05, 2026',
      totalPrice: 22500000,
      status: 'completed',
      bookedAt: '2026-03-10'
    }
  ];
};

export async function searchHotels(destination: string, dates: string) {
  // Simulate AI/Algorithm delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockHotels;
}
