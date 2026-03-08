// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { incidentService } from "../../services/incidentService";
// import { Analyste } from "../../types";

// export default function NouveauIncident() {
//   const router = useRouter();
//   const [analystes, setAnalystes] = useState<Analyste[]>([]);
//   const [isAdmin, setIsAdmin] = useState(false);
  
//   const [formData, setFormData] = useState({
//     type: "",
//     severite: "Moyen",
//     etat: "Nouveau",
//     description: "",
//     sourceDetection: "Manuel", // Changé SIEM par Manuel par défaut pour le formulaire
//     dateDeclaration: new Date().toISOString(),
//     dateResolution: null,
//     analysteId: "" 
//   });

//   useEffect(() => {
//     // 1. Vérifier le rôle de l'utilisateur connecté
//     const userString = localStorage.getItem("user");
//     if (userString) {
//       const user = JSON.parse(userString);
//       const adminStatus = user.role === "Admin";
//       setIsAdmin(adminStatus);

//       // Si l'utilisateur n'est PAS admin, on pré-remplit avec son propre ID
//       // mais on bloquera le champ dans le rendu (UI)
//       if (!adminStatus) {
//         setFormData(prev => ({ ...prev, analysteId: user.id.toString() }));
//       }
//     }

//     // 2. Charger la liste des analystes (utile seulement pour l'admin)
//     incidentService.getAllAnalystes()
//       .then(setAnalystes)
//       .catch(err => console.error("Erreur chargement analystes", err));
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const payload = {
//       ...formData,
//       analysteId: formData.analysteId ? parseInt(formData.analysteId) : null
//     };

//     try {
//       const response = await incidentService.create(payload);
//       if (response.ok) {
//         router.push("/");
//         router.refresh();
//       } else {
//         alert("Erreur lors de la création de l'incident.");
//       }
//     } catch (error) {
//       alert("Erreur de connexion.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#0f172a] text-white p-10">
//       <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl">
//         <h1 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">
//           🚨 Déclarer une menace
//         </h1>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* TYPE */}
//           <div>
//             <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Nature de l'incident</label>
//             <input 
//               className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 focus:border-blue-500 outline-none transition-all"
//               placeholder="Ex: Tentative d'intrusion, Phishing..."
//               onChange={(e) => setFormData({...formData, type: e.target.value})} 
//               required 
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* SÉVÉRITÉ */}
//             <div>
//               <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Sévérité</label>
//               <select className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
//                 onChange={(e) => setFormData({...formData, severite: e.target.value})}>
//                 <option value="Faible">🟢 Faible</option>
//                 <option value="Moyen">🟡 Moyen</option>
//                 <option value="Critique">🔴 Critique</option>
//               </select>
//             </div>

//             {/* ASSIGNATION (ADMIN ONLY) */}
//             <div>
//               <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
//                 Assignation {!isAdmin && "(Verrouillé)"}
//               </label>
//               <select 
//                 className={`w-full border rounded-lg p-3 outline-none transition-all ${
//                   isAdmin 
//                   ? "bg-[#0f172a] border-slate-600 focus:border-blue-500" 
//                   : "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
//                 }`}
//                 value={formData.analysteId}
//                 disabled={!isAdmin} // <--- C'EST ICI QUE LES DROITS SONT RÉVOQUÉS
//                 onChange={(e) => setFormData({...formData, analysteId: e.target.value})}
//               >
//                 <option value="">-- Non assigné --</option>
//                 {analystes.map(a => (
//                   <option key={a.id} value={a.id}>{a.nom} {a.prenom}</option>
//                 ))}
//               </select>
//               {!isAdmin && <p className="text-[10px] text-slate-500 mt-1 italic">Seul un administrateur peut modifier l'assignation.</p>}
//             </div>
//           </div>

//           {/* SOURCE DETECTION */}
//           <div>
//             <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Source de détection</label>
//             <input 
//               className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
//               value={formData.sourceDetection}
//               onChange={(e) => setFormData({...formData, sourceDetection: e.target.value})} 
//             />
//           </div>

//           {/* DESCRIPTION */}
//           <div>
//             <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Détails techniques</label>
//             <textarea rows={4} className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3"
//               placeholder="Décrivez les signes de compromission..."
//               onChange={(e) => setFormData({...formData, description: e.target.value})} required />
//           </div>

