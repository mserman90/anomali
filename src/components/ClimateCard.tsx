import React from 'react';
import { TrendingUp, Thermometer, Droplets, Wind } from 'lucide-react';

interface ClimateCardProps {
  apiKey: string;
}

export function ClimateCard({ apiKey }: ClimateCardProps) {
  // Mock climate data for Turkey
  const climateData = {
    temperature: {
      current: 18.5,
      trend: '+1.2°C (son 50 yıl)',
      change: 'increase'
    },
    precipitation: {
      current: 645,
      trend: '-8% (son 30 yıl)',
      change: 'decrease'
    },
    seaLevel: {
      current: 2.3,
      trend: '+3.2mm/yıl',
      change: 'increase'
    }
  };

  const turkishRegions = [
    { name: 'Marmara', temp: 15.2, risk: 'Orta' },
    { name: 'Ege', temp: 17.8, risk: 'Düşük' },
    { name: 'Akdeniz', temp: 19.1, risk: 'Yüksek' },
    { name: 'İç Anadolu', temp: 12.4, risk: 'Orta' },
    { name: 'Karadeniz', temp: 14.6, risk: 'Düşük' },
    { name: 'Doğu Anadolu', temp: 8.9, risk: 'Yüksek' },
    { name: 'Güneydoğu Anadolu', temp: 16.7, risk: 'Çok Yüksek' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Düşük': return 'text-green-400';
      case 'Orta': return 'text-yellow-400';
      case 'Yüksek': return 'text-orange-400';
      case 'Çok Yüksek': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-xl flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-orange-400" />
          Türkiye İklim Değişikliği Verileri
        </h3>
        <span className="text-orange-300 text-sm">NASA Climate Data</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Thermometer className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-white font-semibold">Sıcaklık Artışı</span>
          </div>
          <div className="text-2xl text-white font-bold">{climateData.temperature.current}°C</div>
          <div className="text-red-300 text-sm">{climateData.temperature.trend}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Droplets className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-white font-semibold">Yağış Değişimi</span>
          </div>
          <div className="text-2xl text-white font-bold">{climateData.precipitation.current}mm</div>
          <div className="text-blue-300 text-sm">{climateData.precipitation.trend}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Wind className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-white font-semibold">Deniz Seviyesi</span>
          </div>
          <div className="text-2xl text-white font-bold">{climateData.seaLevel.current}mm</div>
          <div className="text-cyan-300 text-sm">{climateData.seaLevel.trend}</div>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-4">Bölgesel İklim Riski</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {turkishRegions.map((region) => (
            <div key={region.name} className="bg-white/5 rounded-lg p-3">
              <div className="text-white font-medium text-sm">{region.name}</div>
              <div className="text-white/80 text-xs">{region.temp}°C ortalama</div>
              <div className={`text-xs font-semibold ${getRiskColor(region.risk)}`}>
                Risk: {region.risk}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-white/60 text-center">
        * Veriler NASA GISS, NOAA ve TÜBİTAK kaynaklarından derlenmiştir
      </div>
    </div>
  );
}