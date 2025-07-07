import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Greeting() {
  const navigate = useNavigate()
  const [selectedStyle, setSelectedStyle] = useState('')

  const greetingStyles = [
    {
      id: 'professional',
      title: 'Professional & Formal',
      description: 'A traditional, business-focused greeting suitable for most industries',
      example: 'Thank you for calling test. This is your AI assistant. How may I assist you today?'
    },
    {
      id: 'friendly',
      title: 'Friendly & Welcoming',
      description: 'A warm, casual greeting that creates an approachable atmosphere',
      example: 'Hi there! Thanks for calling test. I\'m your virtual assistant, ready to help you with anything you need!'
    },
    {
      id: 'direct',
      title: 'Direct & Brief',
      description: 'A short, straightforward greeting that gets right to the point',
      example: 'test, this is your AI assistant. How can I help?'
    },
    {
      id: 'custom',
      title: 'Custom Greeting',
      description: 'Create your own personalized greeting',
      example: ''
    }
  ]

  const handleBack = () => {
    navigate('/')
  }

  const handleContinue = () => {
    navigate('/lead-sources')
  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`progress-step ${step === 1 ? 'active' : ''}`}>
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
          <button className="nav-item active" onClick={() => navigate('/greeting')}>
            Greeting
          </button>
          <button className="nav-item" onClick={() => navigate('/lead-sources')}>
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
          <span className="info-icon">💬</span>
          Your AI greeting is the first thing callers will hear. Choose a style that represents your business.
        </div>

        <div className="form-container">
          <div className="greeting-container">
            <h2 className="greeting-title">AI Greeting Style</h2>
            <div className="greeting-styles-container">
              <div className="greeting-styles">
                {greetingStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`greeting-option ${selectedStyle === style.id ? 'selected' : ''}`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <div className="greeting-header">
                      <input
                        type="radio"
                        name="greetingStyle"
                        checked={selectedStyle === style.id}
                        onChange={() => setSelectedStyle(style.id)}
                      />
                      <h3>{style.title}</h3>
                    </div>
                    <p className="greeting-description">{style.description}</p>
                    {style.id !== 'custom' && (
                      <div className="greeting-example">
                        <em>{style.example}</em>
                      </div>
                    )}
                    {style.id === 'custom' && selectedStyle === 'custom' && (
                      <textarea
                        className="custom-greeting-input"
                        placeholder="Enter your custom greeting..."
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="continue-button-container">
                <button onClick={handleContinue} className="continue-btn">
                  Continue to Lead Sources
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            <span className="back-icon">←</span> Back to Home
          </button>
          <button onClick={handleContinue} className="continue-btn">
            Continue to Lead Sources <span className="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Greeting