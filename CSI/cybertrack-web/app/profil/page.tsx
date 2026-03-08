// "use client";
// import { useEffect, useState } from "react";
// import { Shield, Mail, Phone, User as UserIcon, LogOut, CheckCircle } from "lucide-react";

// export default function ProfilPage() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     // Récupération de l'objet analyste stocké lors du login
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
//         <p className="text-white font-mono animate-pulse">Accès refusé. Authentification requise...</p>
//       </div>
//     );
//   }

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 lg:p-10 font-sans">
//       <div className="max-w-3xl mx-auto">
        
//         {/* Fil d'ariane / Titre */}
//         <div className="flex items-center gap-2 text-blue-500 mb-8">
//           <Shield size={20} />
//           <h1 className="text-2xl font-bold tracking-tight text-white">Espace Personnel Analyste</h1>
//         </div>

//         <div className="bg-[#1e293b] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          
//           {/* Header Profil avec dégradé */}
//           <div className="bg-gradient-to-br from-blue-600/20 via-slate-800/50 to-transparent p-10 border-b border-slate-700">
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg rotate-3">
//                 {user.prenom[0]}{user.nom[0]}
//               </div>
//               <div className="text-center md:text-left">
//                 <h2 className="text-3xl font-extrabold text-white">{user.prenom} {user.nom}</h2>
//                 <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
//                   <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
//                     user.role === 'Admin' 
//                       ? 'border-red-500/50 text-red-500 bg-red-500/10' 
//                       : 'border-blue-500/50 text-blue-400 bg-blue-500/10'
//                   }`}>
//                     {user.role} SOC
//                   </span>
//                   <span className="flex items-center gap-1 text-xs text-slate-400">
//                     <CheckCircle size={12} className="text-green-500" /> Compte Vérifié
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Section Informations de Contact */}
//           <div className="p-10 space-y-8">
//             <div>
//               <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Coordonnées Professionnelles</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
//                 {/* Email - Remplace l'ID système */}
//                 <div className="group bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
//                       <Mail size={20} />
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-slate-500 font-bold uppercase">Email</p>
//                       <p className="text-sm text-slate-200 font-mono">{user.email || user.Email || "Email non trouvé"}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Téléphone */}
//                 <div className="group bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
//                       <Phone size={20} />
//                     </div>
//                     <div>
//                       <p className="text-[10px] text-slate-500 font-bold uppercase">Téléphone</p>
//                       <p className="text-sm text-slate-200 font-mono">{user.phone || "Non renseigné"}</p>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* Statut opérationnel */}
//             <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl flex items-start gap-4">
//               <div className={`mt-1 w-3 h-3 rounded-full ${user.disponibilite ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
//               <div>
//                 <h4 className="text-sm font-bold text-slate-200 italic">Disponibilité Opérationnelle</h4>
//                 <p className="text-xs text-slate-500 mt-1 leading-relaxed">
//                   Votre statut actuel est : <strong>{user.disponibilite ? "Actif (Prêt pour intervention)" : "Inactif"}</strong>. 
//                   En cas de changement d'astreinte, veuillez contacter votre superviseur.
//                 </p>
//               </div>
//             </div>

//             {/* Bouton déconnexion */}
//             <div className="pt-4">
//               <button 
//                 onClick={handleLogout}
//                 className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-300 py-3 px-8 rounded-xl font-bold transition-all border border-slate-700"
//               >
//                 <LogOut size={18} />
//                 Déconnexion de la session
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* Footer info */}
//         <p className="mt-8 text-center text-slate-600 text-[10px] uppercase tracking-tighter">
//           Système de gestion d'incidents CSI © 2026 - Session sécurisée par jeton JWT
//         </p>
//       </div>
//     </main>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, Mail, Phone, LogOut, CheckCircle, 
  Activity, Zap, ShieldAlert, Fingerprint 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
        <Fingerprint className="w-12 h-12 text-blue-500 animate-pulse" />
        <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
          Vérification des accréditations...
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-500">
              <Shield size={18} className="fill-blue-500/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Security Operations Center</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
              Profil <span className="text-blue-600 italic">Analyste</span>
            </h1>
          </div>
          <div className="text-[10px] font-mono text-slate-500 bg-slate-900/50 p-2 rounded border border-slate-800">
            ID_SESSION: {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Cover/Header with Pattern */}
          <div className="h-32 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 border-b border-slate-800 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <CardHeader className="relative pb-0">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20">
              <Avatar className="w-32 h-32 rounded-2xl border-4 border-slate-950 shadow-2xl">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-4xl font-black text-white rounded-xl">
                  {user.prenom?.[0]}{user.nom?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h2 className="text-4xl font-black text-white tracking-tight">
                    {user.prenom} {user.nom}
                  </h2>
                  <Badge variant="outline" className={`font-black uppercase tracking-widest ${
                    user.role === 'Admin' ? 'border-red-500 text-red-500 bg-red-500/5' : 'border-blue-500 text-blue-400 bg-blue-500/5'
                  }`}>
                    {user.role} SOC
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-emerald-500" /> Accréditation Active
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <span className="font-mono">Level_0{user.role === 'Admin' ? '4' : '2'}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Card: Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Mail className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Professionnel</p>
                  <p className="text-sm font-medium text-slate-200">{user.email || user.Email}</p>
                </div>
              </div>

              {/* Info Card: Phone */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Phone className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ligne Sécurisée</p>
                  <p className="text-sm font-medium text-slate-200">{user.phone || "+212 6-XX-XX-XX-XX"}</p>
                </div>
              </div>
            </div>

            {/* Operational Status */}
            <div className={`p-6 rounded-2xl border transition-all ${
              user.disponibilite 
                ? 'bg-emerald-500/5 border-emerald-500/20' 
                : 'bg-red-500/5 border-red-500/20'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${user.disponibilite ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                  <Activity size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-200">Statut Opérationnel</h4>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase">
                      <Zap size={10} className="fill-current" /> Temps Réel
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed italic">
                    {user.disponibilite 
                      ? "Liaison satellite active. Vous êtes actuellement en astreinte pour le CyberTrack SOC." 
                      : "Session en mode passif. En attente de réactivation."}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-800" />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldAlert size={14} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Zone de Haute Sécurité</span>
              </div>
              <Button 
                onClick={handleLogout}
                variant="destructive" 
                className="w-full md:w-auto px-10 bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Terminer la session
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <p className="text-center text-slate-600 text-[9px] uppercase tracking-[0.3em] font-medium">
          Protocole CyberTrack v2.0 // Chiffrement AES-256 // {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}