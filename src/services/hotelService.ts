import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Hotel {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  description: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  label: "Best Value" | "Top Pick" | "Most Worth It";
  score: number;
  features: string[];
  reviews_breakdown: {
    cleanliness: number;
    service: number;
    location: number;
    value: number;
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
    label: "Best Value",
    score: 82.8,
    features: ["Infinity Pool", "Free Breakfast", "Beachfront", "Fitness Center", "Airport Transfer"],
    reviews_breakdown: {
      cleanliness: 9.2,
      service: 8.9,
      location: 9.5,
      value: 9.0
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
    rating: 9.2,
    reviews: 5000,
    location: "Kuta, Bali",
    label: "Top Pick",
    score: 79.4,
    features: ["Rooftop Bar", "High-speed Wi-Fi", "Close to Beach", "24/7 Room Service", "Private Parking"],
    reviews_breakdown: {
      cleanliness: 9.5,
      service: 9.4,
      location: 9.0,
      value: 8.5
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
    label: "Most Worth It",
    score: 82.1,
    features: ["Garden View", "Quiet Area", "Bike Rental", "Organic Kitchen", "Yoga Shala"],
    reviews_breakdown: {
      cleanliness: 8.5,
      service: 8.8,
      location: 8.2,
      value: 9.2
    }
  }
];

export async function searchHotels(destination: string, dates: string) {
  // Simulate AI/Algorithm delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockHotels;
}
