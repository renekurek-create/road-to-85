import React, { useState } from 'react';

export default function WeightModal({ isOpen, onClose, onSave }) {
  const [weight, setWeight] = useState('');

  // Wenn das Fenster nicht offen sein soll, zeigen wir gar nichts an
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite
    if (weight) {
      onSave(weight);
      setWeight(''); // Eingabe leeren
      onClose();     // Fenster schließen
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-bounce-in">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Gewicht eintragen</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Aktuelles Gewicht (kg)
            </label>
            <input 
              type="number" 
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="z.B. 94.5"
              className="w-full text-3xl font-bold text-slate-800 border-b-2 border-slate-200 focus:border-[#10b981] outline-none py-2 text-center"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition"
            >
              Abbrechen
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 font-bold bg-[#10b981] text-white rounded-xl shadow-md hover:bg-[#059669] transition"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}