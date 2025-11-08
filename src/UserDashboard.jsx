import React, { useState } from 'react';
import Threads from './Threads';
import './UserDashboard.css';

const UserDashboard = () => {
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
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
        <button
          className="user-dashboard-nav-btn user-dashboard-nav-btn-secondary"
          onClick={() => {
            // Handle role switch to reviewer
            console.log('Switching to reviewer role');
          }}
        >
          Become a Reviewer
        </button>
        <button className="user-dashboard-nav-btn user-dashboard-nav-btn-primary">
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
