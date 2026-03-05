"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { incidentService } from "../../services/incidentService";
import { Analyste } from "../../types";

export default function NouveauIncident() {
  const router = useRouter();
  const [analystes, setAnalystes] = useState<Analyste[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [formData, setFormData] = useState({
    type: "",
    severite: "Moyen",
    etat: "Nouveau",
    description: "",
    sourceDetection: "Manuel", // Changé SIEM par Manuel par défaut pour le formulaire
    dateDeclaration: new Date().toISOString(),
    dateResolution: null,
    analysteId: "" 
  });

  useEffect(() => {
    // 1. Vérifier le rôle de l'utilisateur connecté
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      const adminStatus = user.role === "Admin";
      setIsAdmin(adminStatus);

      // Si l'utilisateur n'est PAS admin, on pré-remplit avec son propre ID
      // mais on bloquera le champ dans le rendu (UI)
      if (!adminStatus) {
        setFormData(prev => ({ ...prev, analysteId: user.id.toString() }));
      }
    }

    // 2. Charger la liste des analystes (utile seulement pour l'admin)
    incidentService.getAllAnalystes()
      .then(setAnalystes)
      .catch(err => console.error("Erreur chargement analystes", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        alert("Erreur lors de la création de l'incident.");
      }
    } catch (error) {
      alert("Erreur de connexion.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">
          🚨 Déclarer une menace
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TYPE */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Nature de l'incident</label>
            <input 
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 focus:border-blue-500 outline-none transition-all"
              placeholder="Ex: Tentative d'intrusion, Phishing..."
              onChange={(e) => setFormData({...formData, type: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* SÉVÉRITÉ */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Sévérité</label>
              <select className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
                onChange={(e) => setFormData({...formData, severite: e.target.value})}>
                <option value="Faible">🟢 Faible</option>
                <option value="Moyen">🟡 Moyen</option>
                <option value="Critique">🔴 Critique</option>
              </select>
            </div>

            {/* ASSIGNATION (ADMIN ONLY) */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Assignation {!isAdmin && "(Verrouillé)"}
              </label>
              <select 
                className={`w-full border rounded-lg p-3 outline-none transition-all ${
                  isAdmin 
                  ? "bg-[#0f172a] border-slate-600 focus:border-blue-500" 
                  : "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                }`}
                value={formData.analysteId}
                disabled={!isAdmin} // <--- C'EST ICI QUE LES DROITS SONT RÉVOQUÉS
                onChange={(e) => setFormData({...formData, analysteId: e.target.value})}
              >
                <option value="">-- Non assigné --</option>
                {analystes.map(a => (
                  <option key={a.id} value={a.id}>{a.nom} {a.prenom}</option>
                ))}
              </select>
              {!isAdmin && <p className="text-[10px] text-slate-500 mt-1 italic">Seul un administrateur peut modifier l'assignation.</p>}
            </div>
          </div>

          {/* SOURCE DETECTION */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Source de détection</label>
            <input 
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
              value={formData.sourceDetection}
              onChange={(e) => setFormData({...formData, sourceDetection: e.target.value})} 
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Détails techniques</label>
            <textarea rows={4} className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
              placeholder="Décrivez les signes de compromission..."
              onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          </div>

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-bold transition-colors">Annuler</button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all">
              🚀 Créer l'incident
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}