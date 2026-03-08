// "use client";
// import { useEffect, useState } from "react";
// import { analysteService } from "@/services/analysteService";
// import { useRouter } from "next/navigation";
// import { UserPlus, Edit, Eye, Trash2, LogOut } from "lucide-react"; // npm install lucide-react

// export default function DashboardPage() {
//     const [analystes, setAnalystes] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
//     const handleDelete = async (id: number) => {
//     if (confirm("Voulez-vous vraiment supprimer cet analyste ?")) {
//         try {
//             await analysteService.delete(id);
//             // On met à jour la liste localement pour faire disparaître la ligne
//             setAnalystes(analystes.filter(a => a.id !== id));
//         } catch (error) {
//             alert("Erreur lors de la suppression");
//         }
//     }
// };

//     useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const user = storedUser ? JSON.parse(storedUser) : null;

//     if (!user || user.role !== "Admin") {
//         router.push("/"); // Redirige vers l'accueil si pas Admin
//     } else {
//         loadAnalystes();
//     }
// }, []);

//     const loadAnalystes = async () => {
//         try {
//             const data = await analysteService.getAll();
//             setAnalystes(data);
//         } catch (error) {
//             console.error(error);
//             // Si erreur 401, on redirige vers login
//             // router.push("/login");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.clear();
//         router.push("/login");
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white p-8">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold text-blue-400">Dashboard Analystes</h1>
//                     <div className="flex gap-4">
//                         <button 
//                             onClick={() => router.push("/dashboard/new")}
//                             className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
//                         >
//                             <UserPlus size={18} /> Ajouter
//                         </button>
//                         <button 
//                             onClick={handleLogout}
//                             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
//                         >
//                             <LogOut size={18} /> Déconnexion
//                         </button>
//                     </div>
//                 </div>

//                 {/* Tableau */}
//                 <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
//                                 <th className="p-4">Nom / Prénom</th>
//                                 <th className="p-4">Email</th>
//                                 <th className="p-4">Rôle</th>
//                                 <th className="p-4">Statut</th>
//                                 <th className="p-4 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr><td colSpan={5} className="p-10 text-center">Chargement...</td></tr>
//                             ) : analystes.map((a) => (
//                                 <tr key={a.id} className="border-t border-gray-700 hover:bg-gray-750 transition">
//                                     <td className="p-4">{a.nom} {a.prenom}</td>
//                                     <td className="p-4 text-gray-400">{a.email}</td>
//                                     <td className="p-4">
//                                         <span className={`px-2 py-1 rounded text-xs ${a.role === 'Admin' ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'}`}>
//                                             {a.role}
//                                         </span>
//                                     </td>
//                                     <td className="p-4">
//                                         <span className={`h-3 w-3 rounded-full inline-block mr-2 ${a.disponibilite ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                                         {a.disponibilite ? 'Disponible' : 'Occupé'}
//                                     </td>
//                                     <td className="p-4">
//                                         <div className="flex justify-center gap-3">
//                                             <button onClick={() => router.push(`/dashboard/details/${a.id}`)}
//                                             className="text-blue-400 hover:text-blue-300"><Eye size={18} /></button>
//                                             <button onClick={() => router.push(`/dashboard/edit/${a.id}`)}
//                                             className="text-yellow-400 hover:text-yellow-300"><Edit size={18} /></button>
//                                             <button onClick={() => handleDelete(a.id)}
//                                             className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import { useEffect, useState } from "react";
import { analysteService } from "@/services/analysteService";
import { useRouter } from "next/navigation";
import { 
  UserPlus, Edit, Eye, Trash2, LogOut, 
  Search, ShieldCheck, MoreHorizontal, LayoutDashboard 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
    const [analystes, setAnalystes] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || user.role !== "Admin") {
            router.push("/");
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
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Confirmer la suppression irrévocable de cet analyste ?")) {
            try {
                await analysteService.delete(id);
                setAnalystes(analystes.filter(a => a.id !== id));
            } catch (error) {
                alert("Erreur système lors de la suppression");
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login");
    };

    // Filtrage simple pour la recherche
    const filteredAnalystes = analystes.filter(a => 
        `${a.nom} ${a.prenom} ${a.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 font-sans relative">
            {/* Décoration en arrière-plan */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                
                {/* Header d'administration */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-950/40 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-500">
                            <LayoutDashboard size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Management Console</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
                            Dashboard <span className="text-blue-600">Analystes</span>
                        </h1>
                    </div>
                    
                    <div className="flex w-full md:w-auto gap-3">
                        <Button 
                            onClick={() => router.push("/dashboard/new")}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                        >
                            <UserPlus className="mr-2 h-4 w-4" /> Recruter Analyste
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={handleLogout}
                            className="border-slate-800 bg-slate-900 text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Barre d'outils / Recherche */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input 
                        placeholder="Rechercher un agent ou un email..." 
                        className="pl-10 bg-slate-950/50 border-slate-800 focus:border-blue-500/50 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tableau de contrôle */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-sm overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader className="bg-slate-900/50">
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-widest p-6">Opérateur</TableHead>
                                <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Identifiant Email</TableHead>
                                <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Accréditation</TableHead>
                                <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-widest text-center">Statut</TableHead>
                                <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-widest text-right p-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-40 text-center text-slate-500 font-mono animate-pulse">
                                        Interrogation de la base de données...
                                    </TableCell>
                                </TableRow>
                            ) : filteredAnalystes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-40 text-center text-slate-500 italic">
                                        Aucun agent trouvé dans ce secteur.
                                    </TableCell>
                                </TableRow>
                            ) : filteredAnalystes.map((a) => (
                                <TableRow key={a.id} className="border-slate-800/50 hover:bg-blue-500/5 transition-colors group">
                                    <TableCell className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold text-xs border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                {a.nom[0]}{a.prenom[0]}
                                            </div>
                                            <span className="font-bold text-slate-200">{a.nom} {a.prenom}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-slate-400">
                                        {a.email}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`font-black tracking-tighter uppercase text-[9px] ${
                                            a.role === 'Admin' ? 'border-red-500 text-red-500 bg-red-500/5' : 'border-blue-500 text-blue-400'
                                        }`}>
                                            {a.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`h-2 w-2 rounded-full animate-pulse ${a.disponibilite ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-red-500'}`} />
                                            <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                                                {a.disponibilite ? 'Online' : 'Busy'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right p-6">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => router.push(`/dashboard/details/${a.id}`)} className="h-8 w-8 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10">
                                                <Eye size={16} />
                                            </Button>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 bg-slate-950 border-slate-800 text-slate-200">
                                                    <DropdownMenuLabel className="text-[10px] uppercase font-bold text-slate-500">Contrôles</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => router.push(`/dashboard/edit/${a.id}`)} className="cursor-pointer focus:bg-slate-900 focus:text-yellow-500">
                                                        <Edit className="mr-2 h-4 w-4" /> Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-slate-800" />
                                                    <DropdownMenuItem onClick={() => handleDelete(a.id)} className="cursor-pointer focus:bg-red-500/10 focus:text-red-500 text-red-400">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer Status */}
                <div className="flex items-center justify-between text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] px-2">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-blue-600" /> Database Sync: OK</span>
                        <span className="flex items-center gap-1.5"><MoreHorizontal size={12} /> Total Agents: {analystes.length}</span>
                    </div>
                    <span>C.T Management Panel // Secure Node v.2.4</span>
                </div>
            </div>
        </div>
    );
}