import DotGrid from './DotGrid';
import PillNav from './PillNav';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onNavigateToUserDashboard, onNavigateToReviewerDashboard }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-page">
      <PillNav
        logo="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='75' font-size='80' fill='%23005300' font-family='Kangge,sans-serif'%3EV%3C/text%3E%3C/svg%3E"
        logoAlt="VerifAI"
        items={[
          { label: 'Flow', href: '#how-it-works' },
          { label: 'Features', href: '#features-section' },
          { label: 'About', href: '#about' },
          { label: 'Log in', href: '#login', onClick: (e) => { e.preventDefault(); setIsLoginOpen(true); } }
        ]}
        activeHref="#"
        baseColor="#005300"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
      <DotGrid
        dotSize={4}
        gap={20}
        baseColor="#c0c0c0"
        activeColor="#00ff00"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        className="landing-page__background"
      />
      <div className="landing-page__content">
        <div className="landing-page__hero">
          <h1 className="landing-page__logo">
            <span className="landing-page__logo-verif">Verif</span>
            <span className="landing-page__logo-ai">AI</span>
          </h1>
          <p className="landing-page__tagline">Immutable trust.</p>
        </div>
        <button 
          className="landing-page__button"
          onClick={() => setIsSignupOpen(true)}
        >
          Join now
        </button>
      </div>
      
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
      
      <section id="features" className="features-section">
        <div className="features-container">
          <h2 id="how-it-works" className="features-title">How It Works</h2>
          
          <div className="features-timeline">
            <div className="timeline-line"></div>
            
            <div className="timeline-item timeline-item-1">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-number">01</div>
                <h3 className="timeline-title">Submit</h3>
                <p className="timeline-description">
                  Anyone can submit an AI model's response for community verification
                </p>
              </div>
            </div>
            
            <div className="timeline-item timeline-item-2">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-number">02</div>
                <h3 className="timeline-title">Review</h3>
                <p className="timeline-description">
                  Qualified reviewers score outputs on accuracy, bias, and hallucinations
                </p>
              </div>
            </div>
            
            <div className="timeline-item timeline-item-3">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-number">03</div>
                <h3 className="timeline-title">Verify</h3>
                <p className="timeline-description">
                  Results cryptographically signed, stored on IPFS, anchored to Polygon—tamper-proof forever
                </p>
              </div>
            </div>
          </div>
          
          <h2 id="features-section" className="features-title features-title-why">
            Features
          </h2>
          
          <div className="features-grid-modern">
            <div className="feature-modern feature-modern-1">
              <div className="feature-modern-header">
                <h3 className="feature-modern-title">Decentralized</h3>
              </div>
              <p className="feature-modern-description">
                No single authority controls the reviews
              </p>
            </div>
            
            <div className="feature-modern feature-modern-2">
              <div className="feature-modern-header">
                <h3 className="feature-modern-title">Transparent</h3>
              </div>
              <p className="feature-modern-description">
                All votes signed with MetaMask—publicly verifiable
              </p>
            </div>
            
            <div className="feature-modern feature-modern-3">
              <div className="feature-modern-header">
                <h3 className="feature-modern-title">Incentivized</h3>
              </div>
              <p className="feature-modern-description">
                Reviewers earn credits for accurate consensus
              </p>
            </div>
            
            <div className="feature-modern feature-modern-4">
              <div className="feature-modern-header">
                <h3 className="feature-modern-title">Immutable</h3>
              </div>
              <p className="feature-modern-description">
                Results stored on Polygon blockchain can never be altered
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">
            About Verif<span className="about-title-ai">AI</span>
          </h2>
          <div className="about-content">
            <p className="about-description">
              VerifAI is a community-driven, blockchain-verified platform for reviewing AI model outputs. 
              We believe in the power of collective intelligence to verify the accuracy and reliability of AI-generated content.
            </p>
            <p className="about-description">
              Our platform enables users to submit AI model responses for review, where qualified reviewers 
              evaluate them on a comprehensive scale. After reaching consensus through independent reviews, 
              results are permanently published to the Polygon blockchain via IPFS, ensuring transparency and immutability.
            </p>
            <div className="about-highlights">
              <div className="about-highlight-item">
                <h3 className="about-highlight-title">Our Mission</h3>
                <p className="about-highlight-text">
                  To create a trusted, decentralized ecosystem where AI outputs are verified by human expertise 
                  and secured by blockchain technology.
                </p>
              </div>
              <div className="about-highlight-item">
                <h3 className="about-highlight-title">Our Vision</h3>
                <p className="about-highlight-text">
                  A future where AI accountability is transparent, verifiable, and community-driven, 
                  fostering trust in artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="back-to-top-container">
        <button 
          className="back-to-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <span className="back-to-top-arrow">↑</span>
          <span className="back-to-top-text">Back to Top</span>
        </button>
      </div>
      
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => setIsLoginOpen(true)}
        onUserRoleSelected={onNavigateToUserDashboard}
        onReviewerRoleSelected={onNavigateToReviewerDashboard}
      />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => setIsSignupOpen(true)}
        onUserRoleSelected={onNavigateToUserDashboard}
        onReviewerRoleSelected={onNavigateToReviewerDashboard}
      />
    </div>
  );
};

export default LandingPage;
