import React from 'react';
import { 
  CloudRain, 
  Waves, 
  Droplets, 
  Mountain, 
  AlertCircle, 
  Users, 
  Home
} from 'lucide-react';
import { KEY_METRICS_HOME, KEY_METRICS_LIVEMAP } from '../data/mockData';

interface Props {
  variant: 'home' | 'live-map';
}

export const MetricsCards: React.FC<Props> = ({ variant }) => {
  if (variant === 'home') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 my-6">
        
        {/* Metric 1: Rainfall */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {KEY_METRICS_HOME.rainfallLastHour}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Rainfall (Last 1 Hour)
            </div>
            <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-0.5">
              {KEY_METRICS_HOME.rainfallDelta}
            </div>
          </div>
        </div>

        {/* Metric 2: River Level */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {KEY_METRICS_HOME.riverLevel}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              River Level
            </div>
            <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {KEY_METRICS_HOME.riverStatus}
            </div>
          </div>
        </div>

        {/* Metric 3: Soil Moisture */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {KEY_METRICS_HOME.soilMoisture}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Soil Moisture
            </div>
            <div className="text-[11px] font-bold text-red-600 dark:text-red-400 mt-0.5">
              {KEY_METRICS_HOME.soilMoistureStatus}
            </div>
          </div>
        </div>

        {/* Metric 4: Slope Stability */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Mountain className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black tracking-tight text-red-600 dark:text-red-400">
              {KEY_METRICS_HOME.slopeStability}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Slope Stability
            </div>
            <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">
              {KEY_METRICS_HOME.slopeAngle}
            </div>
          </div>
        </div>

        {/* Metric 5: Active Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5 col-span-2 md:col-span-1">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {KEY_METRICS_HOME.activeAlerts}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Active Alerts
            </div>
            <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">
              {KEY_METRICS_HOME.activeAlertsSub}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Live Map variant (Screen 2)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 my-6">
      
      {/* 1. Total Rainfall */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
          <CloudRain className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Rainfall <span className="text-[10px] block sm:inline">(Last 24 Hours)</span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
            {KEY_METRICS_LIVEMAP.totalRainfall}
          </div>
          <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-0.5">
            {KEY_METRICS_LIVEMAP.rainfallDelta}
          </div>
        </div>
      </div>

      {/* 2. Max River Level */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Waves className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Max River Level
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
            {KEY_METRICS_LIVEMAP.maxRiverLevel}
          </div>
          <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
            {KEY_METRICS_LIVEMAP.maxRiverStatus}
          </div>
        </div>
      </div>

      {/* 3. Affected Regions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Affected Regions
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
            {KEY_METRICS_LIVEMAP.affectedRegions}
          </div>
          <div className="text-[11px] font-bold text-red-600 dark:text-red-400 mt-0.5">
            {KEY_METRICS_LIVEMAP.affectedStatus}
          </div>
        </div>
      </div>

      {/* 4. Active Alerts */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Active Alerts
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
            {KEY_METRICS_LIVEMAP.activeAlerts}
          </div>
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
            {KEY_METRICS_LIVEMAP.activeAlertsSub}
          </div>
        </div>
      </div>

      {/* 5. Shelters Open */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex items-center space-x-3.5 col-span-2 md:col-span-1">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Home className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Shelters Open
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
            {KEY_METRICS_LIVEMAP.sheltersOpen}
          </div>
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {KEY_METRICS_LIVEMAP.sheltersSub}
          </div>
        </div>
      </div>

    </div>
  );
};
