// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { analysteService } from "@/services/analysteService";
// import { ArrowLeft, Save } from "lucide-react";

// export default function EditAnalystePage() {
//     const { id } = useParams();
//     const router = useRouter();
//     //const [formData, setFormData] = useState<any>(null);
//     const [formData, setFormData] = useState<any>({
//     nom: "",
//     prenom: "",
//     email: "",
//     password: "", 
//     role: "",
//     phone: "",
//     disponibilite: true
// });
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         analysteService.getById(id as string).then(setFormData);
//     }, [id]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // 1. On prépare l'objet avec des MAJUSCULES pour correspondre au DTO C#
//     const payload = {
//         Nom: formData.nom,
//         Prenom: formData.prenom,
//         Email: formData.email,
//         Phone: formData.phone,
//         Role: formData.role,
//         Password: formData.password || "", // Envoie vide si pas de changement
//         Disponibilite: formData.disponibilite
//     };

//     try {
//         // 2. Envoi au serveur
//         await analysteService.update(id as string, payload);

//         // 3. MISE À JOUR DU LOCALSTORAGE (Si c'est l'utilisateur actuel)
//         const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        
//         // Si l'ID qu'on modifie est le même que celui connecté
//         if (storedUser.id === parseInt(id as string)) {
//             const updatedUser = { 
//                 ...storedUser, 
//                 nom: formData.nom, 
//                 prenom: formData.prenom, 
//                 email: formData.email,
//                 phone: formData.phone,
//                 role: formData.role,
//                 disponibilite: formData.disponibilite
//             };
//             localStorage.setItem("user", JSON.stringify(updatedUser));
//         }

//         //alert("Modification réussie !");
//         router.push("/dashboard");
//         router.refresh(); // Force Next.js à rafraîchir les composants (Navbar)
        
//     } catch (error) {
//         console.error(error);
//         alert("Erreur lors de la mise à jour");
//     } finally {
//         setLoading(false);
//     }
// };

//     if (!formData) return <div className="p-8 text-white">Chargement...</div>;

//     return (
//         <div className="min-h-screen bg-gray-900 text-white p-8">
//             <div className="max-w-2xl mx-auto">
//                 <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
//                     <ArrowLeft size={18} /> Annuler
//                 </button>

//                 <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
//                     <h1 className="text-2xl font-bold text-yellow-400 mb-6">Modifier l'Analyste</h1>
                    
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className="bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-yellow-500" />
//                             <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" className="bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-yellow-500" />
//                         </div>

//                         <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" />
//                         <div>
//     <label className="block text-sm text-gray-400 mb-1 italic">
//         Mot de passe (Laissez vide pour ne pas modifier)
//     </label>
//     <input 
//         name="password" 
//         type="password" 
//         value={formData.password || ""} 
//         onChange={handleChange} 
//         placeholder="Nouveau mot de passe..."
//         className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" 
//     />
// </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <input name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" />
//                             <input name="role" value={formData.role} onChange={handleChange} className="bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" />
//                         </div>

//                         <div className="flex items-center gap-3 bg-gray-700/50 p-3 rounded border border-gray-600">
//                             <input type="checkbox" name="disponibilite" checked={formData.disponibilite} onChange={handleChange} className="w-4 h-4 accent-yellow-500" />
//                             <label>Disponible</label>
//                         </div>

