"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { analysteService } from "@/services/analysteService";
import { ArrowLeft, User, Mail, Phone, Shield, Activity } from "lucide-react";

export default function DetailsAnalystePage() {
    const { id } = useParams();
    const router = useRouter();
    const [analyste, setAnalyste] = useState<any>(null);

    useEffect(() => {
        analysteService.getById(id as string)
            .then(setAnalyste)
            .catch(() => router.push("/dashboard"));
    }, [id, router]);

    if (!analyste) return <div className="p-8 text-white">Chargement...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                    <ArrowLeft size={18} /> Retour
                </button>

                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
                    <h1 className="text-3xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">Profil de l'Analyste</h1>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-900/30 p-3 rounded-full text-blue-400"><User size={24} /></div>
                            <div>
                                <p className="text-gray-400 text-sm">Nom complet</p>
                                <p className="text-xl font-semibold">{analyste.prenom} {analyste.nom}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-green-900/30 p-3 rounded-full text-green-400"><Mail size={24} /></div>
                            <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="text-lg">{analyste.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-purple-900/30 p-3 rounded-full text-purple-400"><Shield size={24} /></div>
                            <div>
                                <p className="text-gray-400 text-sm">Rôle</p>
                                <p className="text-lg">{analyste.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-900/30 p-3 rounded-full text-yellow-400"><Phone size={24} /></div>
                            <div>
                                <p className="text-gray-400 text-sm">Téléphone</p>
                                <p className="text-lg">{analyste.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-orange-900/30 p-3 rounded-full text-orange-400"><Activity size={24} /></div>
                            <div>
                                <p className="text-gray-400 text-sm">Statut</p>
                                <p className={`text-lg font-bold ${analyste.disponibilite ? 'text-green-400' : 'text-red-400'}`}>
                                    {analyste.disponibilite ? 'Disponible' : 'Indisponible'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}