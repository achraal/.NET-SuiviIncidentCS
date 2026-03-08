// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { incidentService } from "../../../services/incidentService";
// import { Analyste, Incident } from "../../../types";
// import Playbook from "@/components/Playbook"; // Assure-toi d'avoir créé ce composant

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

// export default function ModifierIncident() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [currentUser, setCurrentUser] = useState<Analyste | null>(null);
//   const [analystes, setAnalystes] = useState<Analyste[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const [formData, setFormData] = useState<Partial<Incident>>({
//     type: "",
//     severite: "",
//     etat: "",
//     description: "",
//     dateDeclaration: "",
//     dateResolution: null,
//     analysteId: "",
//     playbookStatus: "[]"
//   });

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setCurrentUser(JSON.parse(userData));
//     }
//     const fetchData = async () => {
//       try {
//         const [resIncident, analystesData] = await Promise.all([
//           fetch(`${API_BASE_URL}/incidents/${id}`),
//           incidentService.getAllAnalystes()
//         ]);
//         const incidentData = await resIncident.json();
//         setAnalystes(analystesData);
//         setFormData({
//           ...incidentData,
//           analysteId: incidentData.analysteId ?? ""
//         });
//       } catch (error) {
//         console.error("Erreur", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const isAdmin = currentUser?.role === "Admin";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const payload = {
//       id: Number(id),
//       type: formData.type,
//       severite: formData.severite,
//       etat: formData.etat,
//       description: formData.description,
//       sourceDetection: formData.sourceDetection,
//       dateDeclaration: formData.dateDeclaration,
//       dateResolution: (formData.etat === "Résolu" || formData.etat === "Fermé") 
//         ? (formData.dateResolution || new Date().toISOString()) 
//         : null,
//       analysteId: formData.analysteId ? Number(formData.analysteId) : null,
//       playbookStatus: formData.playbookStatus || "[]"
//     };

//     try {
//       const response = await incidentService.update(Number(id), payload);
//       if (response.ok) {
//         router.push("/incidents"); 
//         router.refresh();
//       } else {
//         const errorText = await response.text();
//         alert(`Erreur API ${response.status}: ${errorText}`);
//       }
//     } catch (error) {
//       console.error("Erreur réseau :", error);
//     }
//   };

//   if (loading) return <p className="text-center text-white p-10 font-mono animate-pulse">Chargement du Playbook SOC...</p>;

//   return (
//     <main className="min-h-screen bg-[#0f172a] text-white p-6 lg:p-10">
//       {/* Container Principal en Grille pour le Playbook à droite */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* COLONNE GAUCHE : FORMULAIRE (Prend 2 colonnes sur 3 sur grand écran) */}
//         <div className="lg:col-span-2">
//           <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl">
//             <h1 className="text-2xl font-bold mb-2 text-blue-400">📝 Incident #{id}</h1>
//             <p className="text-slate-500 text-sm mb-8 italic">Mode investigation et remédiation</p>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Statut Actuel</label>
//                   <select 
//                     className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-all"
//                     value={formData.etat}
//                     onChange={(e) => setFormData({...formData, etat: e.target.value})}
//                   >
//                     <option value="Nouveau">Nouveau</option>
//                     <option value="En cours">En cours</option>
//                     <option value="Résolu">Résolu ✅</option>
//                     <option value="Fermé">Fermé 🔒</option>
//                   </select>
//                 </div>

//                 <div>
//   <label className="block text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-2">
//     Analyste assigné 
//     {!isAdmin && <span className="text-amber-500 text-[10px] normal-case font-normal">(🔒 Réservé aux Admins)</span>}
//   </label>
  
//   <select 
//     // On désactive si l'utilisateur n'est pas Admin
//     disabled={!isAdmin} 
//     className={`w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none transition-all ${
//       !isAdmin 
//         ? "opacity-60 cursor-not-allowed border-slate-700 text-slate-500" 
//         : "focus:border-blue-500 border-slate-600"
//     }`}
//     value={formData.analysteId}
//     onChange={(e) => setFormData({...formData, analysteId: e.target.value})}
//   >
//     <option value="">-- Non assigné --</option>
//     {analystes.map(a => (
//       <option key={a.id} value={a.id}>{a.nom} {a.prenom} ({a.role})</option>
//     ))}
//   </select>
// </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Journal d'investigation</label>
//                 <textarea 
//                   rows={6} 
//                   placeholder="Décrivez les actions menées..."
//                   className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-all"
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 />
//               </div>

