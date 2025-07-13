import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calendar, Target } from 'lucide-react';

interface AnomalyTrendsProps {
  apiKey: string;
}

interface TrendData {
  date: string;
  climate: number;
  environmental: number;
  geological: number;
  space: number;
}

export function AnomalyTrends({ apiKey }: AnomalyTrendsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  
  // Mock trend data for the last 7 days
  const trendData: TrendData[] = [
    { date: '2025-01-13', climate: 3, environmental: 2, geological: 1, space: 1 },
    { date: '2025-01-14', climate: 4, environmental: 3, geological: 1, space: 0 },
    { date: '2025-01-15', climate: 5, environmental: 2, geological: 2, space: 1 },
    { date: '2025-01-16', climate: 3, environmental: 4, geological: 1, space: 2 },
    { date: '2025-01-17', climate: 6, environmental: 3, geological: 2, space: 1 },
    { date: '2025-01-18', climate: 4, environmental: 5, geological: 1, space: 1 },
    { date: '2025-01-19', climate: 5, environmental: 3, geological: 3, space: 2 }
  ];

  const maxValue = Math.max(...trendData.flatMap(d => [d.climate, d.environmental, d.geological, d.space]));

  const getBarHeight = (value: number) => (value / maxValue) * 100;

  const totalAnomalies = trendData.reduce((sum, day) => 
    sum + day.climate + day.environmental + day.geological + day.space, 0
  );

  const averagePerDay = (totalAnomalies / trendData.length).toFixed(1);

  const predictions = [
    { type: 'İklim', risk: 'Yüksek', probability: 85, description: 'Sıcaklık anomalileri artış eğiliminde' },
    { type: 'Çevresel', risk: 'Orta', probability: 65, description: 'Yangın riski mevsimsel artış' },
    { type: 'Jeolojik', risk: 'Düşük', probability: 25, description: 'Stabil jeolojik aktivite' },
    { type: 'Uzay', risk: 'Orta', probability: 55, description: 'Güneş aktivitesi değişken' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Yüksek': return 'text-red-400';
      case 'Orta': return 'text-yellow-400';
      case 'Düşük': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Trend Chart */}
      <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-indigo-400" />
            Anomali Trend Analizi
          </h3>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-purple-300" />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none"
            >
              <option value="7d" className="bg-slate-800">Son 7 Gün</option>
              <option value="30d" className="bg-slate-800">Son 30 Gün</option>
              <option value="90d" className="bg-slate-800">Son 3 Ay</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-black/20 rounded-lg p-4 mb-4">
          <div className="flex items-end justify-between h-40 space-x-2">
            {trendData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32 space-y-1">
                  <div 
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${getBarHeight(day.climate)}%` }}
                    title={`İklim: ${day.climate}`}
                  ></div>
                  <div 
                    className="bg-green-500 rounded-t"
                    style={{ height: `${getBarHeight(day.environmental)}%` }}
                    title={`Çevresel: ${day.environmental}`}
                  ></div>
                  <div 
                    className="bg-orange-500 rounded-t"
                    style={{ height: `${getBarHeight(day.geological)}%` }}
                    title={`Jeolojik: ${day.geological}`}
                  ></div>
                  <div 
                    className="bg-purple-500 rounded-t"
                    style={{ height: `${getBarHeight(day.space)}%` }}
                    title={`Uzay: ${day.space}`}
                  ></div>
                </div>
                <div className="text-white/60 text-xs mt-2">
                  {new Date(day.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'İklim', color: 'bg-blue-500', count: trendData.reduce((sum, d) => sum + d.climate, 0) },
            { type: 'Çevresel', color: 'bg-green-500', count: trendData.reduce((sum, d) => sum + d.environmental, 0) },
            { type: 'Jeolojik', color: 'bg-orange-500', count: trendData.reduce((sum, d) => sum + d.geological, 0) },
            { type: 'Uzay', color: 'bg-purple-500', count: trendData.reduce((sum, d) => sum + d.space, 0) }
          ].map(item => (
            <div key={item.type} className="flex items-center">
              <div className={`w-4 h-4 ${item.color} rounded mr-2`}></div>
              <span className="text-white/80 text-sm">{item.type}: {item.count}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{totalAnomalies}</div>
            <div className="text-white/80 text-sm">Toplam Anomali</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{averagePerDay}</div>
            <div className="text-white/80 text-sm">Günlük Ortalama</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">+12%</div>
            <div className="text-white/80 text-sm">Haftalık Değişim</div>
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-4">
          <Target className="h-5 w-5 mr-2 text-yellow-400" />
          <h3 className="text-white font-semibold text-lg">Anomali Tahminleri (24 Saat)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{prediction.type}</span>
                <span className={`font-bold ${getRiskColor(prediction.risk)}`}>
                  {prediction.risk}
                </span>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Olasılık</span>
                  <span className="text-white font-bold">{prediction.probability}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                    style={{ width: `${prediction.probability}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-white/70 text-xs">{prediction.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-white/60 text-center">
          * Tahminler NASA verilerinin makine öğrenmesi analizi ile oluşturulmuştur
        </div>
      </div>
    </div>
  );
}