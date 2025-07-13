import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Info } from 'lucide-react';

interface ApodData {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
}

interface AstronomyCardProps {
  apiKey: string;
}

export function AstronomyCard({ apiKey }: AstronomyCardProps) {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error('APOD verisi alınamadı:', error);
        // Fallback data
        setApod({
          title: "Günün Astronomi Fotoğrafı",
          explanation: "NASA'nın günlük astronomi fotoğrafı servisi geçici olarak kullanılamıyor.",
          url: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
          date: new Date().toISOString().split('T')[0],
          media_type: "image"
        });
      }
      setLoading(false);
    };

    fetchApod();
  }, [apiKey]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-48 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Camera className="h-5 w-5 mr-2 text-pink-400" />
          Günün Astronomi Fotoğrafı
        </h3>
        <div className="flex items-center text-purple-300 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          {apod?.date}
        </div>
      </div>
      
      {apod?.media_type === 'image' ? (
        <div className="mb-4">
          <img 
            src={apod.url} 
            alt={apod.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="mb-4 h-48 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <p className="text-white">Video içeriği mevcut</p>
        </div>
      )}
      
      <h4 className="text-white font-semibold mb-2">{apod?.title}</h4>
      
      <div className="flex items-start">
        <Info className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-white/80 text-sm leading-relaxed">
          {apod?.explanation.slice(0, 200)}...
        </p>
      </div>
    </div>
  );
}