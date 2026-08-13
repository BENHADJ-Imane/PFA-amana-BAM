import { useState } from 'react';
import {
  shipments,
  getStatusBreakdown,
  getPodBreakdown,
} from '../../data/mockData';
import { filterShipments, EMPTY_FILTERS } from '../../utils/filterShipments';
import FilterBar from '../../components/filters/FilterBar/FilterBar';
import DonutChart from '../../components/charts/DonutChart/DonutChart';
import './Dashboard.css';

function Dashboard() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const filteredShipments = filterShipments(shipments, filters);
  const statusData = getStatusBreakdown(filteredShipments);
  const podData = getPodBreakdown(filteredShipments);

  return (
    <div>
      <h1>Mes Statistiques</h1>
      <FilterBar filters={filters} onChange={setFilters} onReset={setFilters} />
      <p className="results-count">{filteredShipments.length} Colis</p>

      <div className="dashboard-charts-grid">
        <DonutChart title="Détail des statuts" data={statusData} />
        <DonutChart title="Statut des POD" data={podData} />
      </div>
    </div>
  );
}

export default Dashboard;