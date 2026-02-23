"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { incidentService } from "../../../services/incidentService";
import { Incident } from "../../../types";
import Link from "next/link";

export default function DetailsIncident() {
  const { id } = useParams();
  const router = useRouter();
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/incidents/${id}`)
      .then((res) => res.json())
      .then((data) => setIncident(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!incident) return <p className="p-10 text-white text-center">Chargement des données sécurisées...</p>;

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-10">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
          ← Retour au Dashboard
        </button>

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header du détail */}
          <div className="bg-slate-800/50 p-8 border-b border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">Ticket #{incident.id}</span>
              <h1 className="text-3xl font-bold text-white mt-1">{incident.type}</h1>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold text-sm ${
              incident.severite === 'Critique' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
            }`}>
              {incident.severite}
            </div>
          </div>

          {/* Grille d'infos */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h3 className="text-slate-500 text-xs font-bold uppercase mb-2">Description</h3>
                <p className="text-slate-300 leading-relaxed bg-[#0f172a]/50 p-4 rounded-lg border border-slate-800">
                  {incident.description}
                </p>
              </section>

              <section className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">État actuel</h3>
                  <p className="text-white font-medium flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${incident.etat === 'Résolu' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {incident.etat}
                  </p>
                </div>
                <div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Source</h3>
                  <p className="text-white font-medium">{incident.sourceDetection || "Non spécifiée"}</p>
                </div>
              </section>
            </div>

            <div className="space-y-6 bg-[#0f172a]/30 p-6 rounded-xl border border-slate-800">
              <section>
                <h3 className="text-slate-500 text-xs font-bold uppercase mb-1 text-blue-400">Analyste Responsable</h3>
                <p className="text-lg text-white">
                  {incident.analysteEnCharge ? `${incident.analysteEnCharge.prenom} ${incident.analysteEnCharge.nom}` : "⚠️ Non assigné"}
                </p>
              </section>

              <section className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Détecté le</h3>
                  <p className="text-sm text-slate-300">{new Date(incident.dateDeclaration).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Résolu le</h3>
                  <p className="text-sm text-slate-300">
                    {incident.dateResolution ? new Date(incident.dateResolution).toLocaleString() : "En cours de traitement..."}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer avec bouton modifier */}
          <div className="bg-slate-800/30 p-6 border-t border-slate-700 flex justify-end">
             <Link href={`/modifier/${incident.id}`}>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20">
                  Modifier les informations
                </button>
             </Link>
          </div>
        </div>
      </div>
    </main>
  );
}