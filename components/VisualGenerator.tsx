import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Maximize, Palette } from 'lucide-react';
import { generateSpiritualImage } from '../services/geminiService';
import { GenerationStatus } from '../types';
import { playClick, playError, playSuccess } from '../services/audioService';

interface VisualGeneratorProps {
  onSetBackground?: (url: string) => void;
}

const VisualGenerator: React.FC<VisualGeneratorProps> = ({ onSetBackground }) => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    playClick();
    setStatus(GenerationStatus.LOADING);
    try {
      const url = await generateSpiritualImage(prompt);
      if (url) {
        setImageUrl(url);
        setStatus(GenerationStatus.SUCCESS);
        playSuccess();
      } else {
        setStatus(GenerationStatus.ERROR);
        playError();
      }
    } catch (e) {
      setStatus(GenerationStatus.ERROR);
      playError();
    }
  };

  const handleSetBackground = (url: string) => {
    if (onSetBackground) {
      playSuccess();
      onSetBackground(url);
    }
  };

  return (
    <div className="mt-8 p-1 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500">
      <div className="bg-black/90 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="text-purple-400 w-5 h-5" />
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            AI Spiritual Theme Generator
          </h2>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">
          Customize the app's look by describing a spiritual theme (e.g., "Heavenly light", "Dove of peace").
          <br/>
          <span className="text-xs text-purple-400/70 block mt-1">* AI will strictly only generate spiritual content.</span>
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Theme (e.g., Divine Light)..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleGenerate}
            disabled={status === GenerationStatus.LOADING || !prompt}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center min-w-[50px]"
          >
            {status === GenerationStatus.LOADING ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </button>
        </div>

        {status === GenerationStatus.ERROR && (
           <p className="text-red-400 text-sm mb-4">Failed to generate. Please try again with a spiritual theme.</p>
        )}

        {imageUrl && (
          <div className="relative group rounded-lg overflow-hidden border border-white/10 mt-4 animate-in fade-in zoom-in duration-500">
            <img src={imageUrl} alt="Generated Art" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <a
                href={imageUrl}
                download="spiritual-art.png"
                onClick={playClick}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all border border-white/20"
              >
                <Download className="w-4 h-4" /> Save
              </a>
              
              {onSetBackground && (
                <button
                  onClick={() => handleSetBackground(imageUrl)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg shadow-purple-500/20"
                >
                  <Maximize className="w-4 h-4" /> Set as Background
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualGenerator;
