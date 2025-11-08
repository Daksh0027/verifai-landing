import React, { useState } from 'react';
import Threads from './Threads';
import './UserDashboard.css';

const UserDashboard = ({ onNavigateToNewReport, onNavigateToReports, onNavigateToReviewerQualification, onNavigateToLanding }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="user-dashboard">
      {/* Background */}
      <div className="user-dashboard-background">
        <Threads
          color={[0, 0.32, 0]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Home Button */}
      <button className="user-dashboard-home-btn" onClick={onNavigateToLanding}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Home
      </button>

      {/* Header */}
      <header className="user-dashboard-header">
        {/* <div className="user-dashboard-profile">
          <div className="user-dashboard-pfp">PFP</div>
        </div> */}
        <h1 className="user-dashboard-greeting">
          <span className="user-dashboard-greeting-gray">Hi,</span>{' '}
          <span className="user-dashboard-greeting-green">User.</span>
        </h1>
      </header>

      {/* Navigation */}
      <nav className="user-dashboard-nav">
        <button
          className={`user-dashboard-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`user-dashboard-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={onNavigateToReports}
        >
          Reports
        </button>
        <button
          className="user-dashboard-nav-btn user-dashboard-nav-btn-secondary"
          onClick={onNavigateToReviewerQualification}
        >
          Become a Reviewer
        </button>
        <button
          className="user-dashboard-nav-btn user-dashboard-nav-btn-primary"
          onClick={onNavigateToNewReport}
        >
          + New Report
        </button>
      </nav>

      {/* Main Content */}
      <main className="user-dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="user-dashboard-tab-content">
            {/* Dashboard content goes here */}
          </div>
        )}
        {activeTab === 'reports' && (
          <div className="user-dashboard-tab-content">
            {/* Reports content goes here */}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
