import { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { fetchShipmentByCode } from '../../services/api';
import ShipmentDetailCard from '../../components/shipment/ShipmentDetailCard/ShipmentDetailCard';
import './TrackingSearch.css';

function TrackingSearch() {
  const [code, setCode] = useState('');
  const [searchedShipment, setSearchedShipment] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const result = await fetchShipmentByCode(code.trim());
      setSearchedShipment(result);
    } catch (err) {
      // 404 ou toute autre erreur -> on considere l'envoi comme non trouve
      setSearchedShipment(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div>
      <h1>Rechercher un code d'envoi</h1>

      <div className="tracking-search-bar">
        <label>Code d'envoi</label>
        <div className="tracking-search-input">
          <input
            type="text"
            placeholder="Ex: QB183609979MA"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <MessageSquare size={18} className="tracking-search-icon" />
          <button
            className="tracking-search-btn"
            onClick={handleSearch}
            aria-label="Rechercher"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {loading && <p className="tracking-search-empty">Recherche...</p>}

      {!loading && hasSearched && !searchedShipment && (
        <p className="tracking-search-empty">
          Aucun envoi trouvé pour ce code.
        </p>
      )}

      {!loading && searchedShipment && (
        <ShipmentDetailCard shipment={searchedShipment} />
      )}
    </div>
  );
}

export default TrackingSearch;