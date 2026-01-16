import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Das Diagramm empfängt jetzt "data" von außen
export default function WeightChart({ data }) {
  
  // Wir berechnen das letzte Gewicht für die Anzeige
  const currentWeight = data.length > 0 ? data[data.length - 1].weight : 0;
  const startWeight = data.length > 0 ? data[0].weight : 0;
  const progress = startWeight - currentWeight;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-1">Aktuell</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-800">{currentWeight}</span>
            <span className="text-slate-400 font-medium">kg</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-[#10b981] bg-green-50 px-3 py-1 rounded-full inline-block mb-1">
            - {progress.toFixed(1)} kg geschafft
          </div>
          <p className="text-xs text-slate-400">Ziel: 85 kg</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#10b981" 
              strokeWidth={4} 
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
              activeDot={{ r: 7 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}