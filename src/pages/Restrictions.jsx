import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Restrictions() {
  const navigate = useNavigate()
  
  // State for prohibited topics
  const [prohibitedTopics, setProhibitedTopics] = useState({
    priceNegotiation: false,
    legalAdvice: false,
    medicalAdvice: false,
    personalQuestions: false
  })

  // State for additional topics
  const [additionalTopics, setAdditionalTopics] = useState('')

  const handleTopicChange = (topic) => {
    setProhibitedTopics({
      ...prohibitedTopics,
      [topic]: !prohibitedTopics[topic]
    })
  }

  const handleBack = () => {
    navigate('/permissions')
  }

  const handleContinue = () => {
    // Navigate to the next page in the flow
    navigate('/faqs')
  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`progress-step ${step === 6 ? 'active' : ''}`}>
              {step}
            </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      <div className="content">
        <h1>AI Assistant Setup</h1>
        <p className="subtitle">Set boundaries for what your AI assistant should not discuss with callers</p>

        <div className="setup-navigation">
          <button className="nav-item" onClick={() => navigate('/greeting')}>Greeting</button>
          <button className="nav-item" onClick={() => navigate('/lead-sources')}>Lead Sources</button>
          <button className="nav-item" onClick={() => navigate('/service-settings')}>Services</button>
          <button className="nav-item" onClick={() => navigate('/permissions')}>Permissions</button>
          <button className="nav-item active" onClick={() => navigate('/restrictions')}>Restrictions</button>
          <button className="nav-item" onClick={() => navigate('/faqs')}>FAQs</button>
        </div>

        <div className="info-box">
          <span className="info-icon">ℹ️</span>
          <div>
            <h3>Set boundaries for what your AI assistant should not discuss with callers.</h3>
            <p>Select topics that your AI assistant should avoid discussing. The assistant will politely redirect the conversation if these topics come up.</p>
          </div>
        </div>

        <div className="form-container">
          <div className="form-section">
            <div className="form-header">
              <div className="form-icon">⚠️</div>
              <div>
                <h2>Prohibited Topics</h2>
                <p>Define topics your AI assistant should avoid discussing</p>
              </div>
            </div>
            
            <div className="form-fields">
              {/* Price Negotiation */}
              <div className="permission-item">
                <input
                  type="checkbox"
                  id="priceNegotiation"
                  checked={prohibitedTopics.priceNegotiation}
                  onChange={() => handleTopicChange('priceNegotiation')}
                />
                <div>
                  <label htmlFor="priceNegotiation">Price Negotiation</label>
                  <p>The AI will not negotiate prices or offer discounts</p>
                </div>
              </div>

              {/* Legal Advice */}
              <div className="permission-item">
                <input
                  type="checkbox"
                  id="legalAdvice"
                  checked={prohibitedTopics.legalAdvice}
                  onChange={() => handleTopicChange('legalAdvice')}
                />
                <div>
                  <label htmlFor="legalAdvice">Legal Advice</label>
                  <p>The AI will not provide legal opinions or interpretations</p>
                </div>
              </div>

              {/* Medical Advice */}
              <div className="permission-item">
                <input
                  type="checkbox"
                  id="medicalAdvice"
                  checked={prohibitedTopics.medicalAdvice}
                  onChange={() => handleTopicChange('medicalAdvice')}
                />
                <div>
                  <label htmlFor="medicalAdvice">Medical Advice</label>
                  <p>The AI will not offer medical diagnoses or treatment recommendations</p>
                </div>
              </div>

              {/* Personal Questions About Staff */}
              <div className="permission-item">
                <input
                  type="checkbox"
                  id="personalQuestions"
                  checked={prohibitedTopics.personalQuestions}
                  onChange={() => handleTopicChange('personalQuestions')}
                />
                <div>
                  <label htmlFor="personalQuestions">Personal Questions About Staff</label>
                  <p>The AI will not discuss personal details about your employees</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalTopics">Additional Prohibited Topics</label>
                <textarea
                  id="additionalTopics"
                  className="form-textarea"
                  value={additionalTopics}
                  onChange={(e) => setAdditionalTopics(e.target.value)}
                  placeholder="Enter any additional topics your AI should avoid discussing, separated by commas (e.g., competitors, political issues)"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            <span className="back-icon">←</span> Back to Permissions
          </button>
          <button onClick={handleContinue} className="continue-btn">
            Continue to FAQs <span className="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Restrictions