import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { useScrapedData } from './contexts/ScrapedDataContext'

function App() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setScrapedData } = useScrapedData()

  const handleContinue = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a website URL to continue')
      return
    }
    try {
      new URL(trimmedUrl)
      setError('')
      setLoading(true)
      // Send request to backend
      const response = await fetch('https://a7e6b03bc4ff.ngrok-free.app/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmedUrl }),
      })
      const result = await response.json()
      setLoading(false)
      if (result.status === 'success') {
        setScrapedData(result.data)
        navigate('/business-details')
      } else {
        setError('Failed to fetch business details.')
      }
    } catch {
      setError('Please enter a valid URL including http:// or https://')
      setLoading(false)
    }
  }

  const handleSkip = () => {
    setScrapedData(null)
    navigate('/business-details')
  }

  return (
    <div className="container">
      <div className="logo-container">
          <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className={`progress-step ${step === 1 ? 'active' : ''}`}> {step} </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      <div className="content">
        <h1>Let's Get Your Business Set Up</h1>
        <p className="subtitle">Enter your website URL to help us pre-fill your business details. You can also skip this step and enter information manually.</p>
        
        <div className="form-container">
          <div className="input-group">
            <label>
              <span className="globe-icon">🌐</span>
              Your Website URL (Optional)
            </label>
            <input 
              type="text" 
              placeholder="https://www.yourbusiness.com"
              className="url-input"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError('')
              }}
              disabled={loading}
            />
            <p className="input-hint">Make sure to include https:// or http:// (e.g., https://www.example.com)</p>
            {error && <p className="error-message" style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
          </div>

          <div className="button-group">
            <button className="primary-button" onClick={handleContinue} disabled={loading}>
              {loading ? 'Loading...' : 'Continue with Website'}
              {!loading && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <button className="secondary-button" onClick={handleSkip} disabled={loading}>Skip & Enter Manually</button>
          </div>
          {loading && <div style={{ marginTop: '1rem', textAlign: 'center' }}>Loading business details...</div>}
        </div>

        <div className="info-box">
          <h3>What happens next?</h3>
          <ul>
            <li>Enter your business details and services</li>
            <li>Configure your AI assistant settings</li>
            <li>Set up your pricing plan</li>
            <li>Complete the setup process</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
