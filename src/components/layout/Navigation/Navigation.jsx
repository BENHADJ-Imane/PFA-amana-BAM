import { NavLink } from 'react-router-dom';
import './Navigation.css';

const NAV_ITEMS = [
  { label: 'Mes Statistiques', path: '/' },
  { label: 'Mes envois', path: '/envois' },
  { label: "Rechercher un code d'envoi", path: '/recherche' },
  { label: 'Mes exports', path: '/exports' },
];

function Navigation() {
  return (
    <nav className="navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            isActive ? 'nav-item nav-item-active' : 'nav-item'
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;