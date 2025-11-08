import { useState } from 'react';
import LandingPage from './LandingPage';
import UserDashboard from './UserDashboard';
import ReviewerDashboard from './ReviewerDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'user-dashboard', or 'reviewer-dashboard'

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onNavigateToUserDashboard={() => setCurrentView('user-dashboard')}
          onNavigateToReviewerDashboard={() => setCurrentView('reviewer-dashboard')}
        />
      )}
      {currentView === 'user-dashboard' && <UserDashboard />}
      {currentView === 'reviewer-dashboard' && <ReviewerDashboard />}
    </>
  );
}

export default App;
