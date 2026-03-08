//import Image from "next/image";

//export default function Home() {
//  return (
//    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//        <Image
//          className="dark:invert"
//          src="/next.svg"
//          alt="Next.js logo"
//          width={100}
//          height={20}
//          priority
//        />
//        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//            To get started, edit the page.tsx file.
//          </h1>
//          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//            Looking for a starting point or more instructions? Head over to{" "}
//            <a
//              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//              className="font-medium text-zinc-950 dark:text-zinc-50"
//            >
//              Templates
//            </a>{" "}
//            or the{" "}
//            <a
//              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//              className="font-medium text-zinc-950 dark:text-zinc-50"
//            >
//              Learning
//            </a>{" "}
//            center.
//          </p>
//        </div>
//        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//          <a
//            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            <Image
//              className="dark:invert"
//              src="/vercel.svg"
//              alt="Vercel logomark"
//              width={16}
//              height={16}
//            />
//            Deploy Now
//          </a>
//          <a
//            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            Documentation
//          </a>
//        </div>
//      </main>
//    </div>
//  );
//}

// "use client";
// import { useEffect, useState } from "react";
// import { incidentService } from "../services/incidentService";
// import { Incident } from "../types";

// export default function Home() {
//     const [incidents, setIncidents] = useState<Incident[]>([]);

//     const loadIncidents = async () => {
//         const data = await incidentService.getAll();
//         setIncidents(data);
//     };

//     useEffect(() => { loadIncidents(); }, []);

//     const handleDelete = async (id: number) => {
//         if (confirm("Confirmer la suppression de cet incident ?")) {
//             await incidentService.delete(id);
//             loadIncidents(); // Rafraîchir la liste
//         }
//     };

//     return (
//         <main className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header avec Bouton Ajouter */}
//                 <div className="flex justify-between items-center mb-10">
//                     <h1 className="text-3xl font-extrabold text-white tracking-tight">
//                         CYBER<span className="text-blue-500">TRACK</span> <span className="text-sm font-light text-slate-400 block">Incident Monitoring</span>
//                     </h1>
//                     <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20">
//                         + Déclarer un Incident
//                     </button>
//                 </div>

//                 {/* Grille d'incidents */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {incidents.map((inc) => (
//                         <div key={inc.id} className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all group shadow-xl">
//                             <div className="flex justify-between items-start mb-4">
//                                 <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold ${inc.severite === 'Critique' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
//                                     }`}>
//                                     {inc.severite}
//                                 </span>
//                                 <span className="text-slate-500 text-xs italic">#{inc.id}</span>
//                             </div>

//                             <h2 className="text-xl font-bold text-white mb-2">{inc.type}</h2>
//                             <p className="text-slate-400 text-sm mb-6 line-clamp-3">{inc.description}</p>

//                             <div className="flex items-center gap-2 mb-6">
//                                 <div className={`w-2 h-2 rounded-full ${inc.etat === 'Résolu' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
//                                 <span className="text-xs font-medium text-slate-300">{inc.etat}</span>
//                             </div>

//                             {/* Boutons d'action */}
//                             <div className="flex gap-3 pt-4 border-t border-slate-700">
//                                 <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-sm font-semibold transition-colors">
//                                     Modifier
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(inc.id)}
//                                     className="px-4 bg-red-900/20 hover:bg-red-900/40 text-red-500 py-2 rounded text-sm font-semibold border border-red-500/20 transition-colors"
//                                 >
//                                     Supprimer
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {incidents.length === 0 && (
//                     <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
//                         <p className="text-slate-500">Aucune menace détectée. Le système est sécurisé.</p>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// }
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#0f172a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium animate-pulse">Chargement de CyberTrack...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full relative bg-[#0f172a] overflow-x-hidden">
      
      {/* COLONNE GAUCHE : Image agrandie et décalée du bord gauche */}
      <div className="hidden lg:flex lg:w-[40%] h-[calc(100vh-80px)] sticky top-20 items-center justify-center bg-[#0f172a] pl-16">
        {/* On a enlevé la restriction h-[70%] pour que l'image soit plus grande */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img 
            src="/images/AdobeExpress.png"
            alt="CyberTrack Security Overview"
            className="max-w-full max-h-[90%] object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* COLONNE DROITE : Contenu décalé de la droite et rapproché du centre */}
      <main className="flex-1 lg:-ml-px relative z-10 flex flex-col items-center justify-center p-8 bg-[#0f172a]">
        
        {/* mr-20 : décale tout le bloc du bord droit de l'écran 
            lg:ml-[-2rem] : rapproche un peu le texte vers l'image */}
        <div className="max-w-xl text-center lg:mr-24">
          
          <div className="inline-block px-3 py-1 mb-8 text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
            Plateforme de Cybersécurité
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Protégez vos actifs <br />
            <span className="text-blue-500">en temps réel</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
            Bienvenue sur <span className="text-white font-semibold">CyberTrack</span>. 
            Détectez et résolvez les menaces cyber avant qu'elles n'atteignent vos données critiques.
          </p>
          
          <div className="flex justify-center mb-16">
            <Link href="/incidents">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-all active:scale-95">
                Gestion des Incidents
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-12 border-t border-slate-800/60 pt-10">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">99.9%</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-2">Disponibilité</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-blue-500">&lt; 1s</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-2">Temps de Réponse</p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}