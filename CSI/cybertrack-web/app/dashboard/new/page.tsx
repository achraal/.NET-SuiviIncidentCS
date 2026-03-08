// "use client";
// import { useState } from "react";
// import { analysteService } from "@/services/analysteService";
// import { useRouter } from "next/navigation";
// import { ArrowLeft, Save, Phone, Shield, User, CheckCircle } from "lucide-react";

// export default function NewAnalystePage() {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         nom: "",
//         prenom: "",
//         email: "",
//         password: "",
//         role: "", // Champ texte vide par défaut
//         phone: "",
//         disponibilite: true // Par défaut à true
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({ 
//             ...formData, 
//             [name]: type === "checkbox" ? checked : value 
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try {
//             await analysteService.create(formData);
//             router.push("/dashboard"); 
//         } catch (err: any) {
//             setError("Erreur : Vérifiez les informations (l'email doit être unique).");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white p-8">
//             <div className="max-w-2xl mx-auto">
//                 <button 
//                     onClick={() => router.back()} 
//                     className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
//                 >
//                     <ArrowLeft size={18} /> Retour au Dashboard
//                 </button>

//                 <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
//                     <h1 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
//                         <User /> Créer un nouvel Analyste
//                     </h1>
                    
//                     {error && <p className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-6">{error}</p>}

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-1">Nom</label>
//                                 <input name="nom" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-1">Prénom</label>
//                                 <input name="prenom" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Email Professionnel</label>
//                             <input name="email" type="email" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Mot de passe temporaire</label>
//                             <input name="password" type="password" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
//                                     <Phone size={14} /> Téléphone
//                                 </label>
//                                 <input name="phone" required onChange={handleChange} placeholder="06..." className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
//                                     <Shield size={14} /> Rôle (Saisir manuellement)
//                                 </label>
//                                 <input name="role" required onChange={handleChange} placeholder="ex: Analyste SOC L3" className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
//                             </div>
//                         </div>

//                         {/* Champ Disponibilité */}
//                         <div className="flex items-center gap-3 bg-gray-700/50 p-3 rounded border border-gray-600 w-fit">
//                             <label className="text-sm text-gray-300 flex items-center gap-2 cursor-pointer">
//                                 <input 
//                                     type="checkbox" 
//                                     name="disponibilite" 
//                                     checked={formData.disponibilite} 
//                                     onChange={handleChange}
//                                     className="w-4 h-4 accent-blue-500"
//                                 />
//                                 Analyste disponible immédiatement ?
//                             </label>
//                         </div>

//                         <button 
//                             type="submit" 
//                             disabled={loading}
//                             className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-6 transition flex items-center justify-center gap-2 shadow-lg"
//                         >
//                             {loading ? "Création..." : <><Save size={18} /> Enregistrer l'Analyste</>}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import { useState } from "react";
import { analysteService } from "@/services/analysteService";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Save, Phone, Shield, User, 
  CheckCircle, Mail, Lock, UserPlus, AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NewAnalystePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        disponibilite: true 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData({ ...formData, disponibilite: checked });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await analysteService.create(formData);
            router.push("/dashboard"); 
        } catch (err: any) {
            setError("L'enrôlement a échoué. Vérifiez que l'identifiant email n'est pas déjà utilisé.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 relative selection:bg-blue-500/30">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 group transition-all"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1" /> 
                    Retour au terminal
                </Button>

                <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <CardHeader className="border-b border-slate-800 bg-slate-900/30 p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20 text-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                <UserPlus size={28} />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tight text-white">
                                    Enrôlement <span className="text-blue-600 text-blue-600">Analyste</span>
                                </CardTitle>
                                <CardDescription className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                                    New Entry Protocol // Security Operations Center
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8">
                        {error && (
                            <Alert variant="destructive" className="mb-8 bg-red-950/20 border-red-500/50 text-red-400">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Erreur d'authentification</AlertTitle>
                                <AlertDescription className="text-xs opacity-80">{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Identité */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nom" className="text-[10px] font-bold uppercase text-slate-500 ml-1">Nom de famille</Label>
                                    <Input 
                                        id="nom" name="nom" required onChange={handleChange}
                                        placeholder="Ex: Ait Lahcen"
                                        className="bg-slate-900/50 border-slate-800 focus:border-blue-500/50 transition-all" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="prenom" className="text-[10px] font-bold uppercase text-slate-500 ml-1">Prénom</Label>
                                    <Input 
                                        id="prenom" name="prenom" required onChange={handleChange}
                                        placeholder="Ex: Achraf"
                                        className="bg-slate-900/50 border-slate-800 focus:border-blue-500/50 transition-all" 
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase text-slate-500 ml-1">Identifiant SOC (Email)</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={16} className="text-slate-600" />
                                    </div>
                                    <Input 
                                        id="email" name="email" type="email" required onChange={handleChange}
                                        placeholder="analyste@cybertrack.com"
                                        className="pl-10 bg-slate-900/50 border-slate-800 focus:border-blue-500" 
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[10px] font-bold uppercase text-slate-500 ml-1">Mot de passe temporaire</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={16} className="text-slate-600" />
                                    </div>
                                    <Input 
                                        id="password" name="password" type="password" required onChange={handleChange}
                                        placeholder="••••••••"
                                        className="pl-10 bg-slate-900/50 border-slate-800 focus:border-blue-500" 
                                    />
                                </div>
                            </div>

                            {/* Contact & Rôle */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-slate-500 ml-1 flex items-center gap-1">
                                        <Phone size={12} /> Ligne Sécurisée
                                    </Label>
                                    <Input 
                                        name="phone" required onChange={handleChange} placeholder="06XXXXXXXX"
                                        className="bg-slate-900/50 border-slate-800 focus:border-blue-500 font-mono" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-slate-500 ml-1 flex items-center gap-1">
                                        <Shield size={12} /> Grade / Rôle
                                    </Label>
                                    <Input 
                                        name="role" required onChange={handleChange} placeholder="Analyste L3"
                                        className="bg-slate-900/50 border-slate-800 focus:border-blue-500" 
                                    />
                                </div>
                            </div>

                            {/* Toggle Disponibilité */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 group transition-all hover:bg-slate-900">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${formData.disponibilite ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                                        <CheckCircle size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-200">Statut Opérationnel</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                                            {formData.disponibilite ? 'Disponible Immédiatement' : 'Indisponible par défaut'}
                                        </p>
                                    </div>
                                </div>
                                <Switch 
                                    checked={formData.disponibilite} 
                                    onCheckedChange={handleSwitchChange}
                                    className="data-[state=checked]:bg-emerald-600"
                                />
                            </div>

                            <Button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Initialisation...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Save size={18} /> Enregistrer l'Agent
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.4em]">
                    CyberTrack Security Interface // SOC Recruitment Layer
                </p>
            </div>
        </div>
    );
}