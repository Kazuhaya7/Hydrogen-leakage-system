import React from 'react';
import './css/LogHistoryPage.css';

function LogHistoryPage() {
  // Dummy data for log history
  const logData = [
    { id: 1, timestamp: '2024-01-01 10:00:00', event: 'System started' },
    { id: 2, timestamp: '2024-01-01 10:01:00', event: 'User logged in' },
    { id: 3, timestamp: '2024-01-01 10:05:00', event: 'Methane level detected (20ppm)' },
    { id: 4, timestamp: '2024-01-01 10:10:00', event: 'Graph data exported' },
    { id: 5, timestamp: '2024-01-01 10:15:00', event: 'System check passed' },
    { id: 6, timestamp: '2024-01-01 10:20:00', event: 'User logged out' },
  ];

  return (
    <div className="log-history-container">
      <h2>Log History</h2>
      <table className="log-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogHistoryPage;