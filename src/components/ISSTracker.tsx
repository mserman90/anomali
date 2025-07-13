import React, { useState, useEffect } from 'react';
import { Satellite, Clock, MapPin } from 'lucide-react';

interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export function ISSTracker() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [nextPass, setNextPass] = useState<string>('');

  useEffect(() => {
    const fetchISSPosition = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        setError('');
        const response = await fetch('https://api.open-notify.org/iss-now.json', {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        clearTimeout(timeoutId);
        setIssPosition({
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude),
          timestamp: data.timestamp
        });
        
        // Mock next pass time for Turkey
        const nextPassTime = new Date();
        nextPassTime.setHours(nextPassTime.getHours() + Math.floor(Math.random() * 8) + 1);
        setNextPass(nextPassTime.toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' }));
        
      } catch (error) {
        clearTimeout(timeoutId);
        const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
        console.error('ISS pozisyonu alınamadı:', errorMessage);
        
        if (error instanceof Error && error.name === 'AbortError') {
          setError('Bağlantı zaman aşımına uğradı');
        } else {
          setError('Gerçek zamanlı veri alınamadı');
        }
        
        // Mock data
        setIssPosition({
          latitude: 35.5 + Math.random() * 10,
          longitude: 28.0 + Math.random() * 15,
          timestamp: Date.now() / 1000
        });
        setNextPass('21:45:00');
      }
      setLoading(false);
    };

    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-24 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  const isOverTurkey = issPosition && 
    issPosition.latitude >= 35.5 && issPosition.latitude <= 42.5 &&
    issPosition.longitude >= 25.5 && issPosition.longitude <= 45.0;

  return (
    <div className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Satellite className="h-5 w-5 mr-2 text-cyan-400" />
          ISS Takibi
        </h3>
        <div className={`w-3 h-3 rounded-full ${isOverTurkey ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
      </div>
      
      {error && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 mb-3">
          <p className="text-yellow-200 text-xs">⚠️ {error} - Örnek veriler gösteriliyor</p>
        </div>
      )}
      
      {issPosition && (
        <div className="space-y-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Enlem:</span>
              <span className="text-white font-mono">{issPosition.latitude.toFixed(4)}°</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Boylam:</span>
              <span className="text-white font-mono">{issPosition.longitude.toFixed(4)}°</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-white/80 text-sm">
              {isOverTurkey ? 'Türkiye üzerinde!' : 'Türkiye dışında'}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-white/80 text-sm">
              Türkiye'den sonraki geçiş: {nextPass}
            </span>
          </div>
          
          <div className="text-xs text-white/60">
            Son güncelleme: {new Date(issPosition.timestamp * 1000).toLocaleTimeString('tr-TR')}
          </div>
        </div>
      )}
    </div>
  );
}