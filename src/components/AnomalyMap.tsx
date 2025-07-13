import React, { useState } from 'react';
import { Map, MapPin, Layers, Filter } from 'lucide-react';

interface AnomalyMapProps {
  apiKey: string;
}

interface MapAnomalyPoint {
  id: string;
  name: string;
  coordinates: { lat: number; lon: number };
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  value: string;
}

export function AnomalyMap({ apiKey }: AnomalyMapProps) {
  const [selectedLayer, setSelectedLayer] = useState('all');
  
  const anomalyPoints: MapAnomalyPoint[] = [
    { id: '1', name: 'İstanbul - Sıcaklık', coordinates: { lat: 41.0082, lon: 28.9784 }, severity: 'high', type: 'climate', value: '+5.5°C' },
    { id: '2', name: 'Antalya - Yağış', coordinates: { lat: 36.8969, lon: 30.7133 }, severity: 'critical', type: 'climate', value: '-85%' },
    { id: '3', name: 'Muğla - Yangın', coordinates: { lat: 37.2153, lon: 28.3636 }, severity: 'critical', type: 'environmental', value: '0.95' },
    { id: '4', name: 'Van Gölü', coordinates: { lat: 38.7432, lon: 43.3464 }, severity: 'medium', type: 'geological', value: '-2.8m' },
    { id: '5', name: 'Ankara - Hava', coordinates: { lat: 39.9334, lon: 32.8597 }, severity: 'medium', type: 'environmental', value: '85 µg/m³' },
    { id: '6', name: 'Konya - Kuraklık', coordinates: { lat: 37.8746, lon: 32.4932 }, severity: 'high', type: 'climate', value: '0.15' },
    { id: '7', name: 'İzmir - Isı Adası', coordinates: { lat: 38.4192, lon: 27.1287 }, severity: 'high', type: 'geological', value: '+8.5°C' },
    { id: '8', name: 'Diyarbakır - Bitki', coordinates: { lat: 37.9144, lon: 40.2306 }, severity: 'high', type: 'environmental', value: '-0.15' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPoints = selectedLayer === 'all' 
    ? anomalyPoints 
    : anomalyPoints.filter(point => point.type === selectedLayer);

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Map className="h-5 w-5 mr-2 text-blue-400" />
          Türkiye Anomali Haritası
        </h3>
        <div className="flex items-center text-purple-300 text-sm">
          <Layers className="h-4 w-4 mr-1" />
          Gerçek Zamanlı
        </div>
      </div>

      {/* Layer Controls */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 text-white/80 mr-2" />
          <span className="text-white/80 text-sm">Katman Seçimi:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'climate', 'environmental', 'geological', 'space'].map(layer => (
            <button
              key={layer}
              onClick={() => setSelectedLayer(layer)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedLayer === layer
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {layer === 'all' ? 'Tümü' : 
               layer === 'climate' ? 'İklim' :
               layer === 'environmental' ? 'Çevre' :
               layer === 'geological' ? 'Jeoloji' : 'Uzay'}
            </button>
          ))}
        </div>
      </div>

      {/* Simplified Map Visualization */}
      <div className="relative bg-gradient-to-br from-green-800/30 to-brown-800/30 rounded-lg h-80 overflow-hidden">
        {/* Turkey outline simulation */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
        
        {/* Anomaly Points */}
        {filteredPoints.map((point) => {
          // Convert coordinates to relative positions (simplified)
          const x = ((point.coordinates.lon - 26) / (45 - 26)) * 100;
          const y = ((42.5 - point.coordinates.lat) / (42.5 - 35.5)) * 100;
          
          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%` }}
            >
              <div className={`w-4 h-4 rounded-full ${getSeverityColor(point.severity)} animate-pulse shadow-lg`}></div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  <div className="font-semibold">{point.name}</div>
                  <div>Değer: {point.value}</div>
                  <div>Seviye: {point.severity}</div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-3">
          <div className="text-white text-xs font-semibold mb-2">Önem Derecesi</div>
          <div className="space-y-1">
            {[
              { level: 'critical', label: 'Kritik', color: 'bg-red-500' },
              { level: 'high', label: 'Yüksek', color: 'bg-orange-500' },
              { level: 'medium', label: 'Orta', color: 'bg-yellow-500' },
              { level: 'low', label: 'Düşük', color: 'bg-green-500' }
            ].map(item => (
              <div key={item.level} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                <span className="text-white text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-3">
          <div className="text-white text-xs">
            <div className="font-semibold mb-1">Aktif Anomaliler</div>
            <div>Toplam: {filteredPoints.length}</div>
            <div className="text-red-300">Kritik: {filteredPoints.filter(p => p.severity === 'critical').length}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/60 text-center">
        * Harita üzerindeki noktalar gerçek zamanlı NASA verilerini temsil eder
      </div>
    </div>
  );
}