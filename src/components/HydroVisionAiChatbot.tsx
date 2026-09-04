import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  Home, 
  Sparkles,
  RefreshCw,
  Globe
} from 'lucide-react';
import { ChatMessage, TabType, LanguageCode } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onNavigate: (tab: TabType) => void;
  onOpenEmergency: () => void;
}

export const HydroVisionAiChatbot: React.FC<Props> = ({ onNavigate, onOpenEmergency }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! I am HydroVision AI, your flood & weather safety assistant. How can I assist you today?',
      timestamp: 'Just now',
      quickActions: [
        { label: '🌊 What is my flood risk?', actionTab: 'live-map' },
        { label: '🏠 Find nearest shelter', actionTab: 'live-map' },
        { label: '🚶 Show evacuation route', actionTab: 'live-map' },
        { label: '🌧️ Will there be heavy rain?', actionTab: 'forecast' },
        { label: '🆘 I need emergency help', actionTab: 'home' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process AI Response logic
    setTimeout(() => {
      generateAiResponse(query);
    }, 600);
  };

  const generateAiResponse = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    let reply = '';
    let emergency = false;
    let actions: { label: string; actionTab: TabType }[] | undefined = undefined;

    if (q.includes('help') || q.includes('trapped') || q.includes('danger') || q.includes('sos') || q.includes('water entering') || q.includes('मदद') || q.includes('बचाओ')) {
      emergency = true;
      setIsEmergencyMode(true);
      reply = '🚨 EMERGENCY MODE ACTIVATED! Stay calm. 1. Move to higher ground immediately. 2. Do not walk or drive through flowing water. 3. Reach out to Emergency Control Room at 112 / 1070.';
      actions = [
        { label: '📞 Call Emergency 112', actionTab: 'home' },
        { label: '🏠 View Safe Shelters', actionTab: 'live-map' }
      ];
    } else if (q.includes('risk') || q.includes('flood') || q.includes('gaon') || q.includes('village') || q.includes('खतरा')) {
      reply = '📍 Based on live monitoring in hilly regions (Uttarakhand & Himachal Pradesh), high-elevation zones in Chamoli and Almora show HIGH risk (Rainfall: 84mm, River Stage: Rising). Low-lying wards should prepare for evacuation.';
      actions = [
        { label: '🗺️ Open Risk Map', actionTab: 'live-map' },
        { label: '📊 View Forecast', actionTab: 'forecast' }
      ];
    } else if (q.includes('shelter') || q.includes('stay') || q.includes('आश्रय')) {
      reply = '🏠 The nearest verified shelter is "Government Higher Secondary School Shelter, Almora" (Distance: 1.8 km, Capacity: 250, Available Spaces: 115). Equipped with drinking water, first aid & power generator.';
      actions = [
        { label: '🚶 Navigate to Shelter', actionTab: 'live-map' }
      ];
    } else if (q.includes('rain') || q.includes('weather') || q.includes('forecast') || q.includes('बारिश')) {
      reply = '🌧️ Weather Alert: Heavy to Very Heavy rainfall (75-110 mm) is predicted over the next 6 hours in Mandi & Kullu districts. River levels are rising by +0.35m/hr.';
      actions = [
        { label: '🌧️ View Hourly Forecast', actionTab: 'forecast' }
      ];
    } else {
      reply = `Thank you for your question. I am continuously analyzing IoT river sensors, rainfall gauges, and elevation models for hilly zones. You can check risk maps, forecasts, or launch emergency SOS actions.`;
      actions = [
        { label: '🗺️ View Risk Map', actionTab: 'live-map' },
        { label: '📚 Open Resources', actionTab: 'resources' }
      ];
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEmergency: emergency,
      quickActions: actions
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  const toggleVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser window. Demo speech simulated!');
      handleSendMessage('What is the current flood risk in my village?');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage('Where is the nearest safe shelter?');
      }, 3000);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center p-4 bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-full shadow-2xl shadow-sky-600/50 hover:scale-105 transition-all duration-300 border-2 border-white/40 focus:outline-hidden"
          aria-label="Open HydroVision AI Assistant"
        >
          <Bot className="w-7 h-7 animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
            HydroVision AI
          </span>
        </button>
      )}

      {/* Main Chatbot Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[400px] h-[540px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl">
          
          {/* Header */}
          <div className={`p-4 ${isEmergencyMode ? 'bg-red-700 text-white' : 'bg-linear-to-r from-sky-700 via-blue-800 to-indigo-900 text-white'} flex items-center justify-between shadow-md`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base leading-tight">HydroVision AI</h3>
                  <span className="text-[10px] bg-cyan-500/30 px-2 py-0.5 rounded-full font-semibold border border-cyan-300/30">
                    Multilingual
                  </span>
                </div>
                <p className="text-[11px] text-sky-100 opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • AI Flood & Emergency Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg px-2 py-1 outline-hidden border border-white/20 cursor-pointer"
                title="Switch Language"
              >
                <option value="en" className="bg-slate-900 text-white">EN - English</option>
                <option value="hi" className="bg-slate-900 text-white">HI - हिंदी</option>
                <option value="bn" className="bg-slate-900 text-white">BN - বাংলা</option>
                <option value="ta" className="bg-slate-900 text-white">TA - தமிழ்</option>
                <option value="te" className="bg-slate-900 text-white">TE - తెలుగు</option>
                <option value="mr" className="bg-slate-900 text-white">MR - मराठी</option>
                <option value="gu" className="bg-slate-900 text-white">GU - ગુજરાતી</option>
              </select>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/60 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none'
                      : msg.isEmergency
                      ? 'bg-red-50 dark:bg-red-950/80 text-red-900 dark:text-red-100 border border-red-300 dark:border-red-800 rounded-bl-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.sender === 'assistant' && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => speakText(msg.text)}
                        className="p-1 hover:text-sky-600 dark:hover:text-sky-400"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.quickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (qa.label.includes('Call Emergency')) {
                            onOpenEmergency();
                          } else {
                            onNavigate(qa.actionTab);
                          }
                        }}
                        className="text-[11px] font-semibold px-3 py-1.5 bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900 rounded-xl border border-sky-300/40 transition-colors"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Emergency Permanent Banner */}
          <div className="px-3 py-2 bg-red-100 dark:bg-red-950/60 border-t border-red-200 dark:border-red-900 flex items-center justify-between text-xs">
            <span className="text-red-700 dark:text-red-300 font-bold flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Immediate Flood Threat?
            </span>
            <button
              onClick={onOpenEmergency}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs"
            >
              <PhoneCall className="w-3 h-3" />
              Call SOS 112
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
            <button
              onClick={toggleVoiceRecording}
              className={`p-2.5 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title={isRecording ? 'Listening...' : 'Voice Input'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about flood risk, shelters, routes..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-hidden focus:ring-2 focus:ring-sky-500"
            />

            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-md transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
