import React, { useState, useEffect } from 'react';
import { Satellite, MapPin, Calendar, Camera, Thermometer, Globe, AlertTriangle } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { AstronomyCard } from './components/AstronomyCard';
import { MarsRoverCard } from './components/MarsRoverCard';
import { EarthImageryCard } from './components/EarthImageryCard';
import { ISSTracker } from './components/ISSTracker';
import { ClimateCard } from './components/ClimateCard';
import { AnomalyDashboard } from './components/AnomalyDashboard';
import { AnomalyMap } from './components/AnomalyMap';
import { AnomalyTrends } from './components/AnomalyTrends';

const NASA_API_KEY = 'QOD5QZGvY3483YeWhc3khbkV9n1odVnmQKFphXlF';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const turkeyTime = currentTime.toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const tabs = [
    { id: 'dashboard', label: 'Ana Dashboard', icon: Satellite },
    { id: 'anomalies', label: 'Anomali Sistemi', icon: AlertTriangle },
    { id: 'map', label: 'Anomali Haritası', icon: MapPin },
    { id: 'trends', label: 'Trend Analizi', icon: Camera }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'anomalies': return <AnomalyDashboard apiKey={NASA_API_KEY} />;
      case 'map': return <AnomalyMap apiKey={NASA_API_KEY} />;
      case 'trends': return <AnomalyTrends apiKey={NASA_API_KEY} />;
      default: return renderMainDashboard();
    }
  };

  const renderMainDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Astronomy Picture of the Day */}
      <div className="xl:col-span-2">
        <AstronomyCard apiKey={NASA_API_KEY} />
      </div>

      {/* ISS Tracker */}
      <div>
        <ISSTracker />
      </div>

      {/* Weather for Turkish Cities */}
      <div>
        <WeatherCard apiKey={NASA_API_KEY} city="İstanbul" lat={41.0082} lon={28.9784} />
      </div>

      <div>
        <WeatherCard apiKey={NASA_API_KEY} city="Ankara" lat={39.9334} lon={32.8597} />
      </div>

      <div>
        <WeatherCard apiKey={NASA_API_KEY} city="İzmir" lat={38.4192} lon={27.1287} />
      </div>

      {/* Earth Imagery */}
      <div className="lg:col-span-2">
        <EarthImageryCard apiKey={NASA_API_KEY} />
      </div>

      {/* Mars Rover */}
      <div>
        <MarsRoverCard apiKey={NASA_API_KEY} />
      </div>

      {/* Climate Data */}
      <div className="xl:col-span-3">
        <ClimateCard apiKey={NASA_API_KEY} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <Satellite className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Türkiye NASA Dashboard</h1>
                <p className="text-red-100">Uzaydan Anadolu'ya Bakış</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/90 text-sm">Türkiye Saati</div>
              <div className="text-white font-mono text-lg">{turkeyTime}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-8">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2025 Türkiye NASA Anomali Tespit Sistemi • NASA API ile güçlendirilmiştir</p>
          <p className="text-sm mt-2">Gerçek zamanlı anomali tespiti ve analizi</p>
        </div>
      </footer>
    </div>
  );
}

export default App;