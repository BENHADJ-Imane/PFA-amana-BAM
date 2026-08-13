import { X } from 'lucide-react';
import './PODModal.css';

function PODModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    <div className="pod-modal-overlay" onClick={onClose}>
      <div className="pod-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="pod-modal-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
        <h3 className="pod-modal-title">Preuve de livraison</h3>
        <img src={imageUrl} alt="Preuve de livraison" className="pod-modal-image" />
      </div>
    </div>
  );
}

export default PODModal;