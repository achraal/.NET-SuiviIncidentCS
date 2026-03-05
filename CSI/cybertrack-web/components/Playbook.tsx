// src/components/Playbook.tsx
import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { PLAYBOOKS } from "../constants/playbooks";

interface PlaybookProps {
  type: string;
  initialSteps?: boolean[]; // Ajout : étapes venant de la base
  onProgressChange?: (steps: boolean[]) => void; // Ajout : fonction pour notifier le parent
}

export default function Playbook({ type, initialSteps, onProgressChange }: PlaybookProps) {
  const steps = PLAYBOOKS[type] || PLAYBOOKS["Default"];
  
  // On initialise avec les données de la base OU un tableau vide
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    initialSteps && initialSteps.length === steps.length 
    ? initialSteps 
    : new Array(steps.length).fill(false)
  );

  // Synchronisation si les props changent (chargement initial)
  useEffect(() => {
    if (initialSteps && initialSteps.length === steps.length) {
      setCompletedSteps(initialSteps);
    }
  }, [initialSteps, steps.length]);

  const toggleStep = (index: number) => {
    const newSteps = [...completedSteps];
    newSteps[index] = !newSteps[index];
    setCompletedSteps(newSteps);
    
    // NOTIFIER LE PARENT ICI
    if (onProgressChange) {
      onProgressChange(newSteps);
    }
  };

  const progress = Math.round((completedSteps.filter(Boolean).length / steps.length) * 100);

  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
          🛡️ Playbook : {type}
        </h3>
        <span className="text-xs font-mono bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
          {progress}% Complété
        </span>
      </div>

      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6">
        <div 
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={index}
            onClick={() => toggleStep(index)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all ${
              completedSteps[index] 
              ? "bg-green-500/10 border-green-500/30 text-green-400" 
              : "bg-[#0f172a] border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            {completedSteps[index] ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            <span className="text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}