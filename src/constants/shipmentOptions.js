// Statuts possibles d'un envoi - CONFIRMES par l'encadrant.
export const STATUSES = [
  { value: 'livre', label: 'Envoi livré', color: 'success', hexColor: '#2f6b2f' },
  { value: 'en_cours', label: 'En cours de livraison', color: 'warning', hexColor: '#b8860b' },
  { value: 'en_attente', label: 'En attente', color: 'neutral', hexColor: '#6b7280' },
];

export const POD_OPTIONS = [
  { value: 'avec', label: 'Avec POD' },
  { value: 'sans', label: 'Sans POD' },
];