import { STATUSES } from '../../../data/mockData';
import './StatusBadge.css';

function StatusBadge({ statusValue }) {
  const status = STATUSES.find((s) => s.value === statusValue);

  if (!status) return null;

  return (
    <span className={`status-badge status-badge-${status.color}`}>
      {status.label}
    </span>
  );
}

export default StatusBadge;