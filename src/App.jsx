import { useState } from 'react';
import LandingPage from './LandingPage';
import UserDashboard from './UserDashboard';
import ReviewerDashboard from './ReviewerDashboard';
import ReviewerQualification from './ReviewerQualification';
import ReviewerReports from './ReviewerReports';
import NewReport from './NewReport';
import Reports from './Reports';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'user-dashboard', 'reviewer-dashboard', 'reviewer-qualification', 'reviewer-reports', 'new-report', or 'reports'

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onNavigateToUserDashboard={() => setCurrentView('user-dashboard')}
          onNavigateToReviewerQualification={() => setCurrentView('reviewer-qualification')}
        />
      )}
      {currentView === 'user-dashboard' && (
        <UserDashboard 
          onNavigateToNewReport={() => setCurrentView('new-report')}
          onNavigateToReports={() => setCurrentView('reports')}
          onNavigateToReviewerQualification={() => setCurrentView('reviewer-qualification')}
          onNavigateToLanding={() => setCurrentView('landing')}
        />
      )}
      {currentView === 'reviewer-qualification' && (
        <ReviewerQualification
          onSubmit={() => setCurrentView('reviewer-dashboard')}
          onBack={() => setCurrentView('user-dashboard')}
          onNavigateToLanding={() => setCurrentView('landing')}
        />
      )}
      {currentView === 'reviewer-dashboard' && (
        <ReviewerDashboard 
          onNavigateToLanding={() => setCurrentView('landing')}
          onNavigateToUserDashboard={() => setCurrentView('user-dashboard')}
          onNavigateToReports={() => setCurrentView('reviewer-reports')}
        />
      )}
      {currentView === 'reviewer-reports' && (
        <ReviewerReports 
          onBack={() => setCurrentView('reviewer-dashboard')}
          onNavigateToLanding={() => setCurrentView('landing')}
        />
      )}
      {currentView === 'new-report' && (
        <NewReport onBack={() => setCurrentView('user-dashboard')} />
      )}
      {currentView === 'reports' && (
        <Reports 
          onBack={() => setCurrentView('user-dashboard')}
          onNewReport={() => setCurrentView('new-report')}
        />
      )}
    </>
  );
}

export default App;
