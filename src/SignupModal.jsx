import { useState } from 'react';
import LiquidChrome from './LiquidChrome';
import './SignupModal.css';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin, onUserRoleSelected, onReviewerRoleSelected }) => {
  const [step, setStep] = useState(1); // 1: credentials, 2: role selection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // 'user' or 'reviewer'

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle final form submission
    console.log('Signup submitted:', { email, password, role: selectedRole });
    
    // Navigate based on role
    if (selectedRole === 'user' && onUserRoleSelected) {
      onUserRoleSelected();
    } else if (selectedRole === 'reviewer' && onReviewerRoleSelected) {
      onReviewerRoleSelected();
    }
    
    // Reset and close
    setStep(1);
    setEmail('');
    setPassword('');
    setSelectedRole('');
    onClose();
  };

  const handleGoogleSignup = () => {
    // Handle Google signup - will also need role selection
    console.log('Google signup clicked');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="signup-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="signup-modal-grid">
          {/* Left side - Liquid Chrome */}
          <div className="signup-modal-left">
            <LiquidChrome
              baseColor={[0, 0.1, 0]}
              speed={1}
              amplitude={0.2}
              frequencyX={3}
              frequencyY={3}
              interactive={false}
            />
            <div className="signup-modal-overlay-text">
              <h2>Verifying Responses.</h2>
              <p>One token at a time</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="signup-modal-right">
            {step === 1 ? (
              <>
                <div className="signup-modal-header">
                  <h1 className="signup-modal-title">
                    Sign<span className="signup-modal-title-up">up</span>
                  </h1>
                </div>

                <form onSubmit={handleNext} className="signup-form">
                  <div className="signup-form-group">
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="signup-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="signup-form-group">
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="signup-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="signup-form-footer">
                    <button type="button" className="signup-link-button">
                      Forgot password ?
                    </button>
                    <button 
                      type="button" 
                      className="signup-link-button"
                      onClick={() => {
                        onClose();
                        if (onSwitchToLogin) onSwitchToLogin();
                      }}
                    >
                      Already a user ? Sign In
                    </button>
                  </div>

                  <button type="submit" className="signup-submit-button">
                    Next →
                  </button>

                  <div className="signup-divider">
                    <span>OR</span>
                  </div>

                  <button 
                    type="button" 
                    className="signup-google-button"
                    onClick={handleGoogleSignup}
                  >
                    <span>Signup with</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                      <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                    </svg>
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="signup-modal-header">
                  <h1 className="signup-modal-title">
                    I am a,
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="signup-form signup-role-form">
                  <div className="role-selection">
                    <button
                      type="button"
                      className={`role-button ${selectedRole === 'user' ? 'role-button-active' : ''}`}
                      onClick={() => setSelectedRole('user')}
                    >
                      <div className="role-button-content">
                        <h3>User</h3>
                        <p>Submit AI outputs for review</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`role-button ${selectedRole === 'reviewer' ? 'role-button-active' : ''}`}
                      onClick={() => setSelectedRole('reviewer')}
                    >
                      <div className="role-button-content">
                        <h3>Reviewer</h3>
                        <p>Evaluate AI outputs and earn credits</p>
                      </div>
                    </button>
                  </div>

                  <div className="signup-form-actions">
                    <button 
                      type="button" 
                      className="signup-back-button"
                      onClick={handleBack}
                    >
                      ← Back
                    </button>
                    <button 
                      type="submit" 
                      className="signup-submit-button"
                      disabled={!selectedRole}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
