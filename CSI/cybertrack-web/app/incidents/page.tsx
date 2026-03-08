// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { incidentService } from "../../services/incidentService";
// import { Incident } from "../../types";
// import IncidentCard from "../../components/IncidentCard";

// export default function Home() {
//   const [incidents, setIncidents] = useState<Incident[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // État pour le rôle

//   const loadIncidents = async () => {
//     try {
//       setLoading(true);
//       const data = await incidentService.getAll();
//       setIncidents(data);
//     } catch (error) {
//       console.error("Erreur de chargement:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadIncidents();
    
//     // Vérification du rôle au chargement
//     const userString = localStorage.getItem("user");
//     if (userString) {
//       const user = JSON.parse(userString);
//       setIsAdmin(user.role === "Admin");
//     }
//   }, []);

//   const handleDelete = async (id: number) => {
//     // Double sécurité : on vérifie le rôle avant de lancer la fonction
//     if (!isAdmin) {
//       alert("Action refusée : Seul un administrateur peut supprimer un incident.");
//       return;
//     }

//     if (confirm("Voulez-vous vraiment supprimer cet incident ?")) {
//       await incidentService.delete(id);
//       loadIncidents();
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-extrabold text-white tracking-tight">
//             CYBER<span className="text-blue-500">TRACK</span>
//           </h1>
//           <Link href="/nouveau">
//             <span className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold cursor-pointer transition-all">
//               + Déclarer un Incident
//             </span>
//           </Link>
//         </div>

//         {/* LÉGENDE */}
//         <div className="flex gap-6 mb-10 text-[10px] font-bold uppercase">
//             <div className="flex items-center gap-2 text-slate-500">
//                 <span className="w-2 h-2 rounded-full bg-slate-600"></span> 
//                 Saisie Manuelle
//             </div>
//             <div className="flex items-center gap-2 text-blue-400">
//                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> 
//                 Flux Web Service (API)
//             </div>
//         </div>

//         {/* GRILLE */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {incidents.map((inc) => {
//             const isApi = inc.sourceDetection?.startsWith("API");

//             return (
//               <div key={inc.id} className="relative group">
                
//                 {isApi && (
//                   <div className="absolute -top-3 -right-2 z-20">
//                     <div className="bg-blue-600 text-white text-[9px] px-2 py-1 rounded shadow-xl border border-blue-400 flex items-center gap-1 font-black">
//                       <span className="relative flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//                       </span>
//                       {inc.sourceDetection}
//                     </div>
//                   </div>
//                 )}

//                 <div className={isApi ? "border-t-2 border-blue-500 rounded-xl" : ""}>
//                   <IncidentCard 
//                     incident={inc} 
//                     // Si l'utilisateur n'est pas Admin, on peut passer null ou masquer le bouton dans le composant
//                     onDelete={isAdmin ? handleDelete : undefined} 
//                     onEdit={(incident) => console.log("Editer", incident)} 
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {incidents.length === 0 && !loading && (
//           <p className="text-center py-20 text-slate-500 italic">Aucun incident dans la base.</p>
//         )}
//       </div>
//     </main>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { incidentService } from "../../services/incidentService";
import { Incident } from "../../types";
import IncidentCard from "../../components/IncidentCard";
import { Plus, ShieldCheck, Zap, Activity, AlertCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const data = await incidentService.getAll();
      setIncidents(data);
    } catch (error) {
      console.error("Erreur SOC-CORE-01:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setIsAdmin(user.role === "Admin");
    }
  }, []);

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;

    if (confirm("Confirmer la suppression définitive de l'entrée #" + id + " ?")) {
      await incidentService.delete(id);
      loadIncidents();
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 relative overflow-hidden">
      {/* Background Decor: Scanner Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/20 animate-[scan_4s_linear_infinite] shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter italic flex items-center gap-3">
              <ShieldCheck className="text-blue-500 w-10 h-10" strokeWidth={2.5} />
              CYBER<span className="text-blue-500 not-italic">TRACK</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 tracking-widest uppercase">
              <Activity size={12} className="text-emerald-500" />
              Système de Surveillance Actif // Node: Casablanca-Main
            </div>
          </div>

          <Link href="/nouveau">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 group">
              <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" /> 
              Déclarer un Incident
            </Button>
          </Link>
        </header>

        {/* DASHBOARD STATS & LEGEND */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 p-4 bg-slate-900/30 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 group cursor-help">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-slate-400 transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300">Saisie Manuelle</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Flux Web Service</span>
            </div>
          </div>

          <div className="flex gap-4">
             <Badge variant="outline" className="bg-slate-950 border-slate-800 text-slate-400 font-mono text-[10px]">
                {incidents.length} INCIDENTS RÉPERTORIÉS
             </Badge>
             {isAdmin && (
               <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-500 font-mono text-[10px]">
                 MODE ADMINISTRATEUR
               </Badge>
             )}
          </div>
        </div>

        <Separator className="mb-10 bg-slate-800/50" />

        {/* MAIN CONTENT: INCIDENTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[250px] w-full bg-slate-900/50 rounded-2xl border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {incidents.map((inc) => {
              const isApi = inc.sourceDetection?.startsWith("API");

              return (
                <div key={inc.id} className="relative group perspective-1000">
                  {/* Floating API Badge */}
                  {isApi && (
                    <div className="absolute -top-3 -right-2 z-20">
                      <div className="bg-blue-600 text-white text-[9px] px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400 flex items-center gap-2 font-black italic tracking-tighter">
                        <Zap size={10} fill="white" />
                        {inc.sourceDetection}
                      </div>
                    </div>
                  )}

                  {/* Wrapper with conditional API glow */}
                  <div className={`transition-all duration-300 rounded-2xl ${
                    isApi 
                    ? "border-t-4 border-blue-600 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.3)]" 
                    : "hover:border-slate-600 border border-transparent"
                  }`}>
                    <IncidentCard 
                      incident={inc} 
                      onDelete={isAdmin ? handleDelete : undefined} 
                      onEdit={(incident) => console.log("Editer", incident)} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && incidents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-600 space-y-4">
             <div className="p-6 bg-slate-900/50 rounded-full border border-slate-800">
                <Database size={48} strokeWidth={1} className="opacity-20" />
             </div>
             <p className="text-sm font-mono uppercase tracking-[0.3em] italic">Base de données vierge. Aucun incident détecté.</p>
          </div>
        )}
      </div>

      {/* Global CSS for the scan animation */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
}