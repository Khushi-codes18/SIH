import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Waves, 
  Building, 
  School, 
  Hospital, 
  Car, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  Layers, 
  Maximize2, 
  Eye, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { SAMPLE_VILLAGE_WARD, DIGITAL_TWIN_STEPS } from '../data/masterData';
import { BuildingFeature, TabType } from '../types';

interface Props {
  onNavigateTab: (tab: TabType) => void;
  onOpenEmergency: () => void;
  darkMode: boolean;
}

export const DigitalTwinView: React.FC<Props> = ({ onNavigateTab, onOpenEmergency, darkMode }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(3); // T+03:00 default
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingFeature | null>(
    SAMPLE_VILLAGE_WARD.buildings[0] // School default
  );
  const [activeLayers, setActiveLayers] = useState({
    buildings: true,
    river: true,
    roads: true,
    riskOverlay: true,
    shelters: true,
  });
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const step = DIGITAL_TWIN_STEPS[currentStepIndex];

  // Auto playback simulation loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= DIGITAL_TWIN_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const waterLevel = step.riverLevelM;
  const isSurgeHigh = currentStepIndex >= 3;
  const isCritical = currentStepIndex >= 4;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-blue-800/80">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider border border-cyan-400/30">
              DEMO / SIMULATED DIGITAL TWIN
            </span>
            <span className="text-xs text-slate-300 font-semibold">• High-Resolution Infrastructure Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Sample Hill Village Digital Twin &amp; Flood Simulation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
            Virtual 3D hydrological twin of <b>{SAMPLE_VILLAGE_WARD.villageName} ({SAMPLE_VILLAGE_WARD.wardName})</b>. Simulating river surges, bridge structural risk, school evacuations, and safe road routing in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center space-x-1.5"
          >
            <Eye className="w-4 h-4 text-cyan-300" />
            <span>{showBeforeAfter ? 'Standard View' : 'Before vs After Comparison'}</span>
          </button>
          <button
            onClick={onOpenEmergency}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all shadow-md shadow-red-600/30 flex items-center space-x-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS Emergency</span>
          </button>
        </div>
      </div>

      {/* Main Digital Twin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Village Overview & Layer Controls (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Village Overview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
              <Building className="w-4 h-4 mr-2 text-blue-600" />
              Settlement Telemetry
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Population:</span>
                <b className="text-slate-900 dark:text-white">{SAMPLE_VILLAGE_WARD.population} citizens</b>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Vulnerable People:</span>
                <b className="text-amber-600 dark:text-amber-400">{SAMPLE_VILLAGE_WARD.vulnerableCount} (Elderly/Children)</b>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Total Buildings:</span>
                <b className="text-slate-900 dark:text-white">186 structures</b>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">River Corridor:</span>
                <b className="text-slate-900 dark:text-white">Bhagirathi Confluence</b>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Active Shelters:</span>
                <b className="text-emerald-600 dark:text-emerald-400">2 Verified High-Ground</b>
              </div>
            </div>
          </div>

          {/* Layer Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
              <Layers className="w-4 h-4 mr-2 text-blue-600" />
              Digital Twin Layers
            </h3>
            
            <div className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.buildings}
                  onChange={() => setActiveLayers(p => ({ ...p, buildings: !p.buildings }))}
                  className="w-4 h-4 text-blue-600 rounded-md"
                />
                <span>3D Infrastructure &amp; Houses</span>
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.river}
                  onChange={() => setActiveLayers(p => ({ ...p, river: !p.river }))}
                  className="w-4 h-4 text-blue-600 rounded-md"
                />
                <span>Dynamic River Surge Extent</span>
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.roads}
                  onChange={() => setActiveLayers(p => ({ ...p, roads: !p.roads }))}
                  className="w-4 h-4 text-blue-600 rounded-md"
                />
                <span>Road Network &amp; Flooded Closures</span>
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.shelters}
                  onChange={() => setActiveLayers(p => ({ ...p, shelters: !p.shelters }))}
                  className="w-4 h-4 text-blue-600 rounded-md"
                />
                <span>Designated High-Ground Shelters</span>
              </label>
            </div>
          </div>

          {/* Quick Scenario Preset */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Simulation Scenario
            </h3>
            <p className="text-[11px] text-slate-500">Select rainfall intensity to evaluate hydrological response:</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setCurrentStepIndex(0)}
                className={`p-2 rounded-xl border text-center transition-all ${currentStepIndex === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                Normal Flow
              </button>
              <button
                onClick={() => setCurrentStepIndex(2)}
                className={`p-2 rounded-xl border text-center transition-all ${currentStepIndex === 2 ? 'bg-yellow-50 text-yellow-700 border-yellow-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                Moderate (68mm)
              </button>
              <button
                onClick={() => setCurrentStepIndex(3)}
                className={`p-2 rounded-xl border text-center transition-all ${currentStepIndex === 3 ? 'bg-amber-50 text-amber-700 border-amber-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                Heavy (98mm)
              </button>
              <button
                onClick={() => setCurrentStepIndex(5)}
                className={`p-2 rounded-xl border text-center transition-all ${currentStepIndex === 5 ? 'bg-red-50 text-red-700 border-red-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                Extreme (156mm)
              </button>
            </div>
          </div>

        </div>

        {/* Center: 3D Isometric Interactive SVG Village Model (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          
          <div className="relative w-full h-[520px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center select-none">
            
            {/* 3D Isometric Village Canvas */}
            <svg viewBox="0 0 800 600" className="w-full h-full">
              <defs>
                <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isCritical ? "#dc2626" : isSurgeHigh ? "#ea580c" : "#0284c7"} />
                  <stop offset="100%" stopColor={isCritical ? "#7f1d1d" : isSurgeHigh ? "#c2410c" : "#0369a1"} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Mountain Terrain Slope Contours */}
              <polygon points="0,0 800,0 800,450 0,550" fill="url(#hillGrad)" />
              <path d="M 0,220 Q 200,160 450,260 T 800,200" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              <path d="M 0,380 Q 250,310 500,420 T 800,360" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

              {/* Dynamic Rising River Basin */}
              {activeLayers.river && (
                <path
                  d={`M 0,${520 - (currentStepIndex * 15)} Q 300,${460 - (currentStepIndex * 18)} 500,${530 - (currentStepIndex * 15)} T 800,${490 - (currentStepIndex * 18)} L 800,600 L 0,600 Z`}
                  fill="url(#riverGrad)"
                  opacity={0.85}
                  className="transition-all duration-700 ease-in-out"
                />
              )}

              {/* High Water Level Ripple Lines */}
              {isSurgeHigh && (
                <path
                  d="M 20,490 Q 280,450 480,510 T 780,470"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.4"
                  strokeDasharray="6,8"
                />
              )}

              {/* Road Network Lines */}
              {activeLayers.roads && (
                <g>
                  {/* Ridge Safe Road (Green) */}
                  <path
                    d="M 120,160 L 320,190 L 520,170 L 720,210"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <text x="320" y="178" fill="#a7f3d0" fontSize="10" fontWeight="bold">Ridge Safe Highway</text>

                  {/* Mid Connector Road */}
                  <path
                    d="M 260,280 L 420,310 L 640,320"
                    fill="none"
                    stroke={currentStepIndex >= 3 ? "#f97316" : "#10b981"}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Valley Flooded Road (Red if step >= 2) */}
                  <path
                    d="M 100,470 L 280,450 L 540,490 L 740,460"
                    fill="none"
                    stroke={currentStepIndex >= 2 ? "#ef4444" : "#10b981"}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={currentStepIndex >= 2 ? "8,4" : "none"}
                  />
                  {currentStepIndex >= 2 && (
                    <text x="350" y="475" fill="#fca5a5" fontSize="11" fontWeight="black">⛔ ROAD SUBMERGED</text>
                  )}
                </g>
              )}

              {/* Infrastructure Markers */}
              {activeLayers.buildings && (
                <g>
                  {/* 1. Highland Govt School Shelter (Green Safe) */}
                  <g 
                    transform="translate(180, 110)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding({
                      id: 'bld-sh-1',
                      name: 'Devprayag Govt Higher Secondary School (Highland Shelter)',
                      type: 'shelter',
                      riskLevel: 'Safe',
                      elevationM: 580,
                      distanceToRiverM: 290,
                      coordinates: [30.1485, 78.5960],
                      occupancy: 110,
                      statusText: 'Safe Ground - Designated Shelter',
                      actionRequired: 'Open for all low-lying ward evacuees; food and standby power active.',
                      reason: 'Located 120m above riverbed on stable metamorphic bedrock.'
                    })}
                  >
                    <rect x="0" y="0" width="70" height="42" rx="8" fill="#047857" stroke="#34d399" strokeWidth="2" />
                    <text x="35" y="24" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">🏠 SHELTER</text>
                    <text x="35" y="36" fill="#a7f3d0" fontSize="8" textAnchor="middle">580m Elev</text>
                  </g>

                  {/* 2. Primary Health Centre (Hospital) */}
                  <g 
                    transform="translate(480, 130)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding(SAMPLE_VILLAGE_WARD.buildings[1])}
                  >
                    <rect x="0" y="0" width="65" height="40" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                    <text x="32" y="22" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">🏥 CLINIC</text>
                    <text x="32" y="34" fill="#bfdbfe" fontSize="8" textAnchor="middle">Standby</text>
                  </g>

                  {/* 3. Valley Public School (At Risk during surge) */}
                  <g 
                    transform="translate(260, 310)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding(SAMPLE_VILLAGE_WARD.buildings[0])}
                  >
                    <rect 
                      x="0" 
                      y="0" 
                      width="75" 
                      height="46" 
                      rx="8" 
                      fill={currentStepIndex >= 2 ? "#b91c1c" : "#0284c7"} 
                      stroke={currentStepIndex >= 2 ? "#f87171" : "#38bdf8"} 
                      strokeWidth="2.5"
                    />
                    <text x="37" y="22" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">🏫 SCHOOL</text>
                    <text x="37" y="36" fill="#fed7d7" fontSize="8" fontWeight="bold" textAnchor="middle">
                      {currentStepIndex >= 2 ? "EVACUATE" : "475m Terrace"}
                    </text>
                  </g>

                  {/* 4. Sangam Suspension Bridge */}
                  <g 
                    transform="translate(450, 420)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding(SAMPLE_VILLAGE_WARD.buildings[2])}
                  >
                    <rect 
                      x="0" 
                      y="0" 
                      width="80" 
                      height="38" 
                      rx="6" 
                      fill={currentStepIndex >= 4 ? "#7f1d1d" : currentStepIndex >= 3 ? "#c2410c" : "#1e293b"} 
                      stroke={currentStepIndex >= 4 ? "#ef4444" : "#fb923c"} 
                      strokeWidth="2"
                    />
                    <text x="40" y="20" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">🌉 BRIDGE 1</text>
                    <text x="40" y="32" fill="#fed7aa" fontSize="8" fontWeight="bold" textAnchor="middle">
                      {currentStepIndex >= 4 ? "SUBMERGED" : currentStepIndex >= 3 ? "AT RISK" : "Normal"}
                    </text>
                  </g>

                  {/* 5. Lowland House Cluster A */}
                  <g 
                    transform="translate(120, 410)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding(SAMPLE_VILLAGE_WARD.buildings[3])}
                  >
                    <rect 
                      x="0" 
                      y="0" 
                      width="60" 
                      height="36" 
                      rx="6" 
                      fill={currentStepIndex >= 3 ? "#991b1b" : "#475569"} 
                      stroke={currentStepIndex >= 3 ? "#f87171" : "#94a3b8"} 
                      strokeWidth="2"
                    />
                    <text x="30" y="19" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">HOUSE A</text>
                    <text x="30" y="30" fill="#fca5a5" fontSize="7" textAnchor="middle">
                      {currentStepIndex >= 3 ? "FLOODED" : "Lowland"}
                    </text>
                  </g>

                  {/* 6. Mid-slope House Cluster B */}
                  <g 
                    transform="translate(620, 240)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding(SAMPLE_VILLAGE_WARD.buildings[4])}
                  >
                    <rect x="0" y="0" width="60" height="36" rx="6" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="30" y="19" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">HOUSE B</text>
                    <text x="30" y="30" fill="#cbd5e1" fontSize="7" textAnchor="middle">Mid-Slope</text>
                  </g>

                  {/* 7. High-ridge House Cluster C */}
                  <g 
                    transform="translate(380, 80)" 
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setSelectedBuilding(SAMPLE_VILLAGE_WARD.buildings[5])}
                  >
                    <rect x="0" y="0" width="60" height="36" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                    <text x="30" y="19" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">HOUSE C</text>
                    <text x="30" y="30" fill="#a7f3d0" fontSize="7" textAnchor="middle">High Ridge</text>
                  </g>
                </g>
              )}

              {/* Telemetry Gauge Callout Pin */}
              <g transform="translate(680, 480)">
                <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" className="animate-pulse" />
                <text x="0" y="4" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">CWC</text>
                <text x="0" y="24" fill="#38bdf8" fontSize="10" fontWeight="black" textAnchor="middle">
                  {waterLevel} m
                </text>
              </g>

            </svg>

            {/* In-Canvas Top Status Pill */}
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 text-white flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${isCritical ? 'bg-red-500 animate-ping' : isSurgeHigh ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                <span>{step.hourLabel}</span>
              </span>
              <span className="text-slate-400">|</span>
              <span className="font-semibold text-cyan-300">River: {waterLevel} m</span>
              <span className="text-slate-400">|</span>
              <span className="font-semibold text-amber-300">Rainfall: {step.rainfallMm} mm</span>
            </div>

            {/* Bottom Floating Timeline Controls */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentStepIndex(p => Math.max(0, p - 1))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Play Timeline'}</span>
                </button>
                <button
                  onClick={() => setCurrentStepIndex(p => Math.min(DIGITAL_TWIN_STEPS.length - 1, p + 1))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setIsPlaying(false); setCurrentStepIndex(0); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
                  title="Reset simulation"
                  aria-label="Reset simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Steps Progress Track */}
              <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
                {DIGITAL_TWIN_STEPS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      currentStepIndex === idx
                        ? 'bg-cyan-500 text-slate-900 shadow-md font-black'
                        : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {s.hourLabel.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Infrastructure Impact Prediction Live Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Buildings at Risk</span>
              <span className="text-xl font-black text-red-600 dark:text-red-400 mt-1 block">
                {step.atRiskBuildingsCount} structures
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Bridge 1 Status</span>
              <span className={`text-sm font-black mt-1.5 block ${
                step.bridgeStatus === 'Submerged' ? 'text-red-600' : step.bridgeStatus === 'At Risk' ? 'text-amber-500' : 'text-emerald-500'
              }`}>
                {step.bridgeStatus}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">School Status</span>
              <span className={`text-sm font-black mt-1.5 block ${step.schoolEvacuation ? 'text-red-600' : 'text-emerald-500'}`}>
                {step.schoolEvacuation ? 'Evacuate' : 'Operational'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Flooded Roads</span>
              <span className="text-xl font-black text-amber-600 mt-1 block">
                {step.floodedRoadIds.length} road(s)
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Explainable AI & Selected Infrastructure Details (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Selected Building Details */}
          {selectedBuilding && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {selectedBuilding.type}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  selectedBuilding.riskLevel === 'Critical' ? 'bg-red-500 text-white' : selectedBuilding.riskLevel === 'High' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                }`}>
                  {selectedBuilding.riskLevel}
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                {selectedBuilding.name}
              </h4>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <p><b>Elevation:</b> {selectedBuilding.elevationM} m above MSL</p>
                <p><b>Distance to River:</b> {selectedBuilding.distanceToRiverM} m</p>
                {selectedBuilding.occupancy && <p><b>Capacity/Occupancy:</b> {selectedBuilding.occupancy} persons</p>}
                <p><b>Current Status:</b> <span className="text-slate-900 dark:text-white font-bold">{selectedBuilding.statusText}</span></p>
              </div>

              {selectedBuilding.actionRequired && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold block mb-1">Recommended Action:</span>
                  <p className="text-[11px] leading-relaxed">{selectedBuilding.actionRequired}</p>
                </div>
              )}
            </div>
          )}

          {/* Explainable AI Panel: Why is this infrastructure at risk? */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
              <Info className="w-4 h-4 mr-2 text-cyan-600" />
              Explainable AI Reasons
            </h3>
            
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <b className="text-slate-900 dark:text-white block">Why is Bridge 1 At Risk?</b>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  River discharge is at 4.85m, directly touching girder clearance. High risk of submerged drift tree-trunk impact.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <b className="text-slate-900 dark:text-white block">Why School Evacuation?</b>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Situated on lower river terrace (elevation 475m). Lower access road is already flooded with 1.4m backflow.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <b className="text-slate-900 dark:text-white block">Evacuation Guidance:</b>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 leading-relaxed">
                  Follow Ridge Highway Road to Highland School Shelter (580m). Do NOT attempt river paths.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('live-map')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Explore on Live Map</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
