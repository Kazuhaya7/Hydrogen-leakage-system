import React, { useState } from 'react';
import { Chart } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import './css/GraphPage.css'; // Import CSS

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraphPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); // Initialize endDate
  const [data, setData] = useState([30, 20, 25, 40, 60, 130, 110, 70, 85, 65, 22, 55, 88, 72, 84, 100, 222, 111, 56, 70, 89, 90, 110]);
  const [labels, setLabels] = useState(['01:00:00', '01:01:00', '01:02:00', '01:03:00', '01:04:00', '01:05:00', '01:06:00', '01:07:00', '01:08:00', '01:09:00', '01:10:00', '01:11:00', '01:12:00', '01:13:00', '01:14:00', '01:15:00', '01:16:00', '01:17:00', '01:18:00', '01:19:00', '01:20:00', '01:21:00', '01:22:00', '01:23:00', '01:24:00', '01:25:00', '01:26:00', '01:27:00', '01:28:00', '01:29:00']);

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'Methane concentration',
        data: data,
        backgroundColor: 'rgba(0, 150, 136, 0.5)',
        borderColor: 'rgba(0, 150, 136, 1)',
        borderWidth: 1,
      },
    ],
  });
  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Methane Concentration Over Time',
      },
    },
  };

  const handleDateRangeChange = () => {
    // **IMPORTANT:** Replace with your data fetching logic. Fetch data from your backend
    //  based on the selected date range.

    // For this example, we'll just simulate filtering the existing data.
    const newData = [30, 20, 25, 40, 60, 130, 110, 70, 85, 65, 22, 55, 88, 72, 84, 100, 222, 111, 56, 70, 89, 90, 110];
    const newLabels = ['01:00:00', '01:01:00', '01:02:00', '01:03:00', '01:04:00', '01:05:00', '01:06:00', '01:07:00', '01:08:00', '01:09:00', '01:10:00', '01:11:00', '01:12:00', '01:13:00', '01:14:00', '01:15:00', '01:16:00', '01:17:00', '01:18:00', '01:19:00', '01:20:00', '01:21:00', '01:22:00', '01:23:00', '01:24:00', '01:25:00', '01:26:00', '01:27:00', '01:28:00', '01:29:00'];
    setData(newData)
    setLabels(newLabels)
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Methane concentration',
          data: newData,
          backgroundColor: 'rgba(0, 150, 136, 0.5)',
          borderColor: 'rgba(0, 150, 136, 1)',
          borderWidth: 1,
        },
      ],
    })
  };

  const exportToCSV = async () => {
    // Create CSV data
    const csvData = chartData.labels.map((label, index) => ({
      Time: label,
      'Methane Concentration': chartData.datasets[0].data[index],
    }));

    // Use Papa.unparse to convert JSON to CSV string
    const csv = Papa.unparse(csvData);

    // Create a Blob object from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const { saveAs } = await import('file-saver');

    // Save the CSV file using FileSaver.js
    saveAs(blob, 'methane_concentration.csv');
  };

  return (
    <div className="graph-page-container">
      <h2>Methane Concentration Graph</h2>
      <div className="date-range-selector">
        <div className="date-picker">
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd" // Date format
            id="startDate"
          />
        </div>
        <div className="date-picker">
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd" // Date format
            id="endDate"
          />
        </div>
        <button onClick={handleDateRangeChange}>Apply Date Range</button>
      </div>
      <div className="chart-container">
        <Chart type='bar' data={chartData} options={options} />
      </div>
      <button onClick={exportToCSV} className="export-button">Export to CSV</button>
    </div>
  );
}

export default GraphPage;