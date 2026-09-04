import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  PhoneCall, 
  ShieldAlert, 
  AlertTriangle, 
  RotateCcw, 
  MapPin, 
  Navigation, 
  Globe 
} from 'lucide-react';
import { ChatMessage, LanguageCode, TabType, VillageWardData } from '../types';
import { TRANSLATIONS_DICT } from '../data/masterData';

interface Props {
  currentLocation: VillageWardData;
  onNavigateTab: (tab: TabType) => void;
  onOpenEmergency: () => void;
  activeLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const HydroVisionChatbot: React.FC<Props> = ({
  currentLocation,
  onNavigateTab,
  onOpenEmergency,
  activeLanguage,
  onSelectLanguage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  const initialGreeting = activeLanguage === 'hi'
    ? `नमस्ते! मैं हाइड्रो विज़न एआई सहायक हूँ। ${currentLocation.villageName} (${currentLocation.wardName}) के लिए वर्तमान जोखिम: ${currentLocation.riskLevel} है। मैं आपकी क्या सहायता कर सकता हूँ?`
    : `Hello! I am Hydro Vision AI Assistant. Current flood risk for ${currentLocation.villageName} (${currentLocation.wardName}) is ${currentLocation.riskLevel}. How can I assist you with safety or forecasts today?`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: 'Just now'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Voice speech synthesis
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = activeLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice speech recognition
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = activeLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const handleSendQuery = (textQuery?: string) => {
    const query = (textQuery || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Check emergency triggers
    const lower = query.toLowerCase();
    const isDistress = 
      lower.includes('help') || 
      lower.includes('trapped') || 
      lower.includes('danger') || 
      lower.includes('stuck') || 
      lower.includes('madad') || 
      lower.includes('bachao') || 
      lower.includes('water entering') || 
      lower.includes('drowning') || 
      lower.includes('emergency');

    if (isDistress) {
      setEmergencyMode(true);
    }

    // Formulate intelligent response based on Hydro Vision state
    setTimeout(() => {
      let botResponse = '';
      let isEmerg = false;
      let quickActions: { label: string; actionTab: TabType }[] | undefined;

      if (isDistress) {
        isEmerg = true;
        botResponse = activeLanguage === 'hi'
          ? `🚨 आपातकालीन चेतावनी! यदि आप तत्काल खतरे में हैं, तो तुरंत 112 या 1078 पर कॉल करें। बाढ़ का पानी छूने से बचें। आपका निकटतम सुरक्षित आश्रय '${currentLocation.shelters[0]?.name}' (${currentLocation.shelters[0]?.distanceKm}) है। सुरक्षित रिज मार्ग का पालन करें!`
          : `🚨 EMERGENCY ASSISTANCE TRIGGERED! If you are in immediate life danger, call National Emergency 112 or NDRF 1078 right away! Move to high ground. Your nearest shelter is '${currentLocation.shelters[0]?.name}' (${currentLocation.shelters[0]?.distanceKm}). Avoid flooded lower roads!`;
        quickActions = [
          { label: '🏃 Evacuation Route', actionTab: 'live-map' },
          { label: '🏠 Nearest Shelter', actionTab: 'live-map' }
        ];
      } else if (lower.includes('shelter') || lower.includes('aashray') || lower.includes('where to go')) {
        const sh = currentLocation.shelters[0];
        botResponse = activeLanguage === 'hi'
          ? `निकटतम सुरक्षित आश्रय '${sh.name}' है, जो ${sh.distanceKm} की दूरी पर स्थित है। यहाँ बिजली, पीने का पानी और प्राथमिक उपचार उपलब्ध है। क्षमता: ${sh.capacity} (वर्तमान उपस्थिति: ${sh.currentOccupancy})।`
          : `The nearest safe shelter is '${sh.name}', situated ${sh.distanceKm} away at an elevation of ${sh.elevationM}m. Facilities include potable water, food, and standby medical triage. Available space: ${sh.capacity - sh.currentOccupancy} beds.`;
        quickActions = [{ label: 'View Shelter on Map', actionTab: 'live-map' }];
      } else if (lower.includes('risk') || lower.includes('khatra') || lower.includes('safe')) {
        botResponse = activeLanguage === 'hi'
          ? `${currentLocation.villageName} (${currentLocation.wardName}) वर्तमान में ${currentLocation.riskLevel} जोखिम स्तर पर है। भारी वर्षा: ${currentLocation.rainfallMm} mm, नदी स्तर: ${currentLocation.riverLevelM} m (चेतावनी रेखा से ऊपर)। मिट्टी संतृप्ति: ${currentLocation.soilMoisturePercent}%। सतर्क रहें।`
          : `Current risk level for ${currentLocation.villageName} (${currentLocation.wardName}) is ${currentLocation.riskLevel}. Factors: Heavy rainfall of ${currentLocation.rainfallMm} mm, river stage at ${currentLocation.riverLevelM} m (rising above warning mark), and soil saturation at ${currentLocation.soilMoisturePercent}%.`;
        quickActions = [{ label: 'Explore Live Map', actionTab: 'live-map' }];
      } else if (lower.includes('route') || lower.includes('evacuat') || lower.includes('road') || lower.includes('rasta')) {
        botResponse = activeLanguage === 'hi'
          ? `अनुशंसित सुरक्षित मार्ग: 'रिज हाईवे रोड' का उपयोग करें। चेतावनी: निचला घाट पहुंच मार्ग 1.4 मीटर बाढ़ के पानी में जलमग्न है और अवरुद्ध है। पुल 1 को पार न करें!`
          : `Recommended Safe Route: Take the Ridge Highway Road. AVOID the Lower Ghat Access Road which is submerged under 1.4m of turbulent floodwater. Suspension Bridge 1 is closed.`;
        quickActions = [{ label: 'View Safe Route Map', actionTab: 'live-map' }];
      } else if (lower.includes('river') || lower.includes('nadi') || lower.includes('water level')) {
        botResponse = activeLanguage === 'hi'
          ? `सीडब्ल्यूसी देवप्रयाग संगम नदी गेज 4.85 मीटर पर है (चेतावनी स्तर 4.0 मीटर से ऊपर, खतरे का स्तर 5.0 मीटर)। जल स्तर +0.35 मीटर/घंटा की दर से बढ़ रहा है।`
          : `The CWC confluence telemetry gauge reads 4.85 m (Normal: 2.5 m, Warning: 4.0 m, Danger: 5.0 m). River stage is rising at +0.35 m/hour due to upper catchment downpours.`;
        quickActions = [{ label: 'River Telemetry Chart', actionTab: 'forecast' }];
      } else if (lower.includes('rain') || lower.includes('barish') || lower.includes('weather') || lower.includes('forecast')) {
        botResponse = activeLanguage === 'hi'
          ? `पिछले 24 घंटों में 98.4 मिमी वर्षा दर्ज की गई है। एआई पूर्वानुमान के अनुसार अगले 6 घंटों में 40-60 मिमी और तीव्र वर्षा की संभावना है।`
          : `Rainfall telemetry indicates 98.4 mm in the last 24 hours. The neural nowcast predicts an additional 40–60 mm over the next 6 hours, maintaining elevated flash flood probability (78%).`;
        quickActions = [{ label: '7-Day Forecast', actionTab: 'forecast' }];
      } else {
        botResponse = activeLanguage === 'hi'
          ? `मैं आपकी सुरक्षा के लिए यहाँ हूँ। आप बाढ़ का जोखिम, निकटतम आश्रय, सुरक्षित निकासी मार्ग, नदी का जल स्तर, या मौसम पूर्वानुमान के बारे में पूछ सकते हैं। आपातकाल में तुरंत 112 डायल करें।`
          : `I am connected to Hydro Vision telemetry. You can ask about current flood risk, nearest safe shelter, evacuation routes avoiding flooded roads, river gauge stages, or 7-day rainfall forecasts. In danger, press SOS.`;
        quickActions = [
          { label: 'Check Risk', actionTab: 'live-map' },
          { label: 'Safe Shelters', actionTab: 'live-map' },
          { label: 'Digital Twin', actionTab: 'digital-twin' }
        ];
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: isEmerg,
        quickActions
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  return (
    <>
      {/* Bottom-Right Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setUnreadBadge(false);
          }}
          className="fixed bottom-5 right-5 z-50 p-4 rounded-2xl bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 group border border-white/20"
          aria-label="Open HydroVision AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-bounce" />
            {unreadBadge && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
            )}
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-black block tracking-wide">HydroVision AI</span>
            <span className="text-[10px] text-cyan-200 block font-medium">Flood & Emergency Assistant</span>
          </div>
        </button>
      )}

      {/* Main Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
                <Bot className="w-6 h-6 text-cyan-200" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-sm tracking-tight">HydroVision AI</h3>
                  <span className="flex items-center text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-ping"></span>
                    Live Feed
                  </span>
                </div>
                <p className="text-[11px] text-blue-100 font-medium truncate max-w-[200px]">
                  📍 {currentLocation.villageName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* SOS direct button inside chat */}
              <button
                onClick={onOpenEmergency}
                className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center space-x-1 shadow-sm animate-pulse"
                title="Direct SOS Call"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>SOS</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Emergency Alert Banner if Emergency Mode Triggered */}
          {emergencyMode && (
            <div className="p-2.5 bg-red-600 text-white text-xs font-bold flex items-center justify-between px-4 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>🚨 Emergency Mode Active: 112 & NDRF Ready</span>
              </div>
              <a 
                href="tel:112"
                className="px-2 py-0.5 bg-white text-red-700 rounded-lg text-[10px] font-black uppercase shadow-xs flex items-center"
              >
                <PhoneCall className="w-3 h-3 mr-1" />
                Call 112
              </a>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : m.isEmergency
                      ? 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-100 rounded-bl-none font-medium'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Read aloud icon for assistant messages */}
                  {m.sender === 'assistant' && (
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-700/60 text-[10px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <button
                        onClick={() => speakText(m.text)}
                        className="hover:text-blue-500 flex items-center space-x-1"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}

                  {/* Quick Action Navigation Buttons */}
                  {m.quickActions && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-700">
                      {m.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={() => onNavigateTab(qa.actionTab)}
                          className="px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/50 hover:bg-sky-200 text-sky-800 dark:text-sky-200 text-[10px] font-bold flex items-center space-x-1 transition-colors"
                        >
                          <Navigation className="w-2.5 h-2.5" />
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex space-x-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <button
              onClick={() => handleSendQuery('What is my flood risk?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900/40 text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap transition-colors"
            >
              🌊 Flood Risk?
            </button>
            <button
              onClick={() => handleSendQuery('Where is the nearest safe shelter?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900/40 text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap transition-colors"
            >
              🏠 Nearest Shelter
            </button>
            <button
              onClick={() => handleSendQuery('Which evacuation route should I take?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900/40 text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap transition-colors"
            >
              🚶 Safe Route
            </button>
            <button
              onClick={() => handleSendQuery('I am in danger, I need emergency help!')}
              className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold whitespace-nowrap hover:bg-red-200 transition-colors"
            >
              🆘 Emergency Help
            </button>
          </div>

          {/* Bottom Query Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center space-x-2">
            
            {/* Voice Input Mic */}
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title={isListening ? 'Listening... Speak now' : 'Voice Input (Speak your query)'}
              aria-label="Voice Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={activeLanguage === 'hi' ? 'बाढ़, आश्रय या मौसम के बारे में पूछें...' : 'Ask about flood risk, shelters, routes...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/90 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => handleSendQuery()}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>

        </div>
      )}
    </>
  );
};
