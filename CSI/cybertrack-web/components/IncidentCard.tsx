"use client";
import { Incident } from "../types";
import Link from "next/link";

interface Props {
  incident: Incident;
  onDelete: (id: number) => void;
  // onEdit supprimé car on utilise Link vers /modifier
}

export default function IncidentCard({ incident, onDelete }: Props) {
  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold ${
            incident.severite === 'Critique' 
              ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
            {incident.severite}
          </span>
          <span className="text-slate-500 text-[10px] font-mono">#{incident.id}</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">{incident.type}</h2>
        <p className="text-slate-400 text-sm mb-6 line-clamp-3">{incident.description}</p>
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-slate-700">
        <div className="flex gap-2">
          {/* Bouton Détails */}
          <Link href={`/details/${incident.id}`} className="flex-1">
            <button className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 py-2 rounded text-sm font-semibold border border-blue-500/20 transition-all">
              Détails
            </button>
          </Link>

          {/* Bouton Modifier */}
          <Link href={`/modifier/${incident.id}`} className="flex-1">
            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-sm font-semibold transition-colors">
              Modifier
            </button>
          </Link>
        </div>

        {/* Bouton Supprimer */}
        <button
          onClick={() => onDelete(incident.id)}
          className="w-full px-4 bg-red-900/10 hover:bg-red-900/30 text-red-500 py-2 rounded text-sm font-semibold border border-red-500/10 transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}