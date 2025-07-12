import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrapedData } from '../contexts/ScrapedDataContext'

function matchIndustry(scraped, options) {
  if (!scraped) return '';
  const lower = scraped.toLowerCase();
  return options.find(opt => opt.toLowerCase() === lower) || '';
}

const timezoneMap = {
  "America/New_York": "Eastern Time (ET)",
  "America/Chicago": "Central Time (CT)",
  "America/Denver": "Mountain Time (MT)",
  "America/Los_Angeles": "Pacific Time (PT)",
  "America/Anchorage": "Alaska Time (AKT)",
  "Pacific/Honolulu": "Hawaii-Aleutian Time (HAT)"
};
function matchTimezone(scraped) {
  return timezoneMap[scraped] || '';
}

function BusinessDetails() {
  const navigate = useNavigate()
  const { scrapedData } = useScrapedData()
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [timezone, setTimezone] = useState('')
  const [operatingHours, setOperatingHours] = useState({
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'Closed',
    sunday: 'Closed'
  })
  const [serviceAreas, setServiceAreas] = useState([
    { city: '', state: '', zipCode: '' }
  ])

  const industries = [
    'Technology',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Finance',
    'Education',
    'Construction',
    'Transportation',
    'Hospitality',
    'Other'
  ]

  useEffect(() => {
    if (scrapedData) {
      setCompanyName(scrapedData["Company name"] || '')
      // Industry mapping
      const scrapedIndustry = Array.isArray(scrapedData["Industry/Industries served"])
        ? scrapedData["Industry/Industries served"][0]
        : scrapedData["Industry/Industries served"];
      setIndustry(matchIndustry(scrapedIndustry, industries));
      // Timezone mapping
      setTimezone(matchTimezone(scrapedData["Time Zone"]));
      if (scrapedData["Physical address"] && (scrapedData["Physical address"].City || scrapedData["Physical address"].State || scrapedData["Physical address"]["ZIP Code"])) {
        setServiceAreas([
          {
            city: scrapedData["Physical address"].City || '',
            state: scrapedData["Physical address"].State || '',
            zipCode: scrapedData["Physical address"]["ZIP Code"] || ''
          }
        ])
      }
    }
  }, [scrapedData])

  const handleHoursChange = (day, value) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: value
    }))
  }

  const handleServiceAreaChange = (index, field, value) => {
    const newAreas = [...serviceAreas]
    newAreas[index][field] = value
    setServiceAreas(newAreas)
  }

  const addServiceArea = () => {
    setServiceAreas([...serviceAreas, { city: '', state: '', zipCode: '' }])
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleContinue = () => {
    // Save all business details to localStorage
    const businessDetails = {
      companyName,
      industry,
      timezone,
      operatingHours,
      serviceAreas,
      // add any other fields you want to save
    };
    localStorage.setItem('businessDetails', JSON.stringify(businessDetails));
    navigate('/services');
  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`progress-step ${step === 2 ? 'active' : ''}`}>
              {step}
            </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      <div className="content">
        <h1>Business Details</h1>
        <p className="subtitle">Please provide your business information below.</p>

        <div className="form-container">
          {/* Company Profile Section */}
          <div className="form-section">
            <div className="form-header">
              <div className="form-icon">🏢</div>
              <div>
                <h2>Company Profile</h2>
                <p>Enter your business details to help customers identify your company</p>
              </div>
            </div>
            <div className="form-fields">
              <div className="field-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className="form-input"
                />
              </div>
              <div className="field-group">
                <label htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select your industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Business Hours & Timezone Section */}
          <div className="form-section">
            <div className="form-header">
              <div className="form-icon">⏰</div>
              <div>
                <h2>Business Hours & Timezone</h2>
                <p>Set your operating hours and timezone for accurate scheduling</p>
              </div>
            </div>
            <div className="form-fields">
              <div className="field-group full-width">
                <label htmlFor="timezone">Time Zone</label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select your timezone</option>
                  {Object.entries(timezoneMap).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="operating-hours full-width">
                <label>Operating Hours</label>
                <div className="hours-grid">
                  <div className="hours-row-pair">
                    <div className="hours-row">
                      <span className="day-label">Monday</span>
                      <input
                        type="text"
                        value={operatingHours.monday}
                        onChange={(e) => handleHoursChange('monday', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="hours-row">
                      <span className="day-label">Tuesday</span>
                      <input
                        type="text"
                        value={operatingHours.tuesday}
                        onChange={(e) => handleHoursChange('tuesday', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="hours-row-pair">
                    <div className="hours-row">
                      <span className="day-label">Wednesday</span>
                      <input
                        type="text"
                        value={operatingHours.wednesday}
                        onChange={(e) => handleHoursChange('wednesday', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="hours-row">
                      <span className="day-label">Thursday</span>
                      <input
                        type="text"
                        value={operatingHours.thursday}
                        onChange={(e) => handleHoursChange('thursday', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="hours-row-pair">
                    <div className="hours-row">
                      <span className="day-label">Friday</span>
                      <input
                        type="text"
                        value={operatingHours.friday}
                        onChange={(e) => handleHoursChange('friday', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="hours-row">
                      <span className="day-label">Saturday</span>
                      <input
                        type="text"
                        value={operatingHours.saturday}
                        onChange={(e) => handleHoursChange('saturday', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="hours-row">
                    <span className="day-label">Sunday</span>
                    <input
                      type="text"
                      value={operatingHours.sunday}
                      onChange={(e) => handleHoursChange('sunday', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Section */}
          <div className="form-section">
            <div className="form-header">
              <div className="form-icon">📍</div>
              <div>
                <h2>Service Areas</h2>
                <p>Define the geographical areas where you provide services</p>
              </div>
            </div>
            <div className="form-fields">
              {serviceAreas.map((area, index) => (
                <div key={index} className="service-area-group">
                  <div className="field-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={area.city}
                      onChange={(e) => handleServiceAreaChange(index, 'city', e.target.value)}
                      placeholder="Enter city"
                      className="form-input"
                    />
                  </div>
                  <div className="field-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={area.state}
                      onChange={(e) => handleServiceAreaChange(index, 'state', e.target.value)}
                      placeholder="Enter state"
                      className="form-input"
                    />
                  </div>
                  <div className="field-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      value={area.zipCode}
                      onChange={(e) => handleServiceAreaChange(index, 'zipCode', e.target.value)}
                      placeholder="Enter ZIP code"
                      className="form-input"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addServiceArea}
                className="add-service-area-btn"
              >
                + Add Another Service Area
              </button>
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

export default BusinessDetails