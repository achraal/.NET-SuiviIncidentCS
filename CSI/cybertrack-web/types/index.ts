// Correspond à ta classe Incident en C# 
export interface Incident {
    id: number;
    type: string;
    severite: string;
    etat: string;
    description: string;
    sourceDetection?: string;
    dateDeclaration: string;
    dateResolution?: string;
    analysteId?: number;
    analysteEnCharge?: Analyste;
}

// Correspond à ta classe Analyste en C# 
export interface Analyste {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    phone: string;
    role: string;
    disponibilite: boolean;
}