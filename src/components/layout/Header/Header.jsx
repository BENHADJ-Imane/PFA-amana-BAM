import './Header.css';

function Header() {
  // Données utilisateur en dur pour l'instant.
  // Cette information n'est pas encore définie côté backend :
  // à remplacer plus tard par les données réelles (auth / API).
  const user = {
    name: 'User1 Backoffice1',
    profile: 'Backoffice',
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" aria-label="Menu">
          <span className="menu-icon" />
        </button>
        <div className="header-info">
          <span className="header-info-label">BIENVENUE</span>
          <span className="header-info-value">{user.name}</span>
        </div>
        <div className="header-divider" />
        <div className="header-info">
          <span className="header-info-label">PROFIL</span>
          <span className="header-info-value">{user.profile}</span>
        </div>
      </div>

      <div className="header-center">
        <span className="header-logo">amana</span>
      </div>

      <div className="header-right">
        <div className="header-avatar">U</div>
      </div>
    </header>
  );
}

export default Header;