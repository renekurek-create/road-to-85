import React, { useState, useEffect } from 'react';
import WeightChart from './WeightChart';
import WeightModal from './WeightModal';
import HistoryList from './HistoryList';
import BMIBox from './BMIBox';
import ProgressBar from './ProgressBar';

// --- BAUTEIL: ÜBER MICH ---
const AboutMe = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-8 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-lg text-slate-300">
          👤
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">René</h2>
      <p className="text-center text-[#00cca0] font-bold mb-6 tracking-wide uppercase text-sm">
        Jahrgang 1979 • Ziel: 85 kg
      </p>
      <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
        <p><strong>Warum ich das mache:</strong><br />Gesundheit ist kein Zufall, sondern eine Entscheidung. Ich habe mich entschieden, wieder die Kontrolle zu übernehmen. Der Weg von 106 kg auf 85 kg ist kein Sprint, sondern ein Marathon.</p>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-6">
          <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Meine Ziele für 2026:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><span className="text-[#00cca0]">✓</span> Unter 90 kg kommen bis Sommer</li>
            <li className="flex items-center gap-2"><span className="text-[#00cca0]">✓</span> BMI verbessern</li>
            <li className="flex items-center gap-2"><span className="text-[#00cca0]">✓</span> Regelmäßiges Training (Freeletics)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
// ---------------------------------

const START_WEIGHT = 106.0;
const GOAL_WEIGHT = 85.0;

const MenuLink = ({ children, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
      active ? 'text-[#00897b]' : 'text-slate-500 hover:text-[#00897b]'
    }`}
  >
    {children}
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [weights, setWeights] = useState(() => {
    const savedData = localStorage.getItem('rene_weights_v1');
    if (savedData) { return JSON.parse(savedData); } 
    else { return [{ date: 'Start', weight: START_WEIGHT }]; }
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
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 rounded-full border-4 border-[#00cca0] flex items-center justify-center">
            <div className="w-2 h-2 bg-[#00cca0] rounded-full"></div>
          </div>
          <span className="font-extrabold text-[#0e5f54] tracking-tighter italic text-xl md:text-2xl">
            RENÉ'S ROAD
          </span>
        </div>

        <div className="hidden md:flex gap-8">
          <MenuLink active={activeTab === 'about'} onClick={() => setActiveTab('about')}>Über Mich</MenuLink>
          <MenuLink onClick={() => alert("Blog kommt bald!")}>Blog</MenuLink>
        </div>

        <button 
          onClick={() => setActiveTab('tracker')}
          className="border-2 border-[#00cca0] text-[#00cca0] px-4 md:px-6 py-2 rounded-full font-bold hover:bg-[#00cca0] hover:text-white transition uppercase text-xs md:text-sm flex items-center gap-2"
        >
          Login / Tracker
        </button>
      </nav>

      {/* --- HOME (JETZT MITMITTIG & VOLLBILD) --- */}
      {activeTab === 'home' && (
        <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          {/* HINTERGRUNDBILD */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2028&auto=format&fit=crop')",
              filter: "brightness(0.6)" // Etwas dunkler, damit weiße Schrift knallt
            }}
          ></div>
          
          <div className="relative z-20 px-6 max-w-7xl w-full text-center">
            <h1 className="text-5xl md:text-9xl font-black italic leading-tight text-white drop-shadow-2xl">
              STARTEN.<br />GEHEN.<br />ANKOMMEN.
            </h1>
            <div className="mt-8 max-w-2xl mx-auto">
              <p className="text-slate-200 font-bold text-xl md:text-2xl leading-relaxed drop-shadow-md">
                Renés Road to feeling good: <br/>
                Die Transformation von 106 kg auf 85 kg.
              </p>
            </div>
            <button onClick={() => setActiveTab('tracker')} className="mt-12 bg-[#00cca0] text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition hover:bg-[#00b08a]">
              Jetzt Ergebnisse sehen
            </button>
          </div>
        </div>
      )}

      {/* --- TRACKER --- */}
      {activeTab === 'tracker' && (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
          <ProgressBar currentWeight={currentWeight} startWeight={START_WEIGHT} goalWeight={GOAL_WEIGHT} />
          <div className="flex justify-end mb-6">
             <button onClick={() => setIsModalOpen(true)} className="bg-[#00cca0] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">
               + Gewicht eintragen
             </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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