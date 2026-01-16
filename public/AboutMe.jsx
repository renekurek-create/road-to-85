import React from 'react';

export default function AboutMe() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-8 animate-fade-in">
      
      {/* Profilbild Platzhalter */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-lg text-slate-300">
          👤
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
        René
      </h2>
      <p className="text-center text-[#00cca0] font-bold mb-6 tracking-wide uppercase text-sm">
        Jahrgang 1979 • Ziel: 85 kg
      </p>

      <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
        <p>
          <strong>Warum ich das mache:</strong><br />
          Gesundheit ist kein Zufall, sondern eine Entscheidung. Ich habe mich entschieden, 
          wieder die Kontrolle zu übernehmen. Der Weg von 106 kg auf 85 kg ist kein Sprint, 
          sondern ein Marathon – aber ich bin bereit.
        </p>

        <p>
          <strong>Mein Motto:</strong><br />
          "Konstanz schlägt Intensität." Es geht nicht darum, einen Tag perfekt zu sein, 
          sondern jeden Tag ein bisschen besser.
        </p>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-6">
          <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Meine Ziele für 2026:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-[#00cca0]">✓</span> Unter 90 kg kommen bis Sommer
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00cca0]">✓</span> Den BMI in den grünen Bereich bringen
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00cca0]">✓</span> Regelmäßiges Training (Freeletics)
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}