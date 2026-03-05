"use client";
import { useEffect, useState } from "react";
import { Shield, Mail, Phone, User as UserIcon, LogOut, CheckCircle } from "lucide-react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Récupération de l'objet analyste stocké lors du login
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-white font-mono animate-pulse">Accès refusé. Authentification requise...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 lg:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Fil d'ariane / Titre */}
        <div className="flex items-center gap-2 text-blue-500 mb-8">
          <Shield size={20} />
          <h1 className="text-2xl font-bold tracking-tight text-white">Espace Personnel Analyste</h1>
        </div>

        <div className="bg-[#1e293b] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header Profil avec dégradé */}
          <div className="bg-gradient-to-br from-blue-600/20 via-slate-800/50 to-transparent p-10 border-b border-slate-700">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg rotate-3">
                {user.prenom[0]}{user.nom[0]}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-white">{user.prenom} {user.nom}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                    user.role === 'Admin' 
                      ? 'border-red-500/50 text-red-500 bg-red-500/10' 
                      : 'border-blue-500/50 text-blue-400 bg-blue-500/10'
                  }`}>
                    {user.role} SOC
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <CheckCircle size={12} className="text-green-500" /> Compte Vérifié
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Informations de Contact */}
          <div className="p-10 space-y-8">
            <div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Coordonnées Professionnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Email - Remplace l'ID système */}
                <div className="group bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Email</p>
                      <p className="text-sm text-slate-200 font-mono">{user.email || user.Email || "Email non trouvé"}</p>
                    </div>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="group bg-[#0f172a] p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Téléphone</p>
                      <p className="text-sm text-slate-200 font-mono">{user.phone || "Non renseigné"}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Statut opérationnel */}
            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl flex items-start gap-4">
              <div className={`mt-1 w-3 h-3 rounded-full ${user.disponibilite ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
              <div>
                <h4 className="text-sm font-bold text-slate-200 italic">Disponibilité Opérationnelle</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Votre statut actuel est : <strong>{user.disponibilite ? "Actif (Prêt pour intervention)" : "Inactif"}</strong>. 
                  En cas de changement d'astreinte, veuillez contacter votre superviseur.
                </p>
              </div>
            </div>

            {/* Bouton déconnexion */}
            <div className="pt-4">
              <button 
                onClick={handleLogout}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-300 py-3 px-8 rounded-xl font-bold transition-all border border-slate-700"
              >
                <LogOut size={18} />
                Déconnexion de la session
              </button>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-slate-600 text-[10px] uppercase tracking-tighter">
          Système de gestion d'incidents CSI © 2026 - Session sécurisée par jeton JWT
        </p>
      </div>
    </main>
  );
}