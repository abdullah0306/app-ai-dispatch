import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrapedData } from '../contexts/ScrapedDataContext'
import { addCompanyToFirestore } from '../firebase'

function Services() {
  const navigate = useNavigate()
  const { scrapedData } = useScrapedData()
  const [services, setServices] = useState([
    {
      name: '',
      price: '',
      description: '',
      duration: ''
    }
  ])

  useEffect(() => {
    if (scrapedData && Array.isArray(scrapedData["Services offered"])) {
      setServices(scrapedData["Services offered"].map(service => ({
        name: service,
        price: '',
        description: '',
        duration: ''
      })))
    }
  }, [scrapedData])

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services]
    newServices[index][field] = value
    setServices(newServices)
  }

  const addService = () => {
    setServices([...services, { name: '', price: '', description: '', duration: '' }])
  }

  const removeService = (index) => {
    const newServices = services.filter((_, i) => i !== index)
    setServices(newServices)
  }

  const handleBack = () => {
    navigate('/business-details')
  }

  const handleContinue = async () => {
    // Gather business details from localStorage or another state management
    const businessName = localStorage.getItem('businessName') || ''
    // You can expand this to gather more business details as needed
    // For a more robust solution, consider using a context or global state for business details

    // Get the current user's UID (for companyId)
    const user = JSON.parse(localStorage.getItem('user')) // or get from auth context
    const companyId = user && user.uid ? user.uid : undefined

    // Prepare company data
    const companyData = {
      companyName: businessName,
      services: services,
      // Add more business details here if available
    }
    if (companyId) {
      await addCompanyToFirestore(companyId, companyData)
    }
    navigate('/greeting')
  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`progress-step ${step === 3 ? 'active' : ''}`}>
              {step}
            </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      <div className="content">
        <h1>Your Services</h1>
        <p className="subtitle">Add the services you offer to your customers. This will help us better understand your business.</p>

        <div className="form-container">
          {services.map((service, index) => (
            <div key={index} className="form-section service-form">
              <div className="form-fields">
                <div className="name-price-group">
                  <div className="field-group">
                    <label>Service Name</label>
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                      placeholder="e.g., Basic Maintenance"
                      className="form-input"
                    />
                  </div>
                  <div className="field-group">
                    <label>Price</label>
                    <div className="price-input-container">
                      <span className="price-symbol">$</span>
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        placeholder="99.99"
                        className="form-input price-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="field-group full-width">
                  <label>Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    placeholder="Describe what this service includes..."
                    className="form-input service-description"
                  />
                </div>
                <div className="field-group">
                  <label>Duration</label>
                  <div className="duration-input-container">
                    <span className="duration-icon">⏱️</span>
                    <input
                      type="text"
                      value={service.duration}
                      onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                      placeholder="e.g., 1 hour"
                      className="form-input duration-input"
                    />
                  </div>
                </div>
                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="remove-service-btn"
                  >
                    🗑️ Remove Service
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="add-service-btn"
          >
            + Add Another Service
          </button>
        </div>

        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            <span className="back-icon">←</span> Back to Business Details
          </button>
          <button onClick={handleContinue} className="continue-btn">
            Continue <span className="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services