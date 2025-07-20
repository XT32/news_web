import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../../../css/card.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const LineChart = ({ title, labels, datasetLabel, dataValues, color }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: dataValues,
        fill: false,
        borderColor: color || '#3A5B22',
        backgroundColor: color || '#3A5B22',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: title
      }
    }
  };

  return (
    <div className="chartContainer">
      <div className="chartWrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
