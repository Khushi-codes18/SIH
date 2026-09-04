import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  X, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Waves, 
  AlertTriangle, 
  Compass, 
  ShieldCheck,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { CityStatePrediction } from '../types';
import { INDIA_CITIES_STATES_PREDICTIONS } from '../data/mockData';
import { DriveSafetyCard } from './DriveSafetyCard';

interface Props {
  onSelectLocation?: (prediction: CityStatePrediction) => void;
  selectedPrediction?: CityStatePrediction | null;
  className?: string;
  showCardBelow?: boolean;
}

export const CityStateSearch: React.FC<Props> = ({
  onSelectLocation,
  selectedPrediction: controlledPrediction,
  className = '',
  showCardBelow = true,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [internalSelected, setInternalSelected] = useState<CityStatePrediction>(
    INDIA_CITIES_STATES_PREDICTIONS[0] // Default to Mumbai
  );

  const activePrediction = controlledPrediction !== undefined ? controlledPrediction : internalSelected;

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDIA_CITIES_STATES_PREDICTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.riverBasin.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const handleSelect = (item: CityStatePrediction) => {
    setInternalSelected(item);
    setQuery('');
    setIsFocused(false);
    if (onSelectLocation) {
      onSelectLocation(item);
    }
  };

  const quickPills = [
    'Mumbai',
    'Guwahati',
    'Wayanad',
    'Delhi NCR',
    'Shimla',
    'Patna',
    'Assam',
    'Kerala',
    'Uttarakhand',
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-sky-600 dark:text-sky-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Type any Indian city, state, or river basin (e.g. Mumbai, Guwahati, Wayanad, Assam)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-sky-500 dark:focus:border-sky-500 shadow-sm transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isFocused && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 animate-fadeIn">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => (
                <div
                  key={item.id}
                  onMouseDown={() => handleSelect(item)}
                  className="px-4 py-3 hover:bg-sky-50 dark:hover:bg-sky-950/40 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <span>{item.name}</span>
                        <span className="text-xs text-slate-400 font-normal">• {item.state}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
                        <span>{item.weatherCondition}</span>
                        <span>•</span>
                        <span>Rain: {item.rainfallNext24hMm} mm</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.driveSafety.status === 'Dangerous'
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                        : item.driveSafety.status === 'Caution'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {item.driveSafety.status === 'Dangerous' ? '🔴 Unsafe Drive' : item.driveSafety.status === 'Caution' ? '🟡 Caution' : '🟢 Safe Drive'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-5 text-center text-xs text-slate-500 dark:text-slate-400">
                No matching city or state found. Try searching for Mumbai, Guwahati, Wayanad, Assam, or Delhi.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Location Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0 flex items-center">
          <Navigation className="w-3 h-3 mr-1" /> Quick Pick:
        </span>
        <div className="flex items-center space-x-1.5">
          {quickPills.map((name) => {
            const target = INDIA_CITIES_STATES_PREDICTIONS.find((p) => p.name.toLowerCase() === name.toLowerCase());
            const isCurrent = activePrediction?.name.toLowerCase() === name.toLowerCase();
            return (
              <button
                key={name}
                onClick={() => {
                  if (target) handleSelect(target);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all duration-150 ${
                  isCurrent
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exact Area Prediction Detailed Card */}
      {showCardBelow && activePrediction && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Weather & Hydro Prediction Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            
            {/* Top Bar with City, State & Coordinates */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {activePrediction.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[11px] font-black uppercase">
                      {activePrediction.state}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-2">
                    <Compass className="w-3.5 h-3.5 text-slate-400" />
                    <span>Coordinates: {activePrediction.coordinates[0].toFixed(4)}°N, {activePrediction.coordinates[1].toFixed(4)}°E</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activePrediction.lastUpdated}</span>
                  </p>
                </div>
              </div>

              {/* Risk Level Badge */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Flood Risk:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  activePrediction.floodRiskLevel === 'Critical'
                    ? 'bg-red-600 text-white'
                    : activePrediction.floodRiskLevel === 'High'
                    ? 'bg-amber-600 text-white'
                    : activePrediction.floodRiskLevel === 'Moderate'
                    ? 'bg-yellow-500 text-slate-950'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {activePrediction.floodRiskLevel} Risk
                </span>
              </div>
            </div>

            {/* 4 Telemetry Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-4">
              
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <CloudRain className="w-4 h-4 text-sky-500" />
                  <span>Rainfall (Next 24h)</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {activePrediction.rainfallNext24hMm} <span className="text-sm font-normal text-slate-500">mm</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activePrediction.precipitationProbability}% chance
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Waves className="w-4 h-4 text-blue-500" />
                  <span>River Basin</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 truncate" title={activePrediction.riverBasin}>
                  {activePrediction.riverBasin}
                </div>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold truncate block">
                  {activePrediction.riverStage}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Thermometer className="w-4 h-4 text-amber-500" />
                  <span>Temperature</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {activePrediction.temperatureC} <span className="text-sm font-normal text-slate-500">°C</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                  {activePrediction.weatherCondition}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Droplets className="w-4 h-4 text-cyan-500" />
                  <span>Air Humidity</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {activePrediction.humidityPercent}%
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Soil Moisture High
                </span>
              </div>

            </div>

            {/* Local Official Key Advisory Banner */}
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
              <span>
                <b>Hydro Vision Advisory:</b> {activePrediction.keyAdvisory}
              </span>
            </div>

          </div>

          {/* Dedicated Driving Safety Advisory Card for this Area */}
          <DriveSafetyCard
            advisory={activePrediction.driveSafety}
            locationName={`${activePrediction.name}, ${activePrediction.state}`}
          />

        </div>
      )}

    </div>
  );
};
