import React, { useState, useEffect } from 'react';
import { TabType, AlertItem, EducationalVideo } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LiveMapPage } from './pages/LiveMapPage';
import { AlertsPage } from './pages/AlertsPage';
import { ForecastPage } from './pages/ForecastPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { VillageDigitalTwinPage } from './pages/VillageDigitalTwinPage';
import { HistoricalTimelinePage } from './pages/HistoricalTimelinePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutUsPage } from './pages/AboutUsPage';

import { EmergencyModal } from './components/EmergencyModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { 
  AlertDetailModal, 
  VideoPlayerModal, 
  CheckYourRiskModal, 
  EmergencyKitModal, 
  ReportHazardModal 
} from './components/InteractiveModals';
import { WeatherRainEffect } from './components/WeatherRainEffect';
import { HydroVisionAiChatbot } from './components/HydroVisionAiChatbot';

import { LanguageProvider } from './context/LanguageContext';
import { UserModeProvider } from './context/UserModeContext';
import { ALERTS_DATA } from './data/mockData';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hima_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  // Modal States
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<EducationalVideo | null>(null);
  const [riskToolOpen, setRiskToolOpen] = useState(false);
  const [kitToolOpen, setKitToolOpen] = useState(false);
  const [hazardToolOpen, setHazardToolOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState<AlertItem[]>(ALERTS_DATA.slice(0, 3));

  // Update HTML class when dark mode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('hima_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hima_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleMarkAllRead = () => {
    setUnreadAlerts([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 relative">
      
      {/* Area-Based Dynamic Rain Visualization Effect */}
      <WeatherRainEffect
        riskLevel="High"
        locationName="Almora Ward #04 (Koshy Catchment)"
        rainfallMm={84}
      />

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenNotifications={() => setNotificationOpen(true)}
        onOpenEmergency={() => setEmergencyOpen(true)}
        unreadCount={unreadAlerts.length}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={setCurrentTab}
            onSelectAlert={setSelectedAlert}
            onOpenEmergency={() => setEmergencyOpen(true)}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'live-map' && (
          <LiveMapPage
            onNavigate={setCurrentTab}
            onSelectAlert={setSelectedAlert}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'digital-twin' && (
          <VillageDigitalTwinPage
            onNavigate={setCurrentTab}
            onOpenEmergency={() => setEmergencyOpen(true)}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'history' && (
          <HistoricalTimelinePage
            onNavigate={setCurrentTab}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'alerts' && (
          <AlertsPage
            onNavigate={setCurrentTab}
            onSelectAlert={setSelectedAlert}
            onOpenEmergency={() => setEmergencyOpen(true)}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'forecast' && (
          <ForecastPage
            onNavigate={setCurrentTab}
            darkMode={darkMode}
          />
        )}

        {currentTab === 'resources' && (
          <ResourcesPage
            onNavigate={setCurrentTab}
            onOpenVideo={setSelectedVideo}
            onOpenRiskTool={() => setRiskToolOpen(true)}
            onOpenKitTool={() => setKitToolOpen(true)}
            onOpenHazardTool={() => setHazardToolOpen(true)}
            onOpenEmergency={() => setEmergencyOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboardPage
            onNavigate={setCurrentTab}
            onOpenEmergency={() => setEmergencyOpen(true)}
          />
        )}

        {currentTab === 'about-us' && (
          <AboutUsPage onNavigate={setCurrentTab} />
        )}
      </main>

      {/* Floating Multilingual AI Disaster Assistant Chatbot */}
      <HydroVisionAiChatbot
        onNavigate={setCurrentTab}
        onOpenEmergency={() => setEmergencyOpen(true)}
      />

      {/* Global Interactive Modals */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />

      <NotificationDrawer
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        alerts={unreadAlerts}
        onSelectAlert={setSelectedAlert}
        onMarkAllRead={handleMarkAllRead}
      />

      <AlertDetailModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <CheckYourRiskModal
        isOpen={riskToolOpen}
        onClose={() => setRiskToolOpen(false)}
      />

      <EmergencyKitModal
        isOpen={kitToolOpen}
        onClose={() => setKitToolOpen(false)}
      />

      <ReportHazardModal
        isOpen={hazardToolOpen}
        onClose={() => setHazardToolOpen(false)}
      />

      {/* Global Footer Credits */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2024-2026 <b>HydroVision Platform</b> — Flash Flood Prediction System for Hilly Regions (SIH 2026 PS ID: 26192).
          </span>
          <span className="flex items-center space-x-3">
            <button onClick={() => setCurrentTab('about-us')} className="hover:underline">About Us</button>
            <span>•</span>
            <button onClick={() => setEmergencyOpen(true)} className="text-red-500 font-bold hover:underline">SOS Emergency</button>
            <span>•</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline">Back to Top ↑</button>
          </span>
        </div>
      </footer>

    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <UserModeProvider>
        <AppContent />
      </UserModeProvider>
    </LanguageProvider>
  );
}

export default App;
