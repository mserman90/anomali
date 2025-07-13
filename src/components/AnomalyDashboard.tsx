import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Activity, MapPin, Calendar, Thermometer, Droplets, Wind, Flame, Leaf, Mountain, Zap } from 'lucide-react';

interface AnomalyData {
  id: string;
  type: 'climate' | 'environmental' | 'geological' | 'space';
  category: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  value: number;
  normalRange: string;
  deviation: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: string;
  description: string;
  coordinates: { lat: number; lon: number };
}

interface AnomalyDashboardProps {
  apiKey: string;
}

export function AnomalyDashboard({ apiKey }: AnomalyDashboardProps) {
  const [anomalies, setAnomalies] = useState<AnomalyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        // Simulated comprehensive anomaly data for Turkey
        const mockAnomalies: AnomalyData[] = [
          // Climate Anomalies
          {
            id: 'temp-istanbul',
            type: 'climate',
            category: 'Sıcaklık Anomalisi',
            location: 'İstanbul',
            severity: 'high',
            value: 23.5,
            normalRange: '15-18°C',
            deviation: +5.5,
            trend: 'increasing',
            lastUpdated: new Date().toISOString(),
            description: 'Mevsim normallerinin 5.5°C üzerinde sıcaklık tespit edildi',
            coordinates: { lat: 41.0082, lon: 28.9784 }
          },
          {
            id: 'precip-antalya',
            type: 'climate',
            category: 'Yağış Anomalisi',
            location: 'Antalya',
            severity: 'critical',
            value: 12,
            normalRange: '80-120mm',
            deviation: -68,
            trend: 'decreasing',
            lastUpdated: new Date().toISOString(),
            description: 'Mevsimsel yağış ortalamasının %85 altında',
            coordinates: { lat: 36.8969, lon: 30.7133 }
          },
          {
            id: 'drought-konya',
            type: 'climate',
            category: 'Kuraklık Anomalisi',
            location: 'Konya',
            severity: 'high',
            value: 0.15,
            normalRange: '0.3-0.6',
            deviation: -0.15,
            trend: 'decreasing',
            lastUpdated: new Date().toISOString(),
            description: 'Toprak nem indeksi kritik seviyenin altında',
            coordinates: { lat: 37.8746, lon: 32.4932 }
          },
          
          // Environmental Anomalies
          {
            id: 'fire-mugla',
            type: 'environmental',
            category: 'Orman Yangını Riski',
            location: 'Muğla',
            severity: 'critical',
            value: 0.95,
            normalRange: '0.1-0.4',
            deviation: +0.55,
            trend: 'increasing',
            lastUpdated: new Date().toISOString(),
            description: 'Yangın risk indeksi kritik seviyede',
            coordinates: { lat: 37.2153, lon: 28.3636 }
          },
          {
            id: 'air-ankara',
            type: 'environmental',
            category: 'Hava Kalitesi Anomalisi',
            location: 'Ankara',
            severity: 'medium',
            value: 85,
            normalRange: '20-50 µg/m³',
            deviation: +35,
            trend: 'increasing',
            lastUpdated: new Date().toISOString(),
            description: 'PM2.5 konsantrasyonu WHO limitlerinin üzerinde',
            coordinates: { lat: 39.9334, lon: 32.8597 }
          },
          {
            id: 'vegetation-diyarbakir',
            type: 'environmental',
            category: 'Bitki Örtüsü Anomalisi',
            location: 'Diyarbakır',
            severity: 'high',
            value: 0.25,
            normalRange: '0.4-0.7',
            deviation: -0.15,
            trend: 'decreasing',
            lastUpdated: new Date().toISOString(),
            description: 'NDVI değerleri mevsim normallerinin altında',
            coordinates: { lat: 37.9144, lon: 40.2306 }
          },
          
          // Geological Anomalies
          {
            id: 'lake-van',
            type: 'geological',
            category: 'Göl Seviyesi Anomalisi',
            location: 'Van Gölü',
            severity: 'medium',
            value: 1646.2,
            normalRange: '1648-1650m',
            deviation: -2.8,
            trend: 'decreasing',
            lastUpdated: new Date().toISOString(),
            description: 'Göl seviyesi son 10 yılın en düşük seviyesinde',
            coordinates: { lat: 38.7432, lon: 43.3464 }
          },
          {
            id: 'heat-island-izmir',
            type: 'geological',
            category: 'Şehirsel Isı Adası',
            location: 'İzmir',
            severity: 'high',
            value: 8.5,
            normalRange: '2-4°C',
            deviation: +4.5,
            trend: 'increasing',
            lastUpdated: new Date().toISOString(),
            description: 'Şehir merkezi çevre alanlara göre 8.5°C daha sıcak',
            coordinates: { lat: 38.4192, lon: 27.1287 }
          },
          
          // Space Weather Anomalies
          {
            id: 'solar-turkey',
            type: 'space',
            category: 'Güneş Fırtınası Etkisi',
            location: 'Türkiye Geneli',
            severity: 'medium',
            value: 6.2,
            normalRange: '1-3 KP',
            deviation: +3.2,
            trend: 'increasing',
            lastUpdated: new Date().toISOString(),
            description: 'Güneş aktivitesi normalin üzerinde, GPS ve iletişim etkilenebilir',
            coordinates: { lat: 39.0, lon: 35.0 }
          },
          {
            id: 'magnetic-trabzon',
            type: 'space',
            category: 'Manyetik Alan Anomalisi',
            location: 'Trabzon',
            severity: 'low',
            value: 47500,
            normalRange: '48000-49000 nT',
            deviation: -500,
            trend: 'stable',
            lastUpdated: new Date().toISOString(),
            description: 'Yerel manyetik alan değerleri hafif düşük',
            coordinates: { lat: 41.0015, lon: 39.7178 }
          }
        ];

        setAnomalies(mockAnomalies);
      } catch (error) {
        console.error('Anomali verileri alınamadı:', error);
      }
      setLoading(false);
    };

    fetchAnomalies();
    const interval = setInterval(fetchAnomalies, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [apiKey]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'high': return 'bg-orange-500/20 border-orange-500/30 text-orange-300';
      case 'critical': return 'bg-red-500/20 border-red-500/30 text-red-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'climate': return <Thermometer className="h-5 w-5" />;
      case 'environmental': return <Leaf className="h-5 w-5" />;
      case 'geological': return <Mountain className="h-5 w-5" />;
      case 'space': return <Zap className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Sıcaklık')) return <Thermometer className="h-4 w-4" />;
    if (category.includes('Yağış') || category.includes('Kuraklık')) return <Droplets className="h-4 w-4" />;
    if (category.includes('Yangın')) return <Flame className="h-4 w-4" />;
    if (category.includes('Hava') || category.includes('Rüzgar')) return <Wind className="h-4 w-4" />;
    if (category.includes('Bitki')) return <Leaf className="h-4 w-4" />;
    if (category.includes('Güneş') || category.includes('Manyetik')) return <Zap className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const filteredAnomalies = anomalies.filter(anomaly => {
    const typeMatch = selectedType === 'all' || anomaly.type === selectedType;
    const severityMatch = selectedSeverity === 'all' || anomaly.severity === selectedSeverity;
    return typeMatch && severityMatch;
  });

  const anomalyStats = {
    total: anomalies.length,
    critical: anomalies.filter(a => a.severity === 'critical').length,
    high: anomalies.filter(a => a.severity === 'high').length,
    medium: anomalies.filter(a => a.severity === 'medium').length,
    low: anomalies.filter(a => a.severity === 'low').length
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <AlertTriangle className="h-7 w-7 mr-3 text-red-400" />
            Türkiye Anomali Tespit Sistemi
          </h2>
          <div className="text-orange-300 text-sm">
            NASA Gerçek Zamanlı Veriler
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{anomalyStats.total}</div>
            <div className="text-white/80 text-sm">Toplam Anomali</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-300">{anomalyStats.critical}</div>
            <div className="text-red-200 text-sm">Kritik</div>
          </div>
          <div className="bg-orange-500/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-300">{anomalyStats.high}</div>
            <div className="text-orange-200 text-sm">Yüksek</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-300">{anomalyStats.medium}</div>
            <div className="text-yellow-200 text-sm">Orta</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-300">{anomalyStats.low}</div>
            <div className="text-green-200 text-sm">Düşük</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Anomali Türü</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all" className="bg-slate-800">Tümü</option>
              <option value="climate" className="bg-slate-800">İklim Anomalileri</option>
              <option value="environmental" className="bg-slate-800">Çevresel Anomaliler</option>
              <option value="geological" className="bg-slate-800">Jeolojik Anomaliler</option>
              <option value="space" className="bg-slate-800">Uzay Hava Durumu</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Önem Derecesi</label>
            <select 
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all" className="bg-slate-800">Tümü</option>
              <option value="critical" className="bg-slate-800">Kritik</option>
              <option value="high" className="bg-slate-800">Yüksek</option>
              <option value="medium" className="bg-slate-800">Orta</option>
              <option value="low" className="bg-slate-800">Düşük</option>
            </select>
          </div>
        </div>
      </div>

      {/* Anomaly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnomalies.map((anomaly) => (
          <div 
            key={anomaly.id}
            className={`${getSeverityColor(anomaly.severity)} backdrop-blur-sm rounded-xl p-4 border hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {getTypeIcon(anomaly.type)}
                <span className="ml-2 font-semibold text-sm">{anomaly.category}</span>
              </div>
              <div className="flex items-center">
                {anomaly.trend === 'increasing' ? (
                  <TrendingUp className="h-4 w-4 text-red-400" />
                ) : anomaly.trend === 'decreasing' ? (
                  <TrendingDown className="h-4 w-4 text-blue-400" />
                ) : (
                  <Activity className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="font-medium">{anomaly.location}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Mevcut Değer:</span>
                <span className="font-bold">{anomaly.value}{anomaly.category.includes('Sıcaklık') ? '°C' : anomaly.category.includes('Yağış') ? 'mm' : ''}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Normal Aralık:</span>
                <span className="text-xs">{anomaly.normalRange}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sapma:</span>
                <span className={`font-bold ${anomaly.deviation > 0 ? 'text-red-300' : 'text-blue-300'}`}>
                  {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation}
                </span>
              </div>
            </div>
            
            <div className="mt-3 p-2 bg-black/20 rounded text-xs">
              {getCategoryIcon(anomaly.category)}
              <span className="ml-1">{anomaly.description}</span>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs opacity-80">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(anomaly.lastUpdated).toLocaleTimeString('tr-TR')}
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(anomaly.severity)}`}>
                {anomaly.severity.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnomalies.length === 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
          <Activity className="h-12 w-12 text-white/50 mx-auto mb-4" />
          <p className="text-white/80">Seçilen kriterlere uygun anomali bulunamadı.</p>
        </div>
      )}
    </div>
  );
}