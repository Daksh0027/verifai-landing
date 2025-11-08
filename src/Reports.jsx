import React, { useState } from 'react';
import './Reports.css';

const Reports = ({ onBack, onNewReport }) => {
  const [reports, setReports] = useState([
    // Sample data - replace with actual data later
    // { id: 1, name: 'Report 1', status: 'Completed', trustScore: 85, date: '2025-11-01' },
  ]);

  return (
    <div className="reports-page">
      {/* Header Navigation */}
      <nav className="reports-nav">
        <button className="reports-nav-btn" onClick={onBack}>
          Dashboard
        </button>
        <button className="reports-nav-btn">
          Become a Reviewer
        </button>
        <button className="reports-nav-btn reports-nav-btn-primary" onClick={onNewReport}>
          + New Report
        </button>
      </nav>

      {/* Filter Button */}
      <div className="reports-filter-container">
        <button className="reports-filter-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filter
        </button>
      </div>

      {/* Reports Table */}
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="reports-checkbox" />
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
                <td colSpan="5" className="reports-empty">
                  <p>No reports yet. Click "+ New Report" to create your first report.</p>
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <input type="checkbox" className="reports-checkbox" />
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
  );
};

export default Reports;