//                         <button type="submit" disabled={loading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
//                             {loading ? "Enregistrement..." : <><Save size={18} /> Enregistrer les modifications</>}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { analysteService } from "@/services/analysteService";
import { ArrowLeft, Save, ShieldAlert, UserCog, Lock, Smartphone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EditAnalystePage() {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState<any>({
        nom: "",
        prenom: "",
        email: "",
        password: "", 
        role: "",
        phone: "",
        disponibilite: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        analysteService.getById(id as string).then(setFormData);
    }, [id]);

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
        
        const payload = {
            Nom: formData.nom,
            Prenom: formData.prenom,
            Email: formData.email,
            Phone: formData.phone,
            Role: formData.role,
            Password: formData.password || "",
            Disponibilite: formData.disponibilite
        };

        try {
            await analysteService.update(id as string, payload);

            // Mise à jour du cache local si l'admin se modifie lui-même
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            if (storedUser.id === parseInt(id as string)) {
                const updatedUser = { 
                    ...storedUser, 
                    ...formData,
                    password: undefined // Sécurité : on ne stocke pas le pass en clair
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }

            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Échec de la synchronisation avec le serveur CyberTrack");
        } finally {
            setLoading(false);
        }
    };

    if (!formData.email && !loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-blue-500 animate-pulse">
            INITIALISATION DU PROTOCOLE D'ÉDITION...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 relative">
            {/* Overlay de fond subtil */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-slate-500 hover:text-white mb-6 group transition-all"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1" /> 
                    Abandonner les modifications
                </Button>

                <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="border-b border-slate-800 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-500">
                                <UserCog size={28} />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tight text-white">
                                    Modifier <span className="text-yellow-500">l'Analyste</span>
                                </CardTitle>
                                <CardDescription className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                                    Override System Access // ID: {id}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Section Nom & Prénom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nom" className="text-[10px] font-bold uppercase text-slate-500">Nom de famille</Label>
                                    <Input 
                                        id="nom" name="nom" value={formData.nom} onChange={handleChange}
                                        className="bg-slate-900/50 border-slate-800 focus:ring-yellow-500/50 focus:border-yellow-500" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="prenom" className="text-[10px] font-bold uppercase text-slate-500">Prénom</Label>
                                    <Input 
                                        id="prenom" name="prenom" value={formData.prenom} onChange={handleChange}
                                        className="bg-slate-900/50 border-slate-800 focus:ring-yellow-500/50 focus:border-yellow-500" 
                                    />
                                </div>
                            </div>

                            {/* Section Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase text-slate-500">Identifiant Email (Accès SOC)</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                                    <Input 
                                        id="email" name="email" value={formData.email} onChange={handleChange}
                                        className="pl-10 bg-slate-900/50 border-slate-800 focus:border-yellow-500" 
                                    />
                                </div>
                            </div>

                            {/* Section Password */}
                            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 space-y-3">
                                <div className="flex items-center gap-2 text-yellow-500/70 mb-1">
                                    <Lock size={14} />
                                    <Label className="text-[10px] font-bold uppercase tracking-tighter">Sécurité du compte</Label>
                                </div>
                                <Input 
                                    name="password" type="password" 
                                    placeholder="Laisser vide pour conserver le mot de passe actuel"
                                    value={formData.password || ""} onChange={handleChange}
                                    className="bg-slate-950 border-slate-800 focus:border-yellow-500 text-sm"
                                />
                            </div>

                            {/* Section Phone & Role */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-slate-500">Téléphone de service</Label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                                        <Input 
                                            name="phone" value={formData.phone} onChange={handleChange}
                                            className="pl-10 bg-slate-900/50 border-slate-800 focus:border-yellow-500 font-mono" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-slate-500">Niveau d'accréditation</Label>
                                    <Input 
                                        name="role" value={formData.role} onChange={handleChange}
                                        className="bg-slate-900/50 border-slate-800 focus:border-yellow-500 font-bold text-blue-400" 
                                    />
                                </div>
                            </div>

                            {/* Toggle Disponibilité */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 group hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${formData.disponibilite ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        <ShieldAlert size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-200">Statut Opérationnel</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono">
                                            {formData.disponibilite ? 'Node: Active' : 'Node: Offline'}
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
                                className="w-full h-12 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(202,138,4,0.15)]"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Synchronisation...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Save size={18} /> Mettre à jour les accès
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.4em]">
                    CyberTrack Encryption Protocol // Update Layer 4.2
                </p>
            </div>
        </div>
    );
}