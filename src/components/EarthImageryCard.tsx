import React, { useState } from 'react';
import { Globe, MapPin, Search } from 'lucide-react';

interface EarthImageryCardProps {
  apiKey: string;
}

const turkishCities = [
  { name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'Ankara', lat: 39.9334, lon: 32.8597 },
  { name: 'İzmir', lat: 38.4192, lon: 27.1287 },
  { name: 'Antalya', lat: 36.8969, lon: 30.7133 },
  { name: 'Bursa', lat: 40.1826, lon: 29.0665 },
  { name: 'Kapadokya', lat: 38.6431, lon: 34.8288 }
];

export function EarthImageryCard({ apiKey }: EarthImageryCardProps) {
  const [selectedCity, setSelectedCity] = useState(turkishCities[0]);
  const [imageDate, setImageDate] = useState('2023-06-15');

  const earthImageUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${selectedCity.lon}&lat=${selectedCity.lat}&date=${imageDate}&dim=0.15&api_key=${apiKey}`;

  return (
    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Globe className="h-5 w-5 mr-2 text-green-400" />
          Uzaydan Türkiye
        </h3>
        <div className="flex items-center text-blue-300 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          Landsat 8
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/80 text-sm mb-2">Şehir Seçin</label>
          <select 
            value={selectedCity.name}
            onChange={(e) => {
              const city = turkishCities.find(c => c.name === e.target.value);
              if (city) setSelectedCity(city);
            }}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {turkishCities.map(city => (
              <option key={city.name} value={city.name} className="bg-slate-800">
                {city.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-white/80 text-sm mb-2">Tarih</label>
          <input 
            type="date"
            value={imageDate}
            onChange={(e) => setImageDate(e.target.value)}
            max="2023-12-31"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 text-center">
        <Search className="h-8 w-8 text-white mx-auto mb-2" />
        <p className="text-white font-semibold">{selectedCity.name}</p>
        <p className="text-blue-100 text-sm">
          Koordinatlar: {selectedCity.lat.toFixed(4)}, {selectedCity.lon.toFixed(4)}
        </p>
        <p className="text-green-100 text-xs mt-2">
          Seçilen tarih: {new Date(imageDate).toLocaleDateString('tr-TR')}
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => window.open(earthImageUrl, '_blank')}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center mx-auto"
        >
          <Globe className="h-4 w-4 mr-2" />
          Uydu Görüntüsünü Gör
        </button>
      </div>
    </div>
  );
}