import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Import BarElement
  Title,
  Tooltip,
  Legend,
 } from 'chart.js';

 import './css/HomePage.css'; // Import the CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 
 ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Register BarElement
  Title,
  Tooltip,
  Legend
 );
 

function HomePage() {
  const [location, setLocation] = useState('Location A');
  const [h2GasConc, setH2GasConc] = useState(30); // Example live reading
  const [weeklyAvg, setWeeklyAvg] = useState(30);
  const [monthlyAvg, setMonthlyAvg] = useState(25);
  const [yearlyAvg, setYearlyAvg] = useState(15);
  const [cleaningStatus, setCleaningStatus] = useState('Done');
  const [nextRun, setNextRun] = useState('27/01/2023 11:59:00 pm');
  const [chartData, setChartData] = useState({
    labels: ['01:00:00', '01:01:00', '01:02:00', '01:03:00', '01:04:00', '01:05:00', '01:06:00', '01:07:00', '01:08:00', '01:09:00', '01:10:00', '01:11:00', '01:12:00', '01:13:00', '01:14:00', '01:15:00', '01:16:00', '01:17:00', '01:18:00', '01:19:00', '01:20:00', '01:21:00', '01:22:00', '01:23:00', '01:24:00', '01:25:00', '01:26:00', '01:27:00', '01:28:00', '01:29:00'],
    datasets: [
      {
        label: 'Methane concentration',
        data: [30, 20, 25, 40, 60, 130, 110, 70, 85, 65, 22, 55, 88, 72, 84, 100, 222, 111, 56, 70, 89, 90, 110], // Example Data
        backgroundColor: 'rgba(0, 150, 136, 0.5)',
        borderColor: 'rgba(0, 150, 136, 1)',
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Methane Concentration Over Time',
      },
    },
  };

  // Example data for the location dropdown
  const locations = ['Location A', 'Location B', 'Location C'];

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    // In a real app, you would fetch data based on the selected location here
  };

  // Example data for select
  const [selectValue, setSelectValue] = useState('');
  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Top Row */}
      <div className="top-row">
        <div className="date-time-location">
          <p className="date">27 January 2023</p>
          <p className="time">01:29:20 PM</p>
          <div className="location-selector">
            <select value={location} onChange={handleLocationChange}>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <button>Start</button>
            <button>Stop</button>
          </div>
        </div>

        <div className="h2-gas-conc">
          <h3>H<sub>2</sub> gas conc.</h3>
          <div className="gauge">
            <div className="gauge-body">
              <div className="gauge-fill" style={{ transform: `rotate(${h2GasConc * 1.8 - 90}deg)` }}></div>
              <div className="gauge-cover">{h2GasConc} ppm</div>
            </div>
          </div>
          <p className="live-reading">● LIVE reading</p>
        </div>

        <div className="average-h2-gas">
          <h3>Average H<sub>2</sub> gas concentration</h3>
          <div className="average-values">
            <div className="weekly">
              <h4>Weekly</h4>
              <p>{weeklyAvg} ppm</p>
            </div>
            <div className="monthly">
              <h4>Monthly</h4>
              <p>{monthlyAvg} ppm</p>
            </div>
            <div className="yearly">
              <h4>Yearly</h4>
              <p>{yearlyAvg} ppm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        <div className="methane-concentration-chart">
          <Chart type='bar' data={chartData} options={options} />
        </div>

        <div className="location-selector-bottom">
          <select value={location} onChange={handleLocationChange}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select value={selectValue} onChange={handleSelectChange}>
            <option value="">Select</option>
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="electrochemical-cleaning">
          <h3>Electrochemical cleaning procedure</h3>
          <p>Status: {cleaningStatus}</p>
          <p>Date: 26/01/2023</p>
          <p>Time: 11:59:00 pm</p>
          <p>Next run: {nextRun}</p>
          <div className="method-controls">
            <button>Run</button>
            <button>Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;