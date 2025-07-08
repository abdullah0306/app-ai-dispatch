import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'test-drive',
    name: 'AiDispatch Test Drive',
    price: 'FREE',
    sub: 'for 14 days',
    features: [
      'Full access for 14 days',
      'Up to 60 minutes of calls',
      '24/7 AI call answering',
      'Email notifications',
      'Call analytics dashboard',
      'One phone number included',
      'No credit card required',
    ],
    badge: null,
  },
  {
    id: 'turbo',
    name: 'Turbo Dispatch',
    price: '$0.35',
    sub: '/minute',
    features: [
      'Pay-as-you-go $0.35 per minute',
      'One phone number included',
      'Additional numbers $2/month each',
      '24/7 AI call answering',
      'Advanced call analytics',
      'Email & SMS notifications',
      'Custom greeting message',
      'Industry-specific FAQs',
      'Priority support',
    ],
    badge: 'Most Popular',
    badgeIcon: '★',
    badgeColor: '#e11d48',
  },
];

const billingDetails = [
  'Pay only for the actual minutes your AI assistant handles calls',
  'Billed when you reach $500 or at the end of the month',
  'Additional phone numbers are just $2/month each',
  'Detailed usage reports to track your spending',
];

const trialDetails = [
  'Full access to all features for 14 days',
  '60 minutes of call time included',
  'No credit card required to start',
  "Easy upgrade to Turbo Dispatch when you're ready",
];

