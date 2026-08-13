import './InfoCard.css';

function InfoCard({ icon: Icon, iconColor, label, children }) {
  return (
    <div className="info-card">
      <div className={`info-card-icon info-card-icon-${iconColor}`}>
        <Icon size={20} />
      </div>
      <div className="info-card-content">
        <span className="info-card-label">{label}</span>
        <div className="info-card-value">{children}</div>
      </div>
    </div>
  );
}

export default InfoCard;