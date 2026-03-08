// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { analysteService } from "@/services/analysteService";
// import { ArrowLeft, User, Mail, Phone, Shield, Activity } from "lucide-react";

// export default function DetailsAnalystePage() {
//     const { id } = useParams();
//     const router = useRouter();
//     const [analyste, setAnalyste] = useState<any>(null);

//     useEffect(() => {
//         analysteService.getById(id as string)
//             .then(setAnalyste)
//             .catch(() => router.push("/dashboard"));
//     }, [id, router]);

//     if (!analyste) return <div className="p-8 text-white">Chargement...</div>;

//     return (
//         <div className="min-h-screen bg-gray-900 text-white p-8">
//             <div className="max-w-2xl mx-auto">
//                 <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
//                     <ArrowLeft size={18} /> Retour
//                 </button>

//                 <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
//                     <h1 className="text-3xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">Profil de l'Analyste</h1>
                    
//                     <div className="space-y-6">
//                         <div className="flex items-center gap-4">
//                             <div className="bg-blue-900/30 p-3 rounded-full text-blue-400"><User size={24} /></div>
//                             <div>
//                                 <p className="text-gray-400 text-sm">Nom complet</p>
//                                 <p className="text-xl font-semibold">{analyste.prenom} {analyste.nom}</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <div className="bg-green-900/30 p-3 rounded-full text-green-400"><Mail size={24} /></div>
//                             <div>
//                                 <p className="text-gray-400 text-sm">Email</p>
//                                 <p className="text-lg">{analyste.email}</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <div className="bg-purple-900/30 p-3 rounded-full text-purple-400"><Shield size={24} /></div>
//                             <div>
//                                 <p className="text-gray-400 text-sm">Rôle</p>
//                                 <p className="text-lg">{analyste.role}</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <div className="bg-yellow-900/30 p-3 rounded-full text-yellow-400"><Phone size={24} /></div>
//                             <div>
//                                 <p className="text-gray-400 text-sm">Téléphone</p>
//                                 <p className="text-lg">{analyste.phone}</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <div className="bg-orange-900/30 p-3 rounded-full text-orange-400"><Activity size={24} /></div>
//                             <div>
//                                 <p className="text-gray-400 text-sm">Statut</p>
//                                 <p className={`text-lg font-bold ${analyste.disponibilite ? 'text-green-400' : 'text-red-400'}`}>
//                                     {analyste.disponibilite ? 'Disponible' : 'Indisponible'}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { analysteService } from "@/services/analysteService";
import { 
  ArrowLeft, User, Mail, Phone, Shield, 
  Activity, Fingerprint, Calendar, Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsAnalystePage() {
    const { id } = useParams();
    const router = useRouter();
    const [analyste, setAnalyste] = useState<any>(null);

    useEffect(() => {
        analysteService.getById(id as string)
            .then(setAnalyste)
            .catch(() => router.push("/dashboard"));
    }, [id, router]);

    if (!analyste) {
        return (
            <div className="min-h-screen bg-[#020617] p-8 flex justify-center items-center">
                <div className="w-full max-w-2xl space-y-4">
                    <Skeleton className="h-8 w-24 bg-slate-800" />
                    <Skeleton className="h-[400px] w-full bg-slate-800 rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 font-sans selection:bg-blue-500/30">
            {/* Background Grid Decor */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Navigation */}
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    Retour au terminal
                </Button>

                <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Header: Visual ID */}
                    <CardHeader className="border-b border-slate-800 bg-slate-900/30 p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 bg-blue-600/10 rounded-2xl border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                    <Fingerprint size={40} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-black text-white tracking-tight uppercase italic italic">
                                        {analyste.prenom} <span className="text-blue-600">{analyste.nom}</span>
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/5 font-mono text-[10px]">
                                            ID-{id?.toString().substring(0, 8).toUpperCase()}
                                        </Badge>
                                        <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Opérateur Qualifié</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                                    analyste.disponibilite 
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                                    : 'bg-red-500/10 border-red-500/20 text-red-500'
                                }`}>
                                    <div className={`h-1.5 w-1.5 rounded-full ${analyste.disponibilite ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">
                                        {analyste.disponibilite ? 'Liaison Active' : 'Hors Ligne'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                            
                            {/* Colonne Gauche: Identité */}
                            <div className="space-y-8">
                                <section className="group">
                                    <div className="flex items-center gap-2 mb-4 text-slate-500 group-hover:text-blue-500 transition-colors">
                                        <Shield size={16} />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Accréditation</h3>
                                    </div>
                                    <p className="text-lg font-bold text-slate-200 pl-6 border-l-2 border-slate-800 group-hover:border-blue-500 transition-all">
                                        Analyste {analyste.role} SOC
                                    </p>
                                </section>

                                <section className="group">
                                    <div className="flex items-center gap-2 mb-4 text-slate-500 group-hover:text-blue-500 transition-colors">
                                        <Mail size={16} />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Canal de communication</h3>
                                    </div>
                                    <p className="text-lg font-mono text-slate-300 pl-6 border-l-2 border-slate-800 group-hover:border-blue-500 transition-all">
                                        {analyste.email}
                                    </p>
                                </section>
                            </div>

                            {/* Colonne Droite: Contact & Systèmes */}
                            <div className="space-y-8">
                                <section className="group">
                                    <div className="flex items-center gap-2 mb-4 text-slate-500 group-hover:text-blue-500 transition-colors">
                                        <Phone size={16} />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Ligne Sécurisée</h3>
                                    </div>
                                    <p className="text-lg font-mono text-slate-300 pl-6 border-l-2 border-slate-800 group-hover:border-blue-500 transition-all">
                                        {analyste.phone || "Non Répertoriée"}
                                    </p>
                                </section>

                                <section className="group">
                                    <div className="flex items-center gap-2 mb-4 text-slate-500 group-hover:text-blue-500 transition-colors">
                                        <Activity size={16} />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Dernière Activité</h3>
                                    </div>
                                    <div className="pl-6 border-l-2 border-slate-800 group-hover:border-blue-500 transition-all">
                                        <p className="text-slate-400 text-sm italic">
                                            {analyste.disponibilite 
                                                ? "En cours d'analyse d'incident..." 
                                                : "Session clôturée par l'administrateur."}
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <Separator className="my-10 bg-slate-800" />

                        {/* Footer de la carte */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                                <Globe size={14} className="mx-auto mb-2 text-slate-600" />
                                <p className="text-[8px] font-bold text-slate-500 uppercase">Localisation</p>
                                <p className="text-[10px] text-slate-300 font-mono">NODE_MOROCCO</p>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                                <Calendar size={14} className="mx-auto mb-2 text-slate-600" />
                                <p className="text-[8px] font-bold text-slate-500 uppercase">Enregistrement</p>
                                <p className="text-[10px] text-slate-300 font-mono">MAR 2026</p>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                                <Shield size={14} className="mx-auto mb-2 text-slate-600" />
                                <p className="text-[8px] font-bold text-slate-500 uppercase">Sécurité</p>
                                <p className="text-[10px] text-slate-300 font-mono">SSL_ACTIVE</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Système */}
                <div className="mt-8 flex justify-between items-center px-2">
                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                        Document confidentiel - CyberTrack Security
                    </p>
                    <div className="flex gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-600" />
                        <div className="w-1 h-1 rounded-full bg-slate-800" />
                        <div className="w-1 h-1 rounded-full bg-slate-800" />
                    </div>
                </div>
            </div>
        </div>
    );
}