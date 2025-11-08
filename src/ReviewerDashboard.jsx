import React, { useState } from 'react';
import Threads from './Threads';
import './ReviewerDashboard.css';

const ReviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="reviewer-dashboard">
      {/* Background */}
      <div className="reviewer-dashboard-background">
        <Threads
          color={[0, 0.32, 0]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Header */}
      <header className="reviewer-dashboard-header">
        <h1 className="reviewer-dashboard-greeting">
          <span className="reviewer-dashboard-greeting-gray">Hi,</span>{' '}
          <span className="reviewer-dashboard-greeting-green">Reviewer.</span>
        </h1>
      </header>

      {/* Navigation */}
      <nav className="reviewer-dashboard-nav">
        <button
          className={`reviewer-dashboard-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`reviewer-dashboard-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
        <button
          className="reviewer-dashboard-nav-btn reviewer-dashboard-nav-btn-secondary"
          onClick={() => {
            // Handle seek a review action
            console.log('Seeking a review');
          }}
        >
          Seek a Review
        </button>
        <button className="reviewer-dashboard-nav-btn reviewer-dashboard-nav-btn-primary">
          + New Report
        </button>
      </nav>

      {/* Main Content */}
      <main className="reviewer-dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="reviewer-dashboard-tab-content">
            {/* Dashboard content goes here */}
          </div>
        )}
        {activeTab === 'reports' && (
          <div className="reviewer-dashboard-tab-content">
            {/* Reports content goes here */}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewerDashboard;
