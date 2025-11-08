import React, { useState } from 'react';
import './ReviewerQualification.css';

const ReviewerQualification = ({ onSubmit, onBack, onNavigateToLanding }) => {
  const [formData, setFormData] = useState({
    walletAddress: '',
    education: [{ degree: '', institution: '', year: '', field: '' }],
    career: [{ position: '', company: '', startYear: '', endYear: '', description: '' }],
    achievements: ''
  });

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '', field: '' }]
    });
  };

  const handleRemoveEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const handleAddCareer = () => {
    setFormData({
      ...formData,
      career: [...formData.career, { position: '', company: '', startYear: '', endYear: '', description: '' }]
    });
  };

  const handleRemoveCareer = (index) => {
    const newCareer = formData.career.filter((_, i) => i !== index);
    setFormData({ ...formData, career: newCareer });
  };

  const handleCareerChange = (index, field, value) => {
    const newCareer = [...formData.career];
    newCareer[index][field] = value;
    setFormData({ ...formData, career: newCareer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reviewer qualifications submitted:', formData);
    onSubmit(formData);
  };

  return (
    <div className="reviewer-qualification">
      {/* Home Button */}
      <button className="reviewer-qualification-home-btn" onClick={onNavigateToLanding}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Home
      </button>

      <div className="reviewer-qualification-container">
        <header className="reviewer-qualification-header">
          <h1 className="reviewer-qualification-title">Reviewer Qualifications</h1>
          <p className="reviewer-qualification-subtitle">
            Help us understand your expertise to match you with relevant review tasks
          </p>
        </header>

        <form onSubmit={handleSubmit} className="reviewer-qualification-form">
          {/* MetaMask Wallet Address */}
          <section className="reviewer-qualification-section">
            <h2>MetaMask Wallet Address</h2>
            <div className="reviewer-qualification-field">
              <label>Wallet Address <span className="reviewer-qualification-required">*</span></label>
              <div className="reviewer-qualification-wallet-input">
                <svg className="reviewer-qualification-metamask-icon" width="24" height="24" viewBox="0 0 212 189" fill="none">
                  <path d="M200.6 0L121.3 55.8L136.4 22.2L200.6 0Z" fill="#E2761B" stroke="#E2761B"/>
                  <path d="M11.3 0L90 56.3L75.5 22.2L11.3 0Z" fill="#E4761B" stroke="#E4761B"/>
                  <path d="M171.5 137.8L150.1 167.8L195.7 180.3L208.3 138.5L171.5 137.8Z" fill="#E4761B" stroke="#E4761B"/>
                  <path d="M3.8 138.5L16.3 180.3L61.9 167.8L40.5 137.8L3.8 138.5Z" fill="#E4761B" stroke="#E4761B"/>
                  <path d="M59.4 81.9L46.5 100.5L91.8 102.5L90.2 54.3L59.4 81.9Z" fill="#E4761B" stroke="#E4761B"/>
                  <path d="M152.5 81.9L121.3 53.8L120.2 102.5L165.4 100.5L152.5 81.9Z" fill="#E4761B" stroke="#E4761B"/>
                  <path d="M61.9 167.8L89.3 154.3L65.8 138.8L61.9 167.8Z" fill="#E4761B" stroke="#E4761B"/>
                  <path d="M122.7 154.3L150.1 167.8L146.2 138.8L122.7 154.3Z" fill="#E4761B" stroke="#E4761B"/>
                </svg>
                <input
                  type="text"
                  placeholder="0x..."
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  pattern="^0x[a-fA-F0-9]{40}$"
                  title="Please enter a valid Ethereum wallet address (starts with 0x followed by 40 hexadecimal characters)"
                  required
                />
              </div>
              <p className="reviewer-qualification-field-hint">
                Your MetaMask wallet address will be used for receiving review rewards. Must start with 0x.
              </p>
            </div>
          </section>

          {/* Educational Qualifications */}
          <section className="reviewer-qualification-section">
            <div className="reviewer-qualification-section-header">
              <h2>Educational Qualifications</h2>
              <button
                type="button"
                className="reviewer-qualification-add-btn"
                onClick={handleAddEducation}
              >
                + Add Education
              </button>
            </div>

            {formData.education.map((edu, index) => (
              <div key={index} className="reviewer-qualification-card">
                <div className="reviewer-qualification-card-header">
                  <h3>Education {index + 1}</h3>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      className="reviewer-qualification-remove-btn"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="reviewer-qualification-row">
                  <div className="reviewer-qualification-field">
                    <label>Degree/Certification</label>
                    <input
                      type="text"
                      placeholder="e.g., Bachelor of Science, PhD, Certification"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      required
                    />
                  </div>
                  <div className="reviewer-qualification-field">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      placeholder="e.g., Computer Science, AI/ML"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="reviewer-qualification-row">
                  <div className="reviewer-qualification-field">
                    <label>Institution</label>
                    <input
                      type="text"
                      placeholder="University or Institution name"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      required
                    />
                  </div>
                  <div className="reviewer-qualification-field">
                    <label>Year of Completion</label>
                    <input
                      type="text"
                      placeholder="e.g., 2020"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Career Timeline */}
          <section className="reviewer-qualification-section">
            <div className="reviewer-qualification-section-header">
              <h2>Career Timeline</h2>
              <button
                type="button"
                className="reviewer-qualification-add-btn"
                onClick={handleAddCareer}
              >
                + Add Position
              </button>
            </div>

            {formData.career.map((job, index) => (
              <div key={index} className="reviewer-qualification-card">
                <div className="reviewer-qualification-card-header">
                  <h3>Position {index + 1}</h3>
                  {formData.career.length > 1 && (
                    <button
                      type="button"
                      className="reviewer-qualification-remove-btn"
                      onClick={() => handleRemoveCareer(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="reviewer-qualification-row">
                  <div className="reviewer-qualification-field">
                    <label>Job Title/Position</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Data Scientist"
                      value={job.position}
                      onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
                      required
                    />
                  </div>
                  <div className="reviewer-qualification-field">
                    <label>Company/Organization</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={job.company}
                      onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="reviewer-qualification-row">
                  <div className="reviewer-qualification-field">
                    <label>Start Year</label>
                    <input
                      type="text"
                      placeholder="e.g., 2020"
                      value={job.startYear}
                      onChange={(e) => handleCareerChange(index, 'startYear', e.target.value)}
                      required
                    />
                  </div>
                  <div className="reviewer-qualification-field">
                    <label>End Year</label>
                    <input
                      type="text"
                      placeholder="Present or year"
                      value={job.endYear}
                      onChange={(e) => handleCareerChange(index, 'endYear', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="reviewer-qualification-field">
                  <label>Description</label>
                  <textarea
                    placeholder="Brief description of your role and responsibilities"
                    value={job.description}
                    onChange={(e) => handleCareerChange(index, 'description', e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Achievements */}
          <section className="reviewer-qualification-section">
            <h2>Achievements (Optional)</h2>
            <div className="reviewer-qualification-field">
              <label>Notable Achievements, Publications, or Awards</label>
              <textarea
                placeholder="List any relevant achievements, publications, patents, awards, or certifications"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                rows="5"
              />
            </div>
          </section>

          {/* Form Actions */}
          <div className="reviewer-qualification-actions">
            <button
              type="button"
              className="reviewer-qualification-back-btn"
              onClick={onBack}
            >
              Back
            </button>
            <button type="submit" className="reviewer-qualification-submit-btn">
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewerQualification;
