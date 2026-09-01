import { useState, useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import moroccoGeo from '../../../data/moroccoGeo.json';
import { CITY_COORDINATES } from '../../../utils/moroccoCoordinates';
import './MoroccoMap.css';

const WIDTH = 260;
const HEIGHT = 340;

function MoroccoMap({ cityData }) {
  const [hoveredCity, setHoveredCity] = useState(null);

  const total = Object.values(cityData).reduce((sum, v) => sum + v, 0);

  const projection = useMemo(
    () => geoMercator().fitSize([WIDTH, HEIGHT], moroccoGeo.features[0]),
    []
  );

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);
  const moroccoPath = pathGenerator(moroccoGeo.features[0]);
  console.log('cityData reçu:', cityData);
console.log('longueur du path:', moroccoPath ? moroccoPath.length : 'PATH VIDE');
 console.log('bbox du path:', pathGenerator.bounds(moroccoGeo.features[0]));
console.log('positions des villes:', Object.keys(cityData).map(city => {
  const coords = CITY_COORDINATES[city];
  return coords ? { city, coords, projected: projection(coords) } : { city, coords: 'MANQUANT' };
}));
  return (
    <div className="morocco-map-card">
      {total === 0 ? (
        <p className="morocco-map-empty">Aucune donnee pour cette periode.</p>
      ) : (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="morocco-map-svg">
          <path d={moroccoPath} fill="#f7f7f8" stroke="#e5e7eb" strokeWidth="1.5" />

          {Object.entries(cityData)
            .filter(([, count]) => count > 0)
            .map(([city, count]) => {
              const coords = CITY_COORDINATES[city];
              if (!coords) return null;

              const [x, y] = projection(coords);

              return (
                <g
                  key={city}
                  transform={`translate(${x}, ${y})`}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                  className="morocco-map-marker"
                >
                  <circle r="13" fill="#f2711c" opacity="0.9" />
                  <text textAnchor="middle" dy="4" fill="white" fontSize="11" fontWeight="700">
                    {count}
                  </text>

                  {hoveredCity === city && (
                    <g transform="translate(0, -26)">
                      <rect x="-40" y="-14" width="80" height="24" rx="4" fill="#1b2a63" />
                      <text textAnchor="middle" dy="2" fill="white" fontSize="11">
                        {city} : {count}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
        </svg>
      )}
    </div>
  );
}

export default MoroccoMap;