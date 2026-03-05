"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { analysteService } from "@/services/analysteService";
import { ArrowLeft, Save } from "lucide-react";

export default function EditAnalystePage() {
    const { id } = useParams();
    const router = useRouter();
    //const [formData, setFormData] = useState<any>(null);
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
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. On prépare l'objet avec des MAJUSCULES pour correspondre au DTO C#
    const payload = {
        Nom: formData.nom,
        Prenom: formData.prenom,
        Email: formData.email,
        Phone: formData.phone,
        Role: formData.role,
        Password: formData.password || "", // Envoie vide si pas de changement
        Disponibilite: formData.disponibilite
    };

    try {
        // 2. Envoi au serveur
        await analysteService.update(id as string, payload);

        // 3. MISE À JOUR DU LOCALSTORAGE (Si c'est l'utilisateur actuel)
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        
        // Si l'ID qu'on modifie est le même que celui connecté
        if (storedUser.id === parseInt(id as string)) {
            const updatedUser = { 
                ...storedUser, 
                nom: formData.nom, 
                prenom: formData.prenom, 
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                disponibilite: formData.disponibilite
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        //alert("Modification réussie !");
        router.push("/dashboard");
        router.refresh(); // Force Next.js à rafraîchir les composants (Navbar)
        
    } catch (error) {
        console.error(error);
        alert("Erreur lors de la mise à jour");
    } finally {
        setLoading(false);
    }
};

    if (!formData) return <div className="p-8 text-white">Chargement...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                    <ArrowLeft size={18} /> Annuler
                </button>

                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <h1 className="text-2xl font-bold text-yellow-400 mb-6">Modifier l'Analyste</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" className="bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-yellow-500" />
                            <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" className="bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-yellow-500" />
                        </div>

                        <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" />
                        <div>
    <label className="block text-sm text-gray-400 mb-1 italic">
        Mot de passe (Laissez vide pour ne pas modifier)
    </label>
    <input 
        name="password" 
        type="password" 
        value={formData.password || ""} 
        onChange={handleChange} 
        placeholder="Nouveau mot de passe..."
        className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" 
    />
</div>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" />
                            <input name="role" value={formData.role} onChange={handleChange} className="bg-gray-700 p-2 rounded border border-gray-600 focus:border-yellow-500 outline-none" />
                        </div>

                        <div className="flex items-center gap-3 bg-gray-700/50 p-3 rounded border border-gray-600">
                            <input type="checkbox" name="disponibilite" checked={formData.disponibilite} onChange={handleChange} className="w-4 h-4 accent-yellow-500" />
                            <label>Disponible</label>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                            {loading ? "Enregistrement..." : <><Save size={18} /> Enregistrer les modifications</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}