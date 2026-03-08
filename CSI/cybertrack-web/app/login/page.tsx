// "use client";
// import { useState } from "react";
// import { authService } from "@/services/authService";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await authService.login(email, password);
//       router.push("/"); // Redirige vers ton dashboard (Home)
//     } catch (err) {
//       setError("Identifiants invalides. Accès refusé.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#0f172a] relative overflow-hidden">
//       {/* Effet de lumière en arrière-plan */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>

//       <div className="relative z-10 w-full max-w-md p-1">
//         <div className="bg-[#1e293b] p-10 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          
//           {/* LOGO / TITRE */}
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-black text-white tracking-tighter italic">
//               CYBER<span className="text-blue-500">TRACK</span>
//             </h1>
//             <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mt-2 font-bold">
//               Terminal de Contrôle SOC
//             </p>
//           </div>

//           {error && (
//             <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm text-center animate-shake">
//               ⚠️ {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* EMAIL */}
//             <div>
//               <label className="block text-xs font-bold text-slate-500 mb-2 uppercase ml-1">Identifiant Email</label>
//               <input 
//                 type="email" 
//                 placeholder="nom@entreprise.com" 
//                 className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="block text-xs font-bold text-slate-500 mb-2 uppercase ml-1">Mot de passe</label>
//               <input 
//                 type="password" 
//                 placeholder="••••••••" 
//                 className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* BUTTON */}
//             <button 
//               type="submit" 
//               disabled={loading}
//               className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest transition-all shadow-lg ${
//                 loading 
//                 ? "bg-slate-700 cursor-not-allowed" 
//                 : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/40 active:scale-[0.98]"
//               }`}
//             >
//               {loading ? "Authentification..." : "Initialiser la session"}
//             </button>
//           </form>

//           {/* FOOTER */}
//           <p className="mt-8 text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">
//             Protocole de sécurité SSL 256-bit activé
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";

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
      router.push("/");
    } catch (err) {
      setError("Accès refusé. Vérifiez vos paramètres d'authentification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#020617] p-4 overflow-hidden">
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Card className="relative z-10 w-full max-w-md border-slate-800 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tighter text-white italic">
            CYBER<span className="text-blue-500 font-black">TRACK</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold">
            Terminal de Contrôle SOC
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs flex items-center gap-2 animate-in fade-in zoom-in duration-300">
              <span className="shrink-0 font-bold">ERR_AUTH:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-400 text-[10px] uppercase font-bold ml-1">Identifiant réseau</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cybertrack.io"
                  className="pl-10 bg-slate-900/50 border-slate-800 text-slate-200 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 h-12 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" translate="no" className="text-slate-400 text-[10px] uppercase font-bold ml-1">Clé d'accès</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-blue-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-slate-900/50 border-slate-800 text-slate-200 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 h-12 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initialisation...
                </>
              ) : (
                "Établir la liaison"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          <p className="text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">
            Niveau d'accréditation requis : <span className="text-blue-900">Tier 3</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}