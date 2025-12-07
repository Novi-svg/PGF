import React, { useEffect, useState } from 'react';
import { X, Send, Loader2, Sparkles, Heart, BookOpen, MessageCircleHeart } from 'lucide-react';
import { generatePrayerResponse, generateBibleVerse } from '../services/geminiService';
import { GenerationStatus } from '../types';
import { playClick, playClose, playError, playSuccess } from '../services/audioService';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose }) => {
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [response, setResponse] = useState<string | null>(null);
  const [mode, setMode] = useState<'prayer' | 'verse'>('prayer');

  const handleClose = () => {
    playClose();
    // Delay closing slightly to allow sound to start
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    
    playClick();
    setStatus(GenerationStatus.LOADING);
    try {
      let aiResponse;
      if (mode === 'prayer') {
        aiResponse = await generatePrayerResponse(request);
      } else {
        aiResponse = await generateBibleVerse(request);
      }
      setResponse(aiResponse);
      setStatus(GenerationStatus.SUCCESS);
      playSuccess();
    } catch (err) {
      setStatus(GenerationStatus.ERROR);
      playError();
    }
  };

  const reset = () => {
    playClick();
    setRequest('');
    setResponse(null);
    setStatus(GenerationStatus.IDLE);
    onClose();
  };

  const toggleMode = (newMode: 'prayer' | 'verse') => {
    if (mode !== newMode) {
      playClick();
      setMode(newMode);
      setRequest('');
      setResponse(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-6 overflow-hidden transform transition-all scale-100">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
                AI Companion
              </span>
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {status === GenerationStatus.SUCCESS && response ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {mode === 'prayer' ? (
                  <Heart className="w-6 h-6 text-pink-500 mb-3 opacity-80" />
                ) : (
                  <BookOpen className="w-6 h-6 text-blue-400 mb-3 opacity-80" />
                )}
                <p className="text-gray-100 italic font-medium leading-relaxed text-lg whitespace-pre-line">"{response}"</p>
              </div>
              <p className="text-xs text-gray-500 text-center">
                This is an AI-generated {mode === 'prayer' ? 'encouragement' : 'result'}. <br/>For pastoral support, please use the main Prayer Request button.
              </p>
              <button 
                onClick={reset}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-95"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                <button
                  onClick={() => toggleMode('prayer')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    mode === 'prayer' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MessageCircleHeart className="w-4 h-4" /> Prayer
                </button>
                <button
                  onClick={() => toggleMode('verse')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    mode === 'verse' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-4 h-4" /> Bible Verse
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-400">
                  {mode === 'prayer' 
                    ? "Feeling overwhelmed? Share your thoughts and receive an instant prayer of encouragement." 
                    : "Looking for guidance? Enter a topic (e.g., 'Anxiety', 'Hope', 'Forgiveness') to find relevant Bible verses."}
                </p>
                <div className="relative group">
                  <textarea 
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none text-lg"
                    placeholder={mode === 'prayer' ? "I'm feeling..." : "Search verses about..."}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === GenerationStatus.LOADING}
                  className={`w-full py-4 bg-gradient-to-r text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 ${
                    mode === 'prayer' 
                      ? 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-900/20' 
                      : 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-900/20'
                  }`}
                >
                  {status === GenerationStatus.LOADING ? (
                    <>Thinking... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    mode === 'prayer' ? (
                      <>Receive Encouragement <Sparkles className="w-5 h-5" /></>
                    ) : (
                      <>Find Verses <BookOpen className="w-5 h-5" /></>
                    )
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerModal;
