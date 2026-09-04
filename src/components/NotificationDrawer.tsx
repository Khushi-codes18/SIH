import React from 'react';
import { Bell, X, CheckCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { AlertItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alerts: AlertItem[];
  onSelectAlert: (alert: AlertItem) => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  alerts,
  onSelectAlert,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 z-10 flex flex-col transform transition-transform">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Alerts & Feeds</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">3 unread flash flood warnings</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={onMarkAllRead}
              className="p-2 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              <span>Read All</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alerts.slice(0, 6).map((item) => {
            const isCritical = item.severity === 'CRITICAL';
            const isHigh = item.severity === 'HIGH';

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectAlert(item);
                  onClose();
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md ${
                  isCritical
                    ? 'bg-red-50/60 dark:bg-red-950/30 border-red-200 dark:border-red-900/60'
                    : isHigh
                    ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isCritical
                          ? 'bg-red-600 text-white'
                          : isHigh
                          ? 'bg-amber-600 text-white'
                          : 'bg-sky-600 text-white'
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.relativeTime}
                    </span>
                  </div>
                  <AlertTriangle className={`w-4 h-4 ${isCritical ? 'text-red-500' : 'text-amber-500'}`} />
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  <span>📍 {item.location}</span>
                  <span className="flex items-center">
                    Details <ExternalLink className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time feed connected to Uttarakhand SDMA Sensor Grid
          </p>
        </div>

      </div>
    </div>
  );
};
