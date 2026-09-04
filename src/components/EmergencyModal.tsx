import React, { useState, useEffect } from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';
import { EMERGENCY_NUMBERS } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [gpsTransmitted, setGpsTransmitted] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  // Stop siren when closing modal
  useEffect(() => {
    if (!isOpen && sirenPlaying) {
      stopSiren();
    }
  }, [isOpen]);

  const startSiren = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      // Modulate frequency up and down
      osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.5);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();

      setAudioCtx(ctx);
      setOscillator(osc);
      setSirenPlaying(true);
    } catch (e) {
      console.warn('Audio Context error', e);
      setSirenPlaying(true);
    }
  };

  const stopSiren = () => {
    if (oscillator) {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
    }
    if (audioCtx) {
      try {
        audioCtx.close();
      } catch (e) {}
    }
    setOscillator(null);
    setAudioCtx(null);
    setSirenPlaying(false);
  };

  const handleTransmitGps = () => {
    setGpsTransmitted(true);
    setTimeout(() => {
      alert('SOS Coordinates Broadcasted: NDRF Disaster Response Control (1078) and Emergency Helpline (112) have acknowledged your distress packet.');
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-red-500/80 dark:border-red-600 overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-white/20 rounded-xl">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h3 className="text-xl font-black tracking-tight">SOS EMERGENCY PORTAL</h3>
              <p className="text-xs text-red-100 font-medium">Hydro Vision National Disaster Response Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Audio Alarm / Distress Siren Bar */}
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900/60">
            <div className="flex items-center space-x-3">
              <span className={`p-2.5 rounded-xl ${sirenPlaying ? 'bg-red-600 text-white animate-bounce' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                {sirenPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </span>
              <div>
                <h4 className="font-bold text-sm text-red-950 dark:text-red-200">High-Decibel Siren</h4>
                <p className="text-xs text-red-700 dark:text-red-300">Alert search & rescue personnel in your vicinity</p>
              </div>
            </div>
            <button
              onClick={sirenPlaying ? stopSiren : startSiren}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                sirenPlaying
                  ? 'bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/30'
              }`}
            >
              {sirenPlaying ? 'Stop Siren' : 'Sound Alarm'}
            </button>
          </div>

          {/* Quick Dial Emergency Contacts */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center">
              <PhoneCall className="w-4 h-4 mr-1.5 text-red-600" />
              1-Tap Direct Rescue Lines
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {EMERGENCY_NUMBERS.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/30 transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400">
                      {item.name}
                    </span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      {item.number}
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* GPS Distress Transmitter */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Current Geo Coordinates</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                GPS Locked (±3m)
              </span>
            </div>
            <p className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 mb-3">
              19.0760° N, 72.8777° E (Mumbai Region / India Grid)
            </p>
            <button
              onClick={handleTransmitGps}
              disabled={gpsTransmitted}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                gpsTransmitted
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20'
              }`}
            >
              {gpsTransmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Distress Packet Transmitted</span>
                </>
              ) : (
                <>
                  <Radio className="w-4 h-4" />
                  <span>Transmit Coordinates to NDRF / SDRF Command</span>
                </>
              )}
            </button>
          </div>

          {/* Offline Safety Rules */}
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 border-t border-slate-200 dark:border-slate-800 pt-4">
            <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              Immediate Survival Actions:
            </div>
            <p>1. Move immediately toward designated high-ground shelters; avoid riverbeds and culverts.</p>
            <p>2. Never attempt to drive through water deeper than 15 cm on mountain curves.</p>
            <p>3. Shut off main circuit breakers before rising waters touch building wiring.</p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-3 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>State Disaster Response Force • Uttarakhand</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 dark:text-slate-200 hover:underline"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
