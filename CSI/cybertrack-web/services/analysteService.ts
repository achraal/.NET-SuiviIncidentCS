const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const analysteService = {
    // Liste tous les analystes
    async getAll() {
        const response = await fetch(`${API_URL}/Analystes`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        return response.json();
    },

    // Créer un analyste
    async create(data: any) {
        const response = await fetch(`${API_URL}/Analystes`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Erreur lors de la création");
        return response.json();
    },

    // Supprimer (optionnel mais utile)
    async delete(id: number) {
        const response = await fetch(`${API_URL}/Analystes/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        return response.ok;
    },
    async getById(id: string) {
    const response = await fetch(`${API_URL}/Analystes/${id}`, {
        headers: getAuthHeaders()
    });
    return response.json();
},
async update(id: string, data: any) {
    const response = await fetch(`${API_URL}/Analystes/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return response.ok;
}
};