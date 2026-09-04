import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Search, 
  Navigation, 
  Home, 
  AlertTriangle, 
  ShieldAlert, 
  CloudRain, 
  Compass, 
  Crosshair, 
  CheckCircle2, 
  X,
  Filter,
  Eye
} from 'lucide-react';
import { TabType, RiskLevel, VillageWardData, ShelterData } from '../types';
import { LeafletRiskMap } from '../components/LeafletRiskMap';
import { VILLAGE_WARD_LOCATIONS, SHELTERS_DATA, CITY_STATE_PREDICTIONS } from '../data/mockData';

interface Props {
  onNavigate: (tab: TabType) => void;
  onSelectAlert?: (alert: any) => void;
  darkMode?: boolean;
}

export const LiveMapPage: React.FC<Props> = ({ onNavigate, onSelectAlert, darkMode }) => {
  const [selectedState, setSelectedState] = useState<string>('Uttarakhand');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Almora');
  const [selectedVillage, setSelectedVillage] = useState<string>('Sample Hill Village');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map Layer Toggles
  const [layerFloodRisk, setLayerFloodRisk] = useState(true);
  const [layerRainfall, setLayerRainfall] = useState(true);
  const [layerShelters, setLayerShelters] = useState(true);
  const [layerBlockedRoads, setLayerBlockedRoads] = useState(true);
  const [layerEvacuationRoutes, setLayerEvacuationRoutes] = useState(true);
  const [layerLandslide, setLayerLandslide] = useState(false);
  const [layerCloudburst, setLayerCloudburst] = useState(false);

  // Selected Location / Shelter state
  const [selectedShelter, setSelectedShelter] = useState<ShelterData | null>(SHELTERS_DATA[0]);
  const [activeRiskLevel, setActiveRiskLevel] = useState<RiskLevel>('High');

  // Filtered Locations
  const currentVillageData = VILLAGE_WARD_LOCATIONS.find(
    (v) => v.villageName.toLowerCase().includes(selectedVillage.toLowerCase()) || v.district === selectedDistrict
  ) || VILLAGE_WARD_LOCATIONS[0];

  const handleLocateUser = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          alert(`📍 Your Location Detected: Lat ${pos.coords.latitude.toFixed(4)}, Long ${pos.coords.longitude.toFixed(4)}. Current Area Risk: HIGH.`);
        },
        () => {
          alert('📍 Location detected: Almora Ward #04 (High Flood Risk Zone).');
        }
      );
    } else {
      alert('📍 Location detected: Almora Ward #04 (High Flood Risk Zone).');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner & Drill-down Filters */}
      <div className="bg-linear-to-r from-slate-900 via-sky-950 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-sky-500/20 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-sky-500/20 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-bold text-sky-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>Interactive Multi-Hazard GIS Risk &amp; Evacuation Map</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Live Flood Risk &amp; <span className="text-cyan-400">AI Safe Evacuation Map</span>
            </h1>
          </div>

          {/* Search Box */}
          <div className="flex items-center space-x-2">
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search village, ward, district, shelter..."
                className="w-full bg-white/10 text-white placeholder-slate-300 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-hidden border border-white/20 focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <button
              onClick={handleLocateUser}
              className="px-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow-md whitespace-nowrap"
            >
              <Crosshair className="w-4 h-4" />
              <span>Locate Me</span>
            </button>
          </div>
        </div>

        {/* State -> District -> Village -> Ward Drilldown Toolbar */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-semibold">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-800 text-white rounded-lg px-2.5 py-1.5 font-bold outline-hidden border border-slate-700 cursor-pointer"
            >
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Assam">Assam</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-semibold">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-800 text-white rounded-lg px-2.5 py-1.5 font-bold outline-hidden border border-slate-700 cursor-pointer"
            >
              <option value="Almora">Almora</option>
              <option value="Chamoli">Chamoli</option>
              <option value="Kullu">Kullu</option>
              <option value="Mandi">Mandi</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-semibold">Village / Ward:</span>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="bg-slate-800 text-white rounded-lg px-2.5 py-1.5 font-bold outline-hidden border border-slate-700 cursor-pointer"
            >
              {VILLAGE_WARD_LOCATIONS.map((vw) => (
                <option key={vw.id} value={vw.villageName}>
                  {vw.villageName} ({vw.wardName}) - Risk: {vw.riskLevel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Map, Right Layers & AI Route Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 Cols: Interactive Leaflet Map Component */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[540px] flex flex-col justify-between">
            
            {/* Map Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 px-3 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-slate-800 dark:text-slate-100">Live Area Risk: <b className="text-red-600 dark:text-red-400">HIGH RISK (84mm Rain)</b></span>
              </div>

              <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe Route</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Blocked Road</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Shelter</span>
              </div>
            </div>

            {/* Leaflet Map Renderer */}
            <div className="flex-1 my-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
              <LeafletRiskMap
                selectedCoordinates={CITY_STATE_PREDICTIONS[0].coordinates}
                darkMode={darkMode}
              />
            </div>

            {/* AI Evacuation Guidance Banner */}
            <div className="p-4 rounded-2xl bg-sky-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
              <div className="space-y-0.5">
                <span className="font-bold text-cyan-300 flex items-center gap-1">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  AI Recommended Evacuation Guidance:
                </span>
                <p className="text-slate-200">
                  Proceed along <b>Route C (North Ridge Road)</b> to <b>Government School Shelter</b> (1.8 km, ~22 min walk). Avoid Hill Road A (Blocked by Landslide).
                </p>
              </div>

              <button
                onClick={() => alert('🧭 GPS Navigation initialized! Follow green path markers on screen.')}
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl whitespace-nowrap shadow-md"
              >
                Start Navigation
              </button>
            </div>

          </div>

        </div>

        {/* Right 1 Col: Map Layers Control & Shelter List */}
        <div className="space-y-6">
          
          {/* Map Layer Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Layers className="w-4 h-4 text-sky-500" />
              Map Hazard Layers Control
            </h3>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">☑ Flood Risk Polygons</span>
                <input type="checkbox" checked={layerFloodRisk} onChange={(e) => setLayerFloodRisk(e.target.checked)} className="accent-sky-600" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">🌧️ Rainfall Stations</span>
                <input type="checkbox" checked={layerRainfall} onChange={(e) => setLayerRainfall(e.target.checked)} className="accent-sky-600" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">🏠 Emergency Shelters</span>
                <input type="checkbox" checked={layerShelters} onChange={(e) => setLayerShelters(e.target.checked)} className="accent-sky-600" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">🚧 Flooded / Blocked Roads</span>
                <input type="checkbox" checked={layerBlockedRoads} onChange={(e) => setLayerBlockedRoads(e.target.checked)} className="accent-sky-600" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">🟢 Recommended Safe Routes</span>
                <input type="checkbox" checked={layerEvacuationRoutes} onChange={(e) => setLayerEvacuationRoutes(e.target.checked)} className="accent-sky-600" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">🪨 Landslide Susceptibility</span>
                <input type="checkbox" checked={layerLandslide} onChange={(e) => setLayerLandslide(e.target.checked)} className="accent-sky-600" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
                <span className="font-semibold text-slate-700 dark:text-slate-200">☁️ Cloudburst Hazard Overlay</span>
                <input type="checkbox" checked={layerCloudburst} onChange={(e) => setLayerCloudburst(e.target.checked)} className="accent-sky-600" />
              </label>
            </div>
          </div>

          {/* Shelters List Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Home className="w-4 h-4 text-emerald-500" />
              Nearby Verified Shelters ({SHELTERS_DATA.length})
            </h3>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 text-xs">
              {SHELTERS_DATA.map((sh) => (
                <div
                  key={sh.id}
                  onClick={() => setSelectedShelter(sh)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-colors ${
                    selectedShelter?.id === sh.id
                      ? 'bg-sky-50 dark:bg-sky-950 border-sky-500 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{sh.name}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md font-bold">
                      {sh.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dist: {sh.distanceKm} • Capacity: {sh.currentOccupancy}/{sh.capacity}</p>

                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1.5">
                    <span>✓ Water</span>
                    <span>✓ First Aid</span>
                    <span>✓ Power</span>
                    <span>✓ Food</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
