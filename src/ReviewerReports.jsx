import React, { useState } from 'react';
import Threads from './Threads';
import './ReviewerReports.css';

const ReviewerReports = ({ onBack, onNavigateToLanding }) => {
  const [reports, setReports] = useState([
    // Sample data - replace with actual data later
    // { id: 1, name: 'Report 1', status: 'Completed', trustScore: 85, date: '2025-11-01' },
  ]);

  return (
    <div className="reviewer-reports-wrapper">
      {/* Background */}
      <div className="reviewer-reports-background">
        <Threads
          color={[0, 0.32, 0]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Home Button */}
      <button className="reviewer-reports-home-btn" onClick={onNavigateToLanding}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Home
      </button>

      <div className="reviewer-reports-page">
      {/* Header Navigation */}
      <nav className="reviewer-reports-nav">
        <button className="reviewer-reports-nav-btn" onClick={onBack}>
          Dashboard
        </button>
        <button className="reviewer-reports-nav-btn">
          Seek a Review
        </button>
        <button className="reviewer-reports-nav-btn reviewer-reports-nav-btn-primary">
          + New Review
        </button>
      </nav>

      {/* Filter Button */}
      <div className="reviewer-reports-filter-container">
        <button className="reviewer-reports-filter-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filter
        </button>
      </div>

      {/* Reports Table */}
      <div className="reviewer-reports-table-container">
        <table className="reviewer-reports-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="reviewer-reports-checkbox" />
              </th>
              <th>Reports</th>
              <th>Status</th>
              <th>Trust Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5" className="reviewer-reports-empty">
                  <p>No reports reviewed yet. Click "Seek a Review" to start reviewing.</p>
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <input type="checkbox" className="reviewer-reports-checkbox" />
                  </td>
                  <td>{report.name}</td>
                  <td>{report.status}</td>
                  <td>{report.trustScore}</td>
                  <td>{report.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default ReviewerReports;
