import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './EnvoisLineChart.css';

function EnvoisLineChart({ data }) {
  return (
    <div className="line-chart-card">
      {data.length === 0 ? (
        <p className="line-chart-empty">Aucune donnée pour cette période.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="left"
              iconType="circle"
              formatter={() => 'Total Envois'}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4, fill: '#2563eb' }}
              name="Total Envois"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default EnvoisLineChart;