function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('test-drive');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const inputRef = useRef(null);
  const [openSection, setOpenSection] = useState('billing'); // 'billing' or 'trial'

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'DISCOUNT10') {
      setAppliedCoupon(coupon);
      setCouponError('');
    } else {
      setAppliedCoupon('');
      setCouponError('Invalid coupon code');
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleBack = () => {
    navigate('/greeting'); // Step 4 (AI Assistant Setup)
  };

  const handleContinue = () => {
    navigate('/payment-details'); // Step 6
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fafbfc', paddingBottom: 40 }}>
      {/* Logo and Progress Bar */}
      <div style={{ paddingTop: 48, marginBottom: 24, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src="/logo.png" alt="AIDispatch" className="logo" />
        </div>
        <div className="progress-bar" style={{ margin: '0 auto 32px auto' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`progress-step ${step < 5 ? 'completed' : ''} ${step === 5 ? 'active' : ''}`}
              style={{ position: 'relative' }}
            >
              {step < 5 ? <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 20 }}>✓</span> : step}
            </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      {/* Title & Description */}
      <h1 style={{ textAlign: 'center', fontWeight: 600, fontSize: '2rem', marginBottom: 18, color: '#222', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        #1 AI Dispatch SaaS – We Keep It Simple
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <div style={{ background: '#f4faff', borderRadius: 12, padding: 24, maxWidth: 900, width: '100%', textAlign: 'center', fontSize: 20, color: '#222' }}>
          Hiring a human dispatcher costs $3,500 per month for just 8 hours a day. Our AI agent works 24/7, and you only pay for the time you use—saving you money while boosting your business. It's not just a cost saver, it's a revenue driver. Start today and see the results!
        </div>
      </div>

      {/* Coupon Input */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 380 }}>
          <div style={{ position: 'relative', width: 280 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#bdbdbd', fontSize: 18 }}>🏷️</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={e => { setCoupon(e.target.value); setCouponError(''); setAppliedCoupon(''); }}
              style={{ width: 280, height: 40, padding: '0 14px 0 36px', borderRadius: 8, border: couponError ? '1.5px solid #e53935' : '1.5px solid #bdbdbd', fontSize: 15, background: '#fff', outline: couponError ? '1.5px solid #e53935' : 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={handleApplyCoupon}
            style={{ height: 40, padding: '0 22px', borderRadius: 8, background: '#fff', color: '#222', fontWeight: 500, fontSize: 15, border: '1.5px solid #222', cursor: 'pointer', marginLeft: 10, transition: 'background 0.2s', display: 'flex', alignItems: 'center' }}
          >
            Apply
          </button>
        </div>
        {appliedCoupon && !couponError && (
          <span style={{ color: '#22c55e', fontWeight: 500, fontSize: 16, marginTop: 12, textAlign: 'center', width: '100%' }}>Coupon "{appliedCoupon}" applied!</span>
        )}
        {couponError && (
          <span style={{ color: '#e53935', fontWeight: 400, fontSize: 16, marginTop: 12, textAlign: 'center', width: '100%' }}>{couponError}</span>
        )}
      </div>

      {/* Pricing Cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 48, flexWrap: 'wrap', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card${selectedPlan === plan.id ? ' selected' : ''}`}
            style={{
              border: selectedPlan === plan.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
              borderRadius: 16,
              padding: 36,
              minWidth: 340,
              maxWidth: 420,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              position: 'relative',
              marginBottom: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          >
            {plan.badge && (
              <div style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: plan.badgeColor,
                color: '#fff',
                borderRadius: 20,
                padding: '4px 16px',
                fontWeight: 500,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span>{plan.badgeIcon}</span> {plan.badge}
              </div>
            )}
            <div style={{ fontSize: 34, fontWeight: 700, marginBottom: 2, color: '#222' }}>{plan.price}
              <span style={{ fontSize: 18, fontWeight: 400, color: '#888', marginLeft: 4 }}>{plan.sub}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 18, color: '#222' }}>{plan.name}</div>
            <ul style={{ textAlign: 'left', marginBottom: 32, paddingLeft: 0, width: '100%' }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ color: '#222', marginBottom: 10, fontSize: 16, listStyle: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 18, marginRight: 4 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className="select-plan-btn"
              style={{
                width: '100%',
                padding: '13px 0',
                borderRadius: 8,
                border: selectedPlan === plan.id ? 'none' : '1px solid #2563eb',
                background: selectedPlan === plan.id ? '#2563eb' : '#fff',
                color: selectedPlan === plan.id ? '#fff' : '#2563eb',
                fontWeight: 600,
                fontSize: 17,
                cursor: 'pointer',
                marginTop: 'auto',
                transition: 'all 0.2s',
                boxShadow: selectedPlan === plan.id ? '0 2px 8px rgba(37,99,235,0.10)' : 'none',
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Billing/Trial Details Section */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
        <div style={{ maxWidth: 900, width: '100%', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#2563eb', fontSize: 24 }}>ℹ️</span>
              <span style={{ fontWeight: 500, fontSize: 20, color: '#222' }}>How Our Billing Works</span>
            </div>
            <div style={{ fontSize: 16, color: '#444', margin: '8px 0 0 34px' }}>
              Simple, transparent, pay-as-you-go pricing with no surprises.
            </div>
          </div>
          {/* Billing Details Accordion */}
          <div style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 500, fontSize: 17, padding: '16px 0', color: '#222' }}
              onClick={() => setOpenSection(openSection === 'billing' ? '' : 'billing')}
            >
              <span>Billing Details</span>
              <span style={{ marginLeft: 'auto', fontSize: 18 }}>{openSection === 'billing' ? '▲' : '▼'}</span>
            </div>
            {openSection === 'billing' && (
              <ul style={{ paddingLeft: 24, marginBottom: 0 }}>
                {billingDetails.map((item, idx) => (
                  <li key={idx} style={{ color: '#222', marginBottom: 8, fontSize: 15, listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 16 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Free Trial Details Accordion */}
          <div style={{ borderBottom: '1px solid #e5e7eb' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 500, fontSize: 17, padding: '16px 0', color: '#222' }}
              onClick={() => setOpenSection(openSection === 'trial' ? '' : 'trial')}
            >
              <span>Free Trial Details</span>
              <span style={{ marginLeft: 'auto', fontSize: 18 }}>{openSection === 'trial' ? '▲' : '▼'}</span>
            </div>
            {openSection === 'trial' && (
              <ul style={{ paddingLeft: 24, marginBottom: 0 }}>
                {trialDetails.map((item, idx) => (
                  <li key={idx} style={{ color: '#222', marginBottom: 8, fontSize: 15, listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 16 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{ maxWidth: 900, margin: '0 auto', padding: '0 0 40px 0' }}>
        <div style={{ background: '#f4faff', borderRadius: 12, padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#22c55e', fontSize: 24 }}>🛡️</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: 17, color: '#222' }}>Secure Payment Information</div>
            <div style={{ fontSize: 15, color: '#444' }}>
              Your payment information is securely processed through our payment provider. No credit card information is stored on our servers.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleBack}
            style={{ padding: '10px 32px', borderRadius: 8, background: '#fff', color: '#2563eb', fontWeight: 500, fontSize: 17, border: '2px solid #2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 18 }}>←</span> Back
          </button>
          <button
            onClick={handleContinue}
            style={{ padding: '10px 32px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 500, fontSize: 17, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 18 }}>💳</span> Continue to Payment Details
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Pricing; 