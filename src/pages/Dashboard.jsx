import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { logOut } from '../firebase';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSetup = () => {
    navigate('/');
  };

  return (
    <div className="container dashboard-bg">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="content dashboard-main-content">
        <div className="dashboard-header">
          <h1>Welcome to your Dashboard!</h1>
          <p className="subtitle">
            Manage your AI dispatch business from here.
          </p>
        </div>

        <div className="dashboard-content dashboard-cards-flex">
          {/* Quick Actions */}
          <div className="dashboard-card dashboard-quick-actions">
            <h3><span className="dashboard-icon">⚡</span> Quick Actions</h3>
            <div className="dashboard-actions">
              <button 
                className="primary-button dashboard-btn action-btn"
                onClick={handleSetup}
              >
                <span className="action-icon">🚀</span> Complete Business Setup
              </button>
              <button 
                className="secondary-button dashboard-btn action-btn"
                onClick={handleLogout}
              >
                <span className="action-icon">🔒</span> Sign Out
              </button>
            </div>
          </div>

          {/* Getting Started */}
          <div className="dashboard-card dashboard-getting-started">
            <h3><span className="dashboard-icon">🎯</span> Getting Started</h3>
            <div className="getting-started-steps">
              <div className="step"><span className="step-num">1</span> Complete your business setup</div>
              <div className="step"><span className="step-num">2</span> Configure your services</div>
              <div className="step"><span className="step-num">3</span> Set up lead sources</div>
              <div className="step"><span className="step-num">4</span> Configure AI assistant settings</div>
              <div className="step"><span className="step-num">5</span> Set your pricing and payment details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 