import { useState } from 'react';
import { User, Tag, Calendar, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { formatDateTime } from '../../../utils/formatDate';
import InfoCard from '../../common/InfoCard/InfoCard';
import StatusBadge from '../../common/StatusBadge/StatusBadge';
import PODModal from '../../common/PODModal/PODModal';
import './ShipmentDetailCard.css';

function ShipmentDetailCard({ shipment }) {
  const [showPod, setShowPod] = useState(false);

  return (
    <div className="shipment-detail-card">
      <InfoCard icon={User} iconColor="orange" label="Expéditeur">
        {shipment.expediteur}
      </InfoCard>

      <InfoCard icon={Tag} iconColor="blue" label="Code d'envoi">
        {shipment.codeEnvoi}
      </InfoCard>

      <InfoCard icon={Calendar} iconColor="green" label="Date de dépôt">
        {formatDateTime(shipment.dateDepot)}
      </InfoCard>

      <InfoCard icon={CheckCircle} iconColor="green" label="Statut">
        <StatusBadge statusValue={shipment.statut} />
      </InfoCard>

      <InfoCard icon={Calendar} iconColor="purple" label="Date du statut">
        {formatDateTime(shipment.dateStatut)}
      </InfoCard>

      <InfoCard icon={ImageIcon} iconColor="orange" label="Preuve de livraison">
        {shipment.pod ? (
          <button className="pod-link-btn" onClick={() => setShowPod(true)}>
            Voir la preuve de livraison
          </button>
        ) : (
          'Aucune preuve de livraison'
        )}
      </InfoCard>

      {showPod && (
        <PODModal
          imageUrl={shipment.podImageUrl}
          onClose={() => setShowPod(false)}
        />
      )}
    </div>
  );
}

export default ShipmentDetailCard;