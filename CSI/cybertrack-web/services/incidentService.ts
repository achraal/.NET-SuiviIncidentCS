import { Analyste, Incident } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const incidentService = {
    getAll: async (): Promise<Incident[]> => {
        const res = await fetch(`${API_BASE_URL}/incidents`);
        return res.json();
    },
    create: async (data: Partial<Incident>) => {
        return fetch(`${API_BASE_URL}/incidents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },
    update: async (id: number, data: Partial<Incident>) => {
        return fetch(`${API_BASE_URL}/incidents/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },
    delete: async (id: number) => {
        return fetch(`${API_BASE_URL}/incidents/${id}`, { method: 'DELETE' });
    },

    // Dans incidentService.ts
getAllAnalystes: async (): Promise<Analyste[]> => {
    const res = await fetch(`${API_BASE_URL}/analystes`); // Vérifie que ta route est bien /api/analystes
    if (!res.ok) throw new Error("Erreur analystes");
    return res.json();
},
};