//           <div className="flex gap-4 pt-6">
//             <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-bold transition-colors">Annuler</button>
//             <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all">
//               🚀 Créer l'incident
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { incidentService } from "../../services/incidentService";
import { Analyste } from "../../types";
import { 
  AlertCircle, ArrowLeft, ShieldAlert, 
  Send, Zap, Lock, Info, Server 
} from "lucide-react";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NouveauIncident() {
  const router = useRouter();
  const [analystes, setAnalystes] = useState<Analyste[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    type: "",
    severite: "Moyen",
    etat: "Nouveau",
    description: "",
    sourceDetection: "Manuel",
    dateDeclaration: new Date().toISOString(),
    dateResolution: null,
    analysteId: "none" // Correction pour le Select shadcn
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      const adminStatus = user.role === "Admin";
      setIsAdmin(adminStatus);

      if (!adminStatus) {
        setFormData(prev => ({ ...prev, analysteId: user.id.toString() }));
      }
    }

    incidentService.getAllAnalystes()
      .then(setAnalystes)
      .catch(err => console.error("Erreur SOC-LDR-02", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...formData,
      analysteId: (formData.analysteId === "none" || !formData.analysteId) 
        ? null 
        : parseInt(formData.analysteId)
    };

    try {
      const response = await incidentService.create(payload);
      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur de déploiement du ticket", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-8 text-slate-500 hover:text-white group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
          Annuler la procédure
        </Button>

        <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl">
          <header className="mb-10">
            <div className="flex items-center gap-3 text-blue-500 mb-2">
              <ShieldAlert size={32} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Security Protocol / Phase-01
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
              Déclaration de <span className="text-blue-500">Menace</span>
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TYPE D'INCIDENT */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nature de l'incident</Label>
              <Input 
                className="bg-slate-900/50 border-slate-700 h-12 focus:border-blue-500 transition-all font-medium"
                placeholder="Ex: Tentative d'exfiltration, DDoS, Phishing..."
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})} 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SÉVÉRITÉ */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Niveau de Sévérité</Label>
                <Select 
                  value={formData.severite} 
                  onValueChange={(val) => setFormData({...formData, severite: val})}
                >
                  <SelectTrigger className="bg-slate-900/50 border-slate-700 h-12">
                    <SelectValue placeholder="Sévérité" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="Faible">🟢 Faible</SelectItem>
                    <SelectItem value="Moyen">🟡 Moyen</SelectItem>
                    <SelectItem value="Critique">🔴 Critique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ASSIGNATION */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                   Analyste Assigné {!isAdmin && <Lock size={10} className="text-amber-500" />}
                </Label>
                <Select 
                  disabled={!isAdmin}
                  value={formData.analysteId}
                  onValueChange={(val) => setFormData({...formData, analysteId: val})}
                >
                  <SelectTrigger className={`bg-slate-900/50 border-slate-700 h-12 ${!isAdmin && 'opacity-50'}`}>
                    <SelectValue placeholder="Assignation" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="none">-- Non assigné --</SelectItem>
                    {analystes.map(a => (
                      <SelectItem key={a.id} value={a.id.toString()}>{a.nom} {a.prenom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SOURCE DETECTION */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Source de détection (Vecteur)</Label>
              <div className="relative">
                <Input 
                  className="bg-slate-900/50 border-slate-700 h-12 pl-10"
                  value={formData.sourceDetection}
                  onChange={(e) => setFormData({...formData, sourceDetection: e.target.value})} 
                />
                <Server className="absolute left-3 top-3.5 text-slate-600 h-5 w-5" />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Détails Techniques & Preuves</Label>
              <Textarea 
                rows={5} 
                className="bg-slate-900/50 border-slate-700 focus:border-blue-500/50 font-mono text-sm"
                placeholder="Indiquez les vecteurs d'attaque, IPs sources, ou indicateurs de compromission (IoC)..."
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                required 
              />
            </div>

            {/* ALERT INFO */}
            <Alert className="bg-blue-500/5 border-blue-500/20 text-blue-400">
              <Info className="h-4 w-4" />
              <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Information système</AlertTitle>
              <AlertDescription className="text-[11px] opacity-70">
                La déclaration d'un incident génère automatiquement un ID de ticket unique et notifie les analystes de garde.
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.3)] group"
            >
              {loading ? (
                <Zap className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  Générer le Ticket d'Incident
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}