// "use client";
// import { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Activity, Clock, AlertTriangle } from "lucide-react";


// ChartJS.register(
//   ArcElement, Tooltip, Legend, CategoryScale, 
//   LinearScale, BarElement, PointElement, LineElement
// );
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function AnalyticsPage() {
//     const [stats, setStats] = useState<any>(null);

//     useEffect(() => {
//         // Appel API vers /api/Stats/dashboard avec le Token
//         const fetchStats = async () => {
//             const token = localStorage.getItem("token");
//             const res = await fetch(`${API_URL}/Stats/dashboard`, {
//                 headers: { "Authorization": `Bearer ${token}` }
//             });
//             const data = await res.json();
//             setStats(data);
//         };
//         fetchStats();
//     }, []);

//     if (!stats) return <div className="p-8 text-white">Chargement des analyses...</div>;

//     // Données pour le graphique en Camembert (Sévérité)
//     const pieData = {
//         labels: stats.severite.map((s: any) => s.label),
//         datasets: [{
//             data: stats.severite.map((s: any) => s.count),
//             backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'],
//         }]
//     };

//     return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//         <h1 className="text-3xl font-bold mb-8 text-blue-400">Analyses de Cybersécurité</h1>

//         {/* Cartes KPI (Passage à 4 colonnes pour les nouveaux KPIs) */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <p className="text-gray-400 text-sm flex items-center gap-2"><Activity size={16}/> Total</p>
//                 <p className="text-2xl font-bold">{stats.kpis.total}</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <p className="text-red-400 text-sm font-bold">Critiques 🔥</p>
//                 <p className="text-2xl font-bold">{stats.kpis.critiques}</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <p className="text-yellow-400 text-sm font-bold">Non Assignés ⚠️</p>
//                 <p className="text-2xl font-bold">{stats.kpis.nonAssignes}</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <p className="text-green-400 text-sm font-bold">MTTR (Moyen)</p>
//                 <p className="text-2xl font-bold">{stats.kpis.mttr}h</p>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Graphique 1 : Tendance des 7 derniers jours */}
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <h2 className="text-xl font-semibold mb-4 text-blue-300">Tendance (7 jours)</h2>
//                 <div className="h-64">
//                     <Line data={{
//                         labels: stats.historique.map((h: any) => new Date(h.date).toLocaleDateString()),
//                         datasets: [{
//                             label: 'Nouveaux Incidents',
//                             data: stats.historique.map((h: any) => h.count),
//                             borderColor: '#3b82f6',
//                             tension: 0.4,
//                             fill: true,
//                             backgroundColor: 'rgba(59, 130, 246, 0.1)'
//                         }]
//                     }} options={{ maintainAspectRatio: false }} />
//                 </div>
//             </div>

//             {/* Graphique 2 : Top Analystes */}
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <h2 className="text-xl font-semibold mb-4 text-green-300">Performance Analystes</h2>
//                 <div className="h-64">
//                     <Bar data={{
//                         labels: stats.performance.map((p: any) => p.nom),
//                         datasets: [{
//                             label: 'Incidents Résolus',
//                             data: stats.performance.map((p: any) => p.resolus),
//                             backgroundColor: '#10b981'
//                         }]
//                     }} options={{ indexAxis: 'y' as const, maintainAspectRatio: false }} />
//                 </div>
//             </div>

//             {/* Tes anciens graphiques (Sévérité et Types) en dessous */}
//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <h2 className="text-xl font-semibold mb-4 text-orange-300">Répartition Sévérité</h2>
//                 <div className="h-64 flex justify-center"><Pie data={pieData} /></div>
//             </div>

//             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//                 <h2 className="text-xl font-semibold mb-4 text-purple-300">Types d'attaques</h2>
//                 <div className="h-64">
//                     <Bar data={{
//                         labels: stats.types.map((t: any) => t.label),
//                         datasets: [{ label: 'Nombre', data: stats.types.map((t: any) => t.count), backgroundColor: '#8b5cf6' }]
//                     }} options={{ maintainAspectRatio: false }} />
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// }
"use client";
import { useEffect, useState } from "react";
import { 
  Chart as ChartJS, ArcElement, Tooltip, Legend, 
  CategoryScale, LinearScale, BarElement, 
  PointElement, LineElement, Filler 
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { 
  Activity, Clock, AlertTriangle, ShieldCheck, 
  TrendingUp, Users, Target, LayoutDashboard 
} from "lucide-react";
import { Button } from "@/components/ui/button";

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, LineElement, Filler
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Options globales pour un look plus "Dark Mode"
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: '#94a3b8', font: { size: 11, family: 'monospace' }, usePointStyle: true }
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#3b82f6',
      bodyColor: '#f8fafc',
      borderColor: '#334155',
      borderWidth: 1
    }
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#64748b' } },
    y: { grid: { color: 'rgba(51, 65, 85, 0.5)' }, ticks: { color: '#64748b' } }
  }
};

