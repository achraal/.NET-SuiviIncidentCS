"use client";
import { useEffect, useState } from "react";
import { analysteService } from "@/services/analysteService";
import { useRouter } from "next/navigation";
import { UserPlus, Edit, Eye, Trash2, LogOut } from "lucide-react"; // npm install lucide-react

export default function DashboardPage() {
    const [analystes, setAnalystes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet analyste ?")) {
        try {
            await analysteService.delete(id);
            // On met à jour la liste localement pour faire disparaître la ligne
            setAnalystes(analystes.filter(a => a.id !== id));
        } catch (error) {
            alert("Erreur lors de la suppression");
        }
    }
};

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.role !== "Admin") {
        router.push("/"); // Redirige vers l'accueil si pas Admin
    } else {
        loadAnalystes();
    }
}, []);

    const loadAnalystes = async () => {
        try {
            const data = await analysteService.getAll();
            setAnalystes(data);
        } catch (error) {
            console.error(error);
            // Si erreur 401, on redirige vers login
            // router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-400">Dashboard Analystes</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => router.push("/dashboard/new")}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                        >
                            <UserPlus size={18} /> Ajouter
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                        >
                            <LogOut size={18} /> Déconnexion
                        </button>
                    </div>
                </div>

                {/* Tableau */}
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                                <th className="p-4">Nom / Prénom</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Rôle</th>
                                <th className="p-4">Statut</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="p-10 text-center">Chargement...</td></tr>
                            ) : analystes.map((a) => (
                                <tr key={a.id} className="border-t border-gray-700 hover:bg-gray-750 transition">
                                    <td className="p-4">{a.nom} {a.prenom}</td>
                                    <td className="p-4 text-gray-400">{a.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs ${a.role === 'Admin' ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'}`}>
                                            {a.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`h-3 w-3 rounded-full inline-block mr-2 ${a.disponibilite ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {a.disponibilite ? 'Disponible' : 'Occupé'}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => router.push(`/dashboard/details/${a.id}`)}
                                            className="text-blue-400 hover:text-blue-300"><Eye size={18} /></button>
                                            <button onClick={() => router.push(`/dashboard/edit/${a.id}`)}
                                            className="text-yellow-400 hover:text-yellow-300"><Edit size={18} /></button>
                                            <button onClick={() => handleDelete(a.id)}
                                            className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}