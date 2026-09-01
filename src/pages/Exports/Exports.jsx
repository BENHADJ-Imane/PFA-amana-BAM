import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { fetchShipments } from '../../services/api';
import { EMPTY_FILTERS } from '../../utils/filterShipments';
import { exportShipmentsToCsv } from '../../utils/exportCsv';
import { formatDateTime } from '../../utils/formatDate';
import FilterBar from '../../components/filters/FilterBar/FilterBar';
import StatusBadge from '../../components/common/StatusBadge/StatusBadge';
import './Exports.css';

function Exports() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchShipments(filters)
      .then((data) => setShipments(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  const exported = shipments.filter((s) => s.dateExport);
  const notExported = shipments.filter((s) => !s.dateExport);

  const handleExport = () => {
    exportShipmentsToCsv(shipments, `export-envois-${Date.now()}.csv`);
  };

  return (
    <div>
      <h1>Mes exports</h1>
      <FilterBar filters={filters} onChange={setFilters} onReset={setFilters} />

      {loading && <p className="results-count">Chargement...</p>}
      {error && <p className="results-count">Erreur : {error}</p>}

      {!loading && !error && (
        <>
          <div className="exports-summary">
            <p className="results-count">
              {exported.length} exportés / {notExported.length} non exportés
            </p>
            <button className="exports-download-btn" onClick={handleExport}>
              <Download size={16} />
              Exporter (CSV)
            </button>
          </div>

          <div className="table-wrapper">
            <table className="shipments-table">
              <thead>
                <tr>
                  <th>Code d'envoi</th>
                  <th>Statut</th>
                  <th>Date d'export</th>
                </tr>
              </thead>
              <tbody>
                {exported.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="table-empty">
                      Aucun envoi exporté pour l'instant.
                    </td>
                  </tr>
                ) : (
                  exported.map((s) => (
                    <tr key={s.id}>
                      <td>{s.codeEnvoi}</td>
                      <td><StatusBadge statusValue={s.statut} /></td>
                      <td>{formatDateTime(s.dateExport)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Exports;