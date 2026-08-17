// ============================================================
// MOCK DATA — données fictives simulant le futur backend
// À remplacer par de vrais appels API (voir src/services/api.js)
// ============================================================

// ⚠️ PROVISOIRE — seul "Envoi livré" est confirmé par les captures.
// Les autres statuts sont des hypothèses à valider avec l'encadrant.
export const STATUSES = [
  { value: 'livre', label: 'Envoi livré', color: 'success', hexColor: '#2f6b2f' },
  { value: 'en_cours', label: 'En cours de livraison', color: 'warning', hexColor: '#b8860b' }, // provisoire
  { value: 'en_attente', label: 'En attente', color: 'neutral', hexColor: '#6b7280' }, // provisoire
];

export const POD_OPTIONS = [
  { value: 'avec', label: 'Avec POD' },
  { value: 'sans', label: 'Sans POD' },
];

// Villes utilisées pour la répartition sur la carte du Maroc (étape carte)
const VILLES = ['Rabat', 'Casablanca', 'Fes', 'Tanger', 'Marrakech', 'Agadir'];

export const shipments = [
  {
    id: 1,
    codeEnvoi: 'QB183609979MA',
    expediteur: "Academie Regional De L'Education Et Formation Regi",
    dateDepot: '2026-06-19T13:51:00',
    statut: 'livre',
    dateStatut: '2026-06-22T13:17:00',
    pod: false,
    dateExport: null,
    ville: 'Rabat',
  },
  {
    id: 2,
    codeEnvoi: 'QB183610012MA',
    expediteur: 'Office National des Chemins de Fer',
    dateDepot: '2026-06-16T14:05:00',
    statut: 'livre',
    dateStatut: '2026-06-17T23:00:00',
    pod: false,
    dateExport: null,
    ville: 'Casablanca',
  },
  {
    id: 3,
    codeEnvoi: 'QB183610587MA',
    expediteur: 'Agence Urbaine de Rabat',
    dateDepot: '2026-06-15T09:45:00',
    statut: 'livre',
    dateStatut: '2026-06-16T13:16:00',
    pod: true,
    podImageUrl: 'https://placehold.co/500x350?text=POD+Signature', // placeholder — à remplacer par la vraie image
    dateExport: '2026-06-16T15:00:00',
    ville: 'Rabat',
  },
  {
    id: 4,
    codeEnvoi: 'QB183611203MA',
    expediteur: 'Ministère de la Jeunesse et des Sports',
    dateDepot: '2026-06-08T12:01:00',
    statut: 'livre',
    dateStatut: '2026-06-12T14:54:00',
    pod: false,
    dateExport: null,
    ville: 'Fès',
  },
  {
    id: 5,
    codeEnvoi: 'QB183611998MA',
    expediteur: 'Caisse Nationale de Sécurité Sociale',
    dateDepot: '2026-06-10T13:12:00',
    statut: 'en_cours',
    dateStatut: '2026-06-11T23:00:00',
    pod: false,
    dateExport: null,
    ville: 'Tanger',
  },
  {
    id: 6,
    codeEnvoi: 'QB183612440MA',
    expediteur: 'Académie Régionale Marrakech-Safi',
    dateDepot: '2026-06-03T12:49:00',
    statut: 'livre',
    dateStatut: '2026-06-04T13:24:00',
    pod: true,
    podImageUrl: 'https://placehold.co/500x350?text=POD+Signature', // placeholder — à remplacer par la vraie image
    dateExport: '2026-06-05T09:30:00',
    ville: 'Marrakech',
  },
  {
    id: 7,
    codeEnvoi: 'QB183613087MA',
    expediteur: 'Agence Nationale de la Conservation Foncière',
    dateDepot: '2026-05-21T14:52:00',
    statut: 'en_attente',
    dateStatut: '2026-05-21T23:00:00',
    pod: false,
    dateExport: null,
    ville: 'Agadir',
  },
];

// Helper pour la recherche par code (étape "Rechercher un code d'envoi")
export function findShipmentByCode(code) {
  return shipments.find(
    (s) => s.codeEnvoi.toLowerCase() === code.trim().toLowerCase()
  );
}

// Helper pour les stats (Dashboard) — calcule les totaux par statut
// Accepte une liste optionnelle (déjà filtrée) ; sinon utilise tous les envois.
export function getStatusBreakdown(list = shipments) {
  return STATUSES.map((status) => ({
    label: status.label,
    color: status.hexColor,
    count: list.filter((s) => s.statut === status.value).length,
  }));
}
// Helper pour les stats POD
export function getPodBreakdown(list = shipments) {
  const avec = list.filter((s) => s.pod).length;
  const sans = list.length - avec;
  return [
    { label: 'Avec POD', value: avec, color: '#2f6b2f' },
    { label: 'Sans POD', value: sans, color: '#6b7280' },
  ];
}
// Helper pour la carte (regroupement par ville)
export function getShipmentsByCity(list = shipments) {
  const grouped = {};
  VILLES.forEach((v) => (grouped[v] = 0));
  list.forEach((s) => {
    grouped[s.ville] = (grouped[s.ville] || 0) + 1;
  });
  return grouped;
}

// Regroupe les envois par mois (basé sur la date de dépôt) pour le graphique linéaire.
export function getShipmentsTimeline(list = shipments) {
  const grouped = {};

  list.forEach((s) => {
    const date = new Date(s.dateDepot);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    grouped[key] = (grouped[key] || 0) + 1;
  });

  const MONTHS_FR = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
  ];

  return Object.keys(grouped)
    .sort()
    .map((key) => {
      const [year, month] = key.split('-');
      return {
        label: `${MONTHS_FR[Number(month) - 1]} ${year}`,
        total: grouped[key],
      };
    });
}