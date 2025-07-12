import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, saveUserData } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await signIn(email, password);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error);
        }
      } else {
        // Combine firstName and lastName for display_name
        const display_name = `${firstName} ${lastName}`.trim();
        const result = await signUp(email, password, display_name);
        if (result.success) {
          // Save additional user data if needed
          await saveUserData(result.user.uid, {
            firstName,
            lastName,
            email,
            createdAt: new Date().toISOString(),
            setupCompleted: false
          });
          navigate('/');
        } else {
          setError(result.error);
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="AIDispatch" className="logo" />
      </div>

      <div className="content">
        <h1>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h1>
        <p className="subtitle">
          {isLogin 
            ? 'Sign in to your AIDispatch account to continue managing your business'
            : 'Join AIDispatch to streamline your business operations with AI-powered dispatch'
          }
        </p>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="name-group">
                <div className="field-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            )}

            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="form-input"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>

            {!isLogin && (
              <div className="field-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="form-input"
                  required
                />
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="button-container">
              <button 
                type="submit" 
                className="primary-button auth-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="auth-divider">
            <span className="divider-line left"></span>
            <span className="divider-or">or</span>
            <span className="divider-line right"></span>
          </div>

          <div className="button-container auth-toggle-container">
            <button 
              type="button" 
              className="secondary-button auth-toggle-button"
              onClick={toggleMode}
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"
              }
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="login-footer">
        <div className="footer-content">
          <div className="footer-title">Why Choose AIDispatch?</div>
          <ul className="footer-list">
            <li>AI-powered dispatch management</li>
            <li>Automated lead handling</li>
            <li>Real-time business insights</li>
            <li>Seamless integration with your workflow</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Login; 