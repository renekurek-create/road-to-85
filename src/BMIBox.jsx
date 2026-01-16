import React from 'react';

export default function BMIBox({ currentWeight }) {
  // --- Hier ist deine Größe fest eingetragen ---
  const height = 168; 
  // --------------------------------------------

  // Die Mathematik: Gewicht geteilt durch Größe im Quadrat
  const heightInMeters = height / 100;
  const bmi = (currentWeight / (heightInMeters * heightInMeters)).toFixed(1);

  // Welcher Text soll angezeigt werden?
  let status = "Normalgewicht";
  let colorClass = "bg-green-100 text-green-700";

  if (bmi >= 25 && bmi < 30) {
    status = "Leichtes Übergewicht";
    colorClass = "bg-orange-100 text-orange-700";
  } else if (bmi >= 30 && bmi < 35) {
    status = "Adipositas (Grad 1)";
    colorClass = "bg-red-100 text-red-700";
  } else if (bmi >= 35) {
    status = "Adipositas (Grad 2)";
    colorClass = "bg-red-200 text-red-800";
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6">
      <h3 className="font-bold text-slate-800 mb-2">Dein BMI Status</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold text-slate-800">{bmi}</span>
          <span className="text-xs text-slate-400 ml-1">BMI</span>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}>
          {status}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        Basierend auf {height} cm Körpergröße.
      </p>
    </div>
  );
}