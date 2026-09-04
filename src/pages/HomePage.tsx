import React, { useState } from 'react';
import { 
  Waves, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  CloudRain, 
  TrendingUp, 
  Navigation, 
  PhoneCall, 
  Home as HomeIcon, 
  ChevronRight, 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Satellite, 
  Radio, 
  ShieldCheck,
  User,
  Shield,
  Search,
  ArrowRight
} from 'lucide-react';
import { TabType, AlertItem, CityStatePrediction } from '../types';
import { CITY_STATE_PREDICTIONS, ALERTS_DATA } from '../data/mockData';
import { useUserMode } from '../context/UserModeContext';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onNavigate: (tab: TabType) => void;
  onSelectAlert: (alert: AlertItem) => void;
  onOpenEmergency: () => void;
  darkMode?: boolean;
}

export const HomePage: React.FC<Props> = ({
  onNavigate,
  onSelectAlert,
  onOpenEmergency,
  darkMode,
}) => {
  const { persona } = useUserMode();
  const { t } = useLanguage();

  const [selectedCity, setSelectedCity] = useState<CityStatePrediction>(CITY_STATE_PREDICTIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPredictions = CITY_STATE_PREDICTIONS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-linear-to-r from-slate-900 via-sky-950 to-blue-900 text-white p-6 sm:p-10 shadow-2xl overflow-hidden border border-sky-500/20">
        
        {/* Background Ambient Glow */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300">
            <Waves className="w-4 h-4 animate-pulse" />
            <span>AI-Powered Flood Intelligence &amp; Early Warning System • SIH 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t('hero_title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {t('hero_subtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('live-map')}
              className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-xl shadow-cyan-400/20 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{t('view_live_risk')}</span>
            </button>

            <button
              onClick={onOpenEmergency}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-red-600/30 transition-all flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>{t('sos_button')}</span>
            </button>

            <button
              onClick={() => onNavigate('digital-twin')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm border border-white/20 transition-all"
            >
              {t('digital_twin')} →
            </button>
          </div>

        </div>
      </div>

      {/* Live System Status Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <span>🟢 {t('system_operational')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300">
          <span>🌧️ {t('rainfall')}: <b className="text-slate-900 dark:text-white">84 mm</b></span>
          <span>🌊 {t('river_level')}: <b className="text-amber-500">4.8 m (+0.35 m/hr)</b></span>
          <span>⚠️ {t('active_alerts')}: <b className="text-red-500">03 Broadcast</b></span>
          <span>📍 {t('high_risk_areas')}: <b className="text-red-500">07 Villages</b></span>
        </div>

        <div className="text-slate-400 text-[11px]">
          Last Updated: <b>10:32 AM (Live Sensor Stream)</b>
        </div>
      </div>

      {/* PEOPLE-FIRST CITIZEN MODE BANNER (If Citizen Persona active) */}
      {persona === 'citizen' && (
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-700 text-white p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              👤 {t('citizen_mode')}
            </span>
            <span className="text-xs font-bold text-amber-200">Almora Ward #04</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-300 animate-bounce" />
                🚨 {t('danger_near_you')}
              </h2>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl">
                Heavy rainfall (84mm) and rising river stage reported near Koshy River. Low-lying households should move to designated safe shelters.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col space-y-2 min-w-[240px]">
              <span className="text-xs font-bold text-amber-200">🏠 {t('nearest_shelter')}:</span>
              <p className="font-bold text-sm">Government Higher Secondary School</p>
              <p className="text-xs text-slate-200">Dist: <b>1.8 km</b> (~22 min walking time)</p>
              <button
                onClick={() => onNavigate('live-map')}
                className="mt-1 w-full py-2 bg-white text-red-700 hover:bg-red-50 font-black rounded-xl text-xs shadow-md"
              >
                {t('navigate_shelter')} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Source Data Pipeline Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">SIH 2026 Core Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Multi-Source Data Intelligence Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-500">Combining heterogenous telemetry for accurate flash flood prediction in hilly regions.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <Satellite className="w-8 h-8 mx-auto text-sky-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">🛰️ Satellite Data</h4>
            <p className="text-[11px] text-slate-500">DEM terrain elevation &amp; MODIS flood extents.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <CloudRain className="w-8 h-8 mx-auto text-blue-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">🌧️ Weather Radar</h4>
            <p className="text-[11px] text-slate-500">IMD Doppler precipitation intensity &amp; cloudburst risk.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <Radio className="w-8 h-8 mx-auto text-cyan-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">📡 IoT River Sensors</h4>
            <p className="text-[11px] text-slate-500">Real-time ultrasonic water level &amp; rate-of-rise gauges.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <Cpu className="w-8 h-8 mx-auto text-indigo-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">🤖 AI Prediction</h4>
            <p className="text-[11px] text-slate-500">LSTM &amp; Hydrological flood risk probability models.</p>
          </div>
        </div>
      </div>

      {/* City/State Search & Predictions Overview Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Indian Cities &amp; Hilly Regions Live Risk</h2>
            <p className="text-xs text-slate-500">Real-time rainfall, river stage, flood risk level &amp; driving safety predictions.</p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_location_placeholder')}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-hidden border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPredictions.map((pred) => (
            <div
              key={pred.id}
              onClick={() => {
                setSelectedCity(pred);
                onNavigate('live-map');
              }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{pred.state}</span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">{pred.name}</h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  pred.floodRiskLevel === 'Critical' ? 'bg-red-600 text-white' :
                  pred.floodRiskLevel === 'High' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {pred.floodRiskLevel} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400">{t('rainfall')}:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{pred.rainfall24hMm} mm</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400">River Basin:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{pred.riverBasin}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-bold">
                <span>Drive Advisory: {pred.driveSafety.status}</span>
                <span className="group-hover:translate-x-1 transition-transform">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};