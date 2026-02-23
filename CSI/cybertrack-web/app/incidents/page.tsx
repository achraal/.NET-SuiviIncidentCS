"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Pour la navigation
import { incidentService } from "../../services/incidentService";
import { Incident } from "../../types";
import IncidentCard from "../../components/IncidentCard"; // Import de ton composant

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const loadIncidents = async () => {
    try {
      const data = await incidentService.getAll();
      setIncidents(data);
    } catch (error) {
      console.error("Erreur de chargement:", error);
    }
  };

  useEffect(() => { loadIncidents(); }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet incident ?")) {
      await incidentService.delete(id);
      loadIncidents(); // Rafraîchit la grille après suppression
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header avec lien vers la page d'ajout */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            CYBER<span className="text-blue-500">TRACK</span>
          </h1>
          <Link href="/nouveau">
            <span className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold cursor-pointer transition-all">
              + Déclarer un Incident
            </span>
          </Link>
        </div>

        {/* Grille utilisant le composant IncidentCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((inc) => (
            <IncidentCard 
              key={inc.id} 
              incident={inc} 
              onDelete={handleDelete}
              onEdit={(incident) => console.log("Editer", incident)} // On fera la page edit après
            />
          ))}
        </div>

        {incidents.length === 0 && (
          <p className="text-center py-20 text-slate-500">Aucune menace détectée.</p>
        )}
      </div>
    </main>
  );
}