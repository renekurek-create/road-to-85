import React from 'react';

export default function ProgressBar({ currentWeight, startWeight, goalWeight }) {
  const totalToLose = startWeight - goalWeight;
  const lostSoFar = Math.max(0, startWeight - currentWeight);
  let percentage = (lostSoFar / totalToLose) * 100;
  percentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="flex justify-between text-sm font-bold text-slate-600 mb-2 px-2">
        <span>Start: {startWeight} kg</span>
        <span className="bg-gradient-to-r from-[#00cca0] to-[#0ea5e9] bg-clip-text text-transparent font-extrabold">
          {percentage.toFixed(0)}% geschafft
        </span>
        <span>Ziel: {goalWeight} kg</span>
      </div>

      <div className="h-8 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200 shadow-inner relative">
        <div 
          className="h-full rounded-full shadow-sm transition-all duration-1000 ease-out relative"
          style={{ 
            width: `${percentage}%`,
            background: 'linear-gradient(to right, #00cca0, #0ea5e9)'
          }}
        >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500 mt-3 font-medium">
        Noch <span className="font-bold text-slate-800">{(currentWeight - goalWeight).toFixed(1)} kg</span> bis zum Ziel!
      </div>
    </div>
  );
}