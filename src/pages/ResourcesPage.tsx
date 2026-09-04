import React, { useState } from 'react';
import { 
  BookOpen, 
  FileSpreadsheet, 
  GraduationCap, 
  Wrench, 
  Search, 
  Download, 
  Eye, 
  CheckCircle2, 
  Play, 
  ShieldCheck, 
  CheckSquare, 
  HelpCircle, 
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { TabType, ResourceItem } from '../types';
import { ALL_53_RESOURCES } from '../data/mockData';

interface Props {
  onNavigate: (tab: TabType) => void;
  onOpenVideo?: (v: any) => void;
  onOpenRiskTool: () => void;
  onOpenKitTool: () => void;
  onOpenHazardTool: () => void;
  onOpenEmergency: () => void;
}

export const ResourcesPage: React.FC<Props> = ({
  onNavigate,
  onOpenRiskTool,
  onOpenKitTool,
  onOpenHazardTool,
  onOpenEmergency,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'guide' | 'report' | 'training' | 'toolkit'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  // Active Toolkit Checklists state
  const [completedChecklistIds, setCompletedChecklistIds] = useState<Record<string, boolean>>({});
  // Training progress state
  const [completedTrainingIds, setCompletedTrainingIds] = useState<Record<string, boolean>>({});

  const filteredResources = ALL_53_RESOURCES.filter((res) => {
    const matchesCat = activeCategory === 'all' || res.category === activeCategory;
    const matchesQuery = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.hazardType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const guidesCount = ALL_53_RESOURCES.filter((r) => r.category === 'guide').length;
  const reportsCount = ALL_53_RESOURCES.filter((r) => r.category === 'report').length;
  const trainingCount = ALL_53_RESOURCES.filter((r) => r.category === 'training').length;
  const toolkitsCount = ALL_53_RESOURCES.filter((r) => r.category === 'toolkit').length;

  const toggleChecklistItem = (id: string) => {
    setCompletedChecklistIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markTrainingCompleted = (id: string) => {
    setCompletedTrainingIds((prev) => ({ ...prev, [id]: true }));
    alert('✓ Training Module Completed Successfully! Certificate badge recorded.');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-sky-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-500/20">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 rounded-full text-xs font-bold text-cyan-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official HydroVision Knowledge &amp; Disaster Resources Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Disaster Preparedness <span className="text-cyan-400">Resources Portal</span>
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Access <b>53 structured educational resources</b>, research studies, community training modules, and interactive disaster readiness toolkits tailored for flash flood safety in hilly Himalayan regions.
          </p>

          {/* Search Bar */}
          <div className="pt-2 flex items-center max-w-2xl">
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 53 guides, reports, training modules or toolkits..."
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder-slate-300 text-xs sm:text-sm rounded-2xl pl-12 pr-4 py-3 border border-white/20 outline-hidden focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === 'all' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            All Resources ({ALL_53_RESOURCES.length})
          </button>
          <button
            onClick={() => setActiveCategory('guide')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === 'guide' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            📘 Guides &amp; Manuals ({guidesCount})
          </button>
          <button
            onClick={() => setActiveCategory('report')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === 'report' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            📊 Reports &amp; Studies ({reportsCount})
          </button>
          <button
            onClick={() => setActiveCategory('training')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === 'training' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            🎓 Training ({trainingCount})
          </button>
          <button
            onClick={() => setActiveCategory('toolkit')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === 'toolkit' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            🧰 Toolkits ({toolkitsCount})
          </button>
        </div>

        <div className="text-slate-500 font-semibold px-2">
          Showing {filteredResources.length} of 53 Items
        </div>
      </div>

      {/* Main Grid: Left 2 Cols Resources, Right 1 Col Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Resource Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                      {res.category === 'guide' && <BookOpen className="w-5 h-5" />}
                      {res.category === 'report' && <FileSpreadsheet className="w-5 h-5" />}
                      {res.category === 'training' && <GraduationCap className="w-5 h-5" />}
                      {res.category === 'toolkit' && <Wrench className="w-5 h-5" />}
                    </span>

                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {res.format} • {res.size}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Updated: {res.lastUpdated}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedResource(res)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading file: ${res.title}.pdf (${res.size})`)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Tools Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <Sparkles className="w-5 h-5 text-amber-500" />
              ⚡ Quick Emergency Tools
            </h3>

            <div className="space-y-3">
              <button
                onClick={onOpenRiskTool}
                className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600">🛡️ Check Area Flood Risk</h4>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-1">Instant elevation &amp; river risk evaluation for any location.</p>
              </button>

              <button
                onClick={() => onNavigate('live-map')}
                className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600">📍 Plan Evacuation Route</h4>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-1">Find safe roads and open shelters near your current location.</p>
              </button>

              <button
                onClick={onOpenKitTool}
                className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600">🎒 Emergency Kit Checklist</h4>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-1">Interactive readiness checklist for food, water &amp; documents.</p>
              </button>

              <button
                onClick={onOpenHazardTool}
                className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600">⚠️ Report a Road Hazard</h4>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-1">Submit community reports for landslides or flooded roads.</p>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Resource Detail Viewer Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">{selectedResource.category} • {selectedResource.format}</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedResource.title}</h2>
              </div>
              <button onClick={() => setSelectedResource(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedResource.description}</p>

            {/* Interactive Toolkit Checklist section */}
            {selectedResource.checklistItems && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Interactive Checklist:</h4>
                <div className="space-y-2 text-xs">
                  {selectedResource.checklistItems.map((chk) => (
                    <label key={chk.id} className="flex items-center space-x-2.5 cursor-pointer p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={!!completedChecklistIds[chk.id]}
                        onChange={() => toggleChecklistItem(chk.id)}
                        className="rounded-md text-sky-600 w-4 h-4 accent-sky-600"
                      />
                      <span className={completedChecklistIds[chk.id] ? 'line-through text-slate-400' : 'font-semibold text-slate-700 dark:text-slate-200'}>
                        {chk.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Training Quiz Section */}
            {selectedResource.quiz && selectedResource.quiz.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Module Assessment Quiz:</h4>
                {selectedResource.quiz.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                    <p className="font-bold text-slate-800 dark:text-slate-100">Q: {q.question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (i === q.answerIndex) alert('✓ Correct Answer!');
                            else alert('✕ Incorrect. Try again!');
                          }}
                          className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-left font-medium hover:border-sky-500"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <button
                onClick={() => markTrainingCompleted(selectedResource.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Mark as Completed ✓
              </button>

              <button
                onClick={() => {
                  alert(`Downloading complete document: ${selectedResource.title}.pdf`);
                  setSelectedResource(null);
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md"
              >
                Download PDF Resource ({selectedResource.size})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
