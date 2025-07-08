import React from 'react';

function Dashboard() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '48px 64px', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, color: '#2563eb', marginBottom: 12 }}>Welcome to your Dashboard!</h1>
        <div style={{ fontSize: 20, color: '#333' }}>This is your main dashboard page. You can customize this further.</div>
      </div>
    </div>
  );
}

export default Dashboard; 