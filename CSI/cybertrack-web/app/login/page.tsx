"use client";
import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login(email, password);
      router.push("/"); // Redirige vers ton dashboard (Home)
    } catch (err) {
      setError("Identifiants invalides. Accès refusé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md p-1">
        <div className="bg-[#1e293b] p-10 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          
          {/* LOGO / TITRE */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white tracking-tighter italic">
              CYBER<span className="text-blue-500">TRACK</span>
            </h1>
            <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mt-2 font-bold">
              Terminal de Contrôle SOC
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm text-center animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase ml-1">Identifiant Email</label>
              <input 
                type="email" 
                placeholder="nom@entreprise.com" 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase ml-1">Mot de passe</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* BUTTON */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest transition-all shadow-lg ${
                loading 
                ? "bg-slate-700 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/40 active:scale-[0.98]"
              }`}
            >
              {loading ? "Authentification..." : "Initialiser la session"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-8 text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">
            Protocole de sécurité SSL 256-bit activé
          </p>
        </div>
      </div>
    </div>
  );
}