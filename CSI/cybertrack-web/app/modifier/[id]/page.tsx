"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { incidentService } from "../../../services/incidentService";
import { Analyste, Incident } from "../../../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

export default function ModifierIncident() {
  const router = useRouter();
  const { id } = useParams();
  const [analystes, setAnalystes] = useState<Analyste[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<Partial<Incident>>({
    type: "",
    severite: "",
    etat: "",
    description: "",
    dateDeclaration: "",
    dateResolution: null, // On le gère en arrière-plan
    analysteId: "" 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resIncident, analystesData] = await Promise.all([
          fetch(`${API_BASE_URL}/incidents/${id}`),
          incidentService.getAllAnalystes()
        ]);
        const incidentData = await resIncident.json();
        setAnalystes(analystesData);
        setFormData({
          ...incidentData,
          analysteId: incidentData.analysteId ?? ""
        });
      } catch (error) {
        console.error("Erreur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // LOGIQUE AUTOMATIQUE :
    let finalDateResolution = formData.dateResolution;

    if (formData.etat === "Résolu" || formData.etat === "Fermé") {
      // Si on vient de le résoudre et qu'il n'y avait pas encore de date, on met "Maintenant"
      if (!finalDateResolution) {
        finalDateResolution = new Date().toISOString();
      }
    } else {
      // Si l'incident est réouvert (Nouveau/En cours), on vide la date de résolution
      finalDateResolution = null;
    }

    const payload = {
      ...formData,
      id: Number(id),
      analysteId: formData.analysteId && formData.analysteId !== "" ? Number(formData.analysteId) : null,
      dateResolution: finalDateResolution
    };

    try {
      const response = await incidentService.update(Number(id), payload);
      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <p className="text-center text-white p-10">Synchronisation avec le SOC...</p>;

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-blue-400">📝 Incident #{id}</h1>
        <p className="text-slate-500 text-sm mb-8">Modification du ticket et assignation</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Statut</label>
              <select 
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500"
                value={formData.etat}
                onChange={(e) => setFormData({...formData, etat: e.target.value})}
              >
                <option value="Nouveau">Nouveau</option>
                <option value="En cours">En cours</option>
                <option value="Résolu">Résolu ✅</option>
                <option value="Fermé">Fermé 🔒</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Analyste assigné</label>
              <select 
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500"
                value={formData.analysteId}
                onChange={(e) => setFormData({...formData, analysteId: e.target.value})}
              >
                <option value="">-- Non assigné --</option>
                {analystes.map(a => (
                  <option key={a.id} value={a.id}>{a.nom} {a.prenom}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Description actualisée</label>
            <textarea 
              rows={5} 
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Petit indicateur visuel si l'incident est déjà résolu */}
          {formData.dateResolution && (
            <div className="text-[11px] text-green-500 bg-green-500/10 p-2 rounded border border-green-500/20">
              Cible résolue le : {new Date(formData.dateResolution).toLocaleString()}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-bold transition-all">
              Annuler
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/40 transition-all">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}