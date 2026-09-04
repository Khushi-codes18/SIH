import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  AlertTriangle, 
  Waves, 
  CloudRain, 
  Mountain, 
  Info, 
  Clock, 
  ArrowRight, 
  Bell, 
  PhoneCall, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ALERTS_DATA } from '../data/mockData';
import { AlertItem, TabType } from '../types';
import { LeafletRiskMap } from '../components/LeafletRiskMap';

interface Props {
  onNavigate: (tab: TabType) => void;
  onSelectAlert: (alert: AlertItem) => void;
  onOpenEmergency: () => void;
  darkMode: boolean;
}

export const AlertsPage: React.FC<Props> = ({ 
  onNavigate, 
  onSelectAlert, 
  onOpenEmergency,
  darkMode 
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Filter alerts based on active controls
  const filteredAlerts = ALERTS_DATA.filter((item) => {
    // Type filter
    if (selectedType !== 'all') {
      if (selectedType === 'flood' && item.type !== 'Flood Alert') return false;
      if (selectedType === 'rainfall' && item.type !== 'Rainfall Alert') return false;
      if (selectedType === 'landslide' && !item.type.includes('Landslide')) return false;
      if (selectedType === 'info' && item.type !== 'Info / Update') return false;
    }

    // Severity filter
    if (selectedSeverity !== 'all' && item.severity.toLowerCase() !== selectedSeverity.toLowerCase()) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedType('all');
    setSelectedSeverity('all');
    setSearchQuery('');
    setTimeRange('Last 7 Days');
    setSelectedDistrict('All Districts');
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      alert('Browser Push Notifications Enabled: You will now receive high-priority flash flood alerts.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Alerts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Real-time and historical alerts for flood, rainfall, landslide and other disaster risks.
        </p>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Filter Alerts (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              <Filter className="w-4 h-4 text-sky-600" />
              <span>Filter Alerts</span>
            </div>

            {/* Alert Type Tabs */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Alert Type</span>
              
              <button
                onClick={() => setSelectedType('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
                  <span>All Alerts</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  32
                </span>
              </button>

              <button
                onClick={() => setSelectedType('flood')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'flood'
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Waves className="w-3.5 h-3.5 text-red-500" />
                  <span>Flood Alert</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  14
                </span>
              </button>

              <button
                onClick={() => setSelectedType('rainfall')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'rainfall'
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                  <span>Rainfall Alert</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  8
                </span>
              </button>

              <button
                onClick={() => setSelectedType('landslide')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'landslide'
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Mountain className="w-3.5 h-3.5 text-amber-500" />
                  <span>Landslide Alert</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  5
                </span>
              </button>

              <button
                onClick={() => setSelectedType('info')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'info'
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Info / Update</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  5
                </span>
              </button>
            </div>

            {/* Risk Level Filter Checkboxes */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Risk Level</span>
              <div className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="riskLevel"
                    checked={selectedSeverity === 'all'}
                    onChange={() => setSelectedSeverity('all')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>All Levels</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="riskLevel"
                    checked={selectedSeverity === 'critical'}
                    onChange={() => setSelectedSeverity('critical')}
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-600"></span>
                  <span>Critical</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="riskLevel"
                    checked={selectedSeverity === 'high'}
                    onChange={() => setSelectedSeverity('high')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                  <span>High</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="riskLevel"
                    checked={selectedSeverity === 'moderate'}
                    onChange={() => setSelectedSeverity('moderate')}
                    className="text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400"></span>
                  <span>Moderate</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="riskLevel"
                    checked={selectedSeverity === 'low'}
                    onChange={() => setSelectedSeverity('low')}
                    className="text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                  <span>Low</span>
                </label>
              </div>
            </div>

            {/* Time Range */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Time Range</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            {/* Location */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">State / Basin</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <option>All Districts</option>
                <option>Kamrup Metro</option>
                <option>Wayanad</option>
                <option>Mumbai Suburban</option>
                <option>Mandi</option>
                <option>Patna</option>
                <option>Uttarkashi</option>
                <option>Krishna</option>
                <option>Central Delhi</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="w-full py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

          </div>
        </div>

        {/* Center: Alerts Feed (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
              />
            </div>
            <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto">
              <select className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none shadow-xs w-full sm:w-auto">
                <option>Sort by: Latest First</option>
                <option>Sort by: Severity (High to Low)</option>
                <option>Sort by: Oldest First</option>
              </select>
            </div>
          </div>

          {/* Alert Cards Feed */}
          <div className="space-y-3.5">
            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 font-bold">No alerts matching your current filter criteria.</p>
                <button onClick={resetFilters} className="mt-2 text-xs font-bold text-sky-600 hover:underline">
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                let badgeClass = 'bg-sky-600 text-white';
                let iconEl = <CloudRain className="w-5 h-5 text-sky-600" />;

                if (alert.severity === 'CRITICAL') {
                  badgeClass = 'bg-red-600 text-white';
                  iconEl = <AlertTriangle className="w-5 h-5 text-red-600" />;
                } else if (alert.severity === 'HIGH') {
                  badgeClass = 'bg-amber-600 text-white';
                  iconEl = <Waves className="w-5 h-5 text-amber-600" />;
                } else if (alert.severity === 'MODERATE') {
                  badgeClass = 'bg-sky-500 text-white';
                  iconEl = alert.type.includes('Landslide') ? (
                    <Mountain className="w-5 h-5 text-amber-500" />
                  ) : (
                    <CloudRain className="w-5 h-5 text-sky-600" />
                  );
                } else if (alert.severity === 'LOW') {
                  badgeClass = 'bg-emerald-600 text-white';
                  iconEl = <Info className="w-5 h-5 text-emerald-600" />;
                }

                return (
                  <div
                    key={alert.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700/60">
                      {iconEl}
                    </div>

                    <div className="flex-1 space-y-1.5 w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {alert.title}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeClass}`}>
                          {alert.severity}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-y-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{alert.location}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        {alert.description}
                      </p>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onSelectAlert(alert)}
                          className="inline-flex items-center text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 group"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 py-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  currentPage === page
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-slate-400 text-xs">...</span>
            <button
              onClick={() => setCurrentPage(8)}
              className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800`}
            >
              8
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(8, currentPage + 1))}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Sidebar: Alerts Summary & Map & Support (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Alerts Summary Breakdown Bars */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Alerts Summary
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="space-y-1">
                <span className="text-lg font-black text-red-600 dark:text-red-400">14</span>
                <span className="block text-[10px] font-bold text-slate-500">Critical</span>
                <div className="h-1.5 w-full bg-red-600 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-black text-amber-500 dark:text-amber-400">18</span>
                <span className="block text-[10px] font-bold text-slate-500">High</span>
                <div className="h-1.5 w-full bg-amber-500 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-black text-yellow-500 dark:text-yellow-400">12</span>
                <span className="block text-[10px] font-bold text-slate-500">Moderate</span>
                <div className="h-1.5 w-full bg-yellow-400 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-lg font-black text-emerald-500 dark:text-emerald-400">7</span>
                <span className="block text-[10px] font-bold text-slate-500">Low</span>
                <div className="h-1.5 w-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Mini Interactive Alerts on Map */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Alerts on Map
              </h3>
              <button
                onClick={() => onNavigate('live-map')}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center"
              >
                <span>View Full Map</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <LeafletRiskMap
                height="220px"
                zoom={5}
                center={[22.5, 82.0]}
                darkMode={darkMode}
                showMiniLegend={false}
              />
            </div>
          </div>

          {/* Stay Informed: Notifications */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-sky-600" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Stay Informed
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enable notifications to receive real-time alerts and important updates.
            </p>
            <button
              onClick={handleToggleNotifications}
              className="w-full py-2.5 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{notificationsEnabled ? '✓ Notifications Enabled' : 'Enable Notifications'}</span>
            </button>
          </div>

          {/* Need Help: Emergency Trigger */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-center space-x-2">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Need Help?
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contact emergency services immediately if you are in danger.
            </p>
            <button
              onClick={onOpenEmergency}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/25 flex items-center justify-center space-x-2 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS Emergency</span>
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Motto Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-sky-50 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 p-6 sm:p-7 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
            Stay safe. Stay informed. Together we can save lives.
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            Follow official alerts and instructions from local authorities.
          </p>
        </div>
      </div>

    </div>
  );
};
