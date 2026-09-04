import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Search, 
  TrendingUp, 
  ShieldCheck,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { HISTORICAL_FLOOD_EVENTS } from '../data/masterData';
import { HistoricalFloodEvent, TabType } from '../types';

interface Props {
  onNavigateTab: (tab: TabType) => void;
  darkMode: boolean;
}

export const HistoricalValidationView: React.FC<Props> = ({ onNavigateTab, darkMode }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2013); // Kedarnath default
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 50% split
  const [isEventPlaying, setIsEventPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentEvent: HistoricalFloodEvent = 
    HISTORICAL_FLOOD_EVENTS.find(e => e.year === selectedYear) || HISTORICAL_FLOOD_EVENTS[0];

  const filteredEvents = searchQuery.trim()
    ? HISTORICAL_FLOOD_EVENTS.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.year.toString().includes(searchQuery)
      )
    : HISTORICAL_FLOOD_EVENTS;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-black uppercase">
              Scientific Model Replay (2013 – 2026)
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Historical Flood Timeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Historical Flood Validation &amp; Backtesting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-2xl">
            Compare actual documented disaster events against retrospective Hydro Vision neural predictions. Demonstrating lead-time improvements and spatial accuracy across 14 years.
          </p>
        </div>

        {/* Search Historical Event */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search year, state or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Horizontal Interactive Timeline Bar (2013 to 2026) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
            <Calendar className="w-4 h-4 mr-1.5 text-blue-600" />
            14-Year Incident Timeline
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Click any year to replay</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          {HISTORICAL_FLOOD_EVENTS.map((evt) => {
            const isSelected = selectedYear === evt.year;
            return (
              <button
                key={evt.year}
                onClick={() => setSelectedYear(evt.year)}
                className={`flex flex-col items-center px-4 py-3 rounded-2xl min-w-[85px] transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                <span className="text-sm font-black tracking-tight">{evt.year}</span>
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full mt-1.5 ${
                  evt.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {evt.severity}
                </span>
                <span className={`text-[9px] mt-1 truncate max-w-[70px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {evt.state.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Event Details Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                {currentEvent.severity} FLOOD EVENT
              </span>
              <span className="text-xs text-slate-500">• {currentEvent.dateRange}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {currentEvent.name} ({currentEvent.year})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-0.5">
              <MapPin className="w-3.5 h-3.5 mr-1 text-blue-500" />
              {currentEvent.region}, {currentEvent.state}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">Model Backtest Accuracy</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{currentEvent.accuracyPercent}%</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {currentEvent.summary}
        </p>
      </div>

      {/* Side-by-Side Comparison: What Actually Happened vs What Hydro Vision Predicted */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: What Actually Happened */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
              <History className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                🌊 What Actually Happened?
              </h3>
              <span className="text-[10px] text-slate-400">Verified IMD / CWC Post-Disaster Records</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Recorded Cumulative Rainfall:</span>
              <b className="text-slate-900 dark:text-white text-sm">{currentEvent.actualRainfallMm} mm</b>
            </div>
            <div className="flex justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Maximum Recorded River Stage:</span>
              <b className="text-red-600 dark:text-red-400 text-sm">{currentEvent.actualMaxRiverLevelM} m</b>
            </div>
            <div className="flex justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Inundated Habitations / Villages:</span>
              <b className="text-slate-900 dark:text-white text-sm">{currentEvent.actualAffectedVillages} villages</b>
            </div>
            <div className="flex justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Actual Ground Warning Lead Time:</span>
              <b className="text-amber-600 dark:text-amber-400 text-sm">{currentEvent.actualWarningTimeHours} hours</b>
            </div>
          </div>
        </div>

        {/* Right Column: What Would Hydro Vision Have Predicted */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-blue-500/60 dark:border-blue-500/40 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                🤖 What Would HydroVision Have Predicted?
              </h3>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">Retrospective Neural Model Replay</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Retrospective Risk Level:</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-black uppercase bg-red-600 text-white">
                {currentEvent.predictedRisk}
              </span>
            </div>
            <div className="flex justify-between p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Predicted Surge Probability:</span>
              <b className="text-blue-600 dark:text-blue-400 text-sm">{currentEvent.predictedProbabilityPercent}%</b>
            </div>
            <div className="flex justify-between p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Predicted Warning Lead Time:</span>
              <b className="text-emerald-600 dark:text-emerald-400 text-sm">{currentEvent.predictedLeadTimeHours} hours (+{(currentEvent.predictedLeadTimeHours - currentEvent.actualWarningTimeHours).toFixed(1)}h gain!)</b>
            </div>
            <div className="flex justify-between p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Spatial Extent Overlap:</span>
              <b className="text-emerald-600 dark:text-emerald-400 text-sm">{currentEvent.accuracyPercent}% Accuracy</b>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Map Comparison Slider (Actual Flood Extent vs Hydro Vision Prediction) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center">
              <Layers className="w-4 h-4 mr-2 text-blue-600" />
              Flood Extent Inundation Slider (Actual vs Predicted)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag slider to inspect spatial overlap between documented ground truth and Hydro Vision neural envelope.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="text-blue-600">Left: Actual Event</span>
            <span>|</span>
            <span className="text-cyan-500">Right: Predicted Extent</span>
          </div>
        </div>

        {/* Visual Map Representation */}
        <div className="relative w-full h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center select-none">
          
          <svg viewBox="0 0 800 320" className="w-full h-full">
            {/* Background River Valley Base */}
            <path d="M 0,160 Q 200,90 400,160 T 800,140" fill="none" stroke="#1e293b" strokeWidth="48" />
            <path d="M 0,160 Q 200,90 400,160 T 800,140" fill="none" stroke="#0284c7" strokeWidth="16" />

            {/* Left Zone: Actual Flood Extent (Red Polygon) */}
            <g clipPath="url(#leftClip)">
              <polygon
                points="80,100 240,80 380,110 520,130 680,100 760,180 620,240 440,210 260,250 90,200"
                fill="#ef4444"
                opacity="0.65"
              />
              <text x="120" y="50" fill="#f87171" fontSize="14" fontWeight="black">ACTUAL DOCUMENTED INUNDATION (100%)</text>
            </g>

            {/* Right Zone: Hydro Vision Predicted Extent (Cyan Polygon) */}
            <g clipPath="url(#rightClip)">
              <polygon
                points="75,95 245,75 385,105 515,135 685,95 765,185 615,245 445,205 255,255 85,205"
                fill="#06b6d4"
                opacity="0.65"
              />
              <text x="440" y="50" fill="#67e8f9" fontSize="14" fontWeight="black">HYDRO VISION NEURAL ENVELOPE</text>
            </g>

            {/* Clip definitions based on slider */}
            <defs>
              <clipPath id="leftClip">
                <rect x="0" y="0" width={sliderPosition * 8} height="320" />
              </clipPath>
              <clipPath id="rightClip">
                <rect x={sliderPosition * 8} y="0" width={800 - (sliderPosition * 8)} height="320" />
              </clipPath>
            </defs>

            {/* Slider Dividing Vertical Line */}
            <line
              x1={sliderPosition * 8}
              y1="0"
              x2={sliderPosition * 8}
              y2="320"
              stroke="#ffffff"
              strokeWidth="3"
            />
          </svg>

          {/* Draggable Slider Control Overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-x-4 bottom-4 z-10 w-auto cursor-ew-resize accent-cyan-500"
          />

          <div className="absolute top-3 left-4 text-[11px] font-bold text-white/90 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">
            Split: {sliderPosition}% Actual / {100 - sliderPosition}% Predicted
          </div>
        </div>

        {/* Scientific Key Findings */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" />
            Empirical Backtest Findings
          </h4>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {currentEvent.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
