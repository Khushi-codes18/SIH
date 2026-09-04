import React, { useState } from 'react';
import { TabType, LanguageCode } from '../types';
import { 
  Waves, 
  Home, 
  MapPin, 
  AlertTriangle, 
  CloudRain, 
  FileText, 
  Building, 
  History, 
  ShieldCheck, 
  Info, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X,
  PhoneCall,
  Globe,
  User,
  Shield
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUserMode } from '../context/UserModeContext';

interface Props {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNotifications: () => void;
  onOpenEmergency: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  darkMode,
  onToggleDarkMode,
  onOpenNotifications,
  onOpenEmergency,
  unreadCount,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { persona, togglePersona } = useUserMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('home'), icon: <Home className="w-4 h-4 mr-1.5" /> },
    { id: 'live-map', label: 'Risk Map', icon: <MapPin className="w-4 h-4 mr-1.5" /> },
    { id: 'alerts', label: 'Early Warning', icon: <AlertTriangle className="w-4 h-4 mr-1.5" /> },
    { id: 'digital-twin', label: 'Village Digital Twin', icon: <Building className="w-4 h-4 mr-1.5" /> },
    { id: 'history', label: 'History & Validation', icon: <History className="w-4 h-4 mr-1.5" /> },
    { id: 'forecast', label: t('forecast'), icon: <CloudRain className="w-4 h-4 mr-1.5" /> },
    { id: 'resources', label: t('resources'), icon: <FileText className="w-4 h-4 mr-1.5" /> },
    { id: 'admin', label: 'Authority Control', icon: <ShieldCheck className="w-4 h-4 mr-1.5" /> },
    { id: 'about-us', label: t('about_us'), icon: <Info className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => onSelectTab('home')}
          >
            <div className="relative w-11 h-11 rounded-2xl bg-linear-to-tr from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <div className="absolute inset-0 rounded-2xl border border-white/30"></div>
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Hydro<span className="text-cyan-500">Vision</span>
                </span>
                <span className="text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-extrabold px-2 py-0.5 rounded-full border border-sky-300/40">
                  SIH 2026
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                {t('brand_subtitle')}
              </span>
            </div>
          </div>

          {/* Persona Mode Switcher & Language Selector */}
          <div className="hidden lg:flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={togglePersona}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                persona === 'citizen'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
              title="People-First Simplified Emergency View"
            >
              <User className="w-3.5 h-3.5" />
              <span>👤 Citizen Mode</span>
            </button>

            <button
              onClick={togglePersona}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                persona === 'authority'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
              title="Technical Command Center Dashboard"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>🏛️ Authority Dashboard</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center space-x-1 pl-2 border-l border-slate-300 dark:border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-white">EN - English</option>
                <option value="hi" className="bg-slate-900 text-white">HI - हिंदी</option>
                <option value="bn" className="bg-slate-900 text-white">BN - বাংলা</option>
                <option value="ta" className="bg-slate-900 text-white">TA - தமிழ்</option>
                <option value="te" className="bg-slate-900 text-white">TE - తెలుగు</option>
                <option value="mr" className="bg-slate-900 text-white">MR - मराठी</option>
                <option value="gu" className="bg-slate-900 text-white">GU - ગુજરાતી</option>
                <option value="as" className="bg-slate-900 text-white">AS - অসমীয়া</option>
                <option value="kn" className="bg-slate-900 text-white">KN - ಕನ್ನಡ</option>
                <option value="ml" className="bg-slate-900 text-white">ML - മലയാളം</option>
                <option value="pa" className="bg-slate-900 text-white">PA - ਪੰਜਾਬੀ</option>
                <option value="ne" className="bg-slate-900 text-white">NE - नेपाली</option>
              </select>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-600 dark:bg-sky-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tablet Nav (Medium Screens) */}
          <nav className="hidden md:flex xl:hidden items-center space-x-1">
            {navItems.slice(0, 5).map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center px-2 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & SOS Emergency Direct Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Dark/Light Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 border border-slate-200/80 dark:border-slate-700/80 focus:outline-hidden"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 border border-slate-200/80 dark:border-slate-700/80 focus:outline-hidden"
              title="View live notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-[11px] font-bold rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* SOS Emergency Direct Launcher Button */}
            <a
              href="tel:112"
              onClick={(e) => {
                // Also trigger emergency modal
                onOpenEmergency();
              }}
              className="flex items-center px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 group"
            >
              <PhoneCall className="w-4 h-4 mr-1.5 group-hover:animate-bounce" />
              <span>SOS 112</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-2.5 rounded-lg text-xs font-bold ${
                      isActive
                        ? 'bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
