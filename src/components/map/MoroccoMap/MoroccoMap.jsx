import { ComposableMap, Geographies, Geography, Marker } from '@vnedyalk0v/react19-simple-maps';
import { useState } from 'react';
import moroccoGeo from '../../../data/moroccoGeo.json';
import { CITY_COORDINATES } from '../../../utils/moroccoCoordinates';
import './MoroccoMap.css';

function MoroccoMap({ cityData }) {
  const [hoveredCity, setHoveredCity] = useState(null);

  const total = Object.values(cityData).reduce((sum, v) => sum + v, 0);

  return (
    <div className="morocco-map-card">
      {total === 0 ? (
        <p className="morocco-map-empty">Aucune donnee pour cette periode.</p>
      ) : (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-6, 29], scale: 1400 }}
          width={260}
          height={340}
          className="morocco-map-svg"
        >
          <Geographies geography={moroccoGeo}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="var(--color-bg-alt)"
                  stroke="var(--color-border)"
                  strokeWidth={1}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {Object.entries(cityData)
            .filter(([, count]) => count > 0)
            .map(([city, count]) => {
              const coords = CITY_COORDINATES[city];
              if (!coords) return null;

              return (
                <Marker
                  key={city}
                  coordinates={coords}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <circle r={11} fill="var(--color-primary)" opacity={0.9} />
                  <text
                    textAnchor="middle"
                    dy={4}
                    fill="white"
                    fontSize={10}
                    fontWeight={700}
                  >
                    {count}
                  </text>

                  {hoveredCity === city && (
                    <g transform="translate(0, -24)">
                      <rect x={-38} y={-13} width={76} height={22} rx={4} fill="var(--color-secondary)" />
                      <text textAnchor="middle" dy={2} fill="white" fontSize={10}>
                        {city} : {count}
                      </text>
                    </g>
                  )}
                </Marker>
              );
            })}
        </ComposableMap>
      )}
    </div>
  );
}

export default MoroccoMap;