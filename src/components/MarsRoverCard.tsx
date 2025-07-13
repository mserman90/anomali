import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Calendar } from 'lucide-react';

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
    status: string;
  };
  camera: {
    full_name: string;
  };
}

interface MarsRoverCardProps {
  apiKey: string;
}

export function MarsRoverCard({ apiKey }: MarsRoverCardProps) {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.latest_photos && data.latest_photos.length > 0) {
          setPhotos(data.latest_photos.slice(0, 5));
        } else {
          // Fallback photos
          setPhotos([{
            id: 1,
            img_src: "https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg",
            earth_date: new Date().toISOString().split('T')[0],
            rover: { name: "Curiosity", status: "active" },
            camera: { full_name: "Mars Hand Lens Imager" }
          }]);
        }
      } catch (error) {
        console.error('Mars fotoğrafları alınamadı:', error);
        setPhotos([{
          id: 1,
          img_src: "https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg",
          earth_date: new Date().toISOString().split('T')[0],
          rover: { name: "Curiosity", status: "active" },
          camera: { full_name: "Mars Hand Lens Imager" }
        }]);
      }
      setLoading(false);
    };

    fetchMarsPhotos();
  }, [apiKey]);

  useEffect(() => {
    if (photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [photos.length]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-48 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-red-400" />
          Mars'tan Güncel
        </h3>
        <span className="text-orange-300 text-sm">{currentPhoto?.rover.name}</span>
      </div>
      
      {currentPhoto && (
        <>
          <div className="mb-4 relative overflow-hidden rounded-lg">
            <img 
              src={currentPhoto.img_src} 
              alt="Mars fotoğrafı"
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentPhotoIndex + 1}/{photos.length}
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-white/80">
              <Calendar className="h-4 w-4 mr-2 text-orange-400" />
              Çekim: {new Date(currentPhoto.earth_date).toLocaleDateString('tr-TR')}
            </div>
            <div className="flex items-center text-white/80">
              <Camera className="h-4 w-4 mr-2 text-red-400" />
              {currentPhoto.camera.full_name}
            </div>
            <div className="text-orange-300 font-semibold">
              Rover Durumu: {currentPhoto.rover.status === 'active' ? 'Aktif' : 'Pasif'}
            </div>
          </div>
        </>
      )}
    </div>
  );
}