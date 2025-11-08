import React from 'react';
import './ReviewerDashboardHome.css';

const ReviewerDashboardHome = () => {
  // Mock data - replace with actual data from props or API
  const stats = {
    totalReviews: 238,
    pendingReviews: 12,
    earnings: '$1,245.50',
    trustScore: 87,
    activeDays: 238
  };

  // Generate heatmap data for the past year (simplified)
  const generateHeatmapData = () => {
    const weeks = 52;
    const daysPerWeek = 7;
    const heatmapData = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < daysPerWeek; day++) {
        // Random activity level (0-4) for demonstration
        const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
        weekData.push(activity);
      }
      heatmapData.push(weekData);
    }
    
    return heatmapData;
  };

  const heatmapData = generateHeatmapData();

  const getHeatmapColor = (level) => {
    if (level === 0) return '#ebedf0';
    if (level === 1) return '#c6e48b';
    if (level === 2) return '#7bc96f';
    if (level === 3) return '#239a3b';
    return '#196127';
  };

  return (
    <div className="reviewer-dashboard-home">
      {/* Stats Summary */}
      <div className="reviewer-dashboard-summary">
        <p className="reviewer-dashboard-summary-text">
          You have reviewed <strong>{stats.totalReviews}</strong> reports so far.
        </p>
      </div>

      {/* Stats Tiles */}
      <div className="reviewer-dashboard-tiles">
        <div className="reviewer-dashboard-tile">
          <div className="reviewer-dashboard-tile-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <div className="reviewer-dashboard-tile-content">
            <h3 className="reviewer-dashboard-tile-label">Pending Reviews</h3>
            <p className="reviewer-dashboard-tile-value">{stats.pendingReviews}</p>
          </div>
        </div>

        <div className="reviewer-dashboard-tile">
          <div className="reviewer-dashboard-tile-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div className="reviewer-dashboard-tile-content">
            <h3 className="reviewer-dashboard-tile-label">Earnings</h3>
            <p className="reviewer-dashboard-tile-value">{stats.earnings}</p>
          </div>
        </div>

        <div className="reviewer-dashboard-tile">
          <div className="reviewer-dashboard-tile-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="reviewer-dashboard-tile-content">
            <h3 className="reviewer-dashboard-tile-label">Trust Score</h3>
            <p className="reviewer-dashboard-tile-value">{stats.trustScore}/100</p>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="reviewer-dashboard-activity">
        <div className="reviewer-dashboard-activity-header">
          <h3 className="reviewer-dashboard-activity-title">Activity Overview</h3>
          <p className="reviewer-dashboard-activity-days">
            {stats.activeDays} active days
          </p>
        </div>
        
        <div className="reviewer-dashboard-heatmap">
          <div className="reviewer-dashboard-heatmap-months">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
          
          <div className="reviewer-dashboard-heatmap-container">
            <div className="reviewer-dashboard-heatmap-days">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            <div className="reviewer-dashboard-heatmap-grid">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="reviewer-dashboard-heatmap-week">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="reviewer-dashboard-heatmap-day"
                      style={{ backgroundColor: getHeatmapColor(day) }}
                      title={`${day} reviews`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="reviewer-dashboard-heatmap-legend">
            <span>Less</span>
            <div className="reviewer-dashboard-heatmap-legend-colors">
              <div style={{ backgroundColor: '#ebedf0' }} />
              <div style={{ backgroundColor: '#c6e48b' }} />
              <div style={{ backgroundColor: '#7bc96f' }} />
              <div style={{ backgroundColor: '#239a3b' }} />
              <div style={{ backgroundColor: '#196127' }} />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboardHome;
