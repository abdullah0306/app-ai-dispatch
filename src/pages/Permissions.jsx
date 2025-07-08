import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Permissions() {
  const navigate = useNavigate()
  
  // State for new caller permissions
  const [newCallerPermissions, setNewCallerPermissions] = useState({
    createNewJob: true,
    takeMessage: true
  })

  // State for verified client permissions
  const [verifiedClientPermissions, setVerifiedClientPermissions] = useState({
    rescheduleExistingJob: true,
    cancelExistingJob: true,
    addNoteToExistingJob: true
  })

  const handleNewCallerToggle = (permission) => {
    setNewCallerPermissions({
      ...newCallerPermissions,
      [permission]: !newCallerPermissions[permission]
    })
  }

  const handleVerifiedClientToggle = (permission) => {
    setVerifiedClientPermissions({
      ...verifiedClientPermissions,
      [permission]: !verifiedClientPermissions[permission]
    })
  }

  const handleBack = () => {
    navigate('/service-settings')
  }

  const handleContinue = () => {
    // Navigate to the next page in the flow
    navigate('/restrictions')
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
          <button className="nav-item" onClick={() => navigate('/service-settings')}>Services</button>
          <button className="nav-item active">Permissions</button>
          <button className="nav-item" onClick={() => navigate('/restrictions')}>Restrictions</button>
          <button className="nav-item" onClick={() => navigate('/faqs')}>FAQs</button>
        </div>
        <div className="info-box">
          <span className="info-icon">🔐</span>
          Set what actions different types of callers are allowed to take with your AI assistant.
        </div>

        <div className="form-container">
          <div className="form-section">
            <div className="form-header">
              <div className="form-icon">🔒</div>
              <div>
                <h2>Client Permissions</h2>
                <p>Configure what actions different types of callers can perform</p>
              </div>
            </div>
            
            <div className="form-fields">
              <h3 className="permission-section-title">Any Client / New Caller</h3>
              <p className="permission-section-description">These permissions apply to all callers, including new customers</p>
              
              <div className="permissions-grid">
                {/* Create New Job */}
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="createNewJob"
                    checked={newCallerPermissions.createNewJob}
                    onChange={() => handleNewCallerToggle('createNewJob')}
                  />
                  <div>
                    <label htmlFor="createNewJob">Create New Job</label>
                    <p>Allow any caller to create a new service request</p>
                  </div>
                </div>

                {/* Take a Message */}
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="takeMessage"
                    checked={newCallerPermissions.takeMessage}
                    onChange={() => handleNewCallerToggle('takeMessage')}
                  />
                  <div>
                    <label htmlFor="takeMessage">Take a Message</label>
                    <p>Allow any caller to leave a message for your team</p>
                  </div>
                </div>
              </div>

              <hr className="permission-divider" />

              <h3 className="permission-section-title">Verified Clients with Existing Jobs</h3>
              <p className="permission-section-description">These permissions apply only to verified customers with existing appointments</p>
              
              <div className="permissions-grid">
                {/* Reschedule Existing Job */}
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="rescheduleExistingJob"
                    checked={verifiedClientPermissions.rescheduleExistingJob}
                    onChange={() => handleVerifiedClientToggle('rescheduleExistingJob')}
                  />
                  <div>
                    <label htmlFor="rescheduleExistingJob">Reschedule Existing Job</label>
                    <p>Allow verified customers to change appointment times</p>
                  </div>
                </div>

                {/* Cancel Existing Job */}
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="cancelExistingJob"
                    checked={verifiedClientPermissions.cancelExistingJob}
                    onChange={() => handleVerifiedClientToggle('cancelExistingJob')}
                  />
                  <div>
                    <label htmlFor="cancelExistingJob">Cancel Existing Job</label>
                    <p>Allow verified customers to cancel their appointments</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                {/* Add Note to Existing Job */}
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="addNoteToExistingJob"
                    checked={verifiedClientPermissions.addNoteToExistingJob}
                    onChange={() => handleVerifiedClientToggle('addNoteToExistingJob')}
                  />
                  <div>
                    <label htmlFor="addNoteToExistingJob">Add Note to Existing Job</label>
                    <p>Allow verified customers to add notes to their service requests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            <span className="back-icon">←</span> Back to Service Settings
          </button>
          <button onClick={handleContinue} className="continue-btn">
            Continue to Restrictions <span className="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Permissions