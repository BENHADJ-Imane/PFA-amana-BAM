// Filtre une liste d'envois selon un objet de filtres.
// Réutilisé par la page "Mes envois" et plus tard par le Dashboard.
export function filterShipments(shipments, filters) {
  return shipments.filter((s) => {
    if (
      filters.code &&
      !s.codeEnvoi.toLowerCase().includes(filters.code.toLowerCase())
    ) {
      return false;
    }

    if (filters.statut && s.statut !== filters.statut) {
      return false;
    }

    if (filters.pod === 'avec' && !s.pod) return false;
    if (filters.pod === 'sans' && s.pod) return false;

    if (filters.dateDepotFrom && s.dateDepot < filters.dateDepotFrom) {
      return false;
    }
    if (
      filters.dateDepotTo &&
      s.dateDepot > `${filters.dateDepotTo}T23:59:59`
    ) {
      return false;
    }

    if (filters.dateStatutFrom && s.dateStatut < filters.dateStatutFrom) {
      return false;
    }
    if (
      filters.dateStatutTo &&
      s.dateStatut > `${filters.dateStatutTo}T23:59:59`
    ) {
      return false;
    }

    return true;
  });
}

export const EMPTY_FILTERS = {
  code: '',
  dateDepotFrom: '',
  dateDepotTo: '',
  dateStatutFrom: '',
  dateStatutTo: '',
  statut: '',
  pod: '',
};