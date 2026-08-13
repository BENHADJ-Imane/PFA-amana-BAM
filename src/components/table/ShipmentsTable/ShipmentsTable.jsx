import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { formatDateTime } from '../../../utils/formatDate';
import StatusBadge from '../../common/StatusBadge/StatusBadge';
import PODModal from '../../common/PODModal/PODModal';
import './ShipmentsTable.css';

function ShipmentsTable({ shipments }) {
  const [podToShow, setPodToShow] = useState(null);

  if (shipments.length === 0) {
    return <p className="table-empty">Aucun envoi trouvé.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="shipments-table">
        <thead>
          <tr>
            <th>Date dépôt</th>
            <th>Statut</th>
            <th>Date statut</th>
            <th>POD</th>
            <th>Date d'export</th>
            <th>Imprimer</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{formatDateTime(shipment.dateDepot)}</td>
              <td>
                <StatusBadge statusValue={shipment.statut} />
              </td>
              <td>{formatDateTime(shipment.dateStatut)}</td>
              <td>
                {shipment.pod ? (
                  <button
                    className="pod-icon-btn"
                    aria-label="Voir le POD"
                    onClick={() => setPodToShow(shipment.podImageUrl)}
                  >
                    <ImageIcon size={18} />
                  </button>
                ) : (
                  ''
                )}
              </td>
              <td>{formatDateTime(shipment.dateExport)}</td>
              <td>
                <button className="print-btn" aria-label="Imprimer">
                  🖨
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PODModal imageUrl={podToShow} onClose={() => setPodToShow(null)} />
    </div>
  );
}

export default ShipmentsTable;