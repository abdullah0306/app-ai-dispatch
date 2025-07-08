import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FAQs() {
  const navigate = useNavigate()
  
  // State for FAQs
  const [faqs, setFaqs] = useState([
    {
      question: 'What are your business hours?',
      answer: 'Our business hours are Monday to Friday, 9 AM to 5 PM.',
      isOpen: false,
      category: 'Industry Standard'
    },
    {
      question: 'Do you offer free estimates?',
      answer: 'Yes, we offer free estimates for all our services.',
      isOpen: false,
      category: 'Industry Standard'
    },
    {
      question: 'What areas do you service?',
      answer: 'We service the greater metropolitan area and surrounding suburbs.',
      isOpen: false,
      category: 'Industry Standard'
    }
  ])

  // State for new FAQ
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [newCategory, setNewCategory] = useState('Custom')

  const handleAddFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setFaqs([...faqs, { 
        question: newQuestion, 
        answer: newAnswer,
        isOpen: false,
        category: newCategory
      }])
      setNewQuestion('')
      setNewAnswer('')
    }
  }
  
  const toggleFAQ = (index) => {
    const updatedFaqs = [...faqs]
    updatedFaqs[index].isOpen = !updatedFaqs[index].isOpen
    setFaqs(updatedFaqs)
  }

  const handleRemoveFAQ = (index) => {
    const updatedFaqs = [...faqs]
    updatedFaqs.splice(index, 1)
    setFaqs(updatedFaqs)
  }

  const handleBack = () => {
    navigate('/restrictions')
  }

  const handleFinish = () => {
    navigate('/pricing')
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
        <p className="subtitle">Add frequently asked questions for your AI assistant to answer</p>

        <div className="setup-navigation">
          <button className="nav-item" onClick={() => navigate('/greeting')}>Greeting</button>
          <button className="nav-item" onClick={() => navigate('/lead-sources')}>Lead Sources</button>
          <button className="nav-item" onClick={() => navigate('/service-settings')}>Services</button>
          <button className="nav-item" onClick={() => navigate('/permissions')}>Permissions</button>
          <button className="nav-item" onClick={() => navigate('/restrictions')}>Restrictions</button>
          <button className="nav-item active" onClick={() => navigate('/faqs')}>FAQs</button>
        </div>

        <div className="form-container">
          <div className="form-section">
            <div className="form-icon">❓</div>
            <div className="form-header">
              <h2>Frequently Asked Questions</h2>
              <p>Add common questions and answers to help your AI assistant provide accurate information to callers</p>
            </div>
            
            <div className="form-fields">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-header" onClick={() => toggleFAQ(index)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="faq-category">{faq.category}</span>
                      <h3>{faq.question}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFAQ(index);
                        }}
                        className="faq-remove-btn"
                        aria-label="Remove FAQ"
                      >
                        ×
                      </button>
                      <button className="faq-toggle-btn" aria-label="Toggle FAQ">
                        {faq.isOpen ? '−' : '+'}
                      </button>
                    </div>
                  </div>
                  {faq.isOpen && (
                    <div className="faq-content">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="add-faq-section" style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Add New FAQ</h3>
                <div className="field-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter a common question"
                    className="form-input"
                  />
                </div>
                <div className="field-group">
                  <label>Answer</label>
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Enter the answer"
                    className="form-input"
                    style={{ minHeight: '100px' }}
                  />
                </div>
                <div className="field-group">
                  <label>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-input"
                  >
                    <option value="Custom">Custom</option>
                    <option value="Industry Standard">Industry Standard</option>
                    <option value="Services">Services</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Policies">Policies</option>
                  </select>
                </div>
                <button 
                  onClick={handleAddFAQ}
                  className="add-service-btn"
                  style={{ marginTop: '1rem' }}
                >
                  Add FAQ
                </button>
              </div>

              <div className="info-box">
                <div className="info-icon">ℹ️</div>
                <div>
                  <h3>About FAQs</h3>
                  <p>These FAQs will help your AI assistant provide accurate information to your customers. Add questions that are commonly asked by your customers to improve the AI's responses.</p>
                  <p>You can categorize FAQs to better organize them and help the AI understand the context of each question.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleBack} className="back-btn">
            <span className="back-icon">←</span> Back to Restrictions
          </button>
          <button onClick={handleFinish} className="continue-btn">
            Continue <span className="continue-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FAQs