import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  visibility: number;
  description: string;
}

interface WeatherCardProps {
  apiKey: string;
  city: string;
  lat: number;
  lon: number;
}

export function WeatherCard({ city, lat, lon }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data for Turkish cities
    const mockWeatherData: WeatherData = {
      temperature: Math.floor(Math.random() * 25) + 5,
      humidity: Math.floor(Math.random() * 40) + 40,
      pressure: Math.floor(Math.random() * 50) + 1000,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      visibility: Math.floor(Math.random() * 10) + 5,
      description: ['Açık', 'Parçalı Bulutlu', 'Bulutlu', 'Hafif Yağmurlu'][Math.floor(Math.random() * 4)]
    };

    setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);
  }, [city]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-8 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-cyan-400" />
          {city}
        </h3>
        <span className="text-cyan-300 text-sm">{weather?.description}</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/80">Sıcaklık</span>
          <span className="text-white font-bold text-xl">{weather?.temperature}°C</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Droplets className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-white/80">Nem: {weather?.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-white/80">Rüzgar: {weather?.windSpeed} km/h</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-white/80">Görüş: {weather?.visibility} km</span>
          </div>
          <div className="text-white/80">
            Basınç: {weather?.pressure} hPa
          </div>
        </div>
      </div>
    </div>
  );
}