//               {formData.dateResolution && (
//                 <div className="text-[11px] text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20 flex items-center gap-2">
//                   <span>✅ Résolution enregistrée le : {new Date(formData.dateResolution).toLocaleString()}</span>
//                 </div>
//               )}

//               <div className="flex gap-4 pt-4">
//                 <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-bold transition-all">
//                   Retour
//                 </button>
//                 <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/40 transition-all">
//                   Mettre à jour l'incident
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* COLONNE DROITE : LE PLAYBOOK (Prend 1 colonne) */}
//         <div className="lg:col-span-1">
//           {/* Remplace l'ancien appel par celui-ci */}
//           <Playbook 
//             type={formData.type || "Default"} 
//             initialSteps={formData.playbookStatus ? JSON.parse(formData.playbookStatus) : []}
//             onProgressChange={(steps) => setFormData({ ...formData, playbookStatus: JSON.stringify(steps) })}
//           />
          
//           <div className="mt-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
//              <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">Conseil SOC</h4>
//              <p className="text-[12px] text-slate-400 leading-relaxed">
//                Assurez-vous d'avoir complété toutes les étapes du playbook avant de passer le statut à <strong>Résolu</strong>. La conformité des logs est essentielle pour l'audit.
//              </p>
//           </div>
//         </div>

//       </div>
//     </main>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { incidentService } from "../../../services/incidentService";
import { Analyste, Incident } from "../../../types";
import Playbook from "@/components/Playbook";
import { 
  ArrowLeft, Save, ShieldAlert, History, 
  UserCog, CheckCircle2, AlertTriangle, Terminal 
} from "lucide-react";

