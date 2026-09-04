import React from 'react';
import { 
  Car, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Gauge, 
  Eye, 
  Waves, 
  AlertOctagon 
} from 'lucide-react';
import { DriveAdvisory } from '../types';

interface Props {
  advisory: DriveAdvisory;
  locationName?: string;
  className?: string;
}

export const DriveSafetyCard: React.FC<Props> = ({ 
  advisory, 
  locationName = 'Current Area',
  className = '' 
}) => {
  const isDangerous = advisory.status === 'Dangerous';
  const isCaution = advisory.status === 'Caution';
  const isSafe = advisory.status === 'Safe';

  return (
    <div className={`rounded-3xl p-5 sm:p-6 border transition-all duration-200 ${
      isDangerous 
        ? 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 shadow-lg shadow-red-500/5' 
        : isCaution 
        ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 shadow-lg shadow-amber-500/5'
        : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 shadow-lg shadow-emerald-500/5'
    } ${className}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            isDangerous 
              ? 'bg-red-600 text-white' 
              : isCaution 
              ? 'bg-amber-500 text-white' 
              : 'bg-emerald-600 text-white'
          }`}>
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Driving Safety Status
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                • {locationName}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Real-time road surface, flood & aquaplaning prediction
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
          isDangerous 
            ? 'bg-red-600 text-white animate-pulse' 
            : isCaution 
            ? 'bg-amber-500 text-slate-950 font-black' 
            : 'bg-emerald-600 text-white'
        }`}>
          {isDangerous && <AlertOctagon className="w-3.5 h-3.5" />}
          {isCaution && <AlertTriangle className="w-3.5 h-3.5" />}
          {isSafe && <CheckCircle2 className="w-3.5 h-3.5" />}
          <span>
            {isDangerous ? 'Dangerous - Do Not Drive' : isCaution ? 'Proceed With Caution' : 'Safe to Drive'}
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 mb-4">
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {advisory.headline}
        </p>
      </div>

      {/* 4 Road Intelligence Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {/* Metric 1: Safe Speed */}
        <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <Gauge className="w-3.5 h-3.5 text-sky-500" />
            <span>Speed Limit</span>
          </div>
          <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">
            {advisory.safeSpeedKmh}
          </div>
        </div>

        {/* Metric 2: Road Visibility */}
        <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>Visibility</span>
          </div>
          <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
            {advisory.visibilityKm} km
          </div>
        </div>

        {/* Metric 3: Aquaplaning Risk */}
        <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <Waves className="w-3.5 h-3.5 text-blue-500" />
            <span>Aquaplaning</span>
          </div>
          <div className={`text-sm font-black mt-1 ${
            advisory.aquaplaningRisk === 'Severe' 
              ? 'text-red-600 dark:text-red-400' 
              : advisory.aquaplaningRisk === 'Moderate' 
              ? 'text-amber-600 dark:text-amber-400' 
              : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {advisory.aquaplaningRisk}
          </div>
        </div>

        {/* Metric 4: Underpasses */}
        <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-500" />
            <span>Underpasses</span>
          </div>
          <div className={`text-sm font-black mt-1 ${
            advisory.underpassRisk === 'Flooded' 
              ? 'text-red-600 dark:text-red-400' 
              : advisory.underpassRisk === 'Waterlogged' 
              ? 'text-amber-600 dark:text-amber-400' 
              : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {advisory.underpassRisk}
          </div>
        </div>
      </div>

      {/* Specific Reasons / Hazards */}
      {advisory.reasons && advisory.reasons.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Road Hazards & Driving Warnings:
          </span>
          <ul className="space-y-1.5">
            {advisory.reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 shrink-0 ${
                  isDangerous ? 'bg-red-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
