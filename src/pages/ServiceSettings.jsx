import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ServiceSettings() {
  const navigate = useNavigate()
  
  // State for service preferences
  const [servicePreferences, setServicePreferences] = useState({
    incomingCallHandling: true,
    outgoingCallHandling: false,
    smsComm: false
  })

  // State for offer free estimates
  const [offerFreeEstimates, setOfferFreeEstimates] = useState(false)

  // State for human fallback
  const [enableHumanFallback, setEnableHumanFallback] = useState(false)
  const [fallbackPhoneNumber, setFallbackPhoneNumber] = useState('')

  const handleToggleChange = (service) => {
    setServicePreferences({
      ...servicePreferences,
      [service]: !servicePreferences[service]
    })
  }

  const handleBack = () => {
    navigate('/lead-sources')
  }

  const handleContinue = () => {
    navigate('/permissions')
  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`progress-step ${step === 4 ? 'active' : ''}`}>
              {step}
            </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      <div className="content">
        <h1>AI Assistant Setup</h1>
        <p className="subtitle">Configure how your AI assistant will interact with your customers</p>

        <div className="setup-navigation">
          <button className="nav-item" onClick={() => navigate('/greeting')}>Greeting</button>
          <button className="nav-item" onClick={() => navigate('/lead-sources')}>Lead Sources</button>
          <button className="nav-item active" onClick={() => navigate('/service-settings')}>Services</button>
          <button className="nav-item" onClick={() => navigate('/permissions')}>Permissions</button>
          <button className="nav-item" onClick={() => navigate('/restrictions')}>Restrictions</button>
          <button className="nav-item" onClick={() => navigate('/faqs')}>FAQs</button>
        </div>

        {/* Service Preferences Container */}
        <div className="form-container">
          <div className="form-section">
            <div className="form-icon">🔧</div>
            <div className="form-header">
              <h2>Service Preferences</h2>
              <p>Select which services you want to activate. All services are billed at $0.15 per minute.</p>
            </div>
            
            <div className="form-fields">
              {/* Incoming Call Handling */}
              <div className="lead-handling-item">
                <div className="lead-handling-content">
                  <h3>Incoming Call Handling</h3>
                  <p>AI answers calls and collects customer information</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={servicePreferences.incomingCallHandling}
                    onChange={() => handleToggleChange('incomingCallHandling')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* Outgoing Call Handling */}
              <div className="lead-handling-item">
                <div className="lead-handling-content">
                  <h3>Outgoing Call Handling</h3>
                  <p>AI makes follow-up calls to confirm appointments</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={servicePreferences.outgoingCallHandling}
                    onChange={() => handleToggleChange('outgoingCallHandling')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* SMS Communication */}
              <div className="lead-handling-item">
                <div className="lead-handling-content">
                  <h3>SMS Communication</h3>
                  <p>AI sends text message reminders and updates</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={servicePreferences.smsComm}
                    onChange={() => handleToggleChange('smsComm')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="info-box">
                <p>You can adjust these preferences anytime. All services are billed at the same rate of $0.15 per minute.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimate Settings Container */}
        <div className="form-container">
          <div className="form-section">
            <div className="form-icon">📋</div>
            <div className="form-header">
              <h2>Estimate Settings</h2>
              <p>Configure how your AI assistant handles estimate requests</p>
            </div>
            
            <div className="form-fields">
              {/* Offer Free Estimates */}
              <div className="lead-handling-item">
                <div className="lead-handling-content">
                  <h3>Offer Free Estimates</h3>
                  <p>Allow AI to offer free onsite estimates to potential clients</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={offerFreeEstimates}
                    onChange={() => setOfferFreeEstimates(!offerFreeEstimates)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="info-box">
                <p>Your AI assistant will offer free onsite estimates to qualified leads. This can help increase conversion rates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Services for Scheduling Container */}
        <div className="form-container">
          <div className="form-section">
            <div className="form-icon">📅</div>
            <div className="form-header">
              <h2>Available Services for Scheduling</h2>
              <p>Select which services your AI assistant can schedule for clients</p>
            </div>
            
            <div className="form-fields">
              <div className="empty-services-container" style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
                <h3>No services available</h3>
                <p>You haven't added any services yet. Go back to the Services page to add services.</p>
                <button 
                  className="add-service-btn" 
                  style={{ maxWidth: '200px', margin: '1rem auto' }}
                  onClick={() => navigate('/services')}
                >
                  Add Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Human Fallback Options Container */}
        <div className="form-container">
          <div className="form-section">
            <div className="form-icon">👤</div>
            <div className="form-header">
              <h2>Human Fallback Options</h2>
              <p>Configure what happens when AI fails to speak with a human</p>
            </div>
            
            <div className="form-fields">
              {/* Enable Human Fallback */}
              <div className="lead-handling-item">
                <div className="lead-handling-content">
                  <h3>Enable Human Fallback</h3>
                  <p>Allow callers to be transferred to a human when requested</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={enableHumanFallback}
                    onChange={() => setEnableHumanFallback(!enableHumanFallback)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* Fallback Phone Number */}
              {enableHumanFallback && (
                <div className="field-group">
                  <label>Fallback Phone Number</label>
                  <div className="input-group">
                    <span className="input-icon">📞</span>
                    <input
                      type="text"
                      value={fallbackPhoneNumber}
                      onChange={(e) => setFallbackPhoneNumber(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="form-input"
                    />
                  </div>
                  <p className="input-hint">When a caller requests to speak with a human, they will be transferred to this number</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            <span className="back-icon">←</span> Back to Lead Sources
          </button>
          <button onClick={handleContinue} className="continue-btn">
            Continue to Permissions <span className="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceSettings