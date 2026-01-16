import React from 'react';

export default function ProgressBar({ currentWeight, startWeight, goalWeight }) {
  // 1. Die Mathematik: Wie viel muss insgesamt runter?
  const totalToLose = startWeight - goalWeight; // z.B. 106 - 85 = 21kg

  // 2. Wie viel ist schon runter?
  // (Wir stellen sicher, dass es nicht negativ wird, falls man mal zunimmt)
  const lostSoFar = Math.max(0, startWeight - currentWeight);

  // 3. Den Prozentsatz berechnen
  let percentage = (lostSoFar / totalToLose) * 100;
  
  // Sicherheits-Begrenzung zwischen 0% und 100%
  percentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full max-w-xl mx-auto mb-10 px-4">
      {/* Obere Textzeile */}
      <div className="flex justify-between text-sm font-medium text-white/80 mb-2">
        <span>Start: {startWeight} kg</span>
        <span className="font-bold text-white">{percentage.toFixed(0)}% geschafft</span>
        <span>Ziel: {85} kg</span>
      </div>

      {/* Der Balken selbst */}
      {/* Äußerer Rahmen (grau/transparent) */}
      <div className="h-6 bg-black/20 backdrop-blur-sm rounded-full overflow-hidden p-1 border border-white/10 shadow-inner">
        {/* Innerer Balken (leuchtend grün/weiß), der sich füllt */}
        {/* Wir nutzen 'style={{ width: ... }}' um die Breite dynamisch zu setzen */}
        <div 
          className="h-full bg-gradient-to-r from-white/80 to-white rounded-full shadow-sm transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
            {/* Ein kleiner Glanz-Effekt auf dem Balken */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
        </div>
      </div>

      {/* Untere Textzeile (Motivation) */}
      <div className="text-center text-xs text-white/70 mt-2 font-medium">
        Noch <span className="text-white font-bold">{(currentWeight - goalWeight).toFixed(1)} kg</span> bis zum Ziel!
      </div>
    </div>
  );
}