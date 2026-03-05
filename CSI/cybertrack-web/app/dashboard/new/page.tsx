"use client";
import { useState } from "react";
import { analysteService } from "@/services/analysteService";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Phone, Shield, User, CheckCircle } from "lucide-react";

export default function NewAnalystePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        role: "", // Champ texte vide par défaut
        phone: "",
        disponibilite: true // Par défaut à true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await analysteService.create(formData);
            router.push("/dashboard"); 
        } catch (err: any) {
            setError("Erreur : Vérifiez les informations (l'email doit être unique).");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
                >
                    <ArrowLeft size={18} /> Retour au Dashboard
                </button>

                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
                    <h1 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                        <User /> Créer un nouvel Analyste
                    </h1>
                    
                    {error && <p className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-6">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Nom</label>
                                <input name="nom" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Prénom</label>
                                <input name="prenom" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email Professionnel</label>
                            <input name="email" type="email" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Mot de passe temporaire</label>
                            <input name="password" type="password" required onChange={handleChange} className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                                    <Phone size={14} /> Téléphone
                                </label>
                                <input name="phone" required onChange={handleChange} placeholder="06..." className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                                    <Shield size={14} /> Rôle (Saisir manuellement)
                                </label>
                                <input name="role" required onChange={handleChange} placeholder="ex: Analyste SOC L3" className="w-full bg-gray-700 p-2.5 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                            </div>
                        </div>

                        {/* Champ Disponibilité */}
                        <div className="flex items-center gap-3 bg-gray-700/50 p-3 rounded border border-gray-600 w-fit">
                            <label className="text-sm text-gray-300 flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="disponibilite" 
                                    checked={formData.disponibilite} 
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-blue-500"
                                />
                                Analyste disponible immédiatement ?
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-6 transition flex items-center justify-center gap-2 shadow-lg"
                        >
                            {loading ? "Création..." : <><Save size={18} /> Enregistrer l'Analyste</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}