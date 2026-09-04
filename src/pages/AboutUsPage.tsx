import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Users, 
  Award, 
  Waves, 
  Mountain, 
  ArrowRight 
} from 'lucide-react';
import { HimalayanHeroSvg } from '../components/HimalayanHeroSvg';
import { TabType } from '../types';

interface Props {
  onNavigate: (tab: TabType) => void;
}

export const AboutUsPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-b from-sky-50 via-blue-50/40 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-10">
          <HimalayanHeroSvg variant="hero" className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 text-xs font-bold">
            <Waves className="w-3.5 h-3.5" />
            <span>Hydro Vision AI Early Warning Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Protecting Indian River Basins, Highways & Communities with Real-Time Flood Intelligence.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Hydro Vision was engineered to bridge the critical gap between torrential cloudbursts, monsoonal river surges, and downstream community & travel response. By combining real-time IoT river gauge telemetry, IMD Doppler radar feeds, and deep neural hydrological models, we provide actionable early warnings and live driving safety assessments across India.
          </p>
        </div>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            All-India Sensor Grid
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Sub-millimeter radar and ultrasonic river stage monitors along Brahmaputra, Ganga, Yamuna, Godavari, and Western Ghat catchments transmitting telemetry even during grid dropouts.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Neural Hydro & Road Safety AI
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Machine-learning models calibrated for Indian topography, calculating aquaplaning risk, waterlogged underpass predictions, and surge velocities with 89%+ verified accuracy.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Last-Mile Highway & Siren Alerts
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Coordinated with NDRF battalions, State Disaster Management Authorities (SDMA), and traffic police to ensure drivers and vulnerable riverside citizens stay protected.
          </p>
        </div>

      </div>

      {/* Operational Partners */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
          Integrated National Multi-Agency Disaster Coordination
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">IMD</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Doppler Weather Radar</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">CWC</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">River Level Hydro-telemetry</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">NDMA</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">National Incident Command</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">NDRF</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Ground Evacuation Units</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('live-map')}
            className="inline-flex items-center px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <span>Explore Active Catchment Map</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

    </div>
  );
};
