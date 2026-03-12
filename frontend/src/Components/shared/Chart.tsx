import PropTypes from 'prop-types';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { chartColors } from '../../utils/chartHelpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function LineChart({ data, title, height = 300 }) {
  const chartData = {
    labels: data.map(d => d.date || d.label),
    datasets: [
      {
        label: title || 'Data',
        data: data.map(d => d.count || d.value),
        borderColor: chartColors.accent,
        backgroundColor: `${chartColors.accent}20`,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: chartColors.accent,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: chartColors.primary,
        padding: 12,
        borderRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { color: chartColors.muted },
      },
      x: {
        grid: { display: false },
        ticks: { color: chartColors.muted },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export function BarChart({ data, title, height = 300 }) {
  const chartData = {
    labels: data.map(d => d.name || d.label),
    datasets: [
      {
        label: title || 'Count',
        data: data.map(d => d.count || d.value),
        backgroundColor: chartColors.accent,
        borderRadius: 8,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: chartColors.primary,
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { color: chartColors.muted },
      },
      x: {
        grid: { display: false },
        ticks: { color: chartColors.muted },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export function PieChart({ data, height = 300 }) {
  const chartData = {
    labels: data.map(d => d.name || d.label),
    datasets: [
      {
        data: data.map(d => d.value || d.count),
        backgroundColor: [
          chartColors.accent,
          chartColors.primary,
          chartColors.success,
          chartColors.warning,
          chartColors.error,
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 },
          color: chartColors.muted,
        },
      },
      tooltip: {
        backgroundColor: chartColors.primary,
        padding: 12,
        borderRadius: 8,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  height: PropTypes.number,
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  height: PropTypes.number,
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number,
};

export default { LineChart, BarChart, PieChart };
