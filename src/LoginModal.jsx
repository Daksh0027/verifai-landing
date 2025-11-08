import { useState } from 'react';
import LiquidChrome from './LiquidChrome';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Login submitted:', { email, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login clicked');
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="login-modal-grid">
          {/* Left side - Liquid Chrome */}
          <div className="login-modal-left">
            <LiquidChrome
              baseColor={[0, 0.3, 0]}
              speed={1}
              amplitude={0.6}
              frequencyX={3}
              frequencyY={3}
              interactive={true}
            />
            <div className="login-modal-overlay-text">
              <h2>Verifying Responses.</h2>
              <p>One token at a time</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="login-modal-right">
            <div className="login-modal-header">
              <h1 className="login-modal-title">
                Sign<span className="login-modal-title-in">In</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-form-footer">
                <button type="button" className="login-link-button">
                  Forgot password ?
                </button>
                <button 
                  type="button" 
                  className="login-link-button"
                  onClick={() => {
                    onClose();
                    onSwitchToSignup();
                  }}
                >
                  New user ? Sign Up
                </button>
              </div>

              <button type="submit" className="login-submit-button">
                Next →
              </button>

              <div className="login-divider">
                <span>OR</span>
              </div>

              <button 
                type="button" 
                className="login-google-button"
                onClick={handleGoogleLogin}
              >
                <span>Login with</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                  <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
