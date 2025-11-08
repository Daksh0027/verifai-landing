import React from 'react';
import ReviewerDashboardHome from './ReviewerDashboardHome';
import './ReviewerDashboard.css';

const ReviewerDashboard = ({ onNavigateToLanding, onNavigateToUserDashboard, onNavigateToReports }) => {
  return (
    <div className="reviewer-dashboard show-analytics">
      {/* Home Button */}
      <button className="reviewer-dashboard-home-btn" onClick={onNavigateToLanding}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Home
      </button>

      {/* Navigation */}
      <nav className="reviewer-dashboard-nav">
        <button className="reviewer-dashboard-nav-btn active">
          Dashboard
        </button>
        <button
          className="reviewer-dashboard-nav-btn"
          onClick={onNavigateToReports}
        >
          Reports
        </button>
        <button
          className="reviewer-dashboard-nav-btn reviewer-dashboard-nav-btn-secondary"
          onClick={onNavigateToUserDashboard}
        >
          Seek a Review
        </button>
        <button className="reviewer-dashboard-nav-btn reviewer-dashboard-nav-btn-primary">
          + New Review
        </button>
      </nav>

      {/* Main Content */}
      <main className="reviewer-dashboard-content">
        <div className="reviewer-dashboard-tab-content">
          <ReviewerDashboardHome />
        </div>
      </main>
    </div>
  );
};

export default ReviewerDashboard;
