import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessName = location.state?.businessName || 'your business';

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f8fa', overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* Logo and Blue Progress Bar */}
      <div style={{ paddingTop: 36, marginBottom: 18, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <img src="/logo.png" alt="AIDispatch" style={{ height: 54 }} />
        </div>
        <div style={{ height: 8, width: 900, background: '#175cff', borderRadius: 8, margin: '0 auto' }}></div>
      </div>

      {/* Centered Card */}
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1.5px solid #e3e7ef', padding: '56px 64px 48px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Green Checkmark SVG */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ marginBottom: 28 }}>
          <circle cx="36" cy="36" r="36" fill="#eafaf1"/>
          <path d="M24 37.5L33 46.5L48 28.5" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 style={{ fontWeight: 700, fontSize: 38, color: '#18181b', marginBottom: 18, textAlign: 'center' }}>
          Setup Complete!
        </h1>
        <div style={{ fontSize: 20, color: '#222', marginBottom: 18, textAlign: 'center', lineHeight: 1.5 }}>
          Congratulations! Your AI assistant for <span style={{ fontWeight: 700 }}>{businessName}</span> is now active.
        </div>
        <div style={{ fontSize: 18, color: '#222', marginBottom: 36, textAlign: 'center', lineHeight: 1.5 }}>
          You can now manage your calls, view analytics, and configure your settings from your dashboard.
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '10px 28px', borderRadius: 7, background: '#175cff', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px rgba(23,92,255,0.10)' }}
        >
          Go to Dashboard
          <span style={{ fontSize: 20, display: 'inline-block', marginLeft: 2 }}>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

export default Success; 