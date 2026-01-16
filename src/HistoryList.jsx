import React from 'react';

export default function HistoryList({ weights, onDelete }) {
  // Wir drehen die Liste für die Anzeige um (...reverse), 
  // damit dein neuester Eintrag immer ganz OBEN steht.
  const reversedWeights = [...weights].reverse();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full mt-8">
      <h3 className="font-bold text-slate-800 mb-4 text-lg border-b border-slate-100 pb-2">
        Historie ({weights.length} Einträge)
      </h3>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {reversedWeights.map((entry, index) => {
          // Rechentrick: Da wir die Liste umgedreht anzeigen, müssen wir den 
          // "echten" Index in der Datenbank berechnen, um den Richtigen zu löschen.
          const realIndex = weights.length - 1 - index;

          return (
            <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg text-xs font-bold text-slate-400 border border-slate-100 w-16 text-center">
                  {entry.date}
                </div>
                <span className="text-slate-800 font-bold text-lg">
                  {entry.weight} <span className="text-xs text-slate-400 font-normal">kg</span>
                </span>
              </div>
              
              <button
                onClick={() => onDelete(realIndex)}
                className="text-slate-300 hover:text-red-500 p-2 transition hover:bg-red-50 rounded-lg"
                title="Diesen Eintrag löschen"
              >
                {/* Das ist das Mülleimer-Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          );
        })}
      </div>
      
      {weights.length === 0 && (
        <p className="text-center text-slate-400 py-4">Noch keine Einträge vorhanden.</p>
      )}
    </div>
  );
}