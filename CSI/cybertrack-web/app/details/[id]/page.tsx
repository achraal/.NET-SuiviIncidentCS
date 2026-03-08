// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { incidentService } from "../../../services/incidentService";
// import { Incident } from "../../../types";
// import Link from "next/link";

// export default function DetailsIncident() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [incident, setIncident] = useState<Incident | null>(null);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/incidents/${id}`)
//       .then((res) => res.json())
//       .then((data) => setIncident(data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!incident) return <p className="p-10 text-white text-center">Chargement des données sécurisées...</p>;

//   return (
//     <main className="min-h-screen bg-[#0f172a] text-slate-200 p-10">
//       <div className="max-w-4xl mx-auto">
//         <button onClick={() => router.back()} className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
//           ← Retour au Dashboard
//         </button>

//         <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
//           {/* Header du détail */}
//           <div className="bg-slate-800/50 p-8 border-b border-slate-700 flex justify-between items-center">
//             <div>
//               <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">Ticket #{incident.id}</span>
//               <h1 className="text-3xl font-bold text-white mt-1">{incident.type}</h1>
//             </div>
//             <div className={`px-4 py-2 rounded-full font-bold text-sm ${
//               incident.severite === 'Critique' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
//             }`}>
//               {incident.severite}
//             </div>
//           </div>

//           {/* Grille d'infos */}
//           <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-6">
//               <section>
//                 <h3 className="text-slate-500 text-xs font-bold uppercase mb-2">Description</h3>
//                 <p className="text-slate-300 leading-relaxed bg-[#0f172a]/50 p-4 rounded-lg border border-slate-800">
//                   {incident.description}
//                 </p>
//               </section>

//               <section className="grid grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">État actuel</h3>
//                   <p className="text-white font-medium flex items-center gap-2">
//                     <span className={`w-2 h-2 rounded-full ${incident.etat === 'Résolu' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
//                     {incident.etat}
//                   </p>
//                 </div>
//                 <div>
//                   <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Source</h3>
//                   <p className="text-white font-medium">{incident.sourceDetection || "Non spécifiée"}</p>
//                 </div>
//               </section>
//             </div>

//             <div className="space-y-6 bg-[#0f172a]/30 p-6 rounded-xl border border-slate-800">
//               <section>
//                 <h3 className="text-slate-500 text-xs font-bold uppercase mb-1 text-blue-400">Analyste Responsable</h3>
//                 <p className="text-lg text-white">
//                   {incident.analysteEnCharge ? `${incident.analysteEnCharge.prenom} ${incident.analysteEnCharge.nom}` : "⚠️ Non assigné"}
//                 </p>
//               </section>

//               <section className="space-y-4 pt-4 border-t border-slate-800">
//                 <div>
//                   <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Détecté le</h3>
//                   <p className="text-sm text-slate-300">{new Date(incident.dateDeclaration).toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-slate-500 text-xs font-bold uppercase mb-1">Résolu le</h3>
//                   <p className="text-sm text-slate-300">
//                     {incident.dateResolution ? new Date(incident.dateResolution).toLocaleString() : "En cours de traitement..."}
//                   </p>
//                 </div>
//               </section>
//             </div>
//           </div>

