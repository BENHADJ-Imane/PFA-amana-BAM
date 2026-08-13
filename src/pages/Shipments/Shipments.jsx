import { useState, useMemo } from 'react';
import { shipments } from '../../data/mockData';
import { filterShipments, EMPTY_FILTERS } from '../../utils/filterShipments';
import FilterBar from '../../components/filters/FilterBar/FilterBar';
import ShipmentsTable from '../../components/table/ShipmentsTable/ShipmentsTable';
import Pagination from '../../components/table/Pagination/Pagination';

function Shipments() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredShipments = filterShipments(shipments, filters);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredShipments.length / pageSize)
  );

  // Si le filtrage réduit le nombre de pages en dessous de la page actuelle,
  // on revient automatiquement à la dernière page valide.
  const safePage = Math.min(currentPage, totalPages);

  const paginatedShipments = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredShipments.slice(start, start + pageSize);
  }, [filteredShipments, safePage, pageSize]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // on repart à la page 1 à chaque changement de filtre
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Mes envois</h1>
      <FilterBar
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleFiltersChange}
      />
      <p className="results-count">{filteredShipments.length} Colis</p>
      <ShipmentsTable shipments={paginatedShipments} />
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}

export default Shipments;