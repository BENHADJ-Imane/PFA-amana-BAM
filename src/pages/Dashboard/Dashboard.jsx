import { useState, useEffect } from 'react';
import { STATUSES } from '../../constants/shipmentOptions';
import { fetchStatistics } from '../../services/api';
import { EMPTY_FILTERS } from '../../utils/filterShipments';
import FilterBar from '../../components/filters/FilterBar/FilterBar';
import DonutChart from '../../components/charts/DonutChart/DonutChart';
import EnvoisLineChart from '../../components/charts/EnvoisLineChart/EnvoisLineChart';
import MoroccoMap from '../../components/map/MoroccoMap/MoroccoMap';
import './Dashboard.css';

const MONTHS_FR = [
  'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin',
  'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Convertit le statusBreakdown backend (statut en majuscules) vers le format
// attendu par DonutChart (label francais + couleur), en s'appuyant sur STATUSES.
function mapStatusBreakdown(backendData) {
  return STATUSES.map((s) => {
    const found = backendData.find(
      (b) => b.statut.toLowerCase() === s.value
    );
    return { label: s.label, color: s.hexColor, count: found ? found.count : 0 };
  });
}

function mapPodBreakdown(backendData) {
  const avec = backendData.find((b) => b.label === 'avec');
  const sans = backendData.find((b) => b.label === 'sans');
  return [
    { label: 'Avec POD', color: '#2f6b2f', count: avec ? avec.count : 0 },
    { label: 'Sans POD', color: '#6b7280', count: sans ? sans.count : 0 },
  ];
}

function mapTimeline(backendData) {
  return backendData.map((point) => {
    const [year, month] = point.yearMonth.split('-');
    return {
      label: `${MONTHS_FR[Number(month) - 1]} ${year}`,
      total: point.count,
    };
  });
}

function mapCityData(backendData) {
  const result = {};
  backendData.forEach((c) => {
    result[c.ville] = c.count;
  });
  return result;
}

function Dashboard() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchStatistics(filters)
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  const totalColis = stats
    ? stats.statusBreakdown.reduce((sum, s) => sum + s.count, 0)
    : 0;

  return (
    <div>
      <h1>Mes Statistiques</h1>
      <FilterBar filters={filters} onChange={setFilters} onReset={setFilters} />

      {loading && <p className="results-count">Chargement...</p>}
      {error && <p className="results-count">Erreur : {error}</p>}

      {!loading && !error && stats && (
        <>
          <p className="results-count">{totalColis} Colis</p>

          <div className="dashboard-charts-grid">
            <DonutChart
              title="Détail des statuts"
              data={mapStatusBreakdown(stats.statusBreakdown)}
            />
            <DonutChart
              title="Statut des POD"
              data={mapPodBreakdown(stats.podBreakdown)}
            />
          </div>

          <div className="dashboard-bottom-grid">
            <EnvoisLineChart data={mapTimeline(stats.timeline)} />
            <MoroccoMap cityData={mapCityData(stats.byCity)} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;