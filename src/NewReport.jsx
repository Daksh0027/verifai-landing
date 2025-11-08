import React, { useState } from 'react';
import './NewReport.css';

const NewReport = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Model');
  const [reply, setReply] = useState('');

  const handleVerifAI = () => {
    // Handle VerifAI submission
    console.log('VerifAI clicked', { prompt, selectedModel });
  };

  return (
    <div className="new-report">
      {/* Left Sidebar */}
      <aside className="new-report-sidebar">
        <div className="new-report-user">
          <div className="new-report-avatar"></div>
          <h2 className="new-report-username">User</h2>
        </div>

        <button className="new-report-new-btn">+ New Report</button>

        <div className="new-report-previous">
          <button className="new-report-previous-btn" onClick={onBack}>
            <span>←</span> Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="new-report-main">
        <div className="new-report-header">
          <h1 className="new-report-title">VerifAI your AI</h1>
          <p className="new-report-subtitle">
            Your path towards clear and crisp audit of data assessing its genuity.
          </p>
        </div>

        <div className="new-report-input-section">
          <div className="new-report-input-row">
            <input
              type="text"
              className="new-report-prompt-input"
              placeholder="Enter prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <select
              className="new-report-model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="Model">Model</option>
              <option value="GPT-4">GPT-4</option>
              <option value="Claude">Claude</option>
              <option value="Gemini">Gemini</option>
            </select>

            <button className="new-report-verifai-btn" onClick={handleVerifAI}>
              <span className="new-report-verifai-text">Verif</span>
              <span className="new-report-verifai-ai">AI</span>
            </button>
          </div>
        </div>

        <div className="new-report-reply-section">
          <textarea
            className="new-report-reply-input"
            placeholder="Enter response"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
      </main>
    </div>
  );
};

export default NewReport;
