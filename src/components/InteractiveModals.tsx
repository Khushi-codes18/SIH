import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  FileText, 
  Send, 
  CheckSquare, 
  Square 
} from 'lucide-react';
import { AlertItem, EducationalVideo } from '../types';

// 1. Alert Detail Modal
export const AlertDetailModal: React.FC<{
  alert: AlertItem | null;
  onClose: () => void;
}> = ({ alert, onClose }) => {
  if (!alert) return null;

  const isCritical = alert.severity === 'CRITICAL';
  const isHigh = alert.severity === 'HIGH';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className={`px-6 py-4 flex items-center justify-between ${
          isCritical ? 'bg-red-600 text-white' : isHigh ? 'bg-amber-600 text-white' : 'bg-sky-600 text-white'
        }`}>
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-base tracking-wide uppercase">{alert.severity} • {alert.type}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-slate-800 dark:text-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
              {alert.title}
            </h2>
            <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {alert.location}</span>
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {alert.timestamp}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Advisory Details</h4>
            <p className="text-sm font-medium leading-relaxed">{alert.description}</p>
          </div>

          {alert.actionRequired && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Action Required Immediately
              </h4>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">{alert.actionRequired}</p>
            </div>
          )}

          <div className="pt-2 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// 2. Video Player Modal
export const VideoPlayerModal: React.FC<{
  video: EducationalVideo | null;
  onClose: () => void;
}> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/80 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-bold text-white truncate max-w-md">{video.title}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-7 h-7 ml-1 fill-white" />
            </div>
            <span className="mt-4 text-xs font-semibold text-white/90 bg-black/60 px-3 py-1 rounded-full">
              Educational Module • Duration: {video.duration}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 bg-slate-900 text-slate-200">
          <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
          <p className="text-xs text-sky-400 font-medium mb-3">{video.subtitle}</p>
          <p className="text-sm text-slate-300 leading-relaxed">{video.description}</p>
        </div>

      </div>
    </div>
  );
};

// 3. Quick Tool: Check Your Risk Modal
export const CheckYourRiskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [district, setDistrict] = useState('Uttarkashi');
  const [distance, setDistance] = useState('< 200m');
  const [elevation, setElevation] = useState('Valley Bed');
  const [calculated, setCalculated] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Check Your Area Risk</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Your District / Tehsil</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="Uttarkashi">Uttarkashi (Bhagirathi Basin)</option>
              <option value="Bhatwari">Bhatwari Tehsil</option>
              <option value="Harsil">Harsil Valley</option>
              <option value="Rudraprayag">Rudraprayag</option>
              <option value="Chamoli">Chamoli</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Distance to Major River / Stream</label>
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="< 200m">&lt; 200 meters (High Inundation Zone)</option>
              <option value="200m - 500m">200m - 500 meters (Buffer Margin)</option>
              <option value="> 500m">&gt; 500 meters (High Ground)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Terrain Location</label>
            <select
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="Valley Bed">Valley Bed / Riverbank</option>
              <option value="Steep Slope">Steep Slope / Debris Cone (&gt;30°)</option>
              <option value="Elevated Plateau">Elevated Ridge / High Plateau</option>
            </select>
          </div>

          <button
            onClick={() => setCalculated(true)}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all"
          >
            Calculate Risk Index
          </button>

          {calculated && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 animate-fadeIn">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-amber-900 dark:text-amber-200 text-sm">Estimated Risk: HIGH</span>
                <span className="text-xs bg-red-600 text-white font-black px-2 py-0.5 rounded-full">Score: 8.4/10</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                Due to forecast rainfall exceeding 30mm/hr in {district} and proximity ({distance}), your location has an active flood alert. Identify your closest shelter: <b>Uttarkashi Relief Camp (1.2 km)</b>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Quick Tool: Emergency Kit Checklist Modal
export const EmergencyKitModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([
    { id: 1, text: 'Waterproof pouch with ID, deeds & cash', done: true },
    { id: 2, text: '3 days of non-perishable rations & water purification tabs', done: true },
    { id: 3, text: 'High-power LED flashlight with extra batteries', done: false },
    { id: 4, text: 'Whistle to signal mountain rescue teams', done: false },
    { id: 5, text: 'First-aid kit with prescribed chronic meds', done: true },
    { id: 6, text: 'Fully charged 20,000mAh Power Bank & cables', done: false },
    { id: 7, text: 'Thermal blanket / lightweight waterproof poncho', done: false },
  ]);

  if (!isOpen) return null;

  const completedCount = items.filter((i) => i.done).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const toggleItem = (id: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Emergency Kit Checklist</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Preparedness Level</span>
            <span>{progressPercent}% ({completedCount}/{items.length} Packed)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              {item.done ? (
                <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <span className={`text-xs font-medium ${item.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Quick Tool: Report a Hazard Modal
export const ReportHazardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [hazardType, setHazardType] = useState('Flash Flood Surge');
  const [locationDesc, setLocationDesc] = useState('');
  const [severity, setSeverity] = useState('High');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(`Report logged with SDMA Control #REF-UK-${Math.floor(10000 + Math.random() * 90000)}. Quick response team notified.`);
      onClose();
      setSubmitted(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Report Hazard in Your Area</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Hazard Type</label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="Flash Flood Surge">Flash Flood Surge / River Bank Breach</option>
              <option value="Landslide / Rockfall">Landslide / Debris blocking Road</option>
              <option value="Bridge / Culvert Damage">Bridge / Culvert Structural Damage</option>
              <option value="Stranded Persons">Stranded Persons needing Evacuation</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Exact Location / Landmark</label>
            <input
              type="text"
              required
              placeholder="e.g. Near Bhatwari Bridge, NH-34 km marker 48"
              value={locationDesc}
              onChange={(e) => setLocationDesc(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Urgency / Severity</label>
            <div className="grid grid-cols-3 gap-2">
              {['Critical', 'High', 'Moderate'].map((sev) => (
                <button
                  type="button"
                  key={sev}
                  onClick={() => setSeverity(sev)}
                  className={`py-2 rounded-xl font-bold text-xs border ${
                    severity === sev
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{submitted ? 'Submitting Report...' : 'Submit Official Hazard Incident'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
