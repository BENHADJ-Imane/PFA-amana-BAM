import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Navigation from './components/layout/Navigation/Navigation';
import Footer from './components/layout/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import Shipments from './pages/Shipments/Shipments';
import TrackingSearch from './pages/TrackingSearch/TrackingSearch';
import Exports from './pages/Exports/Exports';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/envois" element={<Shipments />} />
          <Route path="/recherche" element={<TrackingSearch />} />
          <Route path="/exports" element={<Exports />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;