// Genere et declenche le telechargement d'un fichier CSV a partir d'une liste d'envois.
// Provisoire : le fichier est genere cote navigateur, rien n'est envoye au backend.
export function exportShipmentsToCsv(shipments, filename = 'export-envois.csv') {
  const headers = ['Code envoi', 'Expediteur', 'Date depot', 'Statut', 'Date statut', 'POD', 'Ville'];

  const rows = shipments.map((s) => [
    s.codeEnvoi,
    s.expediteur,
    s.dateDepot,
    s.statut,
    s.dateStatut,
    s.pod ? 'Oui' : 'Non',
    s.ville || '',
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}