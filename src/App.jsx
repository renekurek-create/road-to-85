import React, { useState, useEffect } from 'react';
import WeightChart from './WeightChart';
import WeightModal from './WeightModal';
import HistoryList from './HistoryList';
import BMIBox from './BMIBox';
import ProgressBar from './ProgressBar';

// --- BAUTEIL: ÜBER MICH ---
const AboutMe = () => {
  const gradientTextClass = "bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] bg-clip-text text-transparent";
  
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-8">
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-lg text-slate-300">
          👤
        </div>
      </div>
      <h2 className="text-4xl font-black text-center text-slate-800 mb-2 italic tracking-tight">René</h2>
      <p className={`text-center font-bold mb-8 tracking-wide uppercase text-sm ${gradientTextClass}`}>
        Jahrgang 1979 • Ziel: 85 kg
      </p>
      <div className="space-y-8 text-slate-600 leading-relaxed font-medium text-lg">
        <p><strong>Warum ich das mache:</strong><br />Gesundheit ist kein Zufall, sondern eine Entscheidung. Ich habe mich entschieden, wieder die Kontrolle zu übernehmen. Der Weg von 106 kg auf 85 kg ist kein Sprint, sondern ein Marathon.</p>
        
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-xl">Meine Ziele für 2026:</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3"><span className={`text-xl ${gradientTextClass}`}>✓</span> Unter 90 kg kommen bis Sommer</li>
            <li className="flex items-center gap-3"><span className={`text-xl ${gradientTextClass}`}>✓</span> BMI verbessern</li>
            <li className="flex items-center gap-3"><span className={`text-xl ${gradientTextClass}`}>✓</span> Regelmäßiges Training (Freeletics)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
// ---------------------------------

const START_WEIGHT = 106.0;
const GOAL_WEIGHT = 85.0;

const gradientButtonClass = "bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all";

const MenuLink = ({ children, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
      active ? 'text-[#0e5f54]' : 'text-slate-500 hover:text-[#00cca0]'
    }`}
  >
    {children}
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [weights, setWeights] = useState(() => {
    try {
      const savedData = localStorage.getItem('rene_weights_v1');
      if (savedData) { return JSON.parse(savedData); } 
    } catch (e) {
      console.error("Daten-Fehler", e);
    }
    return [{ date: 'Start', weight: START_WEIGHT }];
  });

  useEffect(() => {
    localStorage.setItem('rene_weights_v1', JSON.stringify(weights));
  }, [weights]);

  const currentWeight = weights.length > 0 ? weights[weights.length - 1].weight : START_WEIGHT;

  const handleAddWeight = (newWeightValue) => {
    const newEntry = {
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      weight: parseFloat(newWeightValue)
    };
    setWeights([...weights, newEntry]);
  };

  const handleDelete = (indexToDelete) => {
    if (weights.length <= 1) return;
    if (confirm("Eintrag löschen?")) {
      const newWeights = weights.filter((_, index) => index !== indexToDelete);
      setWeights(newWeights);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      
      <WeightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddWeight} />

      {/* --- NAVIGATION --- */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-4 md:px-6 py-4 flex justify-between items-center animate-fade-in-down">
        
        {/* LOGO */}
        <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#00cca0] to-[#0ea5e9]"></div>
            <div className="h-1 w-8 md:w-12 bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] -ml-1"></div>
            <div className="w-10 h-10 -ml-1 rounded-full bg-gradient-to-br from-[#00cca0] to-[#0ea5e9] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
          </div>
          <div className="ml-3 font-extrabold italic tracking-tighter text-xl leading-none uppercase bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] bg-clip-text text-transparent">
            René's Road<br/>to 85
          </div>
        </div>

        {/* MENÜ MITTE */}
        <div className="hidden md:flex gap-8">
          <MenuLink active={activeTab === 'about'} onClick={() => setActiveTab('about')}>Über Mich</MenuLink>
          <MenuLink onClick={() => alert("Blog kommt bald!")}>Blog</MenuLink>
        </div>

        {/* LOGIN BUTTON */}
        <button 
          onClick={() => setActiveTab('tracker')}
          className={`px-5 py-2 rounded-full font-bold uppercase text-xs flex items-center gap-2 ${gradientButtonClass}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span className="hidden md:inline">Zum</span> Tracker
        </button>
      </nav>

      {/* --- HOME --- */}
      {activeTab === 'home' && (
        <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center animate-scale-slow"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2028&auto=format&fit=crop')",
              filter: "brightness(0.5) saturate(1.1)" 
            }}
          ></div>
          
          <div className="relative z-20 px-6 max-w-7xl w-full text-center">
            {/* GROSSER TEXT */}
            <h1 className="text-5xl md:text-9xl font-black italic leading-tight drop-shadow-xl tracking-tight">
              <span className="bg-gradient-to-br from-[#00cca0] to-[#0ea5e9] bg-clip-text text-transparent">
                STARTEN.<br />GEHEN.<br />HINFALLEN.<br />AUFSTEHEN.<br />ANKOMMEN.
              </span>
            </h1>
            
            {/* UNTERTEXT WEISS */}
            <div className="mt-10 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md text-white">
                <span className="font-black block mb-2 tracking-wide uppercase">
                  Renés Road to 85:
                </span>
                <span className="font-medium">
                  Der Weg von 106 kg auf 85 kg.
                </span>
              </p>
            </div>
            
            <button 
              onClick={() => setActiveTab('tracker')} 
              className={`mt-12 px-10 py-5 rounded-full font-bold text-xl animate-fade-in-up ${gradientButtonClass}`}
              style={{animationDelay: '0.5s'}}
            >
              Jetzt Ergebnisse sehen
            </button>
          </div>
        </div>
      )}

      {/* --- TRACKER --- */}
      {activeTab === 'tracker' && (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
          <ProgressBar currentWeight={currentWeight} startWeight={START_WEIGHT} goalWeight={GOAL_WEIGHT} />
          
          <div className="flex justify-end mb-8">
             <button 
               onClick={() => setIsModalOpen(true)} 
               className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 ${gradientButtonClass}`}
             >
               <span>+</span> Gewicht eintragen
             </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <WeightChart data={weights} />
            </div>
            <div className="space-y-8">
               <HistoryList weights={weights} onDelete={handleDelete} />
               <BMIBox currentWeight={currentWeight} />
            </div>
          </div>
        </div>
      )}

      {/* --- ÜBER MICH --- */}
      {activeTab === 'about' && (
        <div className="py-10 px-4 min-h-[80vh]">
          <AboutMe />
        </div>
      )}

    </div>
  );
}