// Import des composants shadcn/ui
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";

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
        analysteId: "", // On stocke l'ID en string pour le Select
        playbookStatus: "[]"
    });

    useEffect(() => {
        // 1. Récupération de l'utilisateur connecté (pour le rôle Admin)
        const userData = localStorage.getItem("user");
        if (userData) setCurrentUser(JSON.parse(userData));

        // 2. Chargement des données de l'incident et des analystes
        const fetchData = async () => {
            try {
                const [resIncident, analystesData] = await Promise.all([
                    fetch(`${API_BASE_URL}/incidents/${id}`),
                    incidentService.getAllAnalystes()
                ]);

                if (!resIncident.ok) throw new Error("Erreur de récupération");
                
                const incidentData = await resIncident.json();
                setAnalystes(analystesData);

                // Initialisation du formulaire
                setFormData({
                    ...incidentData,
                    // Conversion importante : l'ID doit être une string pour shadcn Select, 
                    // et on évite le null pour ne pas faire planter Radix
                    analysteId: incidentData.analysteId ? incidentData.analysteId.toString() : "none"
                });
            } catch (error) {
                console.error("SOC-FATAL-ERROR:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const isAdmin = currentUser?.role === "Admin";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Préparation du payload final pour l'API C#
        const payload = {
            ...formData,
            id: Number(id),
            // Logique de résolution automatique de la date
            dateResolution: (formData.etat === "Résolu" || formData.etat === "Fermé") 
                ? (formData.dateResolution || new Date().toISOString()) 
                : null,
            // Re-conversion du "none" ou du vide en null pour la base de données
            analysteId: (formData.analysteId === "none" || !formData.analysteId) 
                ? null 
                : Number(formData.analysteId),
        };

        try {
            const response = await incidentService.update(Number(id), payload);
            if (response.ok) {
                router.push("/incidents"); 
                router.refresh();
            } else {
                const errorText = await response.text();
                alert(`Erreur SOC-API: ${errorText}`);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-4">
            <Terminal className="text-blue-500 animate-pulse" size={40} />
            <p className="font-mono text-blue-500 text-xs tracking-[0.3em] uppercase">
                Accès au terminal de remédiation...
            </p>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- SECTION GAUCHE : FORMULAIRE --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <Button variant="ghost" onClick={() => router.back()} className="text-slate-500 hover:text-white hover:bg-slate-900">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Revenir au Dashboard
                        </Button>
                        <Badge variant="outline" className="font-mono border-slate-800 text-slate-500 px-4">
                            ID-SEC: {id}
                        </Badge>
                    </div>

                    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        {/* Décoration subtile */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <ShieldAlert size={120} />
                        </div>

                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20">
                                <History size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Édition de l'Incident</h1>
                                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Registre de sécurité CyberTrack</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* STATUT */}
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">État Opérationnel</Label>
                                    <Select 
                                        value={formData.etat} 
                                        onValueChange={(val) => setFormData({...formData, etat: val})}
                                    >
                                        <SelectTrigger className="bg-slate-900/50 border-slate-700 h-12 focus:ring-blue-500/50">
                                            <SelectValue placeholder="Sélectionner un état" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="Nouveau">Nouveau</SelectItem>
                                            <SelectItem value="En cours">En cours</SelectItem>
                                            <SelectItem value="Résolu">Résolu ✅</SelectItem>
                                            <SelectItem value="Fermé">Fermé 🔒</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* ASSIGNATION (ADMIN ONLY) */}
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center justify-between">
                                        Analyste en Charge 
                                        {!isAdmin && <span className="text-amber-500 lowercase font-normal italic flex items-center gap-1"><UserCog size={10}/> Accès restreint</span>}
                                    </Label>
                                    <Select 
                                        disabled={!isAdmin}
                                        value={formData.analysteId || "none"} 
                                        onValueChange={(val) => setFormData({...formData, analysteId: val === "none" ? "" : val})}
                                    >
                                        <SelectTrigger className={`bg-slate-900/50 border-slate-700 h-12 ${!isAdmin && 'opacity-40 cursor-not-allowed'}`}>
                                            <SelectValue placeholder="Assigner un agent" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="none">-- Aucun Analyste --</SelectItem>
                                            {analystes.map(a => (
                                                <SelectItem key={a.id} value={a.id.toString()}>
                                                    {a.prenom} {a.nom} <span className="text-[9px] opacity-40 ml-2">({a.role})</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* JOURNAL D'INVESTIGATION */}
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Journal des actions & Observations</Label>
                                <Textarea 
                                    className="min-h-[180px] bg-slate-900/30 border-slate-700 focus:border-blue-500/50 rounded-xl font-mono text-sm leading-relaxed"
                                    placeholder="Consignez ici les détails techniques de l'investigation..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>

                            {/* ALERT RÉSOLU */}
                            {formData.dateResolution && (
                                <Alert className="bg-emerald-500/5 border-emerald-500/20 text-emerald-500 animate-in fade-in slide-in-from-bottom-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Incident Clôturé</AlertTitle>
                                    <AlertDescription className="text-xs opacity-70">
                                        Entrée verrouillée le : {new Date(formData.dateResolution).toLocaleString()}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="pt-6 border-t border-slate-900">
                                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 group transition-all">
                                    <Save className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                                    Mettre à jour le registre
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- SECTION DROITE : PLAYBOOK --- */}
                <div className="space-y-6">
                    <Playbook 
                        type={formData.type || "Default"} 
                        initialSteps={formData.playbookStatus ? JSON.parse(formData.playbookStatus) : []}
                        onProgressChange={(steps) => setFormData({ ...formData, playbookStatus: JSON.stringify(steps) })}
                    />
                    
                    <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-2xl">
                        <div className="flex items-center gap-2 text-amber-500 mb-3">
                            <AlertTriangle size={18} />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Audit Trail</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-800 pl-4">
                            Toute modification effectuée sur ce ticket est tracée dans les logs du serveur. 
                            Vérifiez l'intégrité des données avant la clôture finale.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}

// Un petit composant Badge si tu ne l'as pas déjà via shadcn
function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>
      {children}
    </span>
  );
}