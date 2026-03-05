"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Activity, Clock, AlertTriangle } from "lucide-react";


ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, LineElement
);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        // Appel API vers /api/Stats/dashboard avec le Token
        const fetchStats = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/Stats/dashboard`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setStats(data);
        };
        fetchStats();
    }, []);

    if (!stats) return <div className="p-8 text-white">Chargement des analyses...</div>;

    // Données pour le graphique en Camembert (Sévérité)
    const pieData = {
        labels: stats.severite.map((s: any) => s.label),
        datasets: [{
            data: stats.severite.map((s: any) => s.count),
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'],
        }]
    };

    return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Analyses de Cybersécurité</h1>

        {/* Cartes KPI (Passage à 4 colonnes pour les nouveaux KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm flex items-center gap-2"><Activity size={16}/> Total</p>
                <p className="text-2xl font-bold">{stats.kpis.total}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <p className="text-red-400 text-sm font-bold">Critiques 🔥</p>
                <p className="text-2xl font-bold">{stats.kpis.critiques}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <p className="text-yellow-400 text-sm font-bold">Non Assignés ⚠️</p>
                <p className="text-2xl font-bold">{stats.kpis.nonAssignes}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <p className="text-green-400 text-sm font-bold">MTTR (Moyen)</p>
                <p className="text-2xl font-bold">{stats.kpis.mttr}h</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Graphique 1 : Tendance des 7 derniers jours */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">Tendance (7 jours)</h2>
                <div className="h-64">
                    <Line data={{
                        labels: stats.historique.map((h: any) => new Date(h.date).toLocaleDateString()),
                        datasets: [{
                            label: 'Nouveaux Incidents',
                            data: stats.historique.map((h: any) => h.count),
                            borderColor: '#3b82f6',
                            tension: 0.4,
                            fill: true,
                            backgroundColor: 'rgba(59, 130, 246, 0.1)'
                        }]
                    }} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Graphique 2 : Top Analystes */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-green-300">Performance Analystes</h2>
                <div className="h-64">
                    <Bar data={{
                        labels: stats.performance.map((p: any) => p.nom),
                        datasets: [{
                            label: 'Incidents Résolus',
                            data: stats.performance.map((p: any) => p.resolus),
                            backgroundColor: '#10b981'
                        }]
                    }} options={{ indexAxis: 'y' as const, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Tes anciens graphiques (Sévérité et Types) en dessous */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-orange-300">Répartition Sévérité</h2>
                <div className="h-64 flex justify-center"><Pie data={pieData} /></div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-purple-300">Types d'attaques</h2>
                <div className="h-64">
                    <Bar data={{
                        labels: stats.types.map((t: any) => t.label),
                        datasets: [{ label: 'Nombre', data: stats.types.map((t: any) => t.count), backgroundColor: '#8b5cf6' }]
                    }} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    </div>
);
}