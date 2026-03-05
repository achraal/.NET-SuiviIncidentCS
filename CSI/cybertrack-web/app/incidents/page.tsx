"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { incidentService } from "../../services/incidentService";
import { Incident } from "../../types";
import IncidentCard from "../../components/IncidentCard";

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // État pour le rôle

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const data = await incidentService.getAll();
      setIncidents(data);
    } catch (error) {
      console.error("Erreur de chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
    
    // Vérification du rôle au chargement
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setIsAdmin(user.role === "Admin");
    }
  }, []);

  const handleDelete = async (id: number) => {
    // Double sécurité : on vérifie le rôle avant de lancer la fonction
    if (!isAdmin) {
      alert("Action refusée : Seul un administrateur peut supprimer un incident.");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer cet incident ?")) {
      await incidentService.delete(id);
      loadIncidents();
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            CYBER<span className="text-blue-500">TRACK</span>
          </h1>
          <Link href="/nouveau">
            <span className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold cursor-pointer transition-all">
              + Déclarer un Incident
            </span>
          </Link>
        </div>

        {/* LÉGENDE */}
        <div className="flex gap-6 mb-10 text-[10px] font-bold uppercase">
            <div className="flex items-center gap-2 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> 
                Saisie Manuelle
            </div>
            <div className="flex items-center gap-2 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> 
                Flux Web Service (API)
            </div>
        </div>

        {/* GRILLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {incidents.map((inc) => {
            const isApi = inc.sourceDetection?.startsWith("API");

            return (
              <div key={inc.id} className="relative group">
                
                {isApi && (
                  <div className="absolute -top-3 -right-2 z-20">
                    <div className="bg-blue-600 text-white text-[9px] px-2 py-1 rounded shadow-xl border border-blue-400 flex items-center gap-1 font-black">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      {inc.sourceDetection}
                    </div>
                  </div>
                )}

                <div className={isApi ? "border-t-2 border-blue-500 rounded-xl" : ""}>
                  <IncidentCard 
                    incident={inc} 
                    // Si l'utilisateur n'est pas Admin, on peut passer null ou masquer le bouton dans le composant
                    onDelete={isAdmin ? handleDelete : undefined} 
                    onEdit={(incident) => console.log("Editer", incident)} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {incidents.length === 0 && !loading && (
          <p className="text-center py-20 text-slate-500 italic">Aucun incident dans la base.</p>
        )}
      </div>
    </main>
  );
}