//           {/* Footer avec bouton modifier */}
//           <div className="bg-slate-800/30 p-6 border-t border-slate-700 flex justify-end">
//              <Link href={`/modifier/${incident.id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20">
//                   Modifier les informations
//                 </button>
//              </Link>
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
import { Incident } from "../../../types";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, ShieldAlert, User, 
  Clock, Hash, Edit3, Terminal, Fingerprint 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DetailsIncident() {
  const { id } = useParams();
  const router = useRouter();
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    // Utilisation de ton service pour la cohérence
    incidentService.getById(Number(id))
      .then(setIncident)
      .catch((err) => console.error("Erreur de récupération CyberTrack:", err));
  }, [id]);

  if (!incident) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-blue-500 animate-pulse">
      RÉCUPÉRATION DES DONNÉES CHIFFRÉES...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-8 text-slate-500 hover:text-blue-400 group transition-all p-0"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1" /> 
          Retour au centre d'opérations
        </Button>

        <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header Section: Status & Title */}
          <CardHeader className="bg-slate-900/40 p-8 border-b border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono text-blue-500 border-blue-500/30 bg-blue-500/5 px-3">
                    <Hash size={12} className="mr-1" /> TICKET-{incident.id}
                  </Badge>
                  <Badge className={`${
                    incident.severite === 'Critique' 
                    ? 'bg-red-600 hover:bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                    : 'bg-blue-600'
                  } text-white border-none`}>
                    <ShieldAlert size={12} className="mr-1" /> {incident.severite}
                  </Badge>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight uppercase italic italic">
                  {incident.type}
                </h1>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Current Status</span>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${
                  incident.etat === 'Résolu' 
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500' 
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-500 animate-pulse'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${incident.etat === 'Résolu' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-xs font-black uppercase tracking-widest">{incident.etat}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Main Content Grid */}
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              
              {/* Left Column: Description & Metadata */}
              <div className="lg:col-span-2 p-8 space-y-8 border-r border-slate-800">
                <section>
                  <div className="flex items-center gap-2 text-slate-500 mb-4">
                    <Terminal size={16} />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">Rapport d'incident</h3>
                  </div>
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 relative group">
                    <div className="absolute top-4 right-4 text-slate-700 group-hover:text-blue-500/30 transition-colors">
                        <Fingerprint size={40} strokeWidth={1} />
                    </div>
                    <p className="text-slate-300 leading-relaxed font-serif italic text-lg">
                      "{incident.description}"
                    </p>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Vecteur de détection</span>
                        <p className="text-white font-mono flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                           {incident.sourceDetection || "ORIGINE INCONNUE"}
                        </p>
                    </div>
                    <div className="space-y-1 text-right">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Horodatage Système</span>
                        <p className="text-slate-300 font-mono text-xs">
                           {new Date(incident.dateDeclaration).toLocaleString()}
                        </p>
                    </div>
                </div>
              </div>

              {/* Right Column: Assigned Staff & Timeline */}
              <div className="bg-slate-900/20 p-8 space-y-8">
                <section>
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <User size={16} />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">Analyste Assigné</h3>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    {incident.analysteEnCharge ? (
                      <div className="space-y-1">
                        <p className="text-xl font-bold text-white tracking-tighter italic">
                          {incident.analysteEnCharge.prenom} {incident.analysteEnCharge.nom}
                        </p>
                        <p className="text-[9px] text-blue-500 font-mono uppercase tracking-widest">
                          Grade: {incident.analysteEnCharge.role || "Analyste SOC"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-amber-500 text-sm font-bold flex items-center gap-2">
                        ⚠️ ALERTE : AUCUN AGENT ASSIGNÉ
                      </p>
                    )}
                  </div>
                </section>

                <Separator className="bg-slate-800" />

                <section className="space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-slate-800 text-slate-400">
                         <Calendar size={14} />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase">Détection</h4>
                         <p className="text-xs text-slate-300">{new Date(incident.dateDeclaration).toLocaleDateString()}</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-lg ${incident.dateResolution ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'}`}>
                         <Clock size={14} />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase">Clôture</h4>
                         <p className="text-xs text-slate-300">
                           {incident.dateResolution ? new Date(incident.dateResolution).toLocaleString() : "Investigation en cours..."}
                         </p>
                      </div>
                   </div>
                </section>
              </div>
            </div>
          </CardContent>

          {/* Action Footer */}
          <div className="bg-slate-900/60 p-6 border-t border-slate-800 flex justify-between items-center">
              <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest hidden md:block">
                CyberTrack-Log-Internal // {id}-SEC
              </p>
              <Link href={`/modifier/${incident.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest px-10 h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Modifier l'investigation
                </Button>
              </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}