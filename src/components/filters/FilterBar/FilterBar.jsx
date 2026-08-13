import { Search, RotateCcw } from 'lucide-react';
import { STATUSES, POD_OPTIONS } from '../../../data/mockData';
import { EMPTY_FILTERS } from '../../../utils/filterShipments';
import DateField from '../DateField/DateField';
import './FilterBar.css';

function FilterBar({ filters, onChange, onReset }) {
  const handleField = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-field filter-field-code">
        <label>Code d'envoi</label>
        <div className="filter-code-input">
          <Search size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.code}
            onChange={(e) => handleField('code', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>Date dépôt</label>
        <div className="filter-date-range">
          <span>Du :</span>
          <DateField
            value={filters.dateDepotFrom}
            onChange={(v) => handleField('dateDepotFrom', v)}
          />
          <span>Au :</span>
          <DateField
            value={filters.dateDepotTo}
            onChange={(v) => handleField('dateDepotTo', v)}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>Date statut</label>
        <div className="filter-date-range">
          <span>Du :</span>
          <DateField
            value={filters.dateStatutFrom}
            onChange={(v) => handleField('dateStatutFrom', v)}
          />
          <span>Au :</span>
          <DateField
            value={filters.dateStatutTo}
            onChange={(v) => handleField('dateStatutTo', v)}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>Statut</label>
        <select
          value={filters.statut}
          onChange={(e) => handleField('statut', e.target.value)}
        >
          <option value="">Tout statut</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label>POD</label>
        <select
          value={filters.pod}
          onChange={(e) => handleField('pod', e.target.value)}
        >
          <option value="">Tout POD</option>
          {POD_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <button
        className="filter-reset-btn"
        onClick={() => onReset(EMPTY_FILTERS)}
      >
        <RotateCcw size={16} />
        Reset Filters
      </button>
    </div>
  );
}

export default FilterBar;