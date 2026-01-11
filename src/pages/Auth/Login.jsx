import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Pet Owner');
  const [vetLicense, setVetLicense] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const { login } = useAuth();

  const validate = () => {
    if (!username) return 'Username is required';
    if (!password) return 'Password is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    try {
      const extras = {};
      if (selectedRole === 'Vet') extras.license = vetLicense.trim();
      if (selectedRole === 'Pet Owner') extras.ownerId = ownerId.trim();

      const res = await login(username, password, extras);
      if (!res.ok) throw new Error(res.error || 'Login failed');
      const userRole = (res.data.user.role || '').toString().toLowerCase();
      if (userRole !== selectedRole.toLowerCase()) {
        // role mismatch — ask user to switch role button
        setError(`Role mismatch: this account is registered as ${res.data.user.role}. Please select the correct role button.`);
        return;
      }
      navigate(from, { state: { justLoggedIn: true } });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div
          className="signin-left"
          aria-hidden
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/pethapppy.png)` }}
        >
          <div className="hero-overlay">
            <h2>Welcome Back</h2>
            <p>For better experience with your pets!</p>
          </div>
        </div>

        <div className="signin-right">
          <div className="signin-card-inner">
            <div className="auth-top">
              <h1>Log In</h1>
              <p className="auth-sub">Sign in to access your HappyPaws dashboard</p>
            </div>

            <div className="role-toggle">
              <button type="button" className={`role-btn ${selectedRole === 'Pet Owner' ? 'active' : ''}`} onClick={() => { setSelectedRole('Pet Owner'); setError(''); }}>Pet Owner</button>
              <button type="button" className={`role-btn ${selectedRole === 'Vet' ? 'active' : ''}`} onClick={() => { setSelectedRole('Vet'); setError(''); }}>Vet</button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="form-error">{error}</div>}
              <label className="field">
                <span className="field-label">Email or Username</span>
                <div className="input-wrap">
                  <input placeholder="Email or Phone" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </label>

              <label className="field">
                <span className="field-label">Password</span>
                <div className="input-wrap">
                  <input placeholder="Password" type={show ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" className="eye" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
                </div>
              </label>

              {selectedRole === 'Pet Owner' && (
                <label className="field">
                  <span className="field-label">Owner ID</span>
                  <div className="input-wrap">
                    <input placeholder="Enter your owner ID (optional)" type="text" name="ownerId" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
                  </div>
                </label>
              )}

              {selectedRole === 'Vet' && (
                <label className="field">
                  <span className="field-label">Vet License</span>
                  <div className="input-wrap">
                    <input placeholder="Enter your license (e.g. VET-001)" type="text" name="license" value={vetLicense} onChange={(e) => setVetLicense(e.target.value)} />
                  </div>
                </label>
              )}

              <div className="form-actions">
                <button type="button" className="forgot">Forgot password?</button>
                <button className="submit" type="submit">Log In</button>
              </div>
            </form>

            <div className="auth-footer">
              Need an account? Contact your clinic administrator.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
