import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  STATIONS_DATA, 
  SHELTERS_DATA, 
  GANGA_RIVER_PATH, 
  BRAHMAPUTRA_RIVER_PATH, 
  YAMUNA_RIVER_PATH, 
  GODAVARI_KRISHNA_RIVER_PATH, 
  EVACUATION_ROUTES 
} from '../data/mockData';
import { StationData, ShelterData } from '../types';

interface Props {
  height?: string;
  zoom?: number;
  center?: [number, number];
  selectedCoordinates?: [number, number];
  showSearch?: boolean;
  activeLayers?: {
    riskLevels: boolean;
    rainfallIntensity: boolean;
    riversStreams: boolean;
    roads: boolean;
    shelters: boolean;
  };
  riskFilter?: {
    high: boolean;
    moderate: boolean;
    low: boolean;
    safe: boolean;
  };
  onStationSelect?: (station: StationData) => void;
  onShelterSelect?: (shelter: ShelterData) => void;
  showMiniLegend?: boolean;
  darkMode?: boolean;
}

export const LeafletRiskMap: React.FC<Props> = ({
  height = '440px',
  zoom = 5,
  center = [22.5, 82.0],
  selectedCoordinates,
  activeLayers = {
    riskLevels: true,
    rainfallIntensity: true,
    riversStreams: true,
    roads: false,
    shelters: true,
  },
  riskFilter = {
    high: true,
    moderate: true,
    low: true,
    safe: true,
  },
  onStationSelect,
  onShelterSelect,
  showMiniLegend = true,
  darkMode = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ [key: string]: L.LayerGroup }>({});

  // Strict India Geographic Bounds (South-West to North-East)
  const indiaBounds: L.LatLngBoundsLiteral = [
    [6.0, 68.0],
    [37.5, 97.5],
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map strictly constrained to India
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      minZoom: 4,
      maxZoom: 18,
      maxBounds: indiaBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add Zoom Control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Set base map tile layer based on theme (CartoDB Dark Matter / Voyager)
    const tileUrl = darkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Initialize layer groups
    const stationLayer = L.layerGroup().addTo(map);
    const shelterLayer = L.layerGroup().addTo(map);
    const riverLayer = L.layerGroup().addTo(map);
    const evacLayer = L.layerGroup().addTo(map);

    layersRef.current = {
      stations: stationLayer,
      shelters: shelterLayer,
      river: riverLayer,
      evac: evacLayer,
    };

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [darkMode]);

  // Smooth flyTo when selected coordinates change
  useEffect(() => {
    if (selectedCoordinates && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedCoordinates, 9, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [selectedCoordinates]);

  // Update map contents based on layers & filters
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const { stations, shelters, river, evac } = layersRef.current;
    if (!stations || !shelters || !river || !evac) return;

    stations.clearLayers();
    shelters.clearLayers();
    river.clearLayers();
    evac.clearLayers();

    // 1. Draw Major Indian River Networks
    if (activeLayers.riversStreams) {
      // Ganga River
      const gangaLine = L.polyline(GANGA_RIVER_PATH, {
        color: '#0284c7',
        weight: 4,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      });
      gangaLine.bindTooltip('Ganga River Basin Corridor', { sticky: true });
      river.addLayer(gangaLine);

      // Brahmaputra River
      const brahmaputraLine = L.polyline(BRAHMAPUTRA_RIVER_PATH, {
        color: '#2563eb',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      });
      brahmaputraLine.bindTooltip('Brahmaputra River (Flood Alert Active)', { sticky: true });
      river.addLayer(brahmaputraLine);

      // Yamuna River
      const yamunaLine = L.polyline(YAMUNA_RIVER_PATH, {
        color: '#0891b2',
        weight: 3.5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round',
      });
      yamunaLine.bindTooltip('Yamuna River Basin', { sticky: true });
      river.addLayer(yamunaLine);

      // Godavari & Krishna
      const godavariLine = L.polyline(GODAVARI_KRISHNA_RIVER_PATH, {
        color: '#0d9488',
        weight: 3.5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round',
      });
      godavariLine.bindTooltip('Godavari & Krishna River Basins', { sticky: true });
      river.addLayer(godavariLine);
    }

    // 2. Draw Evacuation Corridors
    if (activeLayers.riskLevels || activeLayers.shelters) {
      EVACUATION_ROUTES.forEach((route) => {
        const routeLine = L.polyline(route, {
          color: '#10b981',
          weight: 3.5,
          dashArray: '6, 8',
          opacity: 0.9,
        });
        routeLine.bindTooltip('Recommended Evacuation Route to Shelter', { sticky: true });
        evac.addLayer(routeLine);
      });
    }

    // 3. Render Monitoring Stations Across India
    if (activeLayers.riskLevels) {
      STATIONS_DATA.forEach((station) => {
        const riskKey = station.riskLevel.toLowerCase() as keyof typeof riskFilter;
        if (!riskFilter[riskKey]) return;

        let badgeBg = '#ef4444'; // Critical / High
        let badgeText = 'High Risk';
        let iconHtml = '⚠️';

        if (station.riskLevel === 'Critical') {
          badgeBg = '#dc2626';
          badgeText = 'Critical';
          iconHtml = '🚨';
        } else if (station.riskLevel === 'Moderate') {
          badgeBg = '#f59e0b';
          badgeText = 'Moderate';
          iconHtml = '⚠️';
        } else if (station.riskLevel === 'Low') {
          badgeBg = '#eab308';
          badgeText = 'Low Risk';
          iconHtml = '💧';
        } else if (station.riskLevel === 'Safe') {
          badgeBg = '#10b981';
          badgeText = 'Safe';
          iconHtml = '✓';
        }

        const customMarkerHtml = `
          <div class="relative cursor-pointer flex flex-col items-center hover:scale-105 transition-transform">
            <div class="flex items-center space-x-1.5 px-2.5 py-1 rounded-full shadow-lg text-white font-bold text-xs border border-white/90" style="background-color: ${badgeBg};">
              <span class="text-xs leading-none">${iconHtml}</span>
              <span class="truncate max-w-[90px]">${station.name.split(' - ')[0]}</span>
            </div>
            <div class="text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 text-white shadow-xs" style="background-color: ${badgeBg}; opacity: 0.95;">
              ${badgeText}
            </div>
          </div>
        `;

        const icon = L.divIcon({
          html: customMarkerHtml,
          className: 'custom-station-pin',
          iconSize: [110, 44],
          iconAnchor: [55, 22],
        });

        const marker = L.marker(station.coordinates, { icon });
        marker.bindPopup(`
          <div class="p-2.5 min-w-[210px] font-sans">
            <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-200 dark:border-slate-700">
              <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">${station.name}</h4>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">${station.wardName}</p>
            <div class="text-xs space-y-1.5 text-slate-700 dark:text-slate-200">
              <div class="flex justify-between"><span>Flood Threat:</span> <b style="color:${badgeBg}">${station.riskLevel}</b></div>
              <div class="flex justify-between"><span>Rainfall:</span> <b>${station.rainfallMm} mm</b></div>
              <div class="flex justify-between"><span>River Gauge:</span> <b>${station.riverLevelM} m</b></div>
              <div class="flex justify-between"><span>Soil Moisture:</span> <b>${station.soilMoisture}%</b></div>
              <div class="flex justify-between"><span>Nearby Shelters:</span> <b class="text-emerald-600">${station.sheltersNearby} Open</b></div>
            </div>
          </div>
        `);

        marker.on('click', () => {
          if (onStationSelect) onStationSelect(station);
        });

        stations.addLayer(marker);
      });
    }

    // 4. Render Disaster Shelters Across India
    if (activeLayers.shelters) {
      SHELTERS_DATA.forEach((shelter) => {
        const shelterHtml = `
          <div class="relative cursor-pointer flex flex-col items-center group hover:scale-110 transition-transform">
            <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-400/50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          </div>
        `;

        const shelterIcon = L.divIcon({
          html: shelterHtml,
          className: 'shelter-pin',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker(shelter.coordinates, { icon: shelterIcon });
        marker.bindPopup(`
          <div class="p-2.5 min-w-[210px] font-sans">
            <div class="flex items-center space-x-1.5 mb-1 pb-1 border-b border-slate-200 dark:border-slate-700">
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h4 class="font-extrabold text-sm text-emerald-700 dark:text-emerald-400">Emergency Shelter</h4>
            </div>
            <p class="font-bold text-xs text-slate-900 dark:text-white mb-2">${shelter.name}</p>
            <div class="text-xs space-y-1.5 text-slate-700 dark:text-slate-200">
              <div class="flex justify-between"><span>Occupancy:</span> <b>${shelter.currentOccupancy} / ${shelter.capacity}</b></div>
              <div class="flex justify-between"><span>Helpline:</span> <b class="text-sky-600">${shelter.contact}</b></div>
              <div class="flex justify-between"><span>Proximity:</span> <b>${shelter.distanceKm}</b></div>
            </div>
          </div>
        `);

        marker.on('click', () => {
          if (onShelterSelect) onShelterSelect(shelter);
        });

        shelters.addLayer(marker);
      });
    }
  }, [activeLayers, riskFilter, onStationSelect, onShelterSelect]);

  const handleResetIndia = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([22.5, 82.0], 5);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" style={{ height }}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Mini Controls / Reset India View */}
      <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2">
        <button
          onClick={handleResetIndia}
          className="px-3 py-1.5 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-all"
          title="Reset to All India View"
        >
          <span>🇮🇳 Reset India View</span>
        </button>
      </div>

      {/* Floating Legend Box */}
      {showMiniLegend && (
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-200/90 dark:border-slate-800 text-xs max-w-xs transition-colors">
          <div className="font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
            <span>India Flood Risk Telemetry</span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">● Live Sensors</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block ring-2 ring-red-300 dark:ring-red-900"></span>
              <span>Critical / High</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ring-2 ring-amber-300 dark:ring-amber-900"></span>
              <span>Moderate</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block ring-2 ring-yellow-200 dark:ring-yellow-900"></span>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ring-2 ring-emerald-200 dark:ring-emerald-900"></span>
              <span>Safe</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">🏠</span>
              <span>Relief Shelter</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-600 inline-block"></span>
              <span>Safe Corridor</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

