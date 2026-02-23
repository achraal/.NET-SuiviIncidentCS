"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { incidentService } from "../../services/incidentService";
import { Analyste } from "../../types";

export default function NouveauIncident() {
  const router = useRouter();
  const [analystes, setAnalystes] = useState<Analyste[]>([]);
  
  const [formData, setFormData] = useState({
    type: "",
    severite: "Moyen",
    etat: "Nouveau",
    description: "",
    sourceDetection: "SIEM",
    dateDeclaration: new Date().toISOString(), // Date actuelle obligatoire
    dateResolution: null, // Initialement nul
    analysteId: "" // Sera l'ID de l'analyste sélectionné
  });

  // Charger les analystes au démarrage
  useEffect(() => {
    incidentService.getAllAnalystes()
      .then(setAnalystes)
      .catch(err => console.error("Erreur chargement analystes", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // On convertit l'ID en nombre avant l'envoi
    const payload = {
      ...formData,
      analysteId: formData.analysteId ? parseInt(formData.analysteId) : null
    };

    try {
      const response = await incidentService.create(payload);
      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        const err = await response.json();
        console.table(err.errors); // Affiche les erreurs de validation C# proprement
        alert("Erreur de validation. Regarde la console F12.");
      }
    } catch (error) {
      alert("Erreur de connexion.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-slate-700">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">🚨 Déclarer une menace</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TYPE */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Type</label>
            <input className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
              onChange={(e) => setFormData({...formData, type: e.target.value})} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* SÉVÉRITÉ */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Sévérité</label>
              <select className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
                onChange={(e) => setFormData({...formData, severite: e.target.value})}>
                <option value="Faible">Faible</option>
                <option value="Moyen">Moyen</option>
                <option value="Critique">Critique</option>
              </select>
            </div>

            {/* ANALYSTE (Liste déroulante dynamique) */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Assigner à</label>
              <select 
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
                value={formData.analysteId}
                onChange={(e) => setFormData({...formData, analysteId: e.target.value})}
              >
                <option value="">-- Choisir un analyste --</option>
                {analystes.map(a => (
                  <option key={a.id} value={a.id}>{a.nom} {a.prenom} (ID: {a.id})</option>
                ))}
              </select>
            </div>
          </div>

          {/* SOURCE DETECTION */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Source de détection</label>
            <input className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
              onChange={(e) => setFormData({...formData, sourceDetection: e.target.value})} />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Description</label>
            <textarea rows={4} className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
              onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          </div>

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-800 py-3 rounded-lg font-bold">Annuler</button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-lg">Enregistrer</button>
          </div>
        </form>
      </div>
    </main>
  );
}