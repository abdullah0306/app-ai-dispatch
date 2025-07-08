import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentDetails() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Required';
    if (!card.trim()) errs.card = 'Required';
    if (!exp.trim()) errs.exp = 'Required';
    if (!cvc.trim()) errs.cvc = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBack = () => navigate('/pricing');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const businessName = localStorage.getItem('businessName') || 'your business';
      navigate('/success', { state: { businessName } });
    }
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#fafbfc', paddingBottom: 40, overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* Logo and Progress Bar */}
      <div style={{ paddingTop: 48, marginBottom: 24, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src="/logo.png" alt="AIDispatch" className="logo" />
        </div>
        <div className="progress-bar" style={{ margin: '0 auto 32px auto' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`progress-step ${step < 6 ? 'completed' : ''} ${step === 6 ? 'active' : ''}`}
              style={{ position: 'relative' }}
            >
              {step < 6 ? <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 20 }}>✓</span> : step}
            </div>
          ))}
          <div className="progress-line"></div>
        </div>
      </div>

      {/* Centered Card */}
      <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '48px 48px 40px 48px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
          {/* SVG credit card icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ marginRight: 12 }}><rect x="2" y="5" width="20" height="14" rx="3" stroke="#2563eb" strokeWidth="2"/><rect x="2" y="9" width="20" height="2" fill="#2563eb"/></svg>
          <span style={{ fontWeight: 700, fontSize: 26, color: '#222', letterSpacing: '-0.5px' }}>Payment Details</span>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500, color: '#222', marginBottom: 6, display: 'block', fontSize: 15 }}>Name on Card</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              style={{ width: '100%', padding: '12px', borderRadius: 8, border: errors.name ? '1.5px solid #e53935' : '1.5px solid #bdbdbd', fontSize: 15, background: '#fafbfc', marginBottom: errors.name ? 2 : 0, color: '#222' }}
            />
            {errors.name && <div style={{ color: '#e53935', fontSize: 13, marginTop: 2 }}>{errors.name}</div>}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500, color: '#222', marginBottom: 6, display: 'block', fontSize: 15 }}>Card Number</label>
            <input
              type="text"
              value={card}
              onChange={e => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                value = value.replace(/(.{4})/g, '$1 ').trim();
                setCard(value);
              }}
              placeholder="•••• •••• •••• ••••"
              style={{ width: '100%', padding: '12px', borderRadius: 8, border: errors.card ? '1.5px solid #e53935' : '1.5px solid #bdbdbd', fontSize: 15, background: '#fafbfc', letterSpacing: 2, marginBottom: errors.card ? 2 : 0, color: '#222' }}
              maxLength={19}
              inputMode="numeric"
            />
            {errors.card && <div style={{ color: '#e53935', fontSize: 13, marginTop: 2 }}>{errors.card}</div>}
          </div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 40 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 500, color: '#222', marginBottom: 6, display: 'block', fontSize: 15 }}>Expiration Date</label>
              <input
                type="text"
                value={exp}
                onChange={e => {
                  let value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  setExp(value);
                }}
                placeholder="MM / YY"
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: errors.exp ? '1.5px solid #e53935' : '1.5px solid #bdbdbd', fontSize: 15, background: '#fafbfc', marginBottom: errors.exp ? 2 : 0, color: '#222' }}
                maxLength={5}
              />
              {errors.exp && <div style={{ color: '#e53935', fontSize: 13, marginTop: 2 }}>{errors.exp}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 500, color: '#222', marginBottom: 6, display: 'block', fontSize: 15 }}>CVC</label>
              <input
                type="password"
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="•••"
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: errors.cvc ? '1.5px solid #e53935' : '1.5px solid #bdbdbd', fontSize: 15, background: '#fafbfc', marginBottom: errors.cvc ? 2 : 0, color: '#222' }}
                maxLength={4}
                inputMode="numeric"
              />
              {errors.cvc && <div style={{ color: '#e53935', fontSize: 13, marginTop: 2 }}>{errors.cvc}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
            <button
              type="button"
              onClick={handleBack}
              style={{ padding: '10px 32px', borderRadius: 8, background: '#fff', color: '#2563eb', fontWeight: 500, fontSize: 16, border: '2px solid #2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{ fontSize: 18 }}>←</span> Back
            </button>
            <button
              type="submit"
              style={{ padding: '10px 32px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 500, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              Complete Setup <span style={{ fontSize: 18 }}>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentDetails; 