export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_URL}/Stats/dashboard`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Erreur de récupération");
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("SOC-STATS-ERR:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
                <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em]">Calcul des métriques de sécurité...</p>
            </div>
        </div>
    );

    return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-3 italic">
                    <LayoutDashboard className="text-blue-500" />
                    CyberTrack <span className="text-blue-500">Analytics</span>
                </h1>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">Surveillance globale de l'infrastructure</p>
            </div>
            <Button variant="outline" className="border-slate-800 text-xs font-mono uppercase" onClick={() => window.location.reload()}>
                <Clock className="mr-2 h-3 w-3" /> Refresh Data
            </Button>
        </header>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
                { label: "Total Incidents", value: stats.kpis.total, icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Menaces Critiques", value: stats.kpis.critiques, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
                { label: "Backlog (Non Assignés)", value: stats.kpis.nonAssignes, icon: Users, color: "text-amber-400", bg: "bg-amber-500/10" },
                { label: "MTTR Moyen", value: `${stats.kpis.mttr}h`, icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" }
            ].map((kpi, i) => (
                <div key={i} className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform`}>
                        <kpi.icon size={48} />
                    </div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                        <kpi.icon size={12} className={kpi.color} /> {kpi.label}
                    </p>
                    <p className="text-3xl font-black text-white tracking-tight">{kpi.value}</p>
                </div>
            ))}
        </div>

        {/* --- CHARTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tendance temporelle */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                        <TrendingUp size={16} /> Volume d'alertes (7j)
                    </h2>
                </div>
                <div className="h-72">
                    <Line 
                        data={{
                            labels: stats.historique.map((h: any) => new Date(h.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })),
                            datasets: [{
                                label: 'Nouveaux incidents',
                                data: stats.historique.map((h: any) => h.count),
                                borderColor: '#3b82f6',
                                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#3b82f6',
                                pointBorderColor: '#020617',
                                pointBorderWidth: 2,
                                pointRadius: 4
                            }]
                        }} 
                        options={chartOptions} 
                    />
                </div>
            </div>

            {/* Performance des Analystes */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                    <Target size={16} /> Résolution par Analyste
                </h2>
                <div className="h-72">
                    <Bar 
                        data={{
                            labels: stats.performance.map((p: any) => p.nom),
                            datasets: [{
                                label: 'Fermés',
                                data: stats.performance.map((p: any) => p.resolus),
                                backgroundColor: '#10b981',
                                borderRadius: 4,
                            }]
                        }} 
                        options={{ ...chartOptions, indexAxis: 'y' as const }} 
                    />
                </div>
            </div>

            {/* Sévérité - Camembert */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-widest text-orange-400 mb-6">Répartition par Risque</h2>
                <div className="h-72 flex items-center justify-center">
                    <Pie 
                        data={{
                            labels: stats.severite.map((s: any) => s.label),
                            datasets: [{
                                data: stats.severite.map((s: any) => s.count),
                                backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'],
                                borderWidth: 0,
                                hoverOffset: 15
                            }]
                        }} 
                        options={{
                            ...chartOptions,
                            plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { usePointStyle: true, color: '#94a3b8' } } }
                        }}
                    />
                </div>
            </div>

            {/* Types d'attaques */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-6">Top Vecteurs d'Attaque</h2>
                <div className="h-72">
                    <Bar 
                        data={{
                            labels: stats.types.map((t: any) => t.label),
                            datasets: [{ 
                                label: 'Volume', 
                                data: stats.types.map((t: any) => t.count), 
                                backgroundColor: '#8b5cf6',
                                borderRadius: 4,
                                barThickness: 20
                            }]
                        }} 
                        options={chartOptions} 
                    />
                </div>
            </div>
        </div>
    </div>
);
}