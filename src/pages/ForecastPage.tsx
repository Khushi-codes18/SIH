import React, { useState } from 'react';
import { 
  CloudRain, 
  Waves, 
  TrendingUp, 
  Download, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { TabType, CityStatePrediction, ForecastDay } from '../types';
import { CITY_STATE_PREDICTIONS, RIVER_GAUGE_FORECASTS } from '../data/mockData';

interface Props {
  onNavigate: (tab: TabType) => void;
  darkMode?: boolean;
}

export const ForecastPage: React.FC<Props> = ({ onNavigate, darkMode }) => {
  const [selectedCity, setSelectedCity] = useState<CityStatePrediction>(CITY_STATE_PREDICTIONS[0]);
  const [activeRiverIndex, setActiveRiverIndex] = useState<number>(0);

  const selectedRiver = RIVER_GAUGE_FORECASTS[activeRiverIndex];

  // Dynamic PDF Forecast Report Generator Action
  const handleDownloadPdfReport = () => {
    const reportContent = `
============================================================
           HYDROVISION AI FLOOD & FORECAST REPORT
============================================================
Generated: ${new Date().toLocaleString()}
Location: ${selectedCity.name}, ${selectedCity.state}
River Basin: ${selectedCity.riverBasin}

[ CURRENT METRICS ]
------------------------------------------------------------
Flood Risk Level:      ${selectedCity.floodRiskLevel}
24h Rainfall:          ${selectedCity.rainfall24hMm} mm
Next 24h Forecast:     ${selectedCity.rainfallNext24hMm} mm
Precipitation Prob:    ${selectedCity.precipitationProbability}%
Weather Condition:     ${selectedCity.weatherCondition}
Temperature:           ${selectedCity.temperatureC}°C
Humidity:              ${selectedCity.humidityPercent}%

[ RIVER GAUGE STAGE ]
------------------------------------------------------------
Station:               ${selectedRiver.stationName} (${selectedRiver.river})
Current Level:         ${selectedRiver.currentLevel} meters
Danger Threshold:      ${selectedRiver.dangerLevel} meters
Warning Threshold:     ${selectedRiver.warningLevel} meters
Rate of Rise:          +${selectedRiver.rateOfRiseMh} m/hr (${selectedRiver.rateOfRiseMh > 0.3 ? 'RAPID RISING' : 'Moderate'})

[ DRIVING SAFETY ADVISORY ]
------------------------------------------------------------
Driving Safety Status: ${selectedCity.driveSafety.status}
Safe Speed Limit:      ${selectedCity.driveSafety.safeSpeedKmh}
Visibility:            ${selectedCity.driveSafety.visibilityKm} km
Aquaplaning Risk:      ${selectedCity.driveSafety.aquaplaningRisk}
Key Advisory:          ${selectedCity.keyAdvisory}

[ RECOMMENDED ACTIONS ]
------------------------------------------------------------
1. Monitor live river gauges every 30 minutes.
2. Low-lying wards near ${selectedCity.riverBasin} should prepare emergency kits.
3. Follow official evacuation guidance to safe shelters if alert elevates to CRITICAL.

============================================================
© 2026 HydroVision Platform • SIH 2026 PS ID: 26192
============================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HydroVision_Forecast_Report_${selectedCity.name}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`✓ HydroVision Forecast Report for ${selectedCity.name} downloaded successfully!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold text-blue-300">
              <CloudRain className="w-3.5 h-3.5" />
              <span>AI Hydrological &amp; River Stage Prediction Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Weather &amp; River <span className="text-cyan-400">Monitoring Forecast</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time precipitation trends, hourly river gauge rate-of-rise metrics, and downloadable AI flood forecast reports for Indian states &amp; cities.
            </p>
          </div>

          <button
            onClick={handleDownloadPdfReport}
            className="flex items-center space-x-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 self-start md:self-center"
          >
            <Download className="w-4 h-4" />
            <span>Download Forecast Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* City/State Selector Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Location / City:</span>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          {CITY_STATE_PREDICTIONS.map((loc) => {
            const isSelected = selectedCity.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedCity(loc)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {loc.name} ({loc.floodRiskLevel})
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 Grid Sections: Weather Forecast & River Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Selected City Weather & 7-Day Forecast */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-500">{selectedCity.state} Region</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCity.name} Weather Summary</h2>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedCity.floodRiskLevel === 'Critical' ? 'bg-red-600 text-white' :
              selectedCity.floodRiskLevel === 'High' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
            }`}>
              {selectedCity.floodRiskLevel} Risk
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-500 text-[11px]">24h Rainfall:</span>
              <p className="font-bold text-slate-900 dark:text-white text-base">{selectedCity.rainfall24hMm} mm</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-500 text-[11px]">Precip Probability:</span>
              <p className="font-bold text-slate-900 dark:text-white text-base">{selectedCity.precipitationProbability}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-500 text-[11px]">Temperature:</span>
              <p className="font-bold text-slate-900 dark:text-white text-base">{selectedCity.temperatureC}°C</p>
            </div>
          </div>

          {/* Key Advisory Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Key AI Hydrological Advisory:
            </span>
            <p className="text-amber-800 dark:text-amber-300">{selectedCity.keyAdvisory}</p>
          </div>
        </div>

        {/* Right Card: River Gauge Level Monitoring */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-500">{selectedRiver.river} Basin</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedRiver.stationName} Gauge</h2>
            </div>

            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-3 py-1 rounded-full border border-sky-300/40">
              Rate: +{selectedRiver.rateOfRiseMh} m/hr
            </span>
          </div>

          {/* Gauge Stage Visual */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span>Current Water Level: <b className="text-cyan-300 text-base">{selectedRiver.currentLevel} m</b></span>
              <span>Danger Level: <b className="text-red-400 text-base">{selectedRiver.dangerLevel} m</b></span>
            </div>

            <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden relative">
              <div 
                className="bg-gradient-to-r from-sky-500 via-cyan-400 to-red-500 h-full transition-all duration-500"
                style={{ width: `${(selectedRiver.currentLevel / (selectedRiver.dangerLevel * 1.2)) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Normal: {selectedRiver.normalLevel}m</span>
              <span>Warning: {selectedRiver.warningLevel}m</span>
              <span>Danger: {selectedRiver.dangerLevel}m</span>
            </div>
          </div>

          {/* River Rapid Rise Alert */}
          {selectedRiver.rateOfRiseMh > 0.3 && (
            <div className="p-3.5 rounded-2xl bg-red-600 text-white font-bold text-xs flex items-center justify-between shadow-md animate-pulse">
              <span>⚠️ Warning: River level is rising rapidly (+{selectedRiver.rateOfRiseMh} m/hr)!</span>
              <button onClick={() => onNavigate('live-map')} className="underline text-[11px]">View Affected Wards</button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
