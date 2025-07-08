import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LeadSources() {
  const navigate = useNavigate()

  // State for lead sources
  const [leadSources, setLeadSources] = useState({
    googleBusiness: true,
    yelp: false,
    homeAdvisor: false,
    angi: false,
    thumbtack: false,
    nextdoor: false
  })

  // State for lead handling preferences
  const [leadHandling, setLeadHandling] = useState({
    directCalls: true,
    emailNotifications: true,
    smsNotifications: false
  })

  const handleLeadSourceToggle = (source) => {
    setLeadSources({
      ...leadSources,
      [source]: !leadSources[source]
    })
  }

  const handleLeadHandlingToggle = (preference) => {
    setLeadHandling({
      ...leadHandling,
      [preference]: !leadHandling[preference]
    })
  }

  const handleBack = () => {
    navigate('/greeting')
  }

  const handleContinue = () => {
    navigate('/service-settings')
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
          <button className="nav-item" onClick={() => navigate('/greeting')}>
            Greeting
          </button>
          <button className="nav-item active" onClick={() => navigate('/lead-sources')}>
            Lead Sources
          </button>
          <button className="nav-item" onClick={() => navigate('/service-settings')}>
            Services
          </button>
          <button className="nav-item" onClick={() => navigate('/permissions')}>
            Permissions
          </button>
          <button className="nav-item" onClick={() => navigate('/restrictions')}>
            Restrictions
          </button>
          <button className="nav-item" onClick={() => navigate('/faqs')}>
            FAQs
          </button>
        </div>

        <div className="info-box">
          <span className="info-icon">📋</span>
          Tell us where your leads come from and how you want to handle them.
        </div>

        {/* Lead Sources and Handling Container */}
        <div className="form-container">
          <div className="lead-container">
            {/* Lead Sources Container */}

            <div className="lead-sources-container">
              <h2 className="lead-title">
                <span className="lead-icon">📋</span> Lead Sources
              </h2>
              <p className="lead-description">Select which platforms you receive leads from. We'll help you manage and respond to these leads efficiently.</p>

              <div className="lead-sources-grid">
                <div className="lead-source-item">
                  <label className="toggle-label">
                    Google Business Profile
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={leadSources.googleBusiness}
                        onChange={() => handleLeadSourceToggle('googleBusiness')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>

                <div className="lead-source-item">
                  <label className="toggle-label">
                    Yelp
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={leadSources.yelp}
                        onChange={() => handleLeadSourceToggle('yelp')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>

                <div className="lead-source-item">
                  <label className="toggle-label">
                    HomeAdvisor
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={leadSources.homeAdvisor}
                        onChange={() => handleLeadSourceToggle('homeAdvisor')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>

                <div className="lead-source-item">
                  <label className="toggle-label">
                    Angi
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={leadSources.angi}
                        onChange={() => handleLeadSourceToggle('angi')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>

                <div className="lead-source-item">
                  <label className="toggle-label">
                    Thumbtack
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={leadSources.thumbtack}
                        onChange={() => handleLeadSourceToggle('thumbtack')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>

                <div className="lead-source-item">
                  <label className="toggle-label">
                    Nextdoor
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={leadSources.nextdoor}
                        onChange={() => handleLeadSourceToggle('nextdoor')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Lead Handling Preferences Container */}

            <div className="lead-handling-container">
              <h2 className="lead-title" style={{ marginTop: '2rem' }}>
                <span className="lead-icon">📞</span> Lead Handling Preferences
              </h2>
              <p className="lead-description">Choose how you want to handle incoming leads from different sources.</p>

              <div className="lead-handling-options">
                <div className="lead-handling-item">
                  <div className="lead-handling-content">
                    <h3>Direct Calls to Business</h3>
                    <p>AI handles calls made directly to your business number</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={leadHandling.directCalls}
                      onChange={() => handleLeadHandlingToggle('directCalls')}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="lead-handling-item">
                  <div className="lead-handling-content">
                    <h3>Email Lead Notifications</h3>
                    <p>AI processes and responds to leads received via email</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={leadHandling.emailNotifications}
                      onChange={() => handleLeadHandlingToggle('emailNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="lead-handling-item">
                  <div className="lead-handling-content">
                    <h3>SMS Lead Notifications</h3>
                    <p>AI handles leads received through SMS</p>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={leadHandling.smsNotifications}
                      onChange={() => handleLeadHandlingToggle('smsNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button onClick={handleBack} className="back-btn">
                  <span className="back-icon">←</span> Back to Greeting
                </button>
                <button onClick={handleContinue} className="continue-btn">
                  Continue to Service Settings <span className="continue-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>



        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            Back
          </button>
          <button onClick={handleContinue} className="continue-btn">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeadSources