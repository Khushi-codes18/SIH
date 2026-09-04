import React, { useState } from 'react';
import { 
  Building2, 
  Radio, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  Plus, 
  Search, 
  Send, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Database,
  RefreshCw
} from 'lucide-react';
import { TabType, AlertItem, ShelterData } from '../types';
import { ALERTS_DATA, SHELTERS_DATA } from '../data/mockData';

interface Props {
  onNavigate: (tab: TabType) => void;
  onOpenEmergency: () => void;
}

export const AdminDashboardPage: React.FC<Props> = ({ onNavigate, onOpenEmergency }) => {
  const [alertsList, setAlertsList] = useState<AlertItem[]>(ALERTS_DATA);
  const [shelterList, setShelterList] = useState<ShelterData[]>(SHELTERS_DATA);
  
  // Alert Broadcast Modal
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Almora District');
  const [newSeverity, setNewSeverity] = useState<'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW'>('HIGH');
  const [newDesc, setNewDesc] = useState('');

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const created: AlertItem = {
      id: `alt-admin-${Date.now()}`,
      type: 'Flood Alert',
      title: newTitle,
      severity: newSeverity,
      location: newLocation,
      district: 'Almora',
      timestamp: 'Just Now',
      relativeTime: 'Now',
      description: newDesc,
      actionRequired: 'Follow official evacuation guidance and proceed to designated safe shelters.'
    };

    setAlertsList([created, ...alertsList]);
    setNewTitle('');
    setNewDesc('');
    setBroadcastOpen(false);
    alert('🔴 Emergency Alert Broadcasted Successfully to Website, Mobile App & Local Loudspeakers!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>🏛️ Authority Command &amp; Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Disaster Management <span className="text-cyan-400">Admin Dashboard</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time monitoring panel for disaster management authorities. Broadcast early warnings, update shelter capacities, monitor IoT river gauge sensors, and dispatch emergency response units.
            </p>
          </div>

          <button
            onClick={() => setBroadcastOpen(true)}
            className="flex items-center space-x-2 px-5 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-red-600/30 transition-all transform hover:scale-105 self-start sm:self-center"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Broadcast Emergency Alert</span>
          </button>
        </div>
      </div>

      {/* Top Operational Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-slate-500 text-xs font-semibold">Active Alerts Broadcast:</span>
          <p className="text-2xl font-black text-red-600 dark:text-red-400">{alertsList.length} Alerts</p>
          <span className="text-[11px] text-slate-400">03 High / Critical</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-slate-500 text-xs font-semibold">Shelters Operational:</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{shelterList.length} Shelters</p>
          <span className="text-[11px] text-slate-400">Total Capacity: 750 Beds</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-slate-500 text-xs font-semibold">Vulnerable Population:</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">342 Persons</p>
          <span className="text-[11px] text-slate-400">Elderly, Children &amp; PwD</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-slate-500 text-xs font-semibold">IoT Sensors Online:</span>
          <p className="text-2xl font-black text-sky-600 dark:text-sky-400">14 Stations (100%)</p>
          <span className="text-[11px] text-emerald-500 font-bold">● Operational</span>
        </div>
      </div>

      {/* Main Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Shelter Capacity Manager */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-500" />
              Shelter Occupancy &amp; Resource Manager
            </h3>
            <span className="text-xs text-slate-500">Live Status updates</span>
          </div>

          <div className="space-y-3">
            {shelterList.map((s) => {
              const available = s.capacity - s.currentOccupancy;
              const occPercent = Math.round((s.currentOccupancy / s.capacity) * 100);

              return (
                <div key={s.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</h4>
                      <p className="text-xs text-slate-500">Contact: {s.contact} • Elev: {s.elevationM || 1450}m</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      s.status === 'Open' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-800'
                    }`}>
                      {s.status}
                    </span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Occupancy: {s.currentOccupancy} / {s.capacity}</span>
                      <span className="text-sky-600 dark:text-sky-400 font-bold">{available} Beds Available</span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${occPercent > 80 ? 'bg-red-500' : 'bg-sky-500'}`}
                        style={{ width: `${occPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Alert Dispatch Stream */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-500" />
              Active System Alert Log
            </h3>
            <span className="text-xs text-slate-500">{alertsList.length} Records</span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {alertsList.map((alt) => (
              <div key={alt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    alt.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {alt.severity}
                  </span>
                  <span className="text-[11px] text-slate-400">{alt.timestamp}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{alt.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{alt.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Broadcast Alert Modal */}
      {broadcastOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-600" />
                Broadcast Early Warning Alert
              </h3>
              <button onClick={() => setBroadcastOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleBroadcastAlert} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Alert Title:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Flash Flood Risk High in Almora Ward 4"
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Location:</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Severity Level:</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-hidden font-bold"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MODERATE">MODERATE</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Alert Instructions &amp; Action Required:</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide immediate evacuation instructions and safe shelter guidance..."
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-hidden focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setBroadcastOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md"
                >
                  Broadcast Alert Now
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
