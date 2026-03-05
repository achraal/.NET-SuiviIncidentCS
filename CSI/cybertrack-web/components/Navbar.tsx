// "use client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [user, setUser] = useState<{ role: string } | null>(null);

//   useEffect(() => {
//     // On récupère l'utilisateur stocké dans le authService
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [pathname]); // Se reconnecte à chaque changement de page pour vérifier l'état

//   // Si on est sur la page login, on peut cacher la navbar ou afficher un design minimal
//   if (pathname === "/login") return null;

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     router.push("/login");
//   };

//   return (
//     <nav className="bg-[#0f172a] border-b border-slate-800 p-4 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold text-white tracking-tighter">
//           CYBER<span className="text-blue-500">TRACK</span>
//         </Link>
        
//         <div className="flex gap-6 items-center">
//           <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
//             Accueil
//           </Link>
          
//           <Link href="/incidents" className={`text-sm font-semibold transition-colors ${pathname === '/incidents' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
//             Gestion des Incidents
//           </Link>

//           <Link href="/stats" className={`text-sm font-semibold ${pathname === '/stats' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
//             Statistiques
//           </Link>

//           {user && (
//             <Link href="/profil" className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600 hover:border-white transition-all group">
//               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
//               <span className="text-white text-sm font-semibold group-hover:text-blue-200">
//                 {user.prenom} {user.nom}
//               </span>
//             </Link>
//           )}

//           {/* AFFICHAGE CONDITIONNEL : Uniquement si ADMIN */}
//           {user?.role === "Admin" && (
//             <Link href="/dashboard" className={`text-sm font-semibold transition-colors ${pathname.startsWith('/dashboard') ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
//               Gestion des Analystes
//             </Link>
//           )}

//           {user && (
//             <button onClick={handleLogout} className="text-sm bg-red-900/30 text-red-400 px-3 py-1 rounded border border-red-800 hover:bg-red-800 hover:text-white transition">
//               Déconnexion
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ role: string; prenom: string; nom: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]);

  if (pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/login");
  };

  return (
    // bg-transparent car le body a déjà la couleur #0f172a
    // On garde un léger border-b très subtil pour la structure
    <nav className="bg-transparent border-b border-slate-800/50 sticky top-0 z-50 w-full">
      <div className="w-full px-10 h-20 flex items-center justify-between relative">
        
        {/* GAUCHE : Logo (Taille agrandie à text-2xl) */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-3">
            <Shield className="w-7 h-7 text-blue-500" />
            <span>CYBER<span className="text-blue-500">TRACK</span></span>
          </Link>
        </div>

        {/* CENTRE : Liens (Taille agrandie à text-base ou text-lg) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-10">
          <Link 
            href="/" 
            className={cn(
              "text-base font-medium tracking-wide transition-all duration-200",
              pathname === '/' ? 'text-blue-400' : 'text-white hover:text-sky-300 hover:scale-105'
            )}
          >
            Accueil
          </Link>
          
          <Link 
            href="/incidents" 
            className={cn(
              "text-base font-medium tracking-wide transition-all duration-200",
              pathname === '/incidents' ? 'text-blue-400' : 'text-white hover:text-sky-300 hover:scale-105'
            )}
          >
            Gestion des Incidents
          </Link>

          <Link 
            href="/stats" 
            className={cn(
              "text-base font-medium tracking-wide transition-all duration-200",
              pathname === '/stats' ? 'text-blue-400' : 'text-white hover:text-sky-300 hover:scale-105'
            )}
          >
            Statistiques
          </Link>

          {user?.role === "Admin" && (
            <Link 
              href="/dashboard" 
              className={cn(
                "text-base font-medium tracking-wide transition-all duration-200",
                pathname.startsWith('/dashboard') ? 'text-blue-400' : 'text-white hover:text-sky-300 hover:scale-105'
              )}
            >
              Gestion des Analystes
            </Link>
          )}
        </div>

        {/* DROITE : Profil et Déconnexion */}
        <div className="flex items-center gap-8">
          {user && (
            <>
              <Link 
                href="/profil" 
                className="flex items-center gap-3 bg-slate-800/30 px-5 py-2.5 rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all group"
              >
                <div className="relative flex h-2.5 w-2.5">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></div>
                </div>
                <span className="text-white text-base font-semibold group-hover:text-blue-200">
                  {user.prenom} {user.nom}
                </span>
              </Link>

              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-base bg-red-900/10 text-red-400 px-5 py-2.5 rounded-xl border border-red-900/30 hover:bg-red-900 hover:text-white transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}