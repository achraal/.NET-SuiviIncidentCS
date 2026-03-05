"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { incidentService } from "../../../services/incidentService";
import { Analyste, Incident } from "../../../types";
import Playbook from "@/components/Playbook"; // Assure-toi d'avoir créé ce composant

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

export default function ModifierIncident() {
  const router = useRouter();
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<Analyste | null>(null);
  const [analystes, setAnalystes] = useState<Analyste[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<Partial<Incident>>({
    type: "",
    severite: "",
    etat: "",
    description: "",
    dateDeclaration: "",
    dateResolution: null,
    analysteId: "",
    playbookStatus: "[]"
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
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

  const isAdmin = currentUser?.role === "Admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      id: Number(id),
      type: formData.type,
      severite: formData.severite,
      etat: formData.etat,
      description: formData.description,
      sourceDetection: formData.sourceDetection,
      dateDeclaration: formData.dateDeclaration,
      dateResolution: (formData.etat === "Résolu" || formData.etat === "Fermé") 
        ? (formData.dateResolution || new Date().toISOString()) 
        : null,
      analysteId: formData.analysteId ? Number(formData.analysteId) : null,
      playbookStatus: formData.playbookStatus || "[]"
    };

    try {
      const response = await incidentService.update(Number(id), payload);
      if (response.ok) {
        router.push("/incidents"); 
        router.refresh();
      } else {
        const errorText = await response.text();
        alert(`Erreur API ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  if (loading) return <p className="text-center text-white p-10 font-mono animate-pulse">Chargement du Playbook SOC...</p>;

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 lg:p-10">
      {/* Container Principal en Grille pour le Playbook à droite */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE : FORMULAIRE (Prend 2 colonnes sur 3 sur grand écran) */}
        <div className="lg:col-span-2">
          <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h1 className="text-2xl font-bold mb-2 text-blue-400">📝 Incident #{id}</h1>
            <p className="text-slate-500 text-sm mb-8 italic">Mode investigation et remédiation</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Statut Actuel</label>
                  <select 
                    className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-all"
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
  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-2">
    Analyste assigné 
    {!isAdmin && <span className="text-amber-500 text-[10px] normal-case font-normal">(🔒 Réservé aux Admins)</span>}
  </label>
  
  <select 
    // On désactive si l'utilisateur n'est pas Admin
    disabled={!isAdmin} 
    className={`w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none transition-all ${
      !isAdmin 
        ? "opacity-60 cursor-not-allowed border-slate-700 text-slate-500" 
        : "focus:border-blue-500 border-slate-600"
    }`}
    value={formData.analysteId}
    onChange={(e) => setFormData({...formData, analysteId: e.target.value})}
  >
    <option value="">-- Non assigné --</option>
    {analystes.map(a => (
      <option key={a.id} value={a.id}>{a.nom} {a.prenom} ({a.role})</option>
    ))}
  </select>
</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Journal d'investigation</label>
                <textarea 
                  rows={6} 
                  placeholder="Décrivez les actions menées..."
                  className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {formData.dateResolution && (
                <div className="text-[11px] text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20 flex items-center gap-2">
                  <span>✅ Résolution enregistrée le : {new Date(formData.dateResolution).toLocaleString()}</span>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-bold transition-all">
                  Retour
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/40 transition-all">
                  Mettre à jour l'incident
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* COLONNE DROITE : LE PLAYBOOK (Prend 1 colonne) */}
        <div className="lg:col-span-1">
          {/* Remplace l'ancien appel par celui-ci */}
          <Playbook 
            type={formData.type || "Default"} 
            initialSteps={formData.playbookStatus ? JSON.parse(formData.playbookStatus) : []}
            onProgressChange={(steps) => setFormData({ ...formData, playbookStatus: JSON.stringify(steps) })}
          />
          
          <div className="mt-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
             <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">Conseil SOC</h4>
             <p className="text-[12px] text-slate-400 leading-relaxed">
               Assurez-vous d'avoir complété toutes les étapes du playbook avant de passer le statut à <strong>Résolu</strong>. La conformité des logs est essentielle pour l'audit.
             </p>
          </div>
        </div>

      </div>
    </main>
  );
}