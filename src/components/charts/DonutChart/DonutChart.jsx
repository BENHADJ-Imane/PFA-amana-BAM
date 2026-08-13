import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './DonutChart.css';

function DonutChart({ title, data }) {
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.count ?? item.value,
    color: item.color,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const getPercentage = (value) => {
    if (total === 0) return '0.0';
    return ((value / total) * 100).toFixed(1);
  };

  const renderTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const entry = payload[0];
    return (
      <div className="donut-chart-tooltip">
        <strong>{entry.name}</strong>
        <br />
        {entry.value} ({getPercentage(entry.value)}%)
      </div>
    );
  };

  return (
    <div className="donut-chart-card">
      <h3 className="donut-chart-title">{title}</h3>

      {total === 0 ? (
        <p className="donut-chart-empty">Aucune donnée pour cette période.</p>
      ) : (
        <>
          <div className="donut-chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-chart-center-label">
              <span className="donut-chart-center-value">{total}</span>
              <span className="donut-chart-center-caption">Total</span>
            </div>
          </div>

          <div className="donut-chart-legend">
            {chartData.map((entry, index) => (
              <div key={index} className="donut-chart-legend-item">
                <span
                  className="donut-chart-legend-dot"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="donut-chart-legend-label">{entry.name}</span>
                <span className="donut-chart-legend-percent">
                  {getPercentage(entry.value)}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DonutChart;