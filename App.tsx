import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Globe, 
  User, 
  Clock, 
  QrCode, 
  Sparkles,
  ExternalLink,
  Undo2,
  Edit3
} from 'lucide-react';
import InfoCard from './components/InfoCard';
import VisualGenerator from './components/VisualGenerator';
import PrayerModal from './components/PrayerModal';
import { playClick, playOpen } from './services/audioService';

function App() {
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [customBg, setCustomBg] = useState<string | null>(null);

  // Default URL detection with safe fallback
  const defaultUrl = (typeof window !== 'undefined' && window.location.href !== 'about:blank') 
    ? window.location.href 
    : 'https://www.pgf-blr.com/';

  // State for the QR code URL so user can edit it
  const [qrUrl, setQrUrl] = useState(defaultUrl);
  const [isEditingQr, setIsEditingQr] = useState(false);
  
  // High contrast QR code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrUrl)}&color=000000&bgcolor=ffffff&qzone=4`;

  // Official Prayer Request Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/1TjKNCFnjuGj0bY7HptbJ3hjnjp0WG8uel2CmiR24qqs/viewform";

  const handleOpenModal = () => {
    playOpen();
    setIsPrayerModalOpen(true);
  };

  const handleToggleQr = () => {
    playClick();
    setShowQr(!showQr);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 pb-20 overflow-x-hidden font-['Space_Grotesk'] relative">
      
      {/* Background Layers */}
      {customBg ? (
        <div className="fixed inset-0 z-0 animate-in fade-in duration-1000">
           <img src={customBg} alt="Custom Spiritual Background" className="w-full h-full object-cover opacity-50" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-purple-900/10 mix-blend-multiply" />
           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
           
           {/* Reset Background Button */}
           <button 
             onClick={() => { playClick(); setCustomBg(null); }}
             className="absolute top-6 right-6 z-50 bg-black/60 backdrop-blur-md text-xs font-bold text-white/90 px-4 py-2 rounded-full hover:bg-red-500/80 hover:text-white border border-white/20 transition-all flex items-center gap-2 shadow-lg"
           >
             <Undo2 className="w-3 h-3" /> Reset Theme
           </button>
        </div>
      ) : (
        /* Default Ambient Background Effects */
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4s]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[5s] delay-1000" />
          <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[45vh] w-full overflow-hidden flex items-end p-6 md:p-12 border-b border-white/5 z-10">
        {!customBg && (
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2070&auto=format&fit=crop" 
              alt="Spiritual Atmosphere" 
              className="w-full h-full object-cover opacity-50 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-purple-900/20" />
          </div>
        )}
        
        <div className="relative z-10 max-w-5xl mx-auto w-full animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">Live Spirit</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
            PGF <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Whitefield</span>
          </h1>
          <p className="text-gray-400 max-w-lg text-lg md:text-xl font-light leading-relaxed">
            A spiritual sanctuary for the next generation. Connect, create, and find your peace.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          {/* Pastor (Moved to Top Row) */}
          <div className="col-span-2">
            <InfoCard 
              icon={User} 
              label="Pastor" 
              value="D Ravi Kumar Garu" 
            />
          </div>

          {/* Contact (Moved to Top Row) */}
          <div className="col-span-2">
            <InfoCard 
              icon={Phone} 
              label="Contact" 
              value="+91 9845754515" 
              link="tel:+919845754515"
            />
          </div>

          {/* Welcome Message (Moved to Second Row) */}
          <div className="col-span-4 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 backdrop-blur-sm flex items-center justify-between order-3">
            <div>
              <h3 className="text-purple-300 text-xs font-bold uppercase tracking-widest mb-1">Welcome</h3>
              <p className="text-xl md:text-2xl font-medium text-white">Welcome to PGF Whitefield</p>
            </div>
            <div className="hidden md:block">
              <Sparkles className="w-8 h-8 text-white/20" />
            </div>
          </div>

          {/* Timings */}
          <div className="col-span-4 md:col-span-2">
            <InfoCard 
              icon={Clock} 
              label="Telugu Services" 
              value={
                <div className="flex flex-col gap-2">
                  <span className="text-purple-300 font-bold text-lg">Sunday</span>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">09:00 AM - 10:30 AM</span>
                    <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">10:30 AM - 12:30 PM</span>
                  </div>
                </div>
              } 
            />
          </div>

          {/* Links */}
          <div className="col-span-2 md:col-span-1">
             <InfoCard 
              icon={Globe} 
              label="Website" 
              value="pgf-blr.com" 
              link="https://www.pgf-blr.com/"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
             <InfoCard 
              icon={MapPin} 
              label="Location" 
              value="View Map" 
              link="https://maps.app.goo.gl/33xnTMTs2He6MCEP9"
            />
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Primary Action: Official Prayer Form */}
           <a 
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            className="flex-1 min-w-[160px] bg-white text-black px-6 py-4 rounded-2xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Prayer Request</span>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
          </a>

          {/* Secondary Action: AI Encouragement */}
          <button 
            onClick={handleOpenModal}
            className="flex-1 min-w-[160px] bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md border border-white/10 text-white px-6 py-4 rounded-2xl font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2 group hover:border-purple-500/50"
          >
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-spin" />
            <span>AI Companion</span>
          </button>

          {/* Tertiary Action: QR Share */}
          <button 
            onClick={handleToggleQr}
            className={`px-6 py-4 rounded-2xl font-bold border transition-all flex items-center justify-center gap-2 ${showQr ? 'bg-purple-600 border-purple-500 text-white' : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Reveal Section */}
        {showQr && (
          <div className="mb-12 p-6 bg-white rounded-3xl flex flex-col items-center justify-center animate-in slide-in-from-top-4 shadow-2xl shadow-purple-900/20 relative overflow-hidden text-black">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
             
             <div className="relative z-10 w-full max-w-md flex flex-col items-center">
                {/* QR URL Editor */}
                <div className="w-full mb-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 text-center">
                    QR Code Target Link
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={qrUrl}
                      onChange={(e) => setQrUrl(e.target.value)}
                      disabled={!isEditingQr}
                      className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${isEditingQr ? 'bg-white border-purple-500 text-black' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                    />
                    <button 
                      onClick={() => { playClick(); setIsEditingQr(!isEditingQr); }}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 text-center">
                    * If the QR code doesn't work, paste your deployed app URL here.
                  </p>
                </div>

                {/* QR Container with pure white background for contrast */}
                <div className="p-4 bg-white rounded-xl shadow-lg mb-4 border border-gray-100">
                  <img src={qrCodeUrl} alt="Scan to Open App" className="w-64 h-64 block" />
                </div>
                <h3 className="font-bold text-xl mb-1">PGF Whitefield Connect</h3>
                <p className="text-gray-500 text-sm">Scan to open this app on your device</p>
             </div>
          </div>
        )}

        {/* AI Creative Zone (Moved to Bottom) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl p-1 mb-12">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
          <div className="p-6 md:p-8 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Creative Spirit</h2>
            </div>
            <p className="text-gray-400 mb-6 max-w-xl">
              Customize your app experience. Generate unique spiritual artwork and set it as your background.
            </p>
            <VisualGenerator onSetBackground={setCustomBg} />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center border-t border-white/5 bg-black/60 backdrop-blur-md relative z-20">
        <p className="text-gray-500 text-sm mb-2">&copy; 2024 PGF Whitefield</p>
        <p className="text-xs text-gray-700 font-mono uppercase tracking-widest">Designed for Gen Z</p>
      </footer>

      {/* Modals */}
      <PrayerModal isOpen={isPrayerModalOpen} onClose={() => setIsPrayerModalOpen(false)} />
    </div>
  );
}

export default App;