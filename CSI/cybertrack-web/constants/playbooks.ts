// src/constants/playbooks.ts
export const PLAYBOOKS: Record<string, string[]> = {
  "Phishing": [
    "Analyser l'en-tête (Header) de l'email suspect",
    "Extraire et analyser l'URL/Pièce jointe (VirusTotal)",
    "Identifier les autres destinataires internes",
    "Isoler le poste de l'utilisateur",
    "Réinitialiser le mot de passe AD/Office 365"
  ],
  "Ransomware": [
    "Isoler immédiatement la machine du réseau",
    "Couper les partages réseaux critiques",
    "Identifier l'extension des fichiers chiffrés",
    "Rechercher le 'Patient Zero' (source de l'infection)",
    "Vérifier l'intégrité des sauvegardes (Backups)"
  ],
  "Brute Force": [
    "Identifier l'adresse IP source",
    "Vérifier si une connexion a réussi (Log Success)",
    "Bloquer l'IP sur le Firewall périmétrique",
    "Vérifier la politique de verrouillage de compte"
  ],
  "Default": [
    "Notifier le responsable sécurité",
    "Collecter les logs pertinents",
    "Documenter les actions entreprises"